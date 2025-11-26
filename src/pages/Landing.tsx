import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { ArrowRight, Briefcase, GraduationCap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import logo from '@/assets/logo.png';
import StarField from '@/components/StarField';

const Landing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse movement
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Calculate normalized position (-0.5 to 0.5)
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // 3D Tilt transforms for text
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  // Staggered Text Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background text-foreground overflow-x-hidden pb-32 perspective-1000 transition-colors duration-300">
      {/* StarField Background */}
      <StarField />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Hero Content with 3D Tilt */}
        <motion.div
          style={{
            y,
            opacity,
            scale
          }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-8"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="transform-gpu"
          >
            <motion.h2 variants={itemVariants} className="text-sm md:text-base font-medium tracking-[0.5em] text-muted-foreground uppercase mb-6 drop-shadow-sm">
              Welcome to my digital space
            </motion.h2>

            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 relative">
              <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary blur-2xl opacity-20 animate-pulse">
                Zeeshan Ahmad
              </span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x">
                Zeeshan Ahmad
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed font-light tracking-wide">
              Crafting sophisticated digital experiences where design meets logic.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs tracking-widest uppercase">Explore</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </section>

      {/* Brief About Section */}
      <section className="py-32 relative z-10 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Image Column */}
              <div className="relative group perspective-1000">
                <motion.div
                  style={{ rotateX: useTransform(springY, [-0.5, 0.5], [5, -5]), rotateY: useTransform(springX, [-0.5, 0.5], [-5, 5]) }}
                  className="relative rounded-3xl overflow-hidden border border-border/50 shadow-2xl transform-gpu"
                >
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-overlay" />
                  <img
                    src={logo}
                    alt="Zeeshan Ahmad"
                    className="w-full h-auto object-cover transition-all duration-700"
                  />
                </motion.div>
              </div>

              {/* Content Column */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
                    About <span className="text-primary">Me</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    I'm a passionate technologist with a deep love for building intelligent systems.
                    My journey is defined by a constant pursuit of innovation and excellence in software engineering.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-foreground">Current Role</h3>
                      <p className="text-muted-foreground">Principal Member of Technical Staff at Oracle</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <GraduationCap className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-foreground">Education</h3>
                      <p className="text-muted-foreground">MS in CS (AI Specialization) at Georgia Tech</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                      <Target className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-foreground">Focus Area</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">Artificial Intelligence</Badge>
                        <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">Full-Stack Dev</Badge>
                        <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">Cloud Architecture</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link to="/resume" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors group">
                    <span className="text-lg font-medium border-b border-primary/30 group-hover:border-primary transition-colors">Read full bio</span>
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
