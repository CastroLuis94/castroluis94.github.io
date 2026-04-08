import React from 'react';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  
  const contactMethods = [
    {
      icon: Mail,
      label: t('contact.methods.email.label'),
      value: 'castroluis1694@gmail.com',
      href: 'mailto:castroluis1694@gmail.com',
      description: t('contact.methods.email.desc'),
      color: 'text-blue-600'
    },
    {
      icon: Linkedin,
      label: t('contact.methods.linkedin.label'),
      value: 'luiscastro94',
      href: 'https://www.linkedin.com/in/luiscastro94/',
      description: t('contact.methods.linkedin.desc'),
      color: 'text-blue-600'
    },
    {
      icon: Github,
      label: t('contact.methods.github.label'),
      value: 'Castroluis94',
      href: 'https://github.com/Castroluis94',
      description: t('contact.methods.github.desc'),
      color: 'text-slate-700'
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
            {t('contact.title')}
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          <p className="text-lg text-slate-600 mt-6 max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </div>
        <div className="grid gap-6">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <Card key={index} className="border-slate-200 hover:shadow-md transition-all duration-300 group">
                <CardContent className="p-0">
                  <a href={method.href} target="_blank" rel="noopener noreferrer" className="flex items-center p-6 gap-6">
                    <div className="p-4 bg-slate-100 rounded-xl group-hover:bg-blue-100 transition-colors">
                      <IconComponent className={`${method.color} group-hover:text-blue-600`} size={28} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">{method.label}</p>
                        <ExternalLink size={14} className="text-slate-400 group-hover:text-blue-600" />
                      </div>
                      <p className="text-xl text-slate-900 font-medium mb-1">{method.value}</p>
                      <p className="text-sm text-slate-500">{method.description}</p>
                    </div>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;