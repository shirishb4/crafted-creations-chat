import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import PaintingsCollection from "./pages/collections/PaintingsCollection";
import ClayMiniatures from "./pages/collections/ClayMiniatures";
import PaperCrafts from "./pages/collections/PaperCrafts";
import BottleArt from "./pages/collections/BottleArt";
import WoodenCrafts from "./pages/collections/WoodenCrafts";
import { pageVariants } from "./lib/animations";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/collections/paintings" element={<PaintingsCollection />} />
          <Route path="/collections/clay-miniatures" element={<ClayMiniatures />} />
          <Route path="/collections/paper-crafts" element={<PaperCrafts />} />
          <Route path="/collections/bottle-art" element={<BottleArt />} />
          <Route path="/collections/wooden-crafts" element={<WoodenCrafts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
