import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Mail, User, MessageSquare, FileText } from "lucide-react";
import { ScrollReveal } from "@/lib/animations";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: result.data,
      });

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent successfully! We'll get back to you soon.");
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again or contact us on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-background to-muted/30 texture-paper">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <ScrollReveal>
            <span className="px-4 py-2 bg-sky/20 text-sky-foreground rounded-full text-sm font-medium font-body inline-block">
              ✉️ Get in Touch
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground">
              Send Us a{" "}
              <span className="text-gradient">Message</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Have a question or want to discuss a custom order? We'd love to hear from you!
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="max-w-2xl mx-auto">
            {!isSubmitted ? (
              <motion.form
                onSubmit={handleSubmit}
                className="bg-card rounded-3xl border border-border shadow-float p-8 md:p-10 space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-foreground font-body">
                    <User className="w-4 h-4 text-primary" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    maxLength={100}
                    className={`w-full px-4 py-3 bg-muted rounded-xl text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                      errors.name ? "ring-2 ring-destructive" : ""
                    }`}
                    placeholder="Enter your name"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive font-body">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-foreground font-body">
                    <Mail className="w-4 h-4 text-primary" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={255}
                    className={`w-full px-4 py-3 bg-muted rounded-xl text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                      errors.email ? "ring-2 ring-destructive" : ""
                    }`}
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive font-body">{errors.email}</p>
                  )}
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="flex items-center gap-2 text-sm font-medium text-foreground font-body">
                    <FileText className="w-4 h-4 text-primary" />
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    maxLength={200}
                    className={`w-full px-4 py-3 bg-muted rounded-xl text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                      errors.subject ? "ring-2 ring-destructive" : ""
                    }`}
                    placeholder="What's this about?"
                    disabled={isSubmitting}
                  />
                  {errors.subject && (
                    <p className="text-sm text-destructive font-body">{errors.subject}</p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-foreground font-body">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={2000}
                    rows={5}
                    className={`w-full px-4 py-3 bg-muted rounded-xl text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none ${
                      errors.message ? "ring-2 ring-destructive" : ""
                    }`}
                    placeholder="Tell us about your enquiry, custom order ideas, or just say hello!"
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive font-body">{errors.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground font-body text-right">
                    {formData.message.length}/2000
                  </p>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-full font-body font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card rounded-3xl border border-border shadow-float p-12 text-center"
              >
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
                  Message Sent! 🎉
                </h3>
                <p className="text-muted-foreground font-body mb-6">
                  Thank you for reaching out! We'll get back to you within 24-48 hours.
                </p>
                <motion.button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-muted text-foreground rounded-full font-body font-medium hover:bg-muted/80 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactForm;