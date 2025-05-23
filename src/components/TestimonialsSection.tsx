
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      title: "Certified Financial Planner, Mumbai",
      content: "Richie has transformed how I create financial plans. What used to take me 4-5 hours now takes 30 minutes. The AI-generated plans are comprehensive and always compliant.",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      title: "RIA, Bangalore",
      content: "The client management features and automated reminders have helped me stay on top of all my client relationships. My practice has grown 40% since using Richie.",
      rating: 5
    },
    {
      name: "Anil Patel",
      title: "MFD, Ahmedabad",
      content: "Finally, a tool built specifically for Indian financial advisors. The compliance features give me confidence, and my clients love the professional reports.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Financial Advisors Across India
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how Richie is helping CFPs, RIAs, and MFDs scale their practices and serve clients better.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
