import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle hash scrolling after navigation
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  const navLinks = [
    { name: "Home", href: "/", isRoute: true },
    { name: "Shop", href: "/#shop", isRoute: false },
    { name: "Gallery", href: "/gallery", isRoute: true },
    { name: "About", href: "/#about", isRoute: false },
    { name: "Connect", href: "/#connect", isRoute: false },
  ];

  const handleHashLink = (href: string) => {
    const hash = href.replace("/", "");
    if (location.pathname === "/") {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home page first, then scroll to hash
      navigate("/" + hash);
    }
  };

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
          <Link to="/" className="text-2xl md:text-3xl font-heading font-bold text-gradient">
            Handmade Stories
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-body font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => handleHashLink(link.href)}
                  className="font-body font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              )
            )}
            <ThemeToggle />
            <button
              onClick={() => handleHashLink("/#shop")}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold font-body text-primary-foreground transition-all duration-300 hover:scale-105"
              style={{ background: "var(--gradient-warm)" }}
            >
              <ShoppingBag className="w-4 h-4" />
              Shop Now
            </button>
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
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-body font-medium text-foreground hover:text-primary transition-colors py-2"
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleHashLink(link.href);
                  }}
                  className="block font-body font-medium text-foreground hover:text-primary transition-colors py-2 text-left w-full"
                >
                  {link.name}
                </button>
              )
            )}
            <div className="flex items-center gap-4 pt-2">
              <ThemeToggle />
              <span className="text-sm text-muted-foreground font-body">Toggle theme</span>
            </div>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleHashLink("/#shop");
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold font-body text-primary-foreground w-full justify-center"
              style={{ background: "var(--gradient-warm)" }}
            >
              <ShoppingBag className="w-4 h-4" />
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
