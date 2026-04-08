import React from 'react';
import { useTranslation } from 'react-i18next';
import { Briefcase } from 'lucide-react';
import { Card, CardContent } from './ui/card'; // Ajustá la ruta si tus carpetas son distintas

const Experience = () => {
  const { t } = useTranslation();

  // Traemos el array de experiencias del JSON
  // El "|| []" es el seguro por si el JSON falla
  const experiences = t('experience.items', { returnObjects: true }) || [];

  return (
    <section id="experience" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
            {t('experience.title')}
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
                  {/* Verificamos que responsibilities exista antes de hacer map */}
                  {exp.responsibilities && exp.responsibilities.map((resp, idx) => (
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