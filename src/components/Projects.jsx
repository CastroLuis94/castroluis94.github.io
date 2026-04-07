import React from 'react';
import { ExternalLink, Code2, Brain, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Projects = () => {
  const projects = [
    {
      title: 'API de Clasificación de Imágenes para E-commerce',
      year: '2026',
      description: 'Pipeline completo de machine learning para clasificación de productos con CNN, desplegado como API REST.',
      technologies: ['PyTorch', 'FastAPI', 'CNN', 'REST API'],
      highlights: [
        'Diseño y entrenamiento de CNN para clasificación de productos',
        'Implementación de serialización del modelo y servicio de inferencia',
        'API REST con predicciones y métricas de confianza'
      ],
      icon: Code2,
      link: '#'
    },
    {
      title: 'Modelo de Detección de Fraude en Tarjetas de Crédito',
      year: '2025',
      description: 'Modelo supervisado para detección de transacciones fraudulentas con manejo de desbalance extremo de clases.',
      technologies: ['Python', 'Scikit-learn', 'ROC-AUC', 'Machine Learning'],
      highlights: [
        'Técnicas para manejar desbalance extremo de clases',
        'Optimización del trade-off entre recall y precisión',
        'Evaluación mediante ROC-AUC y matriz de confusión'
      ],
      icon: Brain,
      link: '#'
    },
    {
      title: 'Detección de Uso de Barbijo en Tiempo Real',
      year: '2021',
      description: 'Sistema de clasificación de imágenes en tiempo real para detección de uso de barbijo mediante cámara.',
      technologies: ['Python', 'CNN', 'Computer Vision', 'Real-time'],
      highlights: [
        'CNN para detección de uso de barbijo',
        'Pipeline de inferencia en tiempo real',
        'Integración con cámara web'
      ],
      icon: Code2,
      link: '#'
    },
    {
      title: 'Competencia de Machine Learning – UBA',
      year: '2019',
      description: 'Primer puesto en competencia académica de clasificación de texto con optimización automática de hiperparámetros.',
      technologies: ['Python', 'NLP', 'Scikit-learn', 'Hyperparameter Tuning'],
      highlights: [
        'Primer puesto en competencia académica',
        'Implementación de modelos supervisados',
        'Optimización automática de hiperparámetros'
      ],
      icon: Award,
      link: '#'
    }
  ];

  return (
    <section id="projects" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
            Proyectos Destacados
          </h2>
          <div className="w-20 h-1 bg-blue-600"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <Card key={index} className="border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <IconComponent className="text-blue-600" size={24} />
                    </div>
                    <span
                      className="text-sm text-slate-500"
                      style={{ fontFamily: 'Roboto Mono, monospace' }}
                    >
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
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-start">
                          <span className="text-blue-600 mr-2 mt-0.5">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-slate-100 text-slate-700 hover:bg-slate-200"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
                    onClick={() => window.location.href = project.link}
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Ver Proyecto
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