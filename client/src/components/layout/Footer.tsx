import { Link } from "wouter";
import { Mail, Instagram, MessageSquare } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="font-serif font-bold text-xl mb-4">ApexVerse</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Just two creatives looking to make your dreams come true.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">Mark</p>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/marnus644?igsh=MXd4Z2l2eW1pbnF5Zg%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md hover-elevate active-elevate-2 transition-all"
                    aria-label="Mark's Instagram"
                    data-testid="link-mark-instagram"
                  >
                    <Instagram className="h-5 w-5 icon-default" />
                  </a>
                  <a
                    href="https://www.threads.com/@marnus644?igshid=NTc4MTIwNjQ2YQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md hover-elevate active-elevate-2 transition-all"
                    aria-label="Mark's Threads"
                    data-testid="link-mark-threads"
                  >
                    <MessageSquare className="h-5 w-5 icon-default" />
                  </a>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">Birdie</p>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/birdiejamesauthor?igsh=ZzBjZ2lhc2E1ZGth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md hover-elevate active-elevate-2 transition-all"
                    aria-label="Birdie's Instagram"
                    data-testid="link-birdie-instagram"
                  >
                    <Instagram className="h-5 w-5 icon-default" />
                  </a>
                  <a
                    href="https://www.threads.com/@birdiejamesauthor?igshid=NTc4MTIwNjQ2YQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md hover-elevate active-elevate-2 transition-all"
                    aria-label="Birdie's Threads"
                    data-testid="link-birdie-threads"
                  >
                    <MessageSquare className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <a
                href="mailto:contact@apexverse.com"
                className="flex items-center gap-2 p-2 rounded-md hover-elevate active-elevate-2 transition-all w-fit"
                aria-label="Email"
                data-testid="link-email"
              >
                <Mail className="h-5 w-5 icon-default" />
                <span className="text-sm">contact@apexverse.com</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing Guide
                </Link>
              </li>
              <li>
                <Link href="/payment-plans" className="text-muted-foreground hover:text-foreground transition-colors">
                  Payment Plans
                </Link>
              </li>
              <li>
                <Link href="/timeframes" className="text-muted-foreground hover:text-foreground transition-colors">
                  Timeframes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/policies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Policies
                </Link>
              </li>
              <li>
                <Link href="/interest-form" className="text-muted-foreground hover:text-foreground transition-colors">
                  Interest Form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} ApexVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
