import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github, MapPin, Phone, Download } from 'lucide-react';

const ContactSection = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@zeeshanahmad.dev",
      link: "mailto:hello@zeeshanahmad.dev",
      description: "Best way to reach me for opportunities and collaborations"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "linkedin.com/in/zeeshanahmad2",
      link: "https://www.linkedin.com/in/zeeshanahmad2/",
      description: "Connect with me professionally"
    },
    {
      icon: Github,
      title: "GitHub",
      value: "github.com/zeeshan1112",
      link: "https://github.com/zeeshan1112",
      description: "Explore my open source contributions"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Bangalore, India",
      description: "Available for remote and hybrid opportunities globally"
    }
  ];

  const handleDownloadResume = () => {
    window.open('/resume/resume.pdf', '_blank');
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Add padding to account for fixed header */}
      <div className="pt-20">
        {/* Parallax Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-44 h-44 bg-primary/5 rounded-full blur-2xl parallax-medium"></div>
          <div className="absolute bottom-20 right-10 w-56 h-56 bg-secondary/5 rounded-full blur-2xl parallax-slow"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-accent">
            Let's Connect & Collaborate
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to discuss opportunities, collaborations, or just have a conversation about 
            technology and innovation? I'd love to hear from you.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((contact, index) => (
            <Card key={index} className="portfolio-card p-6 text-center group">
              <div className="relative z-10">
                <contact.icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{contact.title}</h3>
                {contact.link ? (
                  <a 
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-glow transition-colors duration-300 font-medium block mb-2"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <p className="text-foreground font-medium mb-2">{contact.value}</p>
                )}
                <p className="text-sm text-muted-foreground">{contact.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action Section */}
        <Card className="portfolio-card p-12 text-center">
          <div className="max-w-3xl mx-auto relative z-10">
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Ready to Work Together?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Whether you're looking for a technical leader to drive AI innovation, 
              a full-stack engineer to build scalable solutions, or a collaborator 
              for your next big idea, I'm always excited to explore new opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                className="btn-hero text-lg px-8 py-4"
                asChild
              >
                <a href="mailto:hello@zeeshanahmad.dev">
                  <Mail className="w-5 h-5 mr-3" />
                  Send Me an Email
                </a>
              </Button>
              
              <Button
                variant="outline"
                className="btn-outline-glow text-lg px-8 py-4"
                onClick={handleDownloadResume}
              >
                <Download className="w-5 h-5 mr-3" />
                Download Resume
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Current Status:</strong> Open to new opportunities • 
                <strong className="text-foreground ml-4">Response Time:</strong> Usually within 24 hours • 
                <strong className="text-foreground ml-4">Location:</strong> Bangalore, India (Remote-friendly)
              </p>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-border">
          <p className="text-muted-foreground mb-4">
            © 2025 Zeeshan Ahmad. Crafted with passion and precision.
          </p>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://www.linkedin.com/in/zeeshanahmad2/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com/zeeshan1112" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="mailto:hello@zeeshanahmad.dev"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;