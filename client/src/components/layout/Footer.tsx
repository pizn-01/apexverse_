import { Link } from "wouter";
import { Mail, Instagram } from "lucide-react";
import { ThreadsIcon } from "@/components/icons/ThreadsIcon";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="ApexVerse Logo"
                className="h-12 w-auto object-contain"
              />
              <span className="font-serif font-bold text-2xl"></span>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm max-w-sm">
              Just two creatives looking to make your dreams come true. We bring your stories to life with passion and precision.
            </p>

            <div className="flex flex-col gap-4 pt-4">
              <a
                href="mailto:contact@apexverse.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
                <span>contact@apexverse.com</span>
              </a>
            </div>
          </div>

          {/* Socials Section */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="font-semibold text-lg">Connect With Us</h4>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Mark</p>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/marnus644?igsh=MXd4Z2l2eW1pbnF5Zg%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-background border border-border hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-300"
                    aria-label="Mark's Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.threads.com/@marnus644?igshid=NTc4MTIwNjQ2YQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-background border border-border hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-300"
                    aria-label="Mark's Threads"
                  >
                    <ThreadsIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Birdie</p>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/birdiejamesauthor?igsh=ZzBjZ2lhc2E1ZGth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-background border border-border hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-300"
                    aria-label="Birdie's Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.threads.com/@birdiejamesauthor?igshid=NTc4MTIwNjQ2YQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-background border border-border hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-300"
                    aria-label="Birdie's Threads"
                  >
                    <ThreadsIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">Portfolio</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">Our Services</Link></li>
                <li><Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing Guide</Link></li>
                <li><Link href="/payment-plans" className="text-muted-foreground hover:text-primary transition-colors">Payment Plans</Link></li>
                <li><Link href="/timeframes" className="text-muted-foreground hover:text-primary transition-colors">Timeframes</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/policies" className="text-muted-foreground hover:text-primary transition-colors">Policies</Link></li>
                <li><Link href="/interest-form" className="text-muted-foreground hover:text-primary transition-colors">Interest Form</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} ApexVerse. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

