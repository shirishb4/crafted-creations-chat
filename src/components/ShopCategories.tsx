import { ArrowRight } from "lucide-react";
import paintingsImg from "@/assets/paintings.jpg";
import miniatureImg from "@/assets/miniature.jpg";
import paperImg from "@/assets/paper.jpg";
import bottlesImg from "@/assets/bottles.jpg";
import woodCraftsImg from "@/assets/wood-crafts.jpg";

const categories = [
  {
    id: 1,
    title: "Paintings & Sketches",
    description: "Original artwork with expressive brushstrokes and heartfelt stories",
    image: paintingsImg,
    icon: "🎨",
    color: "bg-primary/10",
  },
  {
    id: 2,
    title: "Clay Miniatures",
    description: "Adorable handcrafted figurines and whimsical scenes",
    image: miniatureImg,
    icon: "🧸",
    color: "bg-secondary/20",
  },
  {
    id: 3,
    title: "Paper Crafts & Gifts",
    description: "Handmade cards, decorations, and heartfelt paper creations",
    image: paperImg,
    icon: "✂️",
    color: "bg-rose/10",
  },
  {
    id: 4,
    title: "Bottle & Recycled Art",
    description: "Creative upcycled art that gives new life to everyday items",
    image: bottlesImg,
    icon: "♻️",
    color: "bg-sky/20",
  },
  {
    id: 5,
    title: "Wooden Handicrafts",
    description: "Timeless wooden pieces carved and crafted with precision",
    image: woodCraftsImg,
    icon: "🪵",
    color: "bg-accent/20",
  },
];

const ShopCategories = () => {
  return (
    <section id="shop" className="py-24 bg-muted/20 texture-paper">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="px-4 py-2 bg-accent/20 text-accent-foreground rounded-full text-sm font-medium font-body inline-block">
            Shop Categories
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground">
            Explore Our{" "}
            <span className="text-gradient">Collections</span>
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Each category holds unique treasures waiting to find their perfect home
          </p>
        </div>
        
        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="card-artisan group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                
                {/* Icon badge */}
                <div className={`absolute top-4 right-4 w-14 h-14 ${category.color} backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl shadow-soft`}>
                  {category.icon}
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-muted-foreground font-body">
                  {category.description}
                </p>
                <button className="inline-flex items-center gap-2 text-primary font-semibold font-body group/btn">
                  View Collection
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopCategories;
