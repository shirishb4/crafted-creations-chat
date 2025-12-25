import { Heart, Instagram, Facebook, MessageCircle, Send } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/#shop" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/#about" },
    { name: "Connect", href: "/#connect" },
  ];

  const socialLinks = [
    { icon: MessageCircle, href: "https://wa.me/1234567890", label: "WhatsApp" },
    { icon: Send, href: "https://t.me/yourusername", label: "Telegram" },
    { icon: Instagram, href: "https://instagram.com/yourusername", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/yourusername", label: "Facebook" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-3xl font-heading font-bold text-gradient">
              Handmade Stories
            </h3>
            <p className="text-muted-foreground font-body">
              Unique creations crafted with love, passion, and endless imagination. 
              Every piece tells a story.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-heading font-bold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground font-body hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter hint */}
          <div className="space-y-4">
            <h4 className="text-xl font-heading font-bold text-foreground">Stay Updated</h4>
            <p className="text-muted-foreground font-body">
              Follow us on social media to see the latest creations and special offers!
            </p>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold font-body hover:underline"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground font-body flex items-center gap-1">
            © {currentYear} Handmade Stories. Made with <Heart className="w-4 h-4 text-rose fill-rose" /> and creativity
          </p>
          <p className="text-sm text-muted-foreground font-body">
            Every creation is unique and handmade
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
