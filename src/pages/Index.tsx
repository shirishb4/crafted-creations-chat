import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ShopCategories from "@/components/ShopCategories";
import FeaturedCreations from "@/components/FeaturedCreations";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import ContactForm from "@/components/ContactForm";
import ConnectSection from "@/components/ConnectSection";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Handmade Stories | Unique Handcrafted Art & Creations</title>
        <meta 
          name="description" 
          content="Discover unique handmade paintings, clay miniatures, paper crafts, and wooden art. Each piece is crafted with love and tells a beautiful story." 
        />
        <meta name="keywords" content="handmade art, paintings, clay miniatures, paper crafts, wooden handicrafts, handcrafted gifts" />
        <link rel="canonical" href="https://handmadestories.com" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ShopCategories />
          <FeaturedCreations />
          <Testimonials />
          <FAQ />
          <Newsletter />
          <ContactForm />
          <ConnectSection />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <ChatBot />
      </div>
    </>
  );
};

export default Index;
