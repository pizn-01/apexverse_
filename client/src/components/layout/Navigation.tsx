import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoLight from "@assets/IMG_1423_1762042786950.png";
import logoDark from "@assets/IMG_1423_1762042786950.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/timeframes", label: "Timeframes" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/payment-plans", label: "Payment Plans" },
  { href: "/policies", label: "Policies" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
    
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    try {
      const nowDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", nowDark ? "dark" : "light");
      setIsDark(nowDark);
    } catch (e) {
      /* ignore */
    }
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-b from-[#031a2d]/95 to-[#1a0b2e]/90 backdrop-blur-lg border-b border-white/10 shadow-sm"
          : "bg-gradient-to-b from-[#031a2d]/80 to-[#1a0b2e]/70 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-3 hover-elevate rounded-md px-3 py-2 -ml-3 cursor-pointer">
              <img 
                src={isDark ? logoDark : logoLight}
                alt="ApexVerse Logo" 
                className="h-14 w-auto"
              />
              <span className="text-2xl font-serif font-bold tracking-tight text-white"></span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors hover-elevate ${
                  location === link.href
                    ? "text-white bg-white/10"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="default" size="default" asChild data-testid="button-get-started">
              <Link href="/interest-form">Get Started</Link>
            </Button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover-elevate active-elevate-2 text-white/90"
              aria-label="Toggle theme"
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md hover-elevate active-elevate-2"
            aria-label="Toggle menu"
            data-testid="button-menu-toggle"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#071427]/95">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`block w-full text-left px-4 py-3 rounded-md font-medium transition-colors hover-elevate ${
                  location === link.href
                    ? "text-white bg-white/10"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <div className="flex items-center gap-3">
                <Button variant="default" size="default" className="w-full" asChild data-testid="button-get-started-mobile">
                  <Link href="/interest-form">Get Started</Link>
                </Button>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md hover-elevate active-elevate-2 text-white/90"
                  aria-label="Toggle theme"
                  data-testid="button-theme-toggle-mobile"
                >
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
