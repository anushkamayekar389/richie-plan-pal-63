
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export const PricingSection = () => {
  const pricingPlans = [
    {
      name: "Pay-As-You-Go",
      price: "₹199",
      period: "per financial plan",
      description: "Perfect for new advisors or those with occasional planning needs",
      features: [
        "AI-generated financial plans",
        "Basic client management",
        "Standard calculators",
        "Email support",
        "SEBI/FPSB compliant reports"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Credit Pack - 20",
      price: "₹3,499",
      period: "20 financial plans",
      description: "Best for growing practices. Save ₹481 compared to pay-as-you-go",
      features: [
        "All pay-as-you-go features",
        "Advanced client management",
        "Smart reminders",
        "Google Calendar sync",
        "Priority email support",
        "6 months validity"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Credit Pack - 50",
      price: "₹7,999",
      period: "50 financial plans",
      description: "For established advisors. Save ₹1,951 compared to pay-as-you-go",
      features: [
        "All previous features",
        "Team collaboration",
        "Advanced dashboard",
        "Custom branding options",
        "Phone support",
        "12 months validity"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free, pay only when you generate plans. No monthly fees, no hidden costs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200 shadow-lg'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need a custom plan for your firm? We offer enterprise solutions for teams of 10+ advisors.
          </p>
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            Contact Enterprise Sales
          </Button>
        </div>
      </div>
    </section>
  );
};
