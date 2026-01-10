import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/lib/animations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

import bottlesImg from "@/assets/bottles.jpg";
import bottle1 from "@/assets/bottle-1.jpg";
import bottle2 from "@/assets/bottle-2.jpg";

const artworks = [
  {
    id: 1,
    title: "Fairy Light Vase",
    image: bottle1,
    materials: "Recycled Glass Bottle, LED Lights & Paint",
    size: "12 inches tall",
    story: "Transform any corner into a magical space with this hand-painted bottle filled with warm fairy lights. Each flower is carefully painted by hand.",
  },
  {
    id: 2,
    title: "Mandala Magic Bottle",
    image: bottle2,
    materials: "Recycled Wine Bottle & Acrylic Paint",
    size: "13 inches tall",
    story: "Intricate mandala patterns in vibrant colors turn this recycled bottle into a stunning centerpiece. Hours of detailed work in every design.",
  },
  {
    id: 3,
    title: "Bohemian Dream Set",
    image: bottlesImg,
    materials: "Mixed Bottles, Jute & Paint",
    size: "Set of 3 (various sizes)",
    story: "A collection of decorated bottles in bohemian style. Perfect as a set or displayed individually for that eclectic home vibe.",
  },
  {
    id: 4,
    title: "Galaxy Night Light",
    image: bottle1,
    materials: "Glass Bottle, LED & Spray Paint",
    size: "10 inches tall",
    story: "A mesmerizing galaxy effect bottle that glows beautifully in the dark. Perfect for bedrooms and creating a dreamy atmosphere.",
  },
  {
    id: 5,
    title: "Vintage Lace Decanter",
    image: bottle2,
    materials: "Glass Bottle, Lace & Pearls",
    size: "11 inches tall",
    story: "Elegant vintage-inspired bottle wrapped in delicate lace and adorned with pearls. Perfect for weddings or romantic decor.",
  },
  {
    id: 6,
    title: "Nature's Canvas",
    image: bottlesImg,
    materials: "Recycled Bottles & Natural Dyes",
    size: "Various sizes",
    story: "Bottles painted with nature-inspired scenes using eco-friendly dyes. Each piece celebrates the beauty of our natural world.",
  },
];

const BottleArt = () => {
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
        <title>Bottle & Recycled Art Collection | Handmade Art Studio</title>
        <meta name="description" content="Discover our eco-friendly bottle art collection. Creative upcycled art that transforms everyday items into beautiful home decor pieces." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-sky/20 texture-paper">
          <div className="container mx-auto px-4 md:px-6">
            <Link to="/#shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 font-body">
              <ArrowLeft className="w-4 h-4" />
              Back to Collections
            </Link>
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">♻️</span>
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground">
                  Bottle & <span className="text-gradient">Recycled Art</span>
                </h1>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-lg text-muted-foreground font-body max-w-2xl">
                Creative upcycled art that gives new life to everyday items. Each piece is a testament to sustainability meeting creativity.
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

export default BottleArt;
