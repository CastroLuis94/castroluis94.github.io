import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    toast({
      title: 'Mensaje enviado',
      description: 'Gracias por tu mensaje. Te responderé pronto.',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'castroluis1694@gmail.com',
      href: 'mailto:castroluis1694@gmail.com',
      color: 'text-blue-600'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'luiscastro94',
      href: 'https://www.linkedin.com/in/luiscastro94/',
      color: 'text-blue-600'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'Castroluis94',
      href: 'https://github.com/Castroluis94',
      color: 'text-slate-700'
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
            Contacto
          </h2>
          <div className="w-20 h-1 bg-blue-600"></div>
          <p className="text-lg text-slate-600 mt-4">
            ¿Interesado en trabajar juntos? No dudes en contactarme.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Methods */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">
              Información de Contacto
            </h3>
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card key={index} className="border-slate-200 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <a
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group"
                    >
                      <div className="p-3 bg-slate-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <IconComponent className={`${method.color} group-hover:text-blue-600`} size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium">
                          {method.label}
                        </p>
                        <p className="text-slate-900 font-medium group-hover:text-blue-600 transition-colors">
                          {method.value}
                        </p>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form */}
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                Envíame un Mensaje
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-slate-300 focus:border-blue-600 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Tu email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-slate-300 focus:border-blue-600 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Tu mensaje"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="border-slate-300 focus:border-blue-600 focus:ring-blue-600 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  <Send size={18} className="mr-2" />
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;