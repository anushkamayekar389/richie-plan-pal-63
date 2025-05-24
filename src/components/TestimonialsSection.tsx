
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  
  const testimonials = [
    {
      name: "Priya Sharma",
      title: "Certified Financial Planner",
      company: "Mumbai",
      content: "Richie has completely transformed my practice. What used to take me 4-5 hours now takes just 30 minutes. The AI-generated plans are comprehensive, compliant, and my clients love the professional presentation.",
      rating: 5,
      highlight: "Saved 4+ hours per plan"
    },
    {
      name: "Rajesh Kumar",
      title: "Registered Investment Advisor", 
      company: "Bangalore",
      content: "The client management features and automated reminders have helped me stay on top of all my relationships. My practice has grown 40% since I started using Richie six months ago.",
      rating: 5,
      highlight: "40% practice growth"
    },
    {
      name: "Anil Patel",
      title: "Mutual Fund Distributor",
      company: "Ahmedabad", 
      content: "Finally, a tool built specifically for Indian financial advisors. The compliance features give me complete confidence, and the white-label reports look incredibly professional.",
      rating: 5,
      highlight: "100% compliance confidence"
    }
  ];

  return (
    <section id="testimonials" className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why CFPs Choose Richie
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            See how financial advisors across India are scaling their practices and serving clients better
          </p>
        </div>

        <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'md:grid-cols-3 gap-8'}`}>
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 md:p-8 relative">
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-blue-200 absolute top-4 right-4" />
                
                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Highlight badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-4">
                  {testimonial.highlight}
                </div>
                
                {/* Content */}
                <p className="text-gray-700 mb-6 italic leading-relaxed text-sm md:text-base">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</p>
                  <p className="text-gray-600 text-xs md:text-sm">{testimonial.title}</p>
                  <p className="text-blue-600 text-xs md:text-sm font-medium">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA after testimonials */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Ready to join these successful advisors?</p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg">
            Start Your Free Trial Today
          </button>
        </div>
      </div>
    </section>
  );
};
