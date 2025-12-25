import { ShoppingBag, MessageCircle, ArrowRight } from "lucide-react";
import heroImage from "@/assets/paintings.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden texture-paper">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10" />
      
      {/* Floating decorative shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-32 right-20 w-48 h-48 bg-secondary/20 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-float" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-up">
            <div className="inline-block">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium font-body">
                ✨ Handcrafted with Love
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground leading-tight">
              Handmade Stories,{" "}
              <span className="text-gradient">Crafted with Love</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-body max-w-xl mx-auto lg:mx-0">
              Discover unique paintings, clay miniatures, paper crafts, and wooden art — 
              each piece tells a story, made just for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#shop"
                className="btn-hero group"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Handmade Creations
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 rounded-3xl blur-xl" />
              
              <div className="relative bg-card rounded-3xl overflow-hidden shadow-float border-4 border-card">
                <img
                  src={heroImage}
                  alt="Beautiful handmade painting artwork"
                  className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                />
                
                {/* Overlay badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-soft">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🎨</span>
                      </div>
                      <div>
                        <p className="font-heading text-2xl text-foreground">Original Artwork</p>
                        <p className="text-sm text-muted-foreground font-body">Hand-painted with passion</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
