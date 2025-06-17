
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
    <section className="hero-background py-24 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Get the Funding Your Business Needs
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-momentum-green">
            $7,500 - $150,000
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 font-medium">
            *Up to $2M for well qualified businesses
          </p>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 font-medium">
            Fast Approval, No Collateral Required
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center px-4 sm:px-0">
            <Button 
              className="momentum-cta-button text-xl animate-pulse-glow px-[30px] py-[30px] bg-[#54b64e] text-slate-50 mx-4 sm:mx-0"
              onClick={() => {
                const applicationSection = document.querySelector("#application");
                if (applicationSection) {
                  applicationSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
                         >
               Apply Now - Get Approved Today!
             </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
