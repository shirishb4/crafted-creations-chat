import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/lib/animations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

import woodCraftsImg from "@/assets/wood-crafts.jpg";
import wood1 from "@/assets/wood-1.jpg";
import wood2 from "@/assets/wood-2.jpg";

const artworks = [
  {
    id: 1,
    title: "Carved Jewelry Box",
    image: wood1,
    materials: "Teak Wood & Brass Hinges",
    size: "6 x 4 x 3 inches",
    story: "A beautifully carved jewelry box with intricate floral patterns. Each carving is done by hand, taking several days to complete.",
  },
  {
    id: 2,
    title: "Mandala Wall Art",
    image: wood2,
    materials: "Carved Pine Wood",
    size: "16 inches diameter",
    story: "A stunning mandala carved into pine wood, creating a mesmerizing centerpiece for any wall. The depth of carving creates beautiful shadow patterns.",
  },
  {
    id: 3,
    title: "Rustic Photo Frame",
    image: woodCraftsImg,
    materials: "Reclaimed Wood & Glass",
    size: "8 x 10 inches",
    story: "Made from reclaimed wood, each frame tells its own story through unique grain patterns and character marks.",
  },
  {
    id: 4,
    title: "Wooden Coaster Set",
    image: wood1,
    materials: "Walnut Wood & Resin",
    size: "4 inches diameter (set of 4)",
    story: "Beautiful coasters combining natural wood with colored resin. Each set is unique due to the natural variations in wood grain.",
  },
  {
    id: 5,
    title: "Decorative Key Holder",
    image: wood2,
    materials: "Carved Mango Wood",
    size: "12 x 6 inches",
    story: "Keep your keys organized in style with this hand-carved key holder featuring traditional motifs.",
  },
  {
    id: 6,
    title: "Wooden Name Plate",
    image: woodCraftsImg,
    materials: "Oak Wood & Metal Letters",
    size: "Custom sizes",
    story: "Custom name plates crafted to welcome guests to your home. Each piece is personalized and unique.",
  },
];

const WoodenCrafts = () => {
  const [selectedArt, setSelectedArt] = useState<typeof artworks[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (art: typeof artworks[0], index: number) => {
    setSelectedArt(art);
    setCurrentIndex(index);
  };

  const closeLightbox = () => setSelectedArt(null);

  const navigate = (direction: "prev" | "next") => {
    const newIndex = direction === "prev"
      ? (currentIndex - 1 + artworks.length) % artworks.length
      : (currentIndex + 1) % artworks.length;
    setCurrentIndex(newIndex);
    setSelectedArt(artworks[newIndex]);
  };

  const handleWhatsAppEnquiry = (art: typeof artworks[0]) => {
    const message = `Hi! I'm interested in "${art.title}" (${art.materials}, ${art.size}). Can you share more details?`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Wooden Handicrafts Collection | Handmade Art Studio</title>
        <meta name="description" content="Explore our wooden handicrafts collection. Timeless wooden pieces carved and crafted with precision, bringing warmth and natural beauty to your space." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-accent/20 texture-paper">
          <div className="container mx-auto px-4 md:px-6">
            <Link to="/#shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 font-body">
              <ArrowLeft className="w-4 h-4" />
              Back to Collections
            </Link>
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">🪵</span>
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground">
                  Wooden <span className="text-gradient">Handicrafts</span>
                </h1>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-lg text-muted-foreground font-body max-w-2xl">
                Timeless wooden pieces carved and crafted with precision. Each creation brings the warmth of natural wood and the soul of handmade artistry.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
              {artworks.map((art, index) => (
                <StaggerItem key={art.id}>
                  <motion.div
                    className="card-artisan group cursor-pointer overflow-hidden"
                    whileHover={{ y: -8 }}
                    onClick={() => openLightbox(art, index)}
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-72 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-background font-body text-sm">{art.materials}</p>
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                          {art.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-body">{art.size}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWhatsAppEnquiry(art);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium font-body hover:bg-primary/90 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Request Quote
                      </button>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedArt && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-5xl w-full bg-background rounded-3xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="relative">
                  <img
                    src={selectedArt.image}
                    alt={selectedArt.title}
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />
                  <button
                    onClick={() => navigate("prev")}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-foreground" />
                  </button>
                  <button
                    onClick={() => navigate("next")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-foreground" />
                  </button>
                </div>
                <div className="p-8 space-y-6">
                  <div>
                    <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                      {selectedArt.title}
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide font-body">Materials</h4>
                      <p className="text-foreground font-body">{selectedArt.materials}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide font-body">Size</h4>
                      <p className="text-foreground font-body">{selectedArt.size}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide font-body">Story</h4>
                      <p className="text-muted-foreground font-body">{selectedArt.story}</p>
                    </div>
                  </div>
                  <motion.button
                    className="w-full btn-primary flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleWhatsAppEnquiry(selectedArt)}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Enquire on WhatsApp
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <ChatBot />
    </>
  );
};

export default WoodenCrafts;
