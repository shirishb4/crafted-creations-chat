import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { ScrollReveal } from "@/lib/animations";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    review: "Absolutely stunning work! I ordered a custom clay miniature for my daughter's birthday and it exceeded all expectations. The attention to detail is incredible!",
    product: "Clay Miniature",
    avatar: "PS",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    location: "Delhi",
    rating: 5,
    review: "The painting I received is now the centerpiece of my living room. Everyone who visits asks about it. Truly a masterpiece!",
    product: "Original Painting",
    avatar: "RM",
  },
  {
    id: 3,
    name: "Ananya Reddy",
    location: "Bangalore",
    rating: 5,
    review: "I've ordered paper craft gift boxes for multiple occasions now. Each one is unique and beautifully crafted. My friends are always impressed!",
    product: "Paper Craft",
    avatar: "AR",
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Jaipur",
    rating: 5,
    review: "The wooden name plate for our new home is gorgeous. The carving work is so intricate and the finish is perfect. Highly recommend!",
    product: "Wooden Craft",
    avatar: "VS",
  },
  {
    id: 5,
    name: "Sneha Patel",
    location: "Ahmedabad",
    rating: 5,
    review: "The bottle art lamp I ordered creates such a magical ambiance. It's become my favorite decor piece. Amazing craftsmanship!",
    product: "Bottle Art",
    avatar: "SP",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return prev === testimonials.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      navigate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/20 to-muted/30 texture-paper overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <ScrollReveal>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium font-body inline-block">
              💬 Customer Love
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground">
              What Our{" "}
              <span className="text-gradient">Customers Say</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Real stories from happy customers who found joy in our handmade creations
            </p>
          </ScrollReveal>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Quote className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="relative bg-card rounded-3xl shadow-float border border-border p-8 md:p-12 min-h-[320px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="text-center space-y-6">
                  {/* Stars */}
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star
                          className={`w-5 h-5 ${
                            i < currentTestimonial.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-lg md:text-xl text-foreground font-body leading-relaxed max-w-2xl mx-auto">
                    "{currentTestimonial.review}"
                  </p>

                  {/* Customer Info */}
                  <div className="flex flex-col items-center gap-3 pt-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-rose flex items-center justify-center text-lg font-bold text-primary-foreground font-heading">
                      {currentTestimonial.avatar}
                    </div>
                    <div className="text-center">
                      <h4 className="font-heading font-bold text-foreground">
                        {currentTestimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground font-body">
                        {currentTestimonial.location} • {currentTestimonial.product}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigate(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-muted hover:bg-primary/10 rounded-full flex items-center justify-center transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => navigate(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-muted hover:bg-primary/10 rounded-full flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-3xl md:text-4xl font-heading font-bold text-primary">200+</span>
              <p className="text-sm text-muted-foreground font-body mt-1">Happy Customers</p>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-3xl md:text-4xl font-heading font-bold text-primary">4.9</span>
              <p className="text-sm text-muted-foreground font-body mt-1">Average Rating</p>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-3xl md:text-4xl font-heading font-bold text-primary">100%</span>
              <p className="text-sm text-muted-foreground font-body mt-1">Satisfaction</p>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Testimonials;