import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', href: '#home', route: '/' },
    { name: 'About', href: '#about', route: '/' },
    { name: 'Experience', href: '#experience', route: '/' },
    { name: 'Portfolio', href: '#portfolio', route: '/' },
    { name: 'Blog', href: '/blog', route: '/blog' },
    { name: 'Contact', href: '#contact', route: '/' }
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href) as HTMLElement;
      if (element) {
        const headerOffset = 80; // Account for fixed header
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsOpen(false);
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.route && item.route !== '/') {
      // External route - don't scroll
      setIsOpen(false);
    } else {
      // Same page scroll
      scrollToSection(item.href);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-gradient-accent hover:opacity-80 transition-opacity">
            ZEESHAN AHMAD
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            if (item.route && item.route !== '/') {
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              );
            }
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Button 
            className="btn-hero"
            onClick={() => {
              window.open('https://example.com/zeeshan-ahmad-resume.pdf', '_blank');
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Resume
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-sm border-t border-border">
            {navItems.map((item) => {
              if (item.route && item.route !== '/') {
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                );
              }
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors font-medium w-full text-left"
                >
                  {item.name}
                </button>
              );
            })}
            <div className="px-3 py-2">
              <Button 
                className="btn-hero w-full"
                onClick={() => {
                  window.open('https://example.com/zeeshan-ahmad-resume.pdf', '_blank');
                  setIsOpen(false);
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </div>
          </div>
        </div>
      )}
      </div>
    </nav>
  );
};

export default Navigation;