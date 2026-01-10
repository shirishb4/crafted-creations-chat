import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/lib/animations";

const faqs = [
  {
    category: "Ordering",
    questions: [
      {
        q: "How do I place an order?",
        a: "Simply browse our collections, find the piece you love, and click 'Request Quote' to connect with us on WhatsApp. We'll discuss the details and guide you through the ordering process.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept UPI, bank transfers, and all major payment apps like Google Pay, PhonePe, and Paytm. Payment details are shared once your order is confirmed.",
      },
      {
        q: "Can I cancel or modify my order?",
        a: "Yes, you can cancel or modify your order within 24 hours of placing it. For custom orders, modifications may be limited once work has begun. Please contact us on WhatsApp for any changes.",
      },
    ],
  },
  {
    category: "Shipping",
    questions: [
      {
        q: "How long does delivery take?",
        a: "Standard delivery takes 5-7 business days across India. For custom orders, additional time may be needed for creation. We'll provide you with tracking details once your order ships.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship worldwide! International shipping typically takes 10-15 business days. Shipping costs vary based on destination. Contact us for a quote.",
      },
      {
        q: "How are the products packaged?",
        a: "Every piece is carefully wrapped in bubble wrap and packed in sturdy boxes to ensure safe delivery. Fragile items receive extra protection with custom packaging.",
      },
    ],
  },
  {
    category: "Custom Orders",
    questions: [
      {
        q: "Can I request a custom design?",
        a: "Absolutely! We love creating personalized pieces. Share your idea, reference images, preferred colors, and size requirements with us on WhatsApp, and we'll bring your vision to life.",
      },
      {
        q: "How long do custom orders take?",
        a: "Custom orders typically take 2-3 weeks depending on complexity. We'll provide an estimated timeline after understanding your requirements.",
      },
      {
        q: "Is there an extra charge for customization?",
        a: "Custom pricing depends on the complexity and size of your request. We'll provide a quote before starting any work, so there are no surprises!",
      },
    ],
  },
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-border last:border-b-0"
      initial={false}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left gap-4 group"
      >
        <span className="font-body font-medium text-foreground group-hover:text-primary transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors"
        >
          {isOpen ? (
            <Minus className="w-4 h-4 text-primary" />
          ) : (
            <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
          )}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted-foreground font-body leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("Ordering");

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-muted/30 to-background texture-paper">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <ScrollReveal>
            <span className="px-4 py-2 bg-accent/30 text-accent-foreground rounded-full text-sm font-medium font-body inline-block">
              ❓ Got Questions?
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground">
              Frequently Asked{" "}
              <span className="text-gradient">Questions</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Everything you need to know about ordering, shipping, and custom creations
            </p>
          </ScrollReveal>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Category Tabs */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {faqs.map((category) => (
                <button
                  key={category.category}
                  onClick={() => setActiveCategory(category.category)}
                  className={`px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.category
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* FAQ List */}
          <StaggerChildren className="bg-card rounded-3xl border border-border shadow-soft p-6 md:p-8" staggerDelay={0.1}>
            <AnimatePresence mode="wait">
              {faqs
                .filter((cat) => cat.category === activeCategory)
                .map((category) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {category.questions.map((faq, index) => (
                      <StaggerItem key={index}>
                        <FAQItem question={faq.q} answer={faq.a} />
                      </StaggerItem>
                    ))}
                  </motion.div>
                ))}
            </AnimatePresence>
          </StaggerChildren>

          {/* Contact CTA */}
          <ScrollReveal delay={0.4}>
            <div className="text-center mt-10">
              <p className="text-muted-foreground font-body mb-4">
                Still have questions? We're here to help!
              </p>
              <motion.a
                href="https://wa.me/919876543210?text=Hi! I have a question about your handmade creations."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Chat with Us
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FAQ;