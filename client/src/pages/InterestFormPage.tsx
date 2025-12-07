import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ExternalLink } from "lucide-react";

export default function InterestFormPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif font-bold text-5xl md:text-6xl mb-6" data-testid="text-interest-form-title">
            Interest Form
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Interested in taking the next step? Fill out the form below and we'll get back to you within 48 hours.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="font-serif text-3xl">Submit Your Interest</CardTitle>
              <CardDescription className="text-base">
                Please fill out the Google Form below to get started. We'll review your information and reach out within 48 hours to discuss your project.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-8 text-center border-2 border-dashed border-border">
                <ExternalLink className="h-12 w-12 icon-primary mx-auto mb-4" />
                <p className="text-lg font-medium mb-4">Google Interest Form</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Click the link below to access our comprehensive interest form where you can tell us all about your project.
                </p>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScWzNp1zbTIo6kKn3qsTmCpuLsdOL2Rbwmv_e9yyjBg50qQMQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover-elevate active-elevate-2 transition-all"
                  data-testid="link-google-form"
                >
                  Open Interest Form
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Questions or Need Clarification?</CardTitle>
              <CardDescription className="text-base">
                If you have any questions or need clarification on any of our services before filling out the form, please don't hesitate to reach out.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-6 bg-card rounded-lg border border-card-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 icon-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Email Us Directly</p>
                  <a
                    href="mailto:contact@apexverse.site"
                    className="text-foreground hover:underline"
                    data-testid="link-email-contact"
                  >
                    contact@apexverse.site
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-lg p-8 border border-border">
            <h3 className="font-serif font-bold text-2xl mb-4 text-center">What Happens Next?</h3>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mx-auto mb-3">
                  1
                </div>
                <h4 className="font-semibold mb-2">Submit Form</h4>
                <p className="text-sm text-muted-foreground">Fill out the interest form with details about your project</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mx-auto mb-3">
                  2
                </div>
                <h4 className="font-semibold mb-2">We Review</h4>
                <p className="text-sm text-muted-foreground">We'll review your request and reach out within 48 hours</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mx-auto mb-3">
                  3
                </div>
                <h4 className="font-semibold mb-2">Get Started</h4>
                <p className="text-sm text-muted-foreground">We'll discuss your needs and create a custom plan</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
