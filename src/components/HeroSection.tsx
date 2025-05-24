
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, FileText, CheckCircle, Star } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const HeroSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Trust indicators */}
          <div className="flex justify-center items-center gap-2 mb-6 text-sm text-blue-600">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-medium">Trusted by 500+ CFPs across India</span>
            <Star className="h-4 w-4 fill-current" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Create SEBI-Compliant
            <span className="text-blue-600 block mt-2">Financial Plans in Minutes</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The only AI-powered platform built specifically for India's financial advisors. 
            Generate comprehensive plans, manage clients effortlessly, and scale your practice with confidence.
          </p>

          {/* Key benefits */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-10 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>5-minute plan generation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>SEBI & FPSB compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>White-label ready</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto text-blue-600 border-blue-600 hover:bg-blue-50 text-lg px-8 py-4 rounded-lg"
            >
              Watch 2-Min Demo
            </Button>
          </div>

          {/* Social proof */}
          <p className="text-sm text-gray-500 mb-12">
            Join CFPs from ICICI Prudential, HDFC Bank, and 100+ RIA firms already using Richie
          </p>

          {/* Feature highlights grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Generated Plans</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Comprehensive financial plans in 5 minutes instead of 5 hours
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Client Hub</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Centralized client data with automated review reminders
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">White-Label Reports</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Professional, branded financial plans ready for clients
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
