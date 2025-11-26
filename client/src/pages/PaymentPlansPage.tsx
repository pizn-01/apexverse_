import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Calendar, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedHero from "@/components/layout/AnimatedHero";
import { Link } from "wouter";

export default function PaymentPlansPage() {
  return (
    <div className="min-h-screen">
      <AnimatedHero heightClass="h-80">
        <div className="max-w-4xl mx-auto px-6 text-center py-16">
          <h1 className="font-serif font-bold text-5xl md:text-6xl mb-4 text-white" data-testid="text-payment-plans-title">
            Payment Plans
          </h1>
          <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
            Flexible payment options for Standard Launch Kit and Full Service Contracts
          </p>
        </div>
      </AnimatedHero>

      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 mb-16">
            <div className="flex gap-4">
              <DollarSign className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-lg mb-2">Flexible Payment Options Available</p>
                <p className="text-muted-foreground">
                  We offer flexible payment plans on our Standard Launch Kit and Full Service Contracts. Please don't hesitate to reach out to us to arrange a payment plan.
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-3xl">Standard Launch Kit</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">$998 Total</div>
                <CardDescription className="text-base">
                  Payment is due before any services are rendered
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-lg mb-6">Available Payment Structures:</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-card-border hover-elevate transition-all">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-1">One Payment</p>
                      <p className="text-2xl font-bold text-primary">$998</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-card-border hover-elevate transition-all">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-1">Two Payments</p>
                      <p className="text-2xl font-bold text-primary">$499 <span className="text-base font-normal text-muted-foreground">each</span></p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-card-border hover-elevate transition-all">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-1">Three Payments</p>
                      <p className="text-2xl font-bold text-primary">$332.66 <span className="text-base font-normal text-muted-foreground">each</span></p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-card-border hover-elevate transition-all">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-1">Four Payments</p>
                      <p className="text-2xl font-bold text-primary">$249.50 <span className="text-base font-normal text-muted-foreground">each</span></p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-3xl">Full Service Contract</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">$2,500/month</div>
                <CardDescription className="text-base">
                  6-month minimum retainer with flexible payment schedules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-lg mb-6">Available Payment Structures:</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-card-border hover-elevate transition-all">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-1">Monthly Payment</p>
                      <p className="text-2xl font-bold text-primary">$2,500</p>
                      <p className="text-sm text-muted-foreground mt-1">Due once a month by the 15th</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-card-border hover-elevate transition-all">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-1">Bi-Weekly Payments</p>
                      <p className="text-2xl font-bold text-primary">$1,250 <span className="text-base font-normal text-muted-foreground">each</span></p>
                      <p className="text-sm text-muted-foreground mt-1">Two payments per month</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-card-border hover-elevate transition-all">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-1">Weekly Payments</p>
                      <p className="text-2xl font-bold text-primary">$625 <span className="text-base font-normal text-muted-foreground">each</span></p>
                      <p className="text-sm text-muted-foreground mt-1">Four payments per month</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/30">
                  <p className="text-sm text-foreground/90">
                    <strong>Note:</strong> If you are paid bi-weekly or even weekly, we are flexible on payment plans to match your schedule.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-card rounded-lg p-8 border border-card-border text-center">
            <h3 className="font-serif font-bold text-3xl mb-4">Ready to Arrange a Payment Plan?</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Please feel free to reach out to us to arrange a payment schedule, if needed. We are happy to work with you and your budget!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/interest-form">
                <Button size="lg" variant="default" data-testid="button-submit-interest">
                  Submit Interest Form
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" data-testid="button-contact-payment">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
