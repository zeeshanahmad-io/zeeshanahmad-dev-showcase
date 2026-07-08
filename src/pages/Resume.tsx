import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, GraduationCap, Award, BookOpen, Download, Zap, Code } from 'lucide-react';
import { motion } from 'framer-motion';

import oracleLogo from '@/assets/icons/oracle-logo.webp';
import sapLogo from '@/assets/icons/sap-logo.webp';
import gatechLogo from '@/assets/icons/gatech-logo.webp';
import ritLogo from '@/assets/icons/rit-logo.webp';

// Company and University Logos
const OracleLogo = ({ className }: { className?: string }) => (
    <img src={oracleLogo} alt="Oracle Logo" className={className || "w-20 h-auto"} />
);

const SAPLogo = ({ className }: { className?: string }) => (
    <img src={sapLogo} alt="SAP Logo" className={className || "w-16 h-auto"} />
);

const GeorgiaTechLogo = ({ className }: { className?: string }) => (
    <img src={gatechLogo} alt="Georgia Tech Logo" className={className || "w-10 h-10"} />
);

const RamaiahLogo = ({ className }: { className?: string }) => (
    <img src={ritLogo} alt="Ramaiah Institute of Technology Logo" className={className || "w-10 h-10"} />
);

const Resume = () => {
    const experience = [
        {
            company: "Oracle India",
            period: "January 2021 - Present",
            location: "Bangalore, India",
            logo: OracleLogo,
            roles: [
                {
                    title: "Principal Platform Software Engineer",
                    period: "September 2023 - Present",
                    highlights: [
                        "LangGraph Workflow Orchestration: Built a stateful orchestration layer for Oracle Analytics semantic modeling, translating user requests into phased execution plans and routing them across specialized subagents with checkpointed state, human-in-the-loop (HITL) interrupts, and retry/replan control flow.",
                        "Codex Plugin & Agent Runtime: Built a Codex plugin for Oracle Analytics with MCP-based tools and hooks, enabling natural-language-driven semantic-model workflows with execution guardrails, validation, and more reliable agent behavior.",
                        "AI Dataflow Assistant: Led development of an AI assistant from the ground up that enabled users to author Oracle Analytics dataflows using natural language.",
                        "LLM Context & Response Optimization: Engineered a Python-based communication layer and Python-like intermediate representation for complex dataflow state, reducing token usage and improving response quality for multi-step workflow generation.",
                        "AI Evaluation & Reliability: Built evaluation workflows and benchmarking harnesses to detect prompt regressions and validate response quality across paraphrased and multi-step user requests."
                    ]
                },
                {
                    title: "Senior Member of Technical Staff",
                    period: "January 2021 - August 2023",
                    highlights: [
                        "Core Architecture Modernization: Overhauled the Semantic Modeler joins architecture and integrated Lucene-based search, significantly improving workspace object discovery and developer productivity.",
                        "Scalable Undo/Redo & Selective Indexing: Designed a Git-backed undo/redo framework for Semantic Modeler with selective Lucene reindexing, reducing memory pressure and avoiding full-workspace restore costs.",
                        "Performance & Engineering Rigor: Improved semantic-model responsiveness through targeted data-fetching optimizations and established a reusable JUnit test framework adopted across the team."
                    ]
                }
            ],
            products: ["Oracle Analytics Cloud", "Dataflows", "Semantic Model"],
            achievements: ["Consistently recognized as a Top Tier Performer with the highest annual performance rating (2023–2025)."]
        },
        {
            company: "SAP Labs India",
            period: "August 2015 - January 2021",
            location: "Bangalore, India",
            logo: SAPLogo,
            roles: [
                {
                    title: "Developer → Associate Developer",
                    period: "August 2015 - January 2021",
                    highlights: [
                        "SaaS Product Engineering: Directed the full UI lifecycle for the Cloud Translation Service using Node.js and SAP UI5.",
                        "Distributed Systems: Developed resilient Java Spring Boot microservices deployed on SAP Cloud Foundry.",
                        "Technical Leadership: Served as the primary technical lead for global customer escalations, resolving critical root causes for Fortune 500 clients."
                    ]
                }
            ],
            products: ["SAP Analytics Cloud", "SAP Lumira Discovery"],
            achievements: ["VP Award for Translation Service contributions"]
        }
    ];

    const education = [
        {
            institution: "Georgia Institute of Technology",
            degree: "Master of Science - Computer Science",
            period: "2023 - 2025",
            specialization: "Artificial Intelligence",
            logo: GeorgiaTechLogo,
            coursework: [
                "Artificial Intelligence", "Natural Language Processing", "Knowledge-Based AI",
                "Robotics: AI Techniques", "Game AI", "AI Ethics and Society",
                "Software Dev Process", "Data Analytics & Security",
                "Intro to Cognitive Science", "Global Entrepreneurship"
            ]
        },
        {
            institution: "Ramaiah Institute of Technology",
            degree: "Bachelor of Engineering - Computer Science",
            period: "2011 - 2015",
            location: "Bangalore, India",
            logo: RamaiahLogo
        }
    ];

    const publications = [
        {
            title: "Big Data Analytics - Tools and Technology for Effective Planning",
            type: "Book Co-Author",
            publisher: "CRC Press - Taylor & Francis Group",
            date: "October 30, 2017",
            icon: BookOpen,
            description: "Explores various aspects of big data analytics, including tools, technology, applications, use cases, and research directions with contributions from renowned universities and organizations."
        }
    ];

    const achievements_list = [
        {
            icon: Award,
            title: "VP Award Winner",
            description: "Recognized with VP Award at SAP for exceptional contributions to Translation Service feature"
        },
        {
            icon: Zap,
            title: "Highest Performance Rating",
            description: "Consistently recognized as a Top Tier Performer with the highest annual performance rating (2023–2025)."
        },
        {
            icon: BookOpen,
            title: "Published Author",
            description: "Co-authored 'Big Data Analytics - Tools and Technology for Effective Planning' by CRC Press"
        },
        {
            icon: Code,
            title: "AI Innovation Leader",
            description: "Led development of AI-powered dataflow assistant using advanced prompt engineering and LLMs"
        }
    ];

    const skills = [
        "Full-Stack Development", "Artificial Intelligence", "Machine Learning", "Natural Language Processing",
        "Python", "JavaScript", "TypeScript", "React", "Node.js", "Cloud Architecture",
        "Prompt Engineering", "LLMs", "Oracle Analytics Cloud", "SAP Analytics", "Microservices"
    ];

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-6">

                {/* Header & Download */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6"
                >
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-accent">
                            Resume
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">
                            Innovative Leader & Full-Stack Engineer with over a decade of experience.
                        </p>
                    </div>
                    <Button
                        size="lg"
                        className="btn-hero"
                        onClick={() => window.open('/resume/Zeeshan%20Ahmad%20%E2%80%94%20Principal%20AI%20Engineer%20Resume.pdf', '_blank')}
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Download PDF
                    </Button>
                </motion.div>

                {/* About / Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-20"
                >
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold text-foreground mb-4">
                                Professional Summary
                            </h3>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                As a Principal Platform Software Engineer at Oracle with over 10 years of experience, 
                                I architect and build enterprise AI solutions, stateful multi-agent workflows, and LLM-powered platform capabilities. 
                                My journey spans from building scalable distributed cloud architectures to pioneering the integration of 
                                advanced agentic systems in business applications.
                            </p>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                I hold a Master's degree in Computer Science with an Artificial Intelligence specialization 
                                from the Georgia Institute of Technology, graduated with a perfect 4.0 / 4.0 GPA. My academic and 
                                applied engineering research focuses on advanced NLP, knowledge-based AI, and autonomous agent orchestration.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {achievements_list.map((achievement, index) => (
                                <Card key={index} className="portfolio-card p-6 text-center group">
                                    <achievement.icon className="w-10 h-10 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                                    <h4 className="font-semibold text-foreground mb-1">{achievement.title}</h4>
                                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Skills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-20 text-center"
                >
                    <h3 className="text-2xl font-semibold text-foreground mb-8">
                        Core Technologies & Expertise
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                        {skills.map((skill, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="px-4 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-300 cursor-default"
                            >
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </motion.div>

                {/* Experience */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-20"
                >
                    <h3 className="text-3xl font-semibold text-foreground mb-12 flex items-center">
                        <Building className="w-8 h-8 text-primary mr-3" />
                        Professional Experience
                    </h3>

                    <div className="space-y-8">
                        {experience.map((exp, index) => (
                            <Card key={index} className="portfolio-card p-8">
                                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                    <div className="lg:w-full">
                                        {/* Company Header */}
                                        <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
                                            <div>
                                                <p className="text-2xl text-primary font-bold">{exp.company}</p>
                                                <p className="text-muted-foreground text-sm">{exp.location} &bull; {exp.period}</p>
                                            </div>
                                            <exp.logo className="w-16 h-auto text-primary flex-shrink-0" />
                                        </div>

                                        {/* Nested Roles list */}
                                        <div className="space-y-8">
                                            {exp.roles.map((role, rIdx) => (
                                                <div key={rIdx} className="relative pl-6 border-l border-primary/20 last:border-l-transparent">
                                                    {/* Timeline node */}
                                                    <div className="absolute -left-[5px] top-1.5 w-[10px] h-[10px] rounded-full bg-primary" />
                                                    
                                                    <div className="mb-3">
                                                        <h4 className="text-xl font-bold text-foreground">{role.title}</h4>
                                                        <p className="text-sm text-muted-foreground">{role.period}</p>
                                                    </div>

                                                    <ul className="space-y-2">
                                                        {role.highlights.map((highlight, idx) => (
                                                            <li key={idx} className="flex items-start">
                                                                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                                <span className="text-muted-foreground text-sm">{highlight}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Products and Achievements */}
                                        <div className="mt-6 pt-4 border-t border-border space-y-4">
                                            <div>
                                                <p className="font-semibold text-foreground text-sm mb-2">Key Products:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {exp.products.map((product, idx) => (
                                                        <Badge key={idx} variant="secondary" className="text-xs">{product}</Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            {exp.achievements && (
                                                <div>
                                                    <p className="font-semibold text-foreground text-sm mb-2">Recognition:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {exp.achievements.map((achievement, idx) => (
                                                            <Badge key={idx} className="bg-primary/20 text-primary border-primary/30 text-xs">
                                                                <Award className="w-3 h-3 mr-1" />
                                                                {achievement}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </motion.div>

                {/* Education */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mb-20"
                >
                    <h3 className="text-3xl font-semibold text-foreground mb-12 flex items-center">
                        <GraduationCap className="w-8 h-8 text-primary mr-3" />
                        Education
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8">
                        {education.map((edu, index) => (
                            <Card key={index} className="portfolio-card p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h4 className="text-xl font-bold text-foreground mb-2">{edu.degree}</h4>
                                        <p className="text-lg text-primary font-semibold mb-1">{edu.institution}</p>
                                        <p className="text-muted-foreground">{edu.period}</p>
                                        {edu.specialization && (
                                            <Badge className="mt-2 bg-secondary/20 text-secondary border-secondary/30">
                                                Specialization: {edu.specialization}
                                            </Badge>
                                        )}
                                    </div>
                                    <edu.logo className="w-10 h-10 text-primary flex-shrink-0" />
                                </div>

                                {edu.coursework && (
                                    <div className="mt-4">
                                        <p className="font-semibold text-foreground mb-3">Relevant Coursework:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {edu.coursework.map((course, idx) => (
                                                <Badge key={idx} variant="outline" className="text-xs">
                                                    {course}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                </motion.div>

                {/* Publications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <h3 className="text-3xl font-semibold text-foreground mb-12 flex items-center">
                        <BookOpen className="w-8 h-8 text-primary mr-3" />
                        Publications & Awards
                    </h3>

                    {publications.map((pub, index) => (
                        <Card key={index} className="portfolio-card p-8">
                            <div className="flex items-start gap-6">
                                <pub.icon className="w-12 h-12 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-2xl font-bold text-foreground mb-2">{pub.title}</h4>
                                    <div className="flex flex-wrap gap-4 mb-3">
                                        <Badge className="bg-primary/20 text-primary border-primary/30">{pub.type}</Badge>
                                        <span className="text-muted-foreground">{pub.publisher}</span>
                                        <span className="text-muted-foreground">{pub.date}</span>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">{pub.description}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Resume;
