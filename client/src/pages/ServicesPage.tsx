import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedHero from "@/components/layout/AnimatedHero";
import { RevealGroup, RevealItem } from "@/components/layout/Reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const aLaCarteServices = [
  "Kindle Direct Publishing, IngramSpark & Barnes & Noble Press Account Creation & Management",
  "Copyright Office Account Creation & Management",
  "Book Formatting Services",
  "Proofread & Content Pulls",
  "Monthly Newsletters",
  "Author Website Creation & Management",
  "Author Email Creation & Management",
  "Social Media Management",
  "ARC Team Management",
  "Street Team Management",
  "Book Cover Art",
  "Character Art (With and Without Background)",
  "Chapter Headers",
  "Promotional Posts",
  "Book Mockups",
];

const basicKitIncludes = [
  "Book Cover",
  "3 Character Scenes",
  "7 Promotional Graphics",
  "1 Book Mockup",
  "2 Chapter Header Variations",
  "Proofread & Content Pull for Promotional Graphics",
];

const standardKitIncludes = [
  "2 Book Cover Variations",
  "6 Character Scenes",
  "15 Promotional Graphics",
  "1 Book Mockup",
  "3-4 Chapter Header Variations",
  "Proofread & Content Pull for Promotional Graphics",
  "Kindle Direct Publishing, IngramSpark & Barnes & Noble Press Account Creation & Management",
  "Copyright Office Account Creation & Management",
  "Book Formatting",
];

const fullServiceIncludes = [
  "Free Profile Picture",
  "Kindle Direct Publishing, IngramSpark & Barnes & Noble Press Account Creation & Management",
  "Copyright Office Account Creation & Management",
  "Book Formatting",
  "Author Email Creation & Management",
  "1-2 Newsletters Sent Monthly",
  "Author Website Creation & Management",
  "Social Media Management",
  "ARC Team Management",
  "Proofread & Content Pulls",
  "Street Team Management",
  "Cover Art",
  "Character Art (With and Without BG)",
  "Chapter Headers",
  "Promotional Posts",
  "Book Mockups",
  "Book Trailers",
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <AnimatedHero heightClass="h-80">
        <div className="max-w-4xl mx-auto px-6 text-center py-16">
          <h1 className="font-serif font-bold text-5xl md:text-6xl mb-4 text-white" data-testid="text-services-title">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
            The goal of our services is to serve YOU, the Author, in any way that we can. Let us help ease the stress of the details so you can focus on what you do best, writing!
          </p>
        </div>
      </AnimatedHero>

      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12" data-testid="tabs-services">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="alacarte">À La Carte</TabsTrigger>
              <TabsTrigger value="kits">Launch Kits</TabsTrigger>
              <TabsTrigger value="fullservice">Full Service</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <RevealGroup className="grid md:grid-cols-3 gap-8">
                <RevealItem>
                  <Card className="hover-elevate transition-all bg-card border border-card-border shadow-sm">
                    <CardHeader>
                      <CardTitle className="font-serif text-2xl">À La Carte</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Geared more for authors wanting to dip their toes in, or authors who are already handling many of these aspects but just need some help on a few select things.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full" onClick={() => document.querySelector('[data-value="alacarte"]')?.dispatchEvent(new MouseEvent('click'))} data-testid="button-view-alacarte">
                        View Services
                      </Button>
                    </CardContent>
                  </Card>
                </RevealItem>
                <RevealItem>
                  <Card className="hover-elevate transition-all bg-card border border-card-border shadow-sm">
                    <CardHeader>
                      <CardTitle className="font-serif text-2xl">Launch Kits</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Our Packages are curated to encompass the broad needs of authors getting their books out there. These are perfect for debut indie authors!
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full" onClick={() => document.querySelector('[data-value="kits"]')?.dispatchEvent(new MouseEvent('click'))} data-testid="button-view-kits">
                        View Packages
                      </Button>
                    </CardContent>
                  </Card>
                </RevealItem>
                <RevealItem>
                  <Card className="hover-elevate transition-all bg-card border border-card-border shadow-sm">
                    <CardHeader>
                      <CardTitle className="font-serif text-2xl">Full Service</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        For any author starting out who doesn't want to have to stress about the little things, or seasoned authors who just want to focus on writing.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full" onClick={() => document.querySelector('[data-value="fullservice"]')?.dispatchEvent(new MouseEvent('click'))} data-testid="button-view-fullservice">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </RevealItem>
              </RevealGroup>
            </TabsContent>

            <TabsContent value="alacarte">
              <Card className="bg-card border border-card-border shadow-sm">
                <CardHeader>
                  <CardTitle className="font-serif text-3xl">À La Carte Services</CardTitle>
                  <CardDescription className="text-base">
                    Choose exactly what you need. Pick and choose from our complete list of services.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {aLaCarteServices.map((service, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/90">{service}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-border">
                    <Link href="/pricing">
                      <Button variant="default" data-testid="button-view-alacarte-pricing">
                        View À La Carte Pricing
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="kits">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-card border border-card-border shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-serif text-3xl">Basic Kit</CardTitle>
                    <div className="text-4xl font-bold text-foreground mt-4">$499</div>
                    <CardDescription className="text-base">
                      Perfect for authors who need essential artwork and promotional materials.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-4">What's Included:</h4>
                    <div className="space-y-3">
                      {basicKitIncludes.map((item, index) => (
                        <div key={index} className="flex gap-3 items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/90">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8">
                      <Link href="/interest-form">
                        <Button variant="default" className="w-full" data-testid="button-get-basic-kit">
                          Get Basic Kit
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-card-border shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-serif text-3xl">Standard Kit</CardTitle>
                    <div className="text-4xl font-bold text-foreground mt-4">$998</div>
                    <CardDescription className="text-base">
                      Comprehensive package with publishing setup and extensive artwork.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-4">What's Included:</h4>
                    <div className="space-y-3">
                      {standardKitIncludes.map((item, index) => (
                        <div key={index} className="flex gap-3 items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/90">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8">
                      <Link href="/interest-form">
                        <Button variant="default" className="w-full" data-testid="button-get-standard-kit">
                          Get Standard Kit
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="fullservice">
              <Card className="bg-card border border-card-border shadow-sm">
                <CardHeader>
                  <CardTitle className="font-serif text-3xl">Full Service Contract</CardTitle>
                  <div className="text-4xl font-bold text-foreground mt-4">$2,500/month</div>
                  <CardDescription className="text-base">
                    6-month minimum retainer. Everything handled for you so you can focus entirely on writing.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-lg mb-4">Complete Package Includes:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {fullServiceIncludes.map((item, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/90">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/interest-form">
                        <Button variant="default" size="lg" data-testid="button-get-fullservice">
                          Request Full Service
                        </Button>
                      </Link>
                      <Link href="/payment-plans">
                        <Button variant="outline" size="lg" data-testid="button-payment-plans">
                          View Payment Plans
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
