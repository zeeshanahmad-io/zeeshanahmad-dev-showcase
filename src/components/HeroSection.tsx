import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';

const HeroSection = () => {
  const handleDownloadResume = () => {
    window.open('/resume/resume.pdf', '_blank');
  };

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio') as HTMLElement;
    if (portfolioSection) {
      const headerOffset = 80;
      const elementPosition = portfolioSection.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      document.documentElement.style.setProperty('--scroll', scrolled.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background parallax-bg"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse parallax-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse parallax-medium"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main Headline */}
        <h1 className="hero-title mb-6 animate-fade-in">
          Principal Member of <br />
          <span className="text-gradient-accent">Technical Staff</span>
        </h1>
        
        {/* Subtitle */}
        <p className="hero-subtitle max-w-4xl mx-auto mb-8 animate-fade-in">
          Architecting AI & Full-Stack Solutions with 10+ Years of Experience.<br />
          Consistently delivering intelligent, scalable software that solves complex problems.
        </p>

        {/* Key Highlights */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Annually awarded the highest performance rating</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <span>VP Award Winner at SAP</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Georgia Tech MS in AI</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in">
          <Button
            onClick={handleDownloadResume}
            className="btn-hero text-lg px-8 py-4"
          >
            <Download className="w-5 h-5 mr-3" />
            Download Resume
          </Button>
          
          <Button
            onClick={scrollToPortfolio}
            variant="outline"
            className="btn-outline-glow text-lg px-8 py-4"
          >
            View My Work
            <ArrowDown className="w-5 h-5 ml-3" />
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 animate-fade-in">
          <a 
            href="https://linkedin.com/in/zeeshanahmad" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a 
            href="https://github.com/zeeshanahmad" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
          >
            <Github className="w-6 h-6" />
          </a>
          <a 
            href="mailto:hello@zeeshanahmad.dev"
            className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToPortfolio}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;