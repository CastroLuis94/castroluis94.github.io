import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

const Header = ({ activeSection }) => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

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
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: t('header.home') },
    { id: 'experience', label: t('header.experience') },
    { id: 'projects', label: t('header.projects') },
    { id: 'education', label: t('header.education') },
    { id: 'contact', label: t('header.contact') }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <button onClick={() => scrollToSection('home')} className="text-lg md:text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
            Luis Castro
          </button>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === item.id ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Botón de Idioma */}
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="ml-2 flex gap-2 text-blue-600 hover:bg-blue-50">
              <Globe size={16} />
              {(i18n.language || 'es').toUpperCase()}
            </Button>
          </nav>

          <div className="flex items-center md:hidden gap-2">
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="text-blue-600">
               {(i18n.language || 'es').toUpperCase()}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-slate-200 bg-white">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className={`block w-full text-left px-4 py-3 text-sm font-medium transition-colors ${activeSection === item.id ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;