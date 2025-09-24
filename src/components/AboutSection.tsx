import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, BookOpen, Code, Zap } from 'lucide-react';

const AboutSection = () => {
  const achievements = [
    {
      icon: Award,
      title: "VP Award Winner",
      description: "Recognized with VP Award at SAP for exceptional contributions to Translation Service feature"
    },
    {
      icon: Zap,
      title: "5/5 Performance Rating",
      description: "Consistently awarded top performance rating for sustained excellence at Oracle (2023, 2024, 2025)"
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
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-accent">
            Innovative Leader & Full-Stack Engineer
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A seasoned technology professional with a passion for building intelligent systems that 
            bridge the gap between complex AI capabilities and real-world business solutions.
          </p>
        </div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              10+ Years of Technical Excellence
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              As a Principal Member of Technical Staff at Oracle with over 10 years of experience, 
              I specialize in architecting and developing AI-driven solutions that solve complex business problems. 
              My journey spans from building scalable cloud-based systems to pioneering the integration of 
              advanced AI technologies in enterprise software.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Currently pursuing a Master's degree in Computer Science with specialization in Artificial Intelligence 
              at Georgia Institute of Technology, I'm deepening my expertise in cutting-edge AI and NLP technologies. 
              My work has been recognized with prestigious awards and my personal projects have garnered significant adoption.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I believe in the power of intelligent software to transform industries and am committed to 
              building solutions that are not just technically sound, but truly impactful.
            </p>
          </div>

          {/* Achievements Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="portfolio-card p-6 text-center group">
                <achievement.icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="font-semibold text-foreground mb-2">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="text-center">
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
        </div>
      </div>
    </section>
  );
};

export default AboutSection;