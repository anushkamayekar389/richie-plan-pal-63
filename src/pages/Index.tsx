
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PricingSection } from "@/components/PricingSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header>
        <div className="ml-auto flex items-center gap-4">
          {!loading && (
            user ? (
              <Link to="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button>Sign In</Button>
              </Link>
            )
          )}
        </div>
      </Header>
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
