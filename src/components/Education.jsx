import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { useTranslation } from 'react-i18next';

const Education = () => {
  const { t } = useTranslation();
  return (
    <section id="education" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
            {t('education.title')}
          </h2>
          <div className="w-20 h-1 bg-blue-600"></div>
        </div>

        <Card className="border-slate-200 hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg mt-1">
                <GraduationCap className="text-blue-600" size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                  {t('education.degree')}
                </h3>
                <p className="text-lg text-blue-600 font-medium mb-2">
                  {t('education.university')}
                </p>
                <span className="text-sm text-slate-500" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                  {t('education.period')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Education;