import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/lib/animations";
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
          <ScrollReveal>
            <span className="px-4 py-2 bg-rose/10 text-rose rounded-full text-sm font-medium font-body inline-block">
              ✨ Featured Creations
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground">
              Handpicked{" "}
              <span className="text-gradient">Favorites</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Our most loved pieces, carefully selected for their unique charm
            </p>
          </ScrollReveal>
        </div>
        
        {/* Featured Items */}
        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
          {featuredItems.map((item) => (
            <StaggerItem key={item.id}>
              <motion.div
                className="card-artisan group"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-80 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                  />
                  
                  {/* Badge */}
                  <motion.span 
                    className={`absolute top-4 left-4 px-3 py-1 ${item.badgeColor} rounded-full text-xs font-semibold font-body`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    {item.badge}
                  </motion.span>
                  
                  {/* Wishlist button */}
                  <motion.button 
                    className="absolute top-4 right-4 w-10 h-10 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 hover:bg-rose/20"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Heart className="w-5 h-5 text-rose" />
                  </motion.button>
                  
                  {/* Quick action overlay */}
                  <motion.div 
                    className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-card via-card/80 to-transparent"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button 
                      className="w-full btn-hero text-base py-3 justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Order / Enquire
                    </motion.button>
                  </motion.div>
                </div>
                
                <div className="p-6 space-y-2">
                  <span className="text-sm text-muted-foreground font-body">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-foreground">
                    {item.title}
                  </h3>
                  <motion.p 
                    className="text-2xl font-heading text-primary font-bold"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.price}
                  </motion.p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
        
        {/* View all button */}
        <ScrollReveal delay={0.3}>
          <div className="text-center mt-12">
            <motion.a 
              href="#shop" 
              className="btn-secondary inline-flex"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Creations
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FeaturedCreations;
