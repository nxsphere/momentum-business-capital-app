import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
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
    <section className="bg-[#3b3b3b] text-white py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Get Business Funding 
                <span className="text-[#54b64e] block">Fast & Simple</span>
              </h1>
              <div className="text-2xl lg:text-3xl font-semibold">
                <span className="text-[#54b64e]">$7,500 - $150,000</span>
                <p className="text-lg text-gray-300 mt-2">*Up to $2M for qualified businesses</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-[#54b64e] flex-shrink-0" />
                <span className="text-lg">No collateral required</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-[#54b64e] flex-shrink-0" />
                <span className="text-lg">Approval in 24 hours</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-[#54b64e] flex-shrink-0" />
                <span className="text-lg">Flexible repayment terms</span>
              </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
              <DialogTrigger asChild>
                <Button className="bg-[#54b64e] hover:bg-[#4a9d45] text-white text-xl font-bold py-6 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group">
                  Apply Now - Get Approved Today!
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl w-[95vw] h-[95vh] p-0">
                <DialogHeader className="p-6 pb-2">
                  <DialogTitle className="text-2xl font-bold text-[#3b3b3b]">
                    Complete Your Application
                  </DialogTitle>
                </DialogHeader>
                <div className="flex-1 px-6 pb-6 relative">
                  {isIframeLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg">
                      <div className="flex flex-col items-center space-y-4">
                        <Loader2 className="h-8 w-8 animate-spin text-[#54b64e]" />
                        <p className="text-[#3b3b3b] font-medium">Loading application form...</p>
                      </div>
                    </div>
                  )}
                  <iframe 
                    src={docusignUrl} 
                    className="w-full h-[calc(95vh-120px)] border-0 rounded-lg" 
                    title="DocuSign Application Form" 
                    sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-top-navigation"
                    onLoad={handleIframeLoad}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="text-center space-y-6">
                <div className="text-[#3b3b3b] text-4xl font-bold">
                  Get Funded in 
                  <span className="text-[#54b64e] block">24 Hours</span>
                </div>
                <div className="space-y-4 text-[#3b3b3b]">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span>Application Time:</span>
                    <span className="font-semibold text-[#54b64e]">5 minutes</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span>Approval Time:</span>
                    <span className="font-semibold text-[#54b64e]">24 hours</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span>Funding Time:</span>
                    <span className="font-semibold text-[#54b64e]">1-3 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 