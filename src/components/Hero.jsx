import React from 'react';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  const profileImage = 'https://customer-assets.emergentagent.com/job_luis-deep-learning/artifacts/i0v3nuyo_fotocv%20%282%29.jpg';

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-blue-600 font-medium" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                Hola, soy
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Luis Castro
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-600">
                Machine Learning Engineer
              </h2>
            </div>

            <p className="text-lg text-slate-600 leading-relaxed">
              Especializado en Deep Learning, visión por computadora y desarrollo de pipelines de ML. 
              Experiencia liderando proyectos de clasificación y segmentación de imágenes médicas.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                onClick={() => scrollToSection('projects')}
                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Ver Proyectos
              </Button>
              <Button
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Contacto
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                href="https://github.com/Castroluis94"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/luiscastro94/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:castroluis1694@gmail.com"
                className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-lg overflow-hidden shadow-xl">
                <img
                  src={profileImage}
                  alt="Luis Castro"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 border-2 border-blue-600 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;