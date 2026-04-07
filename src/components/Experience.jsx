import React from 'react';
import { Briefcase } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const Experience = () => {
  const experiences = [
    {
      title: 'Líder de Machine Learning',
      company: 'Digpatho',
      period: 'Julio 2025 - Diciembre 2025',
      responsibilities: [
        'Lideré el desarrollo de un clasificador de cáncer HER2 utilizando técnicas de deep learning.',
        'Diseñé la estrategia de evaluación priorizando métricas clínicamente relevantes como recall y sensibilidad.',
        'Implementé funciones de pérdida ponderadas para abordar el desbalance severo de datos.',
        'Supervisé la integración de modelos en pipelines listos para producción.',
        'Coordiné procesos de validación y optimización del modelo.'
      ]
    },
    {
      title: 'Ingeniero en Machine Learning',
      company: 'Digpatho',
      period: 'Marzo 2025 - Julio 2025',
      responsibilities: [
        'Desarrollé un pipeline de segmentación de imágenes para el análisis del biomarcador Ki67.',
        'Implementé flujos de preprocesamiento, generación de patches y alineación de máscaras.',
        'Preparé datasets para reentrenamiento de modelos de deep learning (Cellpose).',
        'Mejoré la consistencia de segmentación y la alineación entre datos e etiquetas.'
      ]
    },
    {
      title: 'Tutor de Programación y Desarrollador Freelance',
      company: 'Independiente',
      period: '2022 - 2024',
      responsibilities: [
        'Dicté tutorías en programación y algoritmos utilizando Python.',
        'Desarrollé soluciones orientadas a análisis de datos y optimización de código.',
        'Implementé scripts de automatización y herramientas de procesamiento de datos.'
      ]
    }
  ];

  return (
    <section id="experience" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
            Experiencia Profesional
          </h2>
          <div className="w-20 h-1 bg-blue-600"></div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="border-slate-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg mt-1">
                      <Briefcase className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-blue-600 font-medium">
                        {exp.company}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-sm text-slate-500 mt-2 md:mt-0 md:ml-4 whitespace-nowrap"
                    style={{ fontFamily: 'Roboto Mono, monospace' }}
                  >
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-2 ml-0 md:ml-16">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-slate-600 flex items-start">
                      <span className="text-blue-600 mr-2 mt-1">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;