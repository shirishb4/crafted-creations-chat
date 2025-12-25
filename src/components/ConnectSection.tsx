import { MessageCircle, Send, Instagram, Facebook } from "lucide-react";

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
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Header */}
          <span className="px-4 py-2 bg-secondary/30 text-secondary-foreground rounded-full text-sm font-medium font-body inline-block">
            💬 Let's Connect
          </span>
          
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground">
            Love Something You See?
          </h2>
          
          <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
            Chat with me or message directly — I'd love to create something special for you. 
            Custom orders are always welcome! ✨
          </p>
          
          {/* Social Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`card-artisan p-6 ${social.color} transition-all duration-300 hover:scale-105`}
              >
                <social.icon className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-heading text-xl font-bold">{social.name}</h3>
                <p className="text-sm opacity-70 font-body mt-1">{social.description}</p>
              </a>
            ))}
          </div>
          
          {/* Main CTA */}
          <div className="pt-8">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero inline-flex"
            >
              <MessageCircle className="w-5 h-5" />
              Start a Conversation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
