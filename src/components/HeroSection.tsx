import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingBag, MessageCircle, ArrowRight } from "lucide-react";
import { useRef } from "react";
import heroImage from "@/assets/paintings.jpg";
import { ScrollReveal, Floating } from "@/lib/animations";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden texture-paper"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10" />
      
      {/* Floating decorative shapes */}
      <Floating duration={6} distance={30} className="absolute top-20 left-10">
        <div className="w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
      </Floating>
      <Floating duration={8} distance={25} className="absolute bottom-32 right-20">
        <div className="w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />
      </Floating>
      <Floating duration={7} distance={20} className="absolute top-1/3 right-1/4">
        <div className="w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
      </Floating>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            style={{ y: textY, opacity }}
            className="text-center lg:text-left space-y-8"
          >
            <ScrollReveal delay={0.1}>
              <div className="inline-block">
                <motion.span 
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium font-body"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  ✨ Handcrafted with Love
                </motion.span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground leading-tight">
                Handmade Stories,{" "}
                <span className="text-gradient">Crafted with Love</span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <p className="text-lg md:text-xl text-muted-foreground font-body max-w-xl mx-auto lg:mx-0">
                Discover unique paintings, clay miniatures, paper crafts, and wooden art — 
                each piece tells a story, made just for you.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.a
                  href="#shop"
                  className="btn-hero group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Shop Handmade Creations
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.a>
                
                <motion.a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </motion.a>
              </div>
            </ScrollReveal>
          </motion.div>
          
          {/* Hero Image with Parallax */}
          <ScrollReveal delay={0.3} direction="right">
            <div className="relative">
              {/* Decorative frame */}
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 rounded-3xl blur-xl"
                animate={{ 
                  scale: [1, 1.02, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <motion.div 
                className="relative bg-card rounded-3xl overflow-hidden shadow-float border-4 border-card"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  style={{ y: imageY, scale: imageScale }}
                  className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden"
                >
                  <img
                    src={heroImage}
                    alt="Beautiful handmade painting artwork"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Overlay badge */}
                <motion.div 
                  className="absolute bottom-6 left-6 right-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-soft">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <span className="text-2xl">🎨</span>
                      </motion.div>
                      <div>
                        <p className="font-heading text-2xl text-foreground">Original Artwork</p>
                        <p className="text-sm text-muted-foreground font-body">Hand-painted with passion</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div 
            className="w-1.5 h-3 bg-primary rounded-full"
            animate={{ opacity: [1, 0.5, 1], y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
