import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Download, FileText, Binary, CheckSquare, Coffee, Activity, Calendar } from 'lucide-react';

const PortfolioSection = () => {
  const projects = [
    {
      title: "DocScale",
      description: "Architected a scalable multi-tenant platform using Next.js and Supabase. Integrated Clerk for enterprise auth and automated provisioning workflows via Edge Functions.",
      icon: FileText,
      iconColor: "text-emerald-400",
      glowClass: "bg-emerald-500",
      tags: ["Next.js", "TypeScript", "Supabase", "Clerk", "Healthcare Platform"],
      links: {
        live: "https://docscale.in",
        github: "https://github.com/zeeshanahmad-io/docscale"
      },
      status: "Live"
    },
    {
      title: "ZeroWebTools",
      description: "Engineered a high-performance, 100% client-side monorepo of 50+ offline-first utility tools for PDF manipulation, image conversion, developer utilities, and startup financial modeling. Designed a custom in-memory 'micro-chaining' pipeline to compose operations locally with zero latency, zero bandwidth cost, and absolute privacy.",
      icon: Binary,
      iconColor: "text-cyan-400",
      glowClass: "bg-cyan-500",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "WebAssembly", "Monorepo"],
      links: {
        live: "https://zerowebtools.com",
        github: "https://github.com/zeeshan1112/zerowebtools"
      },
      status: "Live"
    },
    {
      title: "PleaseDo",
      description: "Designed and built a minimal, distraction-free productivity app for macOS that lives entirely in the menu bar. Engineered with Swift and SwiftUI using a glassmorphic AppKit bridge, local JSON persistence, and zero tracking, offering instant task entry and glanceable status badges.",
      icon: CheckSquare,
      iconColor: "text-purple-400",
      glowClass: "bg-purple-500",
      tags: ["Swift", "SwiftUI", "macOS App", "Native Development", "Productivity"],
      links: {
        github: "https://github.com/zeeshan1112/PleaseDo"
      },
      status: "Live"
    },
    {
      title: "KeepMacAwake",
      description: "Designed and deployed a native Python-based utility to manage system power states, successfully acquiring over 100+ active users.",
      icon: Coffee,
      iconColor: "text-amber-400",
      glowClass: "bg-amber-500",
      tags: ["Python", "macOS", "Desktop App", "Native Development"],
      links: {
        live: "https://keepmacawake.netlify.app/",
        github: "https://github.com/zeeshan1112/KeepMacAwake",
        download: "https://keepmacawake.netlify.app/download"
      },
      status: "Live"
    },
    {
      title: "Dr. Faiyaz Ahmad Clinic",
      description: "Architected and developed a full-stack, responsive web presence for a neurology clinic using React, TypeScript, and Tailwind CSS. Features online appointment booking and professional email integration with Zoho Mail, with CI/CD enabled via Netlify.",
      icon: Activity,
      iconColor: "text-indigo-400",
      glowClass: "bg-indigo-500",
      tags: ["React", "TypeScript", "Tailwind CSS", "Netlify", "Healthcare"],
      links: {
        live: "https://drfaiyazahmad.com",
        github: "https://github.com/zeeshanahmad-io/neural-care-connect"
      },
      status: "Live"
    },
    {
      title: "Birthday Reminder Pro",
      description: "Engineered an intelligent iOS automation with 150+ downloads; features year-agnostic logic for accurate contact event management.",
      icon: Calendar,
      iconColor: "text-rose-400",
      glowClass: "bg-rose-500",
      tags: ["iOS Shortcuts", "Automation", "Mobile", "Problem Solving"],
      links: {
        download: "https://routinehub.co/shortcut/22480/"
      },
      status: "Live",
      downloads: "150+"
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
    <section id="portfolio" className="py-20 relative overflow-hidden">
      {/* Add padding to account for fixed header */}
      <div className="pt-20">
        {/* Parallax Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-20 w-36 h-36 bg-primary/5 rounded-full blur-2xl parallax-slow"></div>
          <div className="absolute bottom-10 left-20 w-52 h-52 bg-secondary/5 rounded-full blur-2xl parallax-fast"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="portfolio-card overflow-hidden group flex flex-col justify-between">
                <div>
                  {/* Brand Canvas Header instead of Screenshot */}
                  <div className="relative h-48 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 flex items-center justify-center border-b border-border/40 overflow-hidden group-hover:border-border transition-colors duration-500">
                    {/* Radial Spotlight Glow */}
                    <div className={`absolute w-32 h-32 rounded-full ${project.glowClass} blur-3xl opacity-20 group-hover:opacity-40 transition-all duration-700`} />
                    
                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

                    {/* Styled Glassmorphic Logo Container */}
                    <div className="relative w-16 h-16 rounded-2xl bg-neutral-900/50 backdrop-blur-md border border-neutral-800/80 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500 transform-gpu">
                      <project.icon className={`w-8 h-8 ${project.iconColor} transition-transform duration-500 group-hover:rotate-6`} />
                    </div>

                    <div className="absolute top-4 left-4 flex gap-2 z-20">
                      {getStatusBadge(project.status)}
                      {project.downloads && (
                        <Badge className="bg-primary/20 text-primary border-primary/30">
                          {project.downloads} Downloads
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-4 relative z-10">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tags and Action Buttons pinned to bottom */}
                <div className="p-6 pt-0 space-y-4">
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-[10px] py-0 px-2 h-5">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.links.live && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="btn-outline-glow text-xs"
                        asChild
                      >
                        <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3.5 h-3.5 mr-2" />
                          Live Site
                        </a>
                      </Button>
                    )}

                    {project.links.github && project.links.github !== "#" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="btn-outline-glow text-xs"
                        asChild
                      >
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-3.5 h-3.5 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}

                    {project.links.download && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="btn-outline-glow text-xs"
                        asChild
                      >
                        <a href={project.links.download} target="_blank" rel="noopener noreferrer">
                          <Download className="w-3.5 h-3.5 mr-2" />
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
                const contactSection = document.getElementById('contact') as HTMLElement;
                if (contactSection) {
                  const headerOffset = 80;
                  const elementPosition = contactSection.offsetTop;
                  const offsetPosition = elementPosition - headerOffset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              Let's Connect
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;