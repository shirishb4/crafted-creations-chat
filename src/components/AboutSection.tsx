import { Heart, Sparkles, Palette } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-muted/30 texture-paper">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="card-artisan aspect-square bg-primary/10 flex items-center justify-center">
                  <Palette className="w-16 h-16 text-primary" />
                </div>
                <div className="card-artisan aspect-[4/3] bg-secondary/10 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-secondary-foreground" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="card-artisan aspect-[4/3] bg-accent/10 flex items-center justify-center">
                  <Heart className="w-12 h-12 text-rose" />
                </div>
                <div className="card-artisan aspect-square bg-lavender/30 flex items-center justify-center">
                  <span className="text-5xl">✂️</span>
                </div>
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl p-6 shadow-float border border-border">
              <div className="text-center">
                <span className="text-4xl font-heading text-primary">10+</span>
                <p className="text-sm text-muted-foreground font-body">Years of Crafting</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-secondary/30 text-secondary-foreground rounded-full text-sm font-medium font-body">
                About the Creator
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground">
              Where Creativity Meets{" "}
              <span className="text-gradient">Passion</span>
            </h2>
            
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
            
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <span className="text-3xl font-heading text-primary">500+</span>
                <p className="text-sm text-muted-foreground font-body mt-1">Creations Made</p>
              </div>
              <div className="text-center">
                <span className="text-3xl font-heading text-secondary-foreground">200+</span>
                <p className="text-sm text-muted-foreground font-body mt-1">Happy Customers</p>
              </div>
              <div className="text-center">
                <span className="text-3xl font-heading text-rose">100%</span>
                <p className="text-sm text-muted-foreground font-body mt-1">Handmade Love</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
