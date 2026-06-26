import React from 'react';
import { ExternalLink, Code2, Brain, Award, FileText, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useTranslation } from 'react-i18next';

const Projects = () => {
  const { t } = useTranslation();
  
  // Mapeamos los íconos adaptados al nuevo orden (6 proyectos en total)
  const icons = [FileText, Calendar, Code2, Brain, Code2, Award];

  // Traemos los items del JSON
  const projectItems = t('projects.items', { returnObjects: true }) || [];

  // Mantenemos las tecnologías alineadas al nuevo orden de la lista
  const techStack = [
    ['Python', 'NLP', 'LangChain', 'LlamaIndex'],             // Asistente PDFs
    ['Python', 'FastAPI', 'Airtable API', 'Automation'],     // Sistema de Reservas
    ['PyTorch', 'FastAPI', 'CNN', 'REST API'],                 // E-commerce API
    ['Python', 'Scikit-learn', 'ROC-AUC', 'Machine Learning'], // Fraude Tarjetas
    ['Python', 'CNN', 'Computer Vision', 'Real-time'],         // Barbijo Tiempo Real
    ['Python', 'NLP', 'Scikit-learn', 'Hyperparameter Tuning'] // Competencia UBA
  ];

  return (
    <section id="projects" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
            {t('projects.title')}
          </h2>
          <div className="w-20 h-1 bg-blue-600"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projectItems.map((project, index) => {
            const IconComponent = icons[index] || Code2;
            // Obtenemos de forma segura el stack; si no existe el índice, devuelve un array vacío
            const currentTechs = techStack[index] || [];

            return (
              <Card key={index} className="border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <IconComponent className="text-blue-600" size={24} />
                    </div>
                    <span className="text-sm text-slate-500" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                      {project.year}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <ul className="space-y-1.5">
                      {project.highlights?.map((highlight, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-start">
                          <span className="text-blue-600 mr-2 mt-0.5">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {/* Cambiado por seguridad para que use la constante protegida */}
                    {currentTechs.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-slate-100 text-slate-700">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
                    // MODIFICACIÓN: Si es el index 0 (Asistente PDFs), redirige a la página estática
                    onClick={() => {
                      if (index === 0) {
                        window.location.href = '/pdf_reader.html';
                      } else {
                        // Comportamiento por defecto para el resto de los proyectos
                        window.location.href = '#'; 
                      }
                    }}
                  >
                    <ExternalLink size={16} className="mr-2" />
                    {t('projects.button_view')}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;