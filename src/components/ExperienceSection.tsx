import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, GraduationCap, Award, BookOpen } from 'lucide-react';

const ExperienceSection = () => {
  const experience = [
    {
      company: "Oracle India",
      role: "Principal Member of Technical Staff",
      period: "January 2021 - Present",
      location: "Bangalore, India",
      logo: Building,
      highlights: [
        "Led core team in developing AI-powered dataflow assistant from scratch using advanced prompt engineering and NLP",
        "Engineered novel Python-based approach for LLM communication, reducing token size and eliminating syntax bleeding",
        "Implemented chain-of-thought reasoning and guardrails approach using diagnostic LLM API calls",
        "Developed sophisticated test framework for AI response validation and LLM benchmarking",
        "Created custom consistency check feature for semantic models using JSONPath queries",
        "Improved Global Search performance by 80% through dynamic child node fetching"
      ],
      products: ["Oracle Analytics Cloud", "Dataflows", "Semantic Model"],
      achievements: ["5/5 Star Performance Rating (2023, 2024, 2025)"]
    },
    {
      company: "SAP Labs India",
      role: "Developer → Senior Developer",
      period: "August 2015 - January 2021",
      location: "Bangalore, India",
      logo: Building,
      highlights: [
        "Led team of 2 developers to build end-to-end Translation Service UI using Node.js and SAP UI5",
        "Contributed to Cloud Native Spring Boot Translation Microservice on SAP Cloud Foundry",
        "Integrated Translation Service with GitHub V3 REST API for automated translation processes",
        "Developed robust Unit test framework with Karma and Jasmine achieving 85%+ code coverage",
        "Presented Translation component at industry conferences including SAP TechEd and SAP dKom"
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
      logo: GraduationCap,
      coursework: [
        "Artificial Intelligence", "Natural Language Processing", "Knowledge-Based AI", 
        "Robotics: AI Techniques", "Game AI", "AI Ethics and Society",
        "Software Dev Process", "Data Analytics & Security"
      ]
    },
    {
      institution: "Ramaiah Institute of Technology",
      degree: "Bachelor of Engineering - Computer Science",
      period: "2011 - 2015",
      location: "Bangalore, India",
      logo: GraduationCap
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

  return (
    <section id="experience" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Add padding to account for fixed header */}
      <div className="pt-20">
        {/* Parallax Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-40 left-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl parallax-medium"></div>
          <div className="absolute bottom-40 right-20 w-48 h-48 bg-secondary/5 rounded-full blur-2xl parallax-slow"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-accent">
            Professional Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A decade-long progression through leading technology companies, 
            driving innovation and excellence in enterprise software development.
          </p>
        </div>

        {/* Professional Experience */}
        <div className="mb-20">
          <h3 className="text-3xl font-semibold text-foreground mb-12 flex items-center">
            <Building className="w-8 h-8 text-primary mr-3" />
            Professional Experience
          </h3>
          
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <Card key={index} className="portfolio-card p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="lg:w-2/3">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-2xl font-bold text-foreground mb-2">{exp.role}</h4>
                        <p className="text-xl text-primary font-semibold mb-1">{exp.company}</p>
                        <p className="text-muted-foreground">{exp.period}</p>
                      </div>
                      <exp.logo className="w-12 h-12 text-primary flex-shrink-0" />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-foreground mb-2">Key Products:</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.products.map((product, idx) => (
                            <Badge key={idx} variant="secondary">{product}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold text-foreground mb-3">Key Achievements:</p>
                        <ul className="space-y-2">
                          {exp.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-2 h-2 bg-primary rounded-full mt-3 mr-3 flex-shrink-0"></div>
                              <span className="text-muted-foreground">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {exp.achievements && (
                        <div className="pt-4 border-t border-border">
                          <p className="font-semibold text-foreground mb-2">Recognition:</p>
                          <div className="flex flex-wrap gap-2">
                            {exp.achievements.map((achievement, idx) => (
                              <Badge key={idx} className="bg-primary/20 text-primary border-primary/30">
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
        </div>

        {/* Education */}
        <div className="mb-20">
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
        </div>

        {/* Publications & Awards */}
        <div>
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
        </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;