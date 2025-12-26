import { useState } from "react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Palette, Shapes, Scissors, Recycle, TreeDeciduous } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/lib/animations";
import paintingsImg from "@/assets/paintings.jpg";
import painting1Img from "@/assets/painting-1.jpg";
import miniatureImg from "@/assets/miniature.jpg";
import miniature1Img from "@/assets/miniature-1.jpg";
import miniature2Img from "@/assets/miniature-2.jpg";
import paperImg from "@/assets/paper.jpg";
import paper1Img from "@/assets/paper-1.jpg";
import bottlesImg from "@/assets/bottles.jpg";
import woodCraftsImg from "@/assets/wood-crafts.jpg";

interface ArtworkItem {
  id: number;
  title: string;
  category: string;
  categoryIcon: string;
  image: string;
  materials: string;
  story: string;
  size: "small" | "medium" | "large";
}

const artworks: ArtworkItem[] = [
  {
    id: 1,
    title: "Child with Flowers",
    category: "Paintings",
    categoryIcon: "🎨",
    image: paintingsImg,
    materials: "Oil pastels on textured paper",
    story: "This piece captures the innocence of childhood through expressive brushstrokes. The vibrant colors swirling around represent the boundless imagination and dreams that children carry within them.",
    size: "large",
  },
  {
    id: 2,
    title: "Bunny in the Clouds",
    category: "Clay Miniatures",
    categoryIcon: "🧸",
    image: miniatureImg,
    materials: "Premium polymer clay, hand-painted details",
    story: "A whimsical scene of a little bunny resting on fluffy clouds among lily of the valley flowers. Each piece is carefully sculpted to bring smiles and warmth to any space.",
    size: "medium",
  },
  {
    id: 3,
    title: "Heart Bouquet",
    category: "Paper Crafts",
    categoryIcon: "✂️",
    image: paperImg,
    materials: "Acid-free cardstock, handmade paper flowers",
    story: "Love crafted into paper! These delicate heart-shaped decorations and paper flowers are perfect for weddings, anniversaries, or simply spreading love to someone special.",
    size: "small",
  },
  {
    id: 4,
    title: "Ocean Friend Octopus",
    category: "Bottle Art",
    categoryIcon: "♻️",
    image: bottlesImg,
    materials: "Recycled plastic bottle, acrylic paints, googly eyes",
    story: "Meet our friendly octopus! This playful creation transforms everyday bottles into adorable sea creatures, teaching kids about recycling while sparking creativity and imagination.",
    size: "medium",
  },
  {
    id: 5,
    title: "Artisan's Workshop",
    category: "Wooden Crafts",
    categoryIcon: "🪵",
    image: woodCraftsImg,
    materials: "Sustainable hardwood, natural wood stains",
    story: "A collection of handcrafted wooden treasures from bowls to decorative pieces. Each item celebrates the natural beauty of wood grain and traditional woodworking techniques.",
    size: "large",
  },
  {
    id: 6,
    title: "Winter Castle",
    category: "Clay Miniatures",
    categoryIcon: "🧸",
    image: miniature1Img,
    materials: "Polymer clay, miniature snowman figurine",
    story: "A magical winter wonderland captured in clay. The cozy cottage with its snowy roof and friendly snowman brings the joy of winter indoors all year round.",
    size: "small",
  },
  {
    id: 7,
    title: "Floral Hearts",
    category: "Paper Crafts",
    categoryIcon: "✂️",
    image: paper1Img,
    materials: "Premium cardstock, handcut petals",
    story: "Layers of carefully cut paper create these stunning 3D flower arrangements. Perfect as wall art or thoughtful handmade gifts for any occasion.",
    size: "medium",
  },
  {
    id: 8,
    title: "Soot Sprites Garden",
    category: "Clay Miniatures",
    categoryIcon: "🧸",
    image: miniature2Img,
    materials: "Black polymer clay, purple flower accents",
    story: "Inspired by magical creatures, these adorable soot sprites frolic among delicate purple flowers. A touch of Studio Ghibli magic for your home.",
    size: "small",
  },
  {
    id: 9,
    title: "Sunset Dreams",
    category: "Paintings",
    categoryIcon: "🎨",
    image: painting1Img,
    materials: "Acrylic on canvas",
    story: "A vibrant sunset painting that captures the magical transition from day to night. The warm oranges and cool purples create a sense of peace and wonder.",
    size: "medium",
  },
];

const categories = [
  { name: "All", icon: null },
  { name: "Paintings", icon: Palette },
  { name: "Clay Miniatures", icon: Shapes },
  { name: "Paper Crafts", icon: Scissors },
  { name: "Bottle Art", icon: Recycle },
  { name: "Wooden Crafts", icon: TreeDeciduous },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkItem | null>(null);

  const filteredArtworks = activeCategory === "All" 
    ? artworks 
    : artworks.filter(art => art.category === activeCategory);

  const handlePrevious = () => {
    if (!selectedArtwork) return;
    const currentIndex = filteredArtworks.findIndex(art => art.id === selectedArtwork.id);
    const prevIndex = currentIndex === 0 ? filteredArtworks.length - 1 : currentIndex - 1;
    setSelectedArtwork(filteredArtworks[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedArtwork) return;
    const currentIndex = filteredArtworks.findIndex(art => art.id === selectedArtwork.id);
    const nextIndex = currentIndex === filteredArtworks.length - 1 ? 0 : currentIndex + 1;
    setSelectedArtwork(filteredArtworks[nextIndex]);
  };

  return (
    <>
      <Helmet>
        <title>Creativity Gallery | Handmade Stories</title>
        <meta 
          name="description" 
          content="Explore our gallery of handmade paintings, clay miniatures, paper crafts, and wooden art. Each piece tells a unique creative story." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-32 pb-24">
          <div className="container mx-auto px-4 md:px-6">
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
              <ScrollReveal>
                <span className="px-4 py-2 bg-lavender/30 text-lavender-foreground rounded-full text-sm font-medium font-body inline-block">
                  🎨 Creativity Gallery
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground">
                  Where Art Comes{" "}
                  <span className="text-gradient">Alive</span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
                  Each creation tells a unique story. Click on any piece to discover the materials 
                  and inspiration behind it.
                </p>
              </ScrollReveal>
            </div>

            {/* Category Filters */}
            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((cat) => (
                  <motion.button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium font-body transition-all duration-300 ${
                      activeCategory === cat.name
                        ? "bg-primary text-primary-foreground shadow-warm"
                        : "bg-card text-muted-foreground hover:bg-muted border border-border"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cat.icon && <cat.icon className="w-4 h-4" />}
                    {cat.name}
                  </motion.button>
                ))}
              </div>
            </ScrollReveal>

            {/* Masonry Grid */}
            <motion.div 
              className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredArtworks.map((artwork, index) => (
                  <motion.div
                    key={artwork.id}
                    className="break-inside-avoid group cursor-pointer"
                    onClick={() => setSelectedArtwork(artwork)}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                  >
                    <div className="card-artisan overflow-hidden">
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={artwork.image}
                          alt={artwork.title}
                          className={`w-full object-cover ${
                            artwork.size === "large" ? "h-96" : 
                            artwork.size === "medium" ? "h-72" : "h-56"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.7 }}
                        />
                        
                        {/* Overlay on hover */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div 
                            className="absolute bottom-0 left-0 right-0 p-6"
                            initial={{ y: 20 }}
                            whileHover={{ y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <span className="inline-block px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-xs font-medium font-body mb-2">
                              {artwork.categoryIcon} {artwork.category}
                            </span>
                            <h3 className="text-xl font-heading font-bold text-card">
                              {artwork.title}
                            </h3>
                            <p className="text-sm text-card/80 font-body mt-1">
                              Click to see the story →
                            </p>
                          </motion.div>
                        </motion.div>
                        
                        {/* Category badge */}
                        <motion.div 
                          className="absolute top-4 left-4 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center text-lg shadow-soft"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {artwork.categoryIcon}
                        </motion.div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                          {artwork.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-body">
                          {artwork.category}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty state */}
            {filteredArtworks.length === 0 && (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xl text-muted-foreground font-body">
                  No artworks found in this category yet.
                </p>
              </motion.div>
            )}
          </div>
        </main>

        <Footer />
        <ChatBot />

        {/* Lightbox */}
        <AnimatePresence>
          {selectedArtwork && (
            <motion.div 
              className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedArtwork(null)}
            >
              <motion.div 
                className="bg-card rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-float"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="grid md:grid-cols-2">
                  {/* Image */}
                  <div className="relative">
                    <motion.img
                      src={selectedArtwork.image}
                      alt={selectedArtwork.title}
                      className="w-full h-64 md:h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    />
                    
                    {/* Navigation arrows */}
                    <motion.button
                      onClick={handlePrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-card transition-colors"
                      aria-label="Previous artwork"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-card transition-colors"
                      aria-label="Next artwork"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Content */}
                  <div className="p-8 space-y-6">
                    {/* Close button */}
                    <div className="flex justify-between items-start">
                      <motion.span 
                        className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium font-body"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {selectedArtwork.categoryIcon} {selectedArtwork.category}
                      </motion.span>
                      <motion.button
                        onClick={() => setSelectedArtwork(null)}
                        className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        aria-label="Close lightbox"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </div>

                    {/* Title */}
                    <motion.h2 
                      className="text-3xl md:text-4xl font-heading font-bold text-foreground"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      {selectedArtwork.title}
                    </motion.h2>

                    {/* Materials */}
                    <motion.div 
                      className="bg-muted/50 rounded-2xl p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <h4 className="text-sm font-semibold text-muted-foreground font-body uppercase tracking-wide mb-1">
                        Materials Used
                      </h4>
                      <p className="text-foreground font-body">
                        {selectedArtwork.materials}
                      </p>
                    </motion.div>

                    {/* Story */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <h4 className="text-sm font-semibold text-muted-foreground font-body uppercase tracking-wide mb-2">
                        The Creative Story
                      </h4>
                      <p className="text-muted-foreground font-body leading-relaxed">
                        {selectedArtwork.story}
                      </p>
                    </motion.div>

                    {/* CTA */}
                    <motion.a
                      href={`https://wa.me/1234567890?text=Hi! I'm interested in "${selectedArtwork.title}" from your gallery.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-hero w-full justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Enquire About This Piece
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Gallery;
