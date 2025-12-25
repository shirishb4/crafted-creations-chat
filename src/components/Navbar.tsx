import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Shop", href: "#shop" },
    { name: "About", href: "#about" },
    { name: "Connect", href: "#connect" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-2xl md:text-3xl font-heading font-bold text-gradient">
            Handmade Stories
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-body font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#shop"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold font-body text-primary-foreground transition-all duration-300 hover:scale-105"
              style={{ background: "var(--gradient-warm)" }}
            >
              <ShoppingBag className="w-4 h-4" />
              Shop Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-card border-b border-border shadow-soft transition-all duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block font-body font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold font-body text-primary-foreground w-full justify-center"
              style={{ background: "var(--gradient-warm)" }}
            >
              <ShoppingBag className="w-4 h-4" />
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
