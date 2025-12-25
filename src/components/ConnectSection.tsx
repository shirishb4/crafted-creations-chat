import { motion } from "framer-motion";
import { MessageCircle, Send, Instagram, Facebook } from "lucide-react";
import { ScrollReveal, StaggerChildren, StaggerItem, Floating } from "@/lib/animations";

const ConnectSection = () => {
  const socialLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me/1234567890",
      color: "bg-green-500/10 hover:bg-green-500/20 text-green-600",
      description: "Quick chat & orders",
    },
    {
      name: "Telegram",
      icon: Send,
      url: "https://t.me/yourusername",
      color: "bg-sky/20 hover:bg-sky/30 text-sky-foreground",
      description: "Updates & offers",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/yourusername",
      color: "bg-rose/10 hover:bg-rose/20 text-rose",
      description: "Latest creations",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/yourusername",
      color: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-600",
      description: "Community & reviews",
    },
  ];

  return (
    <section id="connect" className="py-24 bg-gradient-to-b from-background to-primary/5 texture-paper relative overflow-hidden">
      {/* Decorative elements */}
      <Floating duration={8} distance={40} className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
        <div className="w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      </Floating>
      <Floating duration={10} distance={30} className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2">
        <div className="w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </Floating>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Header */}
          <ScrollReveal>
            <span className="px-4 py-2 bg-secondary/30 text-secondary-foreground rounded-full text-sm font-medium font-body inline-block">
              💬 Let's Connect
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground">
              Love Something You See?
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
              Chat with me or message directly — I'd love to create something special for you. 
              Custom orders are always welcome! ✨
            </p>
          </ScrollReveal>
          
          {/* Social Links Grid */}
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8" staggerDelay={0.1}>
            {socialLinks.map((social) => (
              <StaggerItem key={social.name}>
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`card-artisan p-6 ${social.color} transition-all duration-300 block`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <social.icon className="w-8 h-8 mx-auto mb-3" />
                  </motion.div>
                  <h3 className="font-heading text-xl font-bold">{social.name}</h3>
                  <p className="text-sm opacity-70 font-body mt-1">{social.description}</p>
                </motion.a>
              </StaggerItem>
            ))}
          </StaggerChildren>
          
          {/* Main CTA */}
          <ScrollReveal delay={0.4}>
            <div className="pt-8">
              <motion.a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero inline-flex"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5" />
                Start a Conversation
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
