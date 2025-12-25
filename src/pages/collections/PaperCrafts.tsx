import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/lib/animations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

import paperImg from "@/assets/paper.jpg";
import paper1 from "@/assets/paper-1.jpg";
import paper2 from "@/assets/paper-2.jpg";

const artworks = [
  {
    id: 1,
    title: "Floral Quilling Card",
    image: paper1,
    materials: "Quilling Paper & Cardstock",
    size: "6 x 8 inches",
    price: "₹450",
    story: "Delicate paper quilling flowers arranged in an elegant design. Perfect for anniversaries, birthdays, or just to say 'I love you'.",
  },
  {
    id: 2,
    title: "Gift Box Collection",
    image: paper2,
    materials: "Premium Cardstock & Ribbons",
    size: "Various sizes",
    price: "₹350-800",
    story: "Beautiful handmade gift boxes with paper flower toppers. Each box is crafted to make your gift extra special.",
  },
  {
    id: 3,
    title: "3D Paper Art Frame",
    image: paperImg,
    materials: "Layered Cardstock",
    size: "8 x 10 inches",
    price: "₹1,200",
    story: "Multi-layered paper art creating a stunning 3D effect. A unique wall piece that catches light beautifully.",
  },
  {
    id: 4,
    title: "Wedding Invitation Set",
    image: paper1,
    materials: "Handmade Paper & Lace",
    size: "5 x 7 inches",
    price: "₹150 per set",
    story: "Elegant wedding invitations with intricate paper cutting and quilling details. Make your special day even more memorable.",
  },
  {
    id: 5,
    title: "Paper Flower Bouquet",
    image: paper2,
    materials: "Crepe Paper & Wire",
    size: "12 inches tall",
    price: "₹2,500",
    story: "Everlasting paper flowers that never wilt. A beautiful alternative to fresh flowers for home decor or gifts.",
  },
  {
    id: 6,
    title: "Origami Mobile",
    image: paperImg,
    materials: "Japanese Origami Paper",
    size: "15 x 20 inches",
    price: "₹950",
    story: "Colorful origami cranes and stars floating on a delicate mobile. Perfect for nurseries or adding whimsy to any room.",
  },
];

const PaperCrafts = () => {
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
        <title>Paper Crafts & Gifts Collection | Handmade Art Studio</title>
        <meta name="description" content="Explore our beautiful paper crafts collection. Handmade cards, quilling art, gift boxes, and decorations created with love and attention to detail." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-rose/10 texture-paper">
          <div className="container mx-auto px-4 md:px-6">
            <Link to="/#shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 font-body">
              <ArrowLeft className="w-4 h-4" />
              Back to Collections
            </Link>
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">✂️</span>
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground">
                  Paper Crafts & <span className="text-gradient">Gifts</span>
                </h1>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-lg text-muted-foreground font-body max-w-2xl">
                Handmade cards, decorations, and heartfelt paper creations. Each piece transforms simple paper into something magical and meaningful.
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

export default PaperCrafts;
