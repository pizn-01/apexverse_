import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Palette, BookOpen, Users } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedHero from "@/components/layout/AnimatedHero";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import MetricsDashboard from "@/components/MetricsDashboard";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <AnimatedHero>
        <motion.div
          className="max-w-5xl mx-auto px-6 py-20 text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.h1
            className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight"
            data-testid="text-hero-title"
            variants={{
              hidden: { y: 40, opacity: 0, filter: "blur(6px)", scale: 0.98 },
              show: { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            Just Two Creatives Looking to Make Your Dreams Come True
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={{ hidden: { y: 28, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.7, delay: 0.1 } } }}
          >
            Professional publishing services and stunning artwork for indie authors. From book formatting to character art, we bring your vision to life.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button size="lg" variant="default" className="text-lg px-8 backdrop-blur-sm" asChild data-testid="button-view-services">
                <Link href="/services">
                  View Our Services
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20" asChild data-testid="button-see-portfolio">
                <Link href="/portfolio">
                  See Our Work
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatedHero>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif font-bold text-4xl md:text-5xl mb-4" data-testid="text-why-choose">
              About Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We understand the author's journey because we've lived it. Let us handle the details while you focus on your craft.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="hover-elevate transition-all h-full">
                <CardHeader>
                  <motion.div
                    className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Palette className="h-6 w-6 icon-primary" />
                  </motion.div>
                  <CardTitle className="font-serif text-2xl">Professional Artwork</CardTitle>
                  <CardDescription>
                    Mark's years of experience bring your characters and stories to life with stunning illustrations and book covers.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="hover-elevate transition-all h-full">
                <CardHeader>
                  <motion.div
                    className="w-12 h-12 rounded-md bg-secondary/10 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <BookOpen className="h-6 w-6 icon-secondary" />
                  </motion.div>
                  <CardTitle className="font-serif text-2xl">Publishing Expertise</CardTitle>
                  <CardDescription>
                    Birdie navigates the self-publishing maze for you, from formatting to distribution, newsletters to social media.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="hover-elevate transition-all h-full">
                <CardHeader>
                  <motion.div
                    className="w-12 h-12 rounded-md bg-accent/10 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Users className="h-6 w-6 icon-accent" />
                  </motion.div>
                  <CardTitle className="font-serif text-2xl">Author-First Approach</CardTitle>
                  <CardDescription>
                    No project is too big or too small. We're here for debut indie authors and seasoned writers alike.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif font-bold text-4xl md:text-5xl mb-6">
                Choose Your Perfect Package
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Whether you need à la carte services, a complete launch kit, or full-service support, we have flexible options designed for every stage of your author journey.
              </p>

              <div className="space-y-6">
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <CheckCircle2 className="h-6 w-6 icon-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">À La Carte Services</h3>
                    <p className="text-muted-foreground">Pick exactly what you need, from book formatting to social media management.</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Launch Kits</h3>
                    <p className="text-muted-foreground">Comprehensive packages perfect for debut authors getting their first book out.</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Full Service Contract</h3>
                    <p className="text-muted-foreground">Everything handled for you. Focus entirely on writing your next masterpiece.</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href="/pricing">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button size="lg" variant="default" data-testid="button-view-pricing">
                      View Pricing
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            <MetricsDashboard />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSlider />

      <section className="py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-6">
            Ready to Bring Your Story to Life?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Let's work together to make your publishing dreams a reality. Fill out our interest form and we'll get back to you within 48 hours.
          </p>
          <Link href="/interest-form">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button size="lg" variant="default" className="text-lg px-10" data-testid="button-start-project">
                Start Your Project
              </Button>
            </motion.div>
          </Link>
        </div>
      </section>
    </div>
  );
}
