import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Instagram, Send } from "lucide-react";
import { XIcon } from "@/components/icons/XIcon";
import { ThreadsIcon } from "@/components/icons/ThreadsIcon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import AnimatedHero from "@/components/layout/AnimatedHero";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: InsertContactSubmission) => {
    setIsSubmitting(true);
    try {
      const { apiRequest } = await import("@/lib/queryClient");
      await apiRequest("POST", "/api/contact", data);
      setSubmitSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      form.setError("root", {
        message: "Failed to send message. Please try again or email us directly."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <AnimatedHero heightClass="h-80">
        <div className="max-w-4xl mx-auto px-6 text-center py-16">
          <h1 className="font-serif font-bold text-5xl md:text-6xl mb-4 text-white" data-testid="text-contact-title">
            Contact Us
          </h1>
          <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
            We look forward to hearing from you! Reach out with any questions or to discuss your project.
          </p>
        </div>
      </AnimatedHero>

      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif font-bold text-3xl mb-6">Get in Touch</h2>
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                Have questions about our services, pricing, or how we can help with your project? Send us a message and we'll get back to you within 48 hours.
              </p>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail className="h-6 w-6 icon-primary" />
                      </div>
                      <div>
                        <CardTitle>Email</CardTitle>
                        <CardDescription className="text-base">
                          <a href="mailto:contact@apexverse.site" className="text-foreground hover:underline" data-testid="link-email">
                            contact@apexverse.site
                          </a>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Instagram className="h-6 w-6 icon-primary" />
                      </div>
                      <div>
                        <CardTitle>Official Social Media</CardTitle>
                        <CardDescription className="text-base space-y-2 mt-2">
                          <a
                            href="https://www.instagram.com/apexverse.site?igsh=NXRmZ3VrMzN6YjZx&utm_source=qr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-foreground hover:underline"
                          >
                            <Instagram className="h-4 w-4 icon-default" />
                            @apexverse.site
                          </a>
                          <a
                            href="https://www.threads.com/@apexverse.site?igshid=NTc4MTIwNjQ2YQ=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-foreground hover:underline"
                          >
                            <ThreadsIcon className="h-4 w-4 icon-default" />
                            @apexverse.site
                          </a>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-border">
                <h3 className="font-semibold text-lg mb-2">Response Time</h3>
                <p className="text-muted-foreground">
                  We aim to respond to all inquiries within 48 hours. For project submissions via our Interest Form, we'll reach out to discuss next steps and provide a detailed proposal.
                </p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-3xl">Send Us a Message</CardTitle>
                <CardDescription className="text-base">
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitSuccess ? (
                  <div className="py-12 text-center" data-testid="success-message">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 icon-primary" />
                    </div>
                    <h3 className="font-serif font-bold text-2xl mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. We'll get back to you within 48 hours.
                    </p>
                    <Button onClick={() => setSubmitSuccess(false)} variant="outline">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {form.formState.errors.root && (
                        <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm space-y-3">
                          <p>{form.formState.errors.root.message}</p>
                          <div className="pt-2">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="w-full"
                              onClick={() => {
                                const values = form.getValues();
                                const subject = encodeURIComponent(values.subject || "Contact Form Inquiry");
                                const body = encodeURIComponent(
                                  `Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`
                                );
                                window.location.href = `mailto:contact@apexverse.site?subject=${subject}&body=${body}`;
                              }}
                            >
                              Open in Email Client
                            </Button>
                          </div>
                        </div>
                      )}

                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} data-testid="input-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="What's this about?"
                                {...field}
                                value={field.value ?? ""}
                                data-testid="input-subject"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your project or ask us a question..."
                                rows={6}
                                {...field}
                                data-testid="input-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                        data-testid="button-submit-contact"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
