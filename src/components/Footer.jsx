import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left - Copyright */}
          <div className="text-center md:text-left">
            <p className="text-slate-300">
              © {currentYear} Luis Castro. Todos los derechos reservados.
            </p>
          </div>

          {/* Center - Made with */}
          <div className="flex items-center gap-2 text-slate-300">
            <span>Desarrollado con</span>
            <Heart size={16} className="text-red-500 fill-red-500" />
            <span>y React</span>
          </div>

          {/* Right - Social Links */}
          <div className="flex gap-4">
            <a
              href="https://github.com/Castroluis94"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/luiscastro94/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:castroluis1694@gmail.com"
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;