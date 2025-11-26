import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import AnimatedHero from "@/components/layout/AnimatedHero";
import { RevealGroup, RevealItem } from "@/components/layout/Reveal";

const aLaCartePricing = [
  { service: "KDP/Ingram/B&N Creation/Management", price: "$25 per book per service" },
  { service: "Copyright Office Creation/Management", price: "$100 per book" },
  { service: "Book Formatting", price: "$50 per book" },
  { service: "Proofread/Content Pulls", price: "$50 per book" },
  { service: "Newsletters", price: "$15/hour (est. 10 hours per month)" },
  { service: "Website Creation/Management", price: "$100 + $15/hr for support (est. 5-10 hours for creation)" },
  { service: "Author Email Creation/Management", price: "$15/hr for creation/admin (est 5 hours per month)" },
  { service: "Social Media Management", price: "$15/hour (est 20 hours per month)" },
  { service: "ARC Team Management", price: "$150 per book" },
  { service: "Street Team Management", price: "$350 monthly (three months minimum)" },
  { service: "Book Cover Art", price: "$119 per book" },
  { service: "Character Art (With and Without BG)", price: "$99 per character/scene" },
  { service: "Chapter Headers", price: "$24/variation" },
  { service: "Promotional Posts", price: "$19/promotional graphic" },
  { service: "Book Mockups", price: "$39/mockup" },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <AnimatedHero heightClass="h-80">
        <div className="max-w-4xl mx-auto px-6 text-center py-16">
          <h1 className="font-serif font-bold text-5xl md:text-6xl mb-4 text-white" data-testid="text-pricing-title">
            Pricing Guide
          </h1>
          <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
            We try our best to be competitive but fair in our pricing strategy. Transparent pricing with flexible payment options.
          </p>
        </div>
      </AnimatedHero>

      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <RevealGroup className="grid lg:grid-cols-3 gap-8 mb-20">
            <RevealItem>
            <Card className="hover-elevate transition-all">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">Most Flexible</Badge>
                <CardTitle className="font-serif text-3xl">Basic Kit</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">$499</div>
                <CardDescription className="text-base">
                  One-time payment. Due upfront.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li>• Book Cover</li>
                  <li>• 3 Character Scenes</li>
                  <li>• 7 Promotional Graphics</li>
                  <li>• 1 Book Mockup</li>
                  <li>• 2 Chapter Header Variations</li>
                  <li>• Proofread & Content Pull</li>
                </ul>
                <Link href="/interest-form">
                  <Button variant="outline" className="w-full" data-testid="button-get-basic">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
            </RevealItem>

            <RevealItem>
            <Card className="hover-elevate transition-all border-primary shadow-lg">
              <CardHeader>
                <Badge variant="default" className="w-fit mb-2">Best Value</Badge>
                <CardTitle className="font-serif text-3xl">Standard Kit</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">$998</div>
                <CardDescription className="text-base">
                  Flexible payment plans available.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li>• 2 Book Cover Variations</li>
                  <li>• 6 Character Scenes</li>
                  <li>• 15 Promotional Graphics</li>
                  <li>• Book Formatting</li>
                  <li>• Publishing Setup (KDP, Ingram, B&N)</li>
                  <li>• Copyright Office Setup</li>
                </ul>
                <Link href="/interest-form">
                  <Button variant="default" className="w-full" data-testid="button-get-standard">
                    Get Started
                  </Button>
                </Link>
                <Link href="/payment-plans">
                  <Button variant="ghost" className="w-full mt-2" data-testid="button-standard-plans">
                    View Payment Plans
                  </Button>
                </Link>
              </CardContent>
            </Card>
            </RevealItem>

            <RevealItem>
            <Card className="hover-elevate transition-all h-full flex flex-col">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">Complete Solution</Badge>
                <CardTitle className="font-serif text-3xl">Full Service</CardTitle>
                <div className="text-4xl font-bold text-primary mt-2">$2,500</div>
                <div className="text-sm text-muted-foreground">per month</div>
                <CardDescription className="text-base mt-2">
                  6-month minimum. Flexible payment schedules.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li>• Everything in Standard Kit</li>
                  <li>• Social Media Management</li>
                  <li>• Monthly Newsletters</li>
                  <li>• ARC & Street Team Management</li>
                  <li>• Website Management</li>
                  <li>• Book Trailers</li>
                </ul>
                <Link href="/interest-form">
                  <Button variant="outline" className="w-full" data-testid="button-get-fullservice-pricing">
                    Request Quote
                  </Button>
                </Link>
                <Link href="/payment-plans">
                  <Button variant="ghost" className="w-full mt-2" data-testid="button-fullservice-plans">
                    View Payment Plans
                  </Button>
                </Link>
              </CardContent>
            </Card>
            </RevealItem>
          </RevealGroup>

          <div>
            <h2 className="font-serif font-bold text-3xl mb-2 text-center">À La Carte Pricing</h2>
            <p className="text-center text-muted-foreground mb-8">
              Due upfront — personalized payment plans available on orders over $999!
            </p>
            <Card>
              <CardHeader>
                <CardDescription className="text-base">
                  Choose exactly what you need.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aLaCartePricing.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-border last:border-0"
                    >
                      <span className="font-medium">{item.service}</span>
                      <span className="text-primary font-semibold">{item.price}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 bg-card rounded-lg p-8 border border-card-border">
            <h3 className="font-serif font-bold text-2xl mb-4">Payment Structure Notes</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• The à la Carte Service and Basic Launch Kit are due upfront</li>
              <li>• We offer flexible pricing on the Standard Launch Kit & Full Service Contract</li>
              <li>• Please reach out to us for more information on payment structures</li>
            </ul>
            <div className="mt-6">
              <Link href="/contact">
                <Button variant="default" data-testid="button-pricing-contact">
                  Questions About Pricing?
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
