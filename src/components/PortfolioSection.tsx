import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Download } from 'lucide-react';

// Import project images
import keepMacAwakeImg from '@/assets/keepmacawake-preview.jpg';
import drFaiyazImg from '@/assets/drfaiyaz-preview.jpg';
import docScaleImg from '@/assets/docscale-preview.jpg';
import dineViewImg from '@/assets/dineview-preview.jpg';
import birthdayReminderImg from '@/assets/birthday-reminder-preview.jpg';

const PortfolioSection = () => {
  const projects = [
    {
      title: "KeepMacAwake",
      description: "Engineered and launched a native macOS application that prevents a Mac from going to sleep. Built with Python and packaged as a downloadable .dmg file, showcasing skills in native desktop application development.",
      image: keepMacAwakeImg,
      tags: ["Python", "macOS", "Desktop App", "Native Development"],
      links: {
        live: "https://keepmacawake.netlify.app/",
        github: "#",
        download: "#"
      },
      status: "Live"
    },
    {
      title: "Dr. Faiyaz Ahmad Clinic",
      description: "Architected and developed a full-stack, responsive web presence for a neurology clinic using React, TypeScript, and Tailwind CSS. Features online appointment booking and professional email integration with Zoho Mail, with CI/CD enabled via Netlify.",
      image: drFaiyazImg,
      tags: ["React", "TypeScript", "Tailwind CSS", "Netlify", "Healthcare"],
      links: {
        live: "https://drfaiyazahmad.com",
        github: "#"
      },
      status: "Live"
    },
    {
      title: "DocScale",
      description: "Developed a front-end business platform for the digital growth of doctors. This service showcases expertise in building powerful online platforms for the healthcare industry. Features an integrated blog for thought leadership that reads and publishes from markdown files.",
      image: docScaleImg,
      tags: ["React", "TypeScript", "Tailwind CSS", "Markdown", "Healthcare Platform"],
      links: {
        live: "https://docscale.in",
        github: "#"
      },
      status: "Live"
    },
    {
      title: "DineView SaaS Platform",
      description: "Currently building a modern, multi-tenant SaaS platform for the restaurant industry. Built with a scalable stack including Next.js, TypeScript, and Clerk for authentication, and MongoDB Atlas for the database. Features a public marketing site and a secure Super Admin Dashboard for tenant onboarding.",
      image: dineViewImg,
      tags: ["Next.js", "TypeScript", "Clerk Auth", "MongoDB", "SaaS", "Multi-tenant"],
      links: {
        live: "https://dineview.in",
        github: "#"
      },
      status: "In Development"
    },
    {
      title: "Birthday Reminder Pro",
      description: "An intelligent iPhone shortcut that has garnered over 114 downloads by providing automated and accurate birthday reminders from contacts. The utility uses 'year-agnostic' logic to ensure timely notifications, showcasing problem-solving beyond traditional development.",
      image: birthdayReminderImg,
      tags: ["iOS Shortcuts", "Automation", "Mobile", "Problem Solving"],
      links: {
        download: "https://routinehub.co/shortcut/22480/"
      },
      status: "Live",
      downloads: "114+"
    }
  ];

  const getStatusBadge = (status: string) => {
    if (status === "Live") {
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Live</Badge>;
    } else if (status === "In Development") {
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">In Development</Badge>;
    }
    return <Badge variant="secondary">{status}</Badge>;
  };

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-accent">
            Featured Projects & Ventures
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of innovative solutions spanning native applications, healthcare platforms, 
            SaaS products, and intelligent automation tools.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="portfolio-card overflow-hidden group">
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {getStatusBadge(project.status)}
                  {project.downloads && (
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {project.downloads} Downloads
                    </Badge>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4">
                  {project.links.live && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="btn-outline-glow"
                      asChild
                    >
                      <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Site
                      </a>
                    </Button>
                  )}
                  
                  {project.links.github && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="btn-outline-glow"
                      asChild
                    >
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  
                  {project.links.download && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="btn-outline-glow"
                      asChild
                    >
                      <a href={project.links.download} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Interested in collaborating or learning more about these projects?
          </p>
          <Button 
            className="btn-hero"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Let's Connect
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;