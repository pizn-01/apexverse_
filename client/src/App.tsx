import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import DiscordFloatingButton from "@/components/DiscordFloatingButton";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ServicesPage from "@/pages/ServicesPage";
import PricingPage from "@/pages/PricingPage";
import TimeframesPage from "@/pages/TimeframesPage";
import InterestFormPage from "@/pages/InterestFormPage";
import PaymentPlansPage from "@/pages/PaymentPlansPage";
import PortfolioPage from "@/pages/PortfolioPage";
import PoliciesPage from "@/pages/PoliciesPage";
import ContactPage from "@/pages/ContactPage";
import TestimonialsAdminPage from "@/pages/TestimonialsAdminPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/timeframes" component={TimeframesPage} />
      <Route path="/interest-form" component={InterestFormPage} />
      <Route path="/payment-plans" component={PaymentPlansPage} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/policies" component={PoliciesPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/admin/testimonials" component={TestimonialsAdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
          <DiscordFloatingButton />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
