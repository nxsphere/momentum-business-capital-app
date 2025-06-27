import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="shadow-md bg-slate-50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
          <div className="flex items-center space-x-3">
              <img 
                src="/assets/og-image.png" 
                alt="Momentum Business Capital" 
                className="h-8 md:h-10 w-auto" 
              />
          </div>

            {/* Desktop Phone Number */}
            <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-momentum-navy">
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">Call us today:</span>
                <a 
                  href="tel:+13053075217"
                  className="font-semibold text-lg hover:text-momentum-green transition-colors"
                >
                  (305) 307-5217
                </a>
              </div>
            </div>

            {/* Mobile Phone Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              <a 
                href="tel:+13053075217"
                className="hidden sm:flex items-center space-x-2 text-momentum-navy hover:text-momentum-green transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="font-semibold text-sm">(305) 307-5217</span>
              </a>
              
              {/* Mobile menu button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3 pt-4">
                <a 
                  href="tel:+13053075217"
                  className="flex items-center justify-center space-x-2 text-momentum-navy hover:text-momentum-green transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Phone className="h-4 w-4" />
                  <span className="font-semibold">(305) 307-5217</span>
                </a>
                <Button
                  className="momentum-cta-button w-full"
                  onClick={() => {
                    const applicationSection = document.querySelector("#application");
                    if (applicationSection) {
                      applicationSection.scrollIntoView({ behavior: "smooth" });
                    }
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Apply Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
