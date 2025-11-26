import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedHero from "@/components/layout/AnimatedHero";
import { Clock, Palette, FileText, Users, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TimeframesPage() {
  return (
    <div className="min-h-screen">
      <AnimatedHero heightClass="h-80">
        <div className="max-w-4xl mx-auto px-6 text-center py-16">
          <h1 className="font-serif font-bold text-5xl md:text-6xl mb-4 text-white" data-testid="text-timeframes-title">
            Timeframes
          </h1>
          <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
            We understand that life comes at us fast, and sometimes services are needed ASAP! Here are our turnaround times.
          </p>
        </div>
      </AnimatedHero>

      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card className="hover-elevate transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-serif text-2xl">Artwork</CardTitle>
                <CardDescription>
                  Character Art, Scenes, Chapter Headers, and Illustrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">Standard Orders</Badge>
                    <p className="text-2xl font-bold text-primary">2-3 Business Days</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Larger Orders</Badge>
                    <p className="text-xl font-semibold text-muted-foreground">5-7 Business Days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-secondary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="font-serif text-2xl">PA Services</CardTitle>
                <CardDescription>
                  Formatting, Newsletters, and Content Pulls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="text-2xl font-bold text-primary">1-2 Business Days</p>
                  <p className="text-sm text-muted-foreground mt-2">Fast turnaround for administrative tasks</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-accent/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="font-serif text-2xl">All Other Services</CardTitle>
                <CardDescription>
                  Social Media, ARC Management, and More
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="text-2xl font-bold text-primary">Within 24 Hours</p>
                  <p className="text-sm text-muted-foreground mt-2">Prompt response for all inquiries</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/30 rounded-lg p-6 mb-16 border border-border">
            <div className="flex gap-3">
              <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-lg mb-2">Variable Timeframes</p>
                <p className="text-muted-foreground">
                  Depending on workload, these timeframes may vary. We will communicate with our clients if we think a project may run longer than anticipated.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-serif font-bold text-4xl mb-8 text-center">You Want to Commission Us, Now What?</h2>
            
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-2">Submit Interest Form</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Upon receipt of a completed Google Interest Form, found on the Interest Form Tab of this Website, we will reach out within 48 hours to verify the details of your request.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-2">Mark Begins Artwork</h3>
                  <p className="text-foreground/80 leading-relaxed mb-4">
                    From there, Mark will start working on any artwork, animation, or development project that's been requested. Proofs will be sent throughout the process, and revisions will be made as needed.
                  </p>
                  <div className="bg-card rounded-lg p-4 border border-card-border">
                    <div className="flex gap-2 items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Upon complete payment of the invoice for our services, all artwork, animations, and developments will be sent to the client. Communication will be open at all times between Birdie and the clients to ensure satisfaction with the work.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-2">Birdie Creates Schedule</h3>
                  <p className="text-foreground/80 leading-relaxed mb-4">
                    Birdie will work on a comprehensive schedule to be verified by the client to ensure that deadlines are being met and the client is satisfied. Once the schedule has been approved, all you need to do is sit back and relax and focus on writing!
                  </p>
                  <div className="bg-card rounded-lg p-4 border border-card-border">
                    <div className="flex gap-2 items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Birdie will reach out if something urgent comes up that the client needs to address. Communication will be open at all times between Birdie and the clients to ensure satisfaction with the work!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
