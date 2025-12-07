import { Card, CardContent } from "@/components/ui/card";
import AnimatedHero from "@/components/layout/AnimatedHero";
import { BookOpen, Palette, Instagram } from "lucide-react";
import { ThreadsIcon } from "@/components/icons/ThreadsIcon";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AnimatedHero heightClass="h-80">
        <div className="max-w-4xl mx-auto px-6 text-center py-16">
          <h1 className="font-serif font-bold text-5xl md:text-6xl mb-4 text-white" data-testid="text-about-title">
            About ApexVerse
          </h1>
          <p className="text-lg text-white/90 leading-relaxed">
            Mark and Birdie have worked on multiple projects together, and through their mutual love for content, artwork, and overall client services, ApexVerse was born!
          </p>
        </div>
      </AnimatedHero>

      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-lg text-foreground/90 leading-relaxed max-w-3xl mx-auto">
              No project is too big or too small for us. We want to help everyone, from the debut indie authors just getting started all the way to experienced authors just wanting a break so they can focus on their writing.
            </p>
          </div>

          <div className="space-y-20">
            <Card className="overflow-hidden border-none shadow-lg">
              <div className="grid lg:grid-cols-2">
                <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="h-12 w-12 icon-secondary" />
                    </div>
                    <h3 className="font-serif font-bold text-3xl mb-2" data-testid="text-birdie-name">Birdie</h3>
                    <p className="text-lg text-muted-foreground">Publishing & Operations Specialist</p>
                  </div>
                </div>
                <CardContent className="p-12">
                  <div className="space-y-4 text-foreground/90 leading-relaxed">
                    <p>
                      Birdie released her debut novel in August 2025. Through self-publishing, she learned a lot about what it takes to get a book on the market. She understands how time-consuming all the extras can be that come with promoting books.
                    </p>
                    <p>
                      Birdie is organized and wants to see every author succeed. So whether you're just starting and have no clue where to even start, or you're a seasoned author who just needs help managing that email inbox and social media posting, <strong>Birdie's your girl</strong>.
                    </p>
                    <div className="mt-8 pt-6 border-t border-border">
                      <h4 className="font-semibold text-lg mb-3">Specialties</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Social Media Management</li>
                        <li>• Newsletter Creation & Distribution</li>
                        <li>• ARC & Street Team Management</li>
                        <li>• Publishing Platform Setup</li>
                        <li>• Author Website Management</li>
                      </ul>
                    </div>
                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="font-semibold text-lg mb-3">Connect with Birdie</h4>
                      <div className="flex gap-3">
                        <a
                          href="https://www.instagram.com/birdiejamesauthor?igsh=ZzBjZ2lhc2E1ZGth"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-md bg-muted hover-elevate active-elevate-2 transition-all"
                          aria-label="Birdie's Instagram"
                        >
                          <Instagram className="h-4 w-4 icon-default" />
                          <span className="text-sm">Instagram</span>
                        </a>
                        <a
                          href="https://www.threads.net/@birdiejamesauthor?igshid=NTc4MTIwNjQ2YQ=="
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-md bg-muted hover-elevate active-elevate-2 transition-all"
                          aria-label="Birdie's Threads"
                        >
                          <ThreadsIcon className="h-4 w-4 icon-default" />
                          <span className="text-sm">Threads</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>

            <Card className="overflow-hidden border-none shadow-lg">
              <div className="grid lg:grid-cols-2">
                <CardContent className="p-12 order-2 lg:order-1">
                  <div className="space-y-4 text-foreground/90 leading-relaxed">
                    <p>
                      Mark is a seasoned illustrator and really captures the image you're looking for. He has years of experience creating beautiful character art scenes, as well as graphics for websites, animations for book trailers, and everything in between.
                    </p>
                    <p>
                      Mark truly succeeds in making your vision come to life and always makes sure his work is clean and to your liking!
                    </p>
                    <div className="mt-8 pt-6 border-t border-border">
                      <h4 className="font-semibold text-lg mb-3">Specialties</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Character Art & Scenes</li>
                        <li>• Book Cover Design</li>
                        <li>• Chapter Headers</li>
                        <li>• Promotional Graphics</li>
                        <li>• Book Trailer Animations</li>
                        <li>• Book Mockups</li>
                      </ul>
                    </div>
                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="font-semibold text-lg mb-3">Connect with Mark</h4>
                      <div className="flex gap-3">
                        <a
                          href="https://www.instagram.com/marnus644?igsh=MXd4Z2l2eW1pbnF5Zg%3D%3D&utm_source=qr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-md bg-muted hover-elevate active-elevate-2 transition-all"
                          aria-label="Mark's Instagram"
                        >
                          <Instagram className="h-4 w-4" />
                          <span className="text-sm">Instagram</span>
                        </a>
                        <a
                          href="https://www.threads.net/@marnus644?igshid=NTc4MTIwNjQ2YQ=="
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-md bg-muted hover-elevate active-elevate-2 transition-all"
                          aria-label="Mark's Threads"
                        >
                          <ThreadsIcon className="h-4 w-4" />
                          <span className="text-sm">Threads</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-12 flex items-center justify-center order-1 lg:order-2">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                      <Palette className="h-12 w-12 icon-primary" />
                    </div>
                    <h3 className="font-serif font-bold text-3xl mb-2" data-testid="text-mark-name">Mark</h3>
                    <p className="text-lg text-muted-foreground">Lead Illustrator & Designer</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif font-bold text-4xl mb-6">Our Promise to You</h2>
          <p className="text-lg text-foreground/90 leading-relaxed">
            We want to ensure that every client is satisfied with our work. Please don't hesitate to reach out with any questions you may have! We really look forward to working with you on any project, large or small.
          </p>
        </div>
      </section>
    </div>
  );
}
