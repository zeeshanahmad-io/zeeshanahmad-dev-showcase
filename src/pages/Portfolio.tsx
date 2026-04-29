import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Download } from 'lucide-react';
import { motion } from 'framer-motion';

// Import project images
import keepMacAwakeImg from '@/assets/keepmacawake-preview.webp';
import drFaiyazImg from '@/assets/drfaiyaz-preview.webp';
import docScaleImg from '@/assets/docscale-preview.webp';
import dineViewImg from '@/assets/dineview-preview.webp';
import birthdayReminderImg from '@/assets/birthday-reminder-preview.webp';

const Portfolio = () => {
    const projects = [
        {
            title: "DocScale",
            description: "Architected a scalable multi-tenant platform using Next.js and Supabase. Integrated Clerk for enterprise auth and automated provisioning workflows via Edge Functions.",
            image: docScaleImg,
            tags: ["React", "TypeScript", "Tailwind CSS", "Markdown", "Healthcare Platform"],
            links: {
                live: "https://docscale.in",
                github: "https://github.com/zeeshanahmad-io/docscale"
            },
            status: "Live"
        },
        {
            title: "KeepMacAwake",
            description: "Designed and deployed a native Python-based utility to manage system power states, successfully acquiring over 100+ active users.",
            image: keepMacAwakeImg,
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
            image: drFaiyazImg,
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
            image: birthdayReminderImg,
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
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-accent">
                        Featured Projects
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        A showcase of innovative solutions spanning native applications, healthcare platforms,
                        SaaS products, and intelligent automation tools.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="portfolio-card overflow-hidden group h-full flex flex-col">
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

                                <div className="p-6 space-y-4 relative z-10 flex-grow flex flex-col">
                                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-muted-foreground leading-relaxed flex-grow">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.tags.map((tag, tagIndex) => (
                                            <Badge key={tagIndex} variant="outline" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-3 pt-4 mt-auto">
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

                                        {project.links.github && project.links.github !== "#" && (
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
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
