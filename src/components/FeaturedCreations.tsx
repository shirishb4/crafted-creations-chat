import { Heart, ShoppingBag } from "lucide-react";
import miniatureImg from "@/assets/miniature.jpg";
import paperImg from "@/assets/paper.jpg";
import paintingsImg from "@/assets/paintings.jpg";

const featuredItems = [
  {
    id: 1,
    title: "Dreamy Clay Castle",
    category: "Clay Miniature",
    price: "₹1,299",
    image: miniatureImg,
    badge: "Bestseller",
    badgeColor: "bg-rose text-rose-foreground",
  },
  {
    id: 2,
    title: "Heart Paper Bouquet",
    category: "Paper Craft",
    price: "₹599",
    image: paperImg,
    badge: "New",
    badgeColor: "bg-accent text-accent-foreground",
  },
  {
    id: 3,
    title: "Child Portrait Sketch",
    category: "Original Painting",
    price: "₹2,499",
    image: paintingsImg,
    badge: "Limited",
    badgeColor: "bg-lavender text-lavender-foreground",
  },
];

const FeaturedCreations = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background texture-paper">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="px-4 py-2 bg-rose/10 text-rose rounded-full text-sm font-medium font-body inline-block">
            ✨ Featured Creations
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground">
            Handpicked{" "}
            <span className="text-gradient">Favorites</span>
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Our most loved pieces, carefully selected for their unique charm
          </p>
        </div>
        
        {/* Featured Items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item, index) => (
            <div
              key={item.id}
              className="card-artisan group"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Badge */}
                <span className={`absolute top-4 left-4 px-3 py-1 ${item.badgeColor} rounded-full text-xs font-semibold font-body`}>
                  {item.badge}
                </span>
                
                {/* Wishlist button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose/20">
                  <Heart className="w-5 h-5 text-rose" />
                </button>
                
                {/* Quick action overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-card via-card/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full btn-hero text-base py-3 justify-center">
                    <ShoppingBag className="w-4 h-4" />
                    Order / Enquire
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-2">
                <span className="text-sm text-muted-foreground font-body">
                  {item.category}
                </span>
                <h3 className="text-xl font-heading font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-2xl font-heading text-primary font-bold">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* View all button */}
        <div className="text-center mt-12">
          <a href="#shop" className="btn-secondary">
            View All Creations
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCreations;
