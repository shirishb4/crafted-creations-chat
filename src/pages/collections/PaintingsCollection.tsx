import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/lib/animations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

import paintingsImg from "@/assets/paintings.jpg";
import painting1 from "@/assets/painting-1.jpg";
import painting2 from "@/assets/painting-2.jpg";

const artworks = [
  {
    id: 1,
    title: "Village Morning",
    image: paintingsImg,
    materials: "Acrylic on Canvas",
    size: "18 x 24 inches",
    price: "₹2,500",
    story: "A peaceful morning scene capturing the essence of rural life, with soft golden light filtering through the trees and villagers starting their day.",
  },
  {
    id: 2,
    title: "Mountain Sunset",
    image: painting1,
    materials: "Watercolor on Paper",
    size: "12 x 16 inches",
    price: "₹1,800",
    story: "Inspired by the breathtaking sunsets I witnessed during my mountain travels. Each layer of color represents a different emotion.",
  },
  {
    id: 3,
    title: "Abstract Passion",
    image: painting2,
    materials: "Oil on Canvas",
    size: "24 x 30 inches",
    price: "₹4,500",
    story: "Bold strokes of red and gold expressing the fire within. This piece was created during a burst of creative energy.",
  },
  {
    id: 4,
    title: "Serene Landscape",
    image: paintingsImg,
    materials: "Acrylic on Canvas",
    size: "20 x 28 inches",
    price: "₹3,200",
    story: "A tranquil countryside scene with rolling hills and a peaceful river, painted during a quiet weekend retreat.",
  },
  {
    id: 5,
    title: "Golden Dreams",
    image: painting1,
    materials: "Watercolor & Ink",
    size: "14 x 18 inches",
    price: "₹2,100",
    story: "A dreamy interpretation of hope and warmth, using golden hues to represent optimism and new beginnings.",
  },
  {
    id: 6,
    title: "Vibrant Emotions",
    image: painting2,
    materials: "Mixed Media",
    size: "22 x 26 inches",
    price: "₹3,800",
    story: "Layers of texture and color come together to create a visual symphony of emotions and movement.",
  },
];

const PaintingsCollection = () => {
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
    const message = `Hi! I'm interested in "${art.title}" (${art.materials}, ${art.size}) priced at ${art.price}. Can you share more details?`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Paintings & Sketches Collection | Handmade Art Studio</title>
        <meta name="description" content="Explore our collection of original paintings and sketches. Each artwork tells a unique story through expressive brushstrokes and heartfelt creativity." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-primary/10 texture-paper">
          <div className="container mx-auto px-4 md:px-6">
            <Link to="/#shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 font-body">
              <ArrowLeft className="w-4 h-4" />
              Back to Collections
            </Link>
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">🎨</span>
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground">
                  Paintings & <span className="text-gradient">Sketches</span>
                </h1>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-lg text-muted-foreground font-body max-w-2xl">
                Original artwork with expressive brushstrokes and heartfelt stories. Each painting is a window into emotions, memories, and dreams brought to life on canvas.
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
                    <div className="p-5 space-y-2">
                      <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                        {art.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-body">{art.size}</p>
                      <p className="text-lg font-bold text-primary font-body">{art.price}</p>
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
                    <p className="text-2xl font-bold text-primary">{selectedArt.price}</p>
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

export default PaintingsCollection;
