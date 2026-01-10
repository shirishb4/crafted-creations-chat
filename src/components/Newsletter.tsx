import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Sparkles, Check } from "lucide-react";
import { ScrollReveal } from "@/lib/animations";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 255;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedEmail = email.trim();
    
    if (!trimmedEmail) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!validateEmail(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call - in production, this would save to a database
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubscribed(true);
    setEmail("");
    toast.success("Welcome to our creative family! 🎨");
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-rose/10 to-lavender/20 texture-paper">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <motion.div
              className="bg-card rounded-3xl border border-border shadow-float p-8 md:p-12 text-center relative overflow-hidden"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-rose/5 rounded-full translate-x-1/2 translate-y-1/2" />
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-primary to-rose rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", duration: 0.6 }}
                >
                  <Mail className="w-7 h-7 text-primary-foreground" />
                </motion.div>

                {/* Header */}
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                  Join Our Creative{" "}
                  <span className="text-gradient">Community</span>
                </h2>
                <p className="text-muted-foreground font-body mb-8 max-w-lg mx-auto">
                  Get exclusive updates on new creations, special offers, and behind-the-scenes peeks into our artistic journey!
                </p>

                {/* Form */}
                {!isSubscribed ? (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <div className="flex-1 relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        maxLength={255}
                        className="w-full px-5 py-3.5 bg-muted rounded-full text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        disabled={isSubmitting}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3.5 bg-primary text-primary-foreground rounded-full font-body font-medium flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Subscribe
                        </>
                      )}
                    </motion.button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Check className="w-7 h-7 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-lg font-body font-medium text-foreground">
                      You're in! Welcome to the family! 🎉
                    </p>
                    <p className="text-sm text-muted-foreground font-body">
                      Check your inbox for a special welcome surprise.
                    </p>
                  </motion.div>
                )}

                {/* Privacy note */}
                {!isSubscribed && (
                  <p className="text-xs text-muted-foreground font-body mt-4">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                )}
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;