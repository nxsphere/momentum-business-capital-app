import React, { useState } from 'react';
import { Phone, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface HeroSectionProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  docusignUrl: string;
}

const HeroSection = ({
  isDialogOpen,
  setIsDialogOpen,
  docusignUrl
}: HeroSectionProps) => {
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsIframeLoading(false);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (open) {
      setIsIframeLoading(true);
    }
  };

  return (
    <section className="hero-background py-16 md:py-20 lg:py-24 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
            Get the Funding Your Business Needs
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-momentum-green">
            $7,500 - $150,000
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-blue-100 font-medium px-4">
            *Up to $2M for well qualified businesses
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 text-blue-100 font-medium px-4">
            Fast Approval, No Collateral Required
          </p>
          <div className="flex flex-col space-y-4 justify-center items-center px-4">
            <Button 
              className="momentum-cta-button text-lg md:text-xl animate-pulse-glow px-6 md:px-8 lg:px-[30px] py-6 md:py-8 lg:py-[30px] bg-[#54b64e] text-slate-50 w-full sm:w-auto max-w-md"
              onClick={() => {
                const applicationSection = document.querySelector("#application");
                if (applicationSection) {
                  applicationSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Apply Now - Get Approved Today!
            </Button>
            
            {/* Mobile-friendly phone call button */}
            <div className="md:hidden">
              <a
                href="tel:+13053075217"
                className="inline-flex items-center space-x-2 text-blue-100 hover:text-white transition-colors text-lg font-semibold"
              >
                <Phone className="h-5 w-5" />
                <span>Call (305) 307-5217</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
