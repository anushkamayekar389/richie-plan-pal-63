
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calculator, 
  Calendar, 
  Users, 
  FileText, 
  CreditCard, 
  Shield,
  Clock,
  TrendingUp 
} from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: FileText,
      title: "AI-Generated Financial Plans",
      description: "Create comprehensive, SEBI-compliant financial plans in minutes with our advanced AI engine."
    },
    {
      icon: Users,
      title: "Client Management",
      description: "Store client profiles, track goals, and manage relationships with intuitive client management tools."
    },
    {
      icon: Calculator,
      title: "Built-in Calculators",
      description: "Access the most-used financial calculators CFPs need for quick calculations and client presentations."
    },
    {
      icon: Calendar,
      title: "Smart Reminders",
      description: "Never miss a client review with automated reminders and Google Calendar integration."
    },
    {
      icon: TrendingUp,
      title: "Advisor Dashboard",
      description: "Get a complete overview of your practice with insights on client activities and pending tasks."
    },
    {
      icon: Shield,
      title: "Compliance First",
      description: "All financial plans are designed to meet SEBI and FPSB compliance requirements by default."
    },
    {
      icon: CreditCard,
      title: "Pay-As-You-Go",
      description: "Only ₹199 per financial plan. No monthly fees. Purchase credit packs for better rates."
    },
    {
      icon: Clock,
      title: "Time-Saving Automation",
      description: "Automate routine tasks and focus on what matters most - advising your clients."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Scale Your Practice
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Richie combines AI-powered plan generation with practical advisor tools to help you serve more clients efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
