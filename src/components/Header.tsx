
import { Button } from "@/components/ui/button";
import { Calculator, Menu, X } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  children?: React.ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Calculator className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Richie</span>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Success Stories
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              About
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {children ? children : (
              <>
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  Sign In
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                  Start Free Trial
                </Button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a 
                href="#features" 
                className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#testimonials" 
                className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Success Stories
              </a>
              <a 
                href="#pricing" 
                className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <a 
                href="#about" 
                className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <div className="pt-4 space-y-2 border-t border-gray-100 mt-4">
                {children ? children : (
                  <>
                    <Button variant="outline" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">
                      Sign In
                    </Button>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg">
                      Start Free Trial
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
