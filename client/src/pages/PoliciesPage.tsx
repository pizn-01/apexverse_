import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedHero from "@/components/layout/AnimatedHero";
import { CheckCircle2, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function PoliciesPage() {
  return (
    <div className="min-h-screen">
      <AnimatedHero heightClass="h-80">
        <div className="max-w-4xl mx-auto px-6 text-center py-16">
          <h1 className="font-serif font-bold text-5xl md:text-6xl mb-4 text-white" data-testid="text-policies-title">
            Policies
          </h1>
          <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
            Our commitment to quality, transparency, and client satisfaction
          </p>
        </div>
      </AnimatedHero>

      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-serif text-3xl">Unlimited Revisions Policy</CardTitle>
                <CardDescription className="text-base mt-4">
                  We understand that sometimes artwork or services need to be adjusted to better fit the needs of our clients.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/90 leading-relaxed">
                  <strong>That means that we offer unlimited revisions on all artwork!</strong> Please don't hesitate to let us know if you see something that needs to be corrected or changed.
                </p>
                <div className="bg-accent/10 rounded-lg p-6 border border-accent/30">
                  <p className="text-sm text-foreground/90">
                    Our goal is to ensure that you're completely satisfied with the final product. We'll work with you through as many iterations as needed to get it just right.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-secondary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="font-serif text-3xl">Client Services Agreement</CardTitle>
                <CardDescription className="text-base mt-4">
                  Protecting both parties throughout our working relationship
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/90 leading-relaxed">
                  We have a complete and comprehensive Client Services Agreement that must be reviewed and signed by all parties before any payments or work. We want to make sure that all parties are satisfied and protected during our contracted time with you.
                </p>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">Clear scope of work and deliverables</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">Timeline expectations and milestones</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">Payment terms and conditions</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">Intellectual property rights and usage</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">Confidentiality and privacy protections</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-serif text-3xl">Key Policy Points</CardTitle>
                <CardDescription className="text-base mt-4">
                  A concise summary of important terms for your convenience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Payment Terms</h4>
                  <p className="text-foreground/90 leading-relaxed">
                    Invoices are issued prior to project commencement and payment is due upon receipt unless otherwise agreed in writing. <strong>But if your à la carte order exceeds $999, personalized payment plans are available upon request.</strong>
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Usage Rights</h4>
                  <p className="text-foreground/90 leading-relaxed">
                    Both commercial and non-commercial rights are free, but credit to ApexVerse is required wherever artwork or animation is used. If credit isn’t provided, a $36 commercial license fee per artwork or scene applies.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-accent/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="font-serif text-3xl">Communication & Support</CardTitle>
                <CardDescription className="text-base mt-4">
                  We're here to support you every step of the way
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/90 leading-relaxed">
                  Please feel free to reach out to us if you have any questions, comments, or concerns about our services. We maintain open communication throughout every project and are always available to address your needs.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-card rounded-lg border border-card-border">
                    <h4 className="font-semibold mb-2">Response Time</h4>
                    <p className="text-sm text-muted-foreground">We respond to all inquiries within 48 hours</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-card-border">
                    <h4 className="font-semibold mb-2">Project Updates</h4>
                    <p className="text-sm text-muted-foreground">Regular progress reports throughout your project</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-card-border">
                    <h4 className="font-semibold mb-2">Open Communication</h4>
                    <p className="text-sm text-muted-foreground">Email, phone, and video call options available</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-card-border">
                    <h4 className="font-semibold mb-2">Feedback Welcome</h4>
                    <p className="text-sm text-muted-foreground">We value your input at every stage</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-lg p-8 border border-border text-center">
            <h3 className="font-serif font-bold text-3xl mb-4">Questions About Our Policies?</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're committed to transparency and want you to feel completely confident working with us. Don't hesitate to reach out with any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="default" data-testid="button-contact-policies">
                  Contact Us
                </Button>
              </Link>
              <Link href="/interest-form">
                <Button size="lg" variant="outline" data-testid="button-get-started-policies">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
