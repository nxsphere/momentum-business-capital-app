import React from 'react';
import { CheckCircle, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

interface FundingDetailsSectionProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  docusignUrl: string;
}

const FundingDetailsSection = ({ 
  isDialogOpen, 
  setIsDialogOpen, 
  docusignUrl 
}: FundingDetailsSectionProps) => {
  const [isIframeLoading, setIsIframeLoading] = React.useState(true);

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
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-momentum-navy mb-4 md:mb-6 px-4">
              Smart Business Funding
            </h2>
            <p className="text-lg md:text-xl text-momentum-gray max-w-3xl mx-auto px-4">
              Flexible funding solutions designed to accelerate your business growth with competitive rates and transparent terms.
            </p>
          </div>

          {/* Main funding amount showcase */}
          <div className="bg-gradient-to-r from-momentum-navy to-momentum-navy-light rounded-2xl md:rounded-3xl p-8 md:p-12 mb-12 md:mb-16 text-white text-center">
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 px-4">
              Up to $2M available
            </div>
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-blue-100 px-4">
              Flexible funding amounts tailored to your business requirements
            </p>
            
            <Button 
              className="momentum-cta-button text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 bg-momentum-green text-white hover:bg-momentum-green-light transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              onClick={() => {
                const applicationSection = document.querySelector("#application");
                if (applicationSection) {
                  applicationSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
                         >
               Apply Now
             </Button>
          </div>

          {/* Three column layout for key benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="text-center p-6 md:p-8 bg-gradient-to-br from-momentum-light-blue to-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-momentum-green rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Clock className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-momentum-navy mb-3 md:mb-4">
                Rapid Processing
              </h3>
              <p className="text-momentum-gray text-base md:text-lg leading-relaxed">
                Experience swift approval decisions with our streamlined application process designed for busy entrepreneurs.
              </p>
            </div>

            <div className="text-center p-6 md:p-8 bg-gradient-to-br from-momentum-light-blue to-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-momentum-green rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Shield className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-momentum-navy mb-3 md:mb-4">
                Bank-Grade Security
              </h3>
              <p className="text-momentum-gray text-base md:text-lg leading-relaxed">
                Your business data is safeguarded with enterprise-level security protocols and encryption technology.
              </p>
            </div>

            <div className="text-center p-6 md:p-8 bg-gradient-to-br from-momentum-light-blue to-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
              <div className="bg-momentum-green rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4 md:mb-6">
                <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-momentum-navy mb-3 md:mb-4">
                Proven Track Record
              </h3>
              <p className="text-momentum-gray text-base md:text-lg leading-relaxed">
                Join the growing community of successful businesses that have achieved their goals with our funding solutions.
              </p>
            </div>
          </div>

          {/* Two column layout for detailed lists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-momentum-navy/10">
              <h3 className="text-2xl md:text-3xl font-bold text-momentum-navy mb-6 md:mb-8 text-center">
                Why Choose Us
              </h3>
              <ul className="space-y-4 md:space-y-5">
                <li className="flex items-start space-x-3 md:space-x-4">
                  <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-momentum-green mt-1 flex-shrink-0" />
                  <span className="text-base md:text-lg text-momentum-gray leading-relaxed">
                    Simple application with minimal paperwork requirements
                  </span>
                </li>
                <li className="flex items-start space-x-3 md:space-x-4">
                  <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-momentum-green mt-1 flex-shrink-0" />
                  <span className="text-base md:text-lg text-momentum-gray leading-relaxed">
                    Competitive interest rates customized for your business
                  </span>
                </li>
                <li className="flex items-start space-x-3 md:space-x-4">
                  <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-momentum-green mt-1 flex-shrink-0" />
                  <span className="text-base md:text-lg text-momentum-gray leading-relaxed">
                    Personal support specialist assigned to your account
                  </span>
                </li>
                <li className="flex items-start space-x-3 md:space-x-4">
                  <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-momentum-green mt-1 flex-shrink-0" />
                  <span className="text-base md:text-lg text-momentum-gray leading-relaxed">
                    Complete transparency with no surprise fees or charges
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-momentum-navy/10">
              <h3 className="text-2xl md:text-3xl font-bold text-momentum-navy mb-6 md:mb-8 text-center">
                Ideal Investment Areas
              </h3>
              <ul className="space-y-4 md:space-y-5">
                <li className="flex items-start space-x-3 md:space-x-4">
                  <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-momentum-green mt-1 flex-shrink-0" />
                  <span className="text-base md:text-lg text-momentum-gray leading-relaxed">
                    Modern equipment and cutting-edge technology upgrades
                  </span>
                </li>
                <li className="flex items-start space-x-3 md:space-x-4">
                  <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-momentum-green mt-1 flex-shrink-0" />
                  <span className="text-base md:text-lg text-momentum-gray leading-relaxed">
                    Strategic inventory expansion and seasonal stock preparation
                  </span>
                </li>
                <li className="flex items-start space-x-3 md:space-x-4">
                  <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-momentum-green mt-1 flex-shrink-0" />
                  <span className="text-base md:text-lg text-momentum-gray leading-relaxed">
                    Working capital optimization and daily operational needs
                  </span>
                </li>
                <li className="flex items-start space-x-3 md:space-x-4">
                  <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-momentum-green mt-1 flex-shrink-0" />
                  <span className="text-base md:text-lg text-momentum-gray leading-relaxed">
                    Strategic growth initiatives and market expansion opportunities
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundingDetailsSection;
