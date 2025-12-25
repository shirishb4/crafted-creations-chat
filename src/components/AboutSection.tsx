import { motion } from "framer-motion";
import { Heart, Sparkles, Palette } from "lucide-react";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/lib/animations";

const AboutSection = () => {
  const stats = [
    { value: "500+", label: "Creations Made", color: "text-primary" },
    { value: "200+", label: "Happy Customers", color: "text-secondary-foreground" },
    { value: "100%", label: "Handmade Love", color: "text-rose" },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-muted/30 texture-paper">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image collage */}
          <ScrollReveal direction="left">
            <div className="relative">
              <StaggerChildren className="grid grid-cols-2 gap-4" staggerDelay={0.15}>
                <div className="space-y-4">
                  <StaggerItem>
                    <motion.div 
                      className="card-artisan aspect-square bg-primary/10 flex items-center justify-center"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Palette className="w-16 h-16 text-primary" />
                    </motion.div>
                  </StaggerItem>
                  <StaggerItem>
                    <motion.div 
                      className="card-artisan aspect-[4/3] bg-secondary/10 flex items-center justify-center"
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sparkles className="w-12 h-12 text-secondary-foreground" />
                    </motion.div>
                  </StaggerItem>
                </div>
                <div className="space-y-4 pt-8">
                  <StaggerItem>
                    <motion.div 
                      className="card-artisan aspect-[4/3] bg-accent/10 flex items-center justify-center"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart className="w-12 h-12 text-rose" />
                    </motion.div>
                  </StaggerItem>
                  <StaggerItem>
                    <motion.div 
                      className="card-artisan aspect-square bg-lavender/30 flex items-center justify-center"
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-5xl">✂️</span>
                    </motion.div>
                  </StaggerItem>
                </div>
              </StaggerChildren>
              
              {/* Floating badge */}
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-card rounded-2xl p-6 shadow-float border border-border"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-center">
                  <motion.span 
                    className="text-4xl font-heading text-primary"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    10+
                  </motion.span>
                  <p className="text-sm text-muted-foreground font-body">Years of Crafting</p>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
          
          {/* Content */}
          <div className="space-y-8">
            <ScrollReveal>
              <div className="inline-block">
                <span className="px-4 py-2 bg-secondary/30 text-secondary-foreground rounded-full text-sm font-medium font-body">
                  About the Creator
                </span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground">
                Where Creativity Meets{" "}
                <span className="text-gradient">Passion</span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="space-y-4 text-muted-foreground font-body text-lg">
                <p>
                  Hello! I'm an artist who believes that every creation tells a story. 
                  From the soft strokes of a painting to the delicate curves of clay miniatures, 
                  each piece carries a piece of my heart.
                </p>
                <p>
                  My journey began in a small corner of my home, surrounded by colors, 
                  papers, and endless imagination. Today, I create unique handmade treasures 
                  that bring joy to homes around the world.
                </p>
              </div>
            </ScrollReveal>
            
            <StaggerChildren className="grid grid-cols-3 gap-6 pt-6" staggerDelay={0.1}>
              {stats.map((stat, index) => (
                <StaggerItem key={index}>
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className={`text-3xl font-heading ${stat.color}`}>{stat.value}</span>
                    <p className="text-sm text-muted-foreground font-body mt-1">{stat.label}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
