
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-momentum-navy mb-6">Smart Business Funding</h2>
            <p className="text-xl text-momentum-gray max-w-3xl mx-auto">
              Flexible funding solutions designed to accelerate your business growth with competitive rates and transparent terms.
            </p>
          </div>

          {/* Main funding amount showcase */}
          <div className="bg-gradient-to-r from-momentum-navy to-momentum-navy-light rounded-3xl p-12 mb-16 text-white text-center">
            <div className="text-5xl md:text-6xl font-bold mb-4">Up to $2M available</div>
            <p className="text-xl mb-8 text-blue-100">Flexible funding amounts tailored to your business requirements</p>
            
            <Button 
              className="momentum-cta-button text-xl px-12 py-6 bg-momentum-green text-white hover:bg-momentum-green-light transition-all duration-300 transform hover:scale-105"
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
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-gradient-to-br from-momentum-light-blue to-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-momentum-green rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-momentum-navy mb-4">Rapid Processing</h3>
              <p className="text-momentum-gray text-lg">Experience swift approval decisions with our streamlined application process designed for busy entrepreneurs.</p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-momentum-light-blue to-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-momentum-green rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-momentum-navy mb-4">Bank-Grade Security</h3>
              <p className="text-momentum-gray text-lg">Your business data is safeguarded with enterprise-level security protocols and encryption technology.</p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-momentum-light-blue to-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-momentum-green rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-momentum-navy mb-4">Proven Track Record</h3>
              <p className="text-momentum-gray text-lg">Join the growing community of successful businesses that have achieved their goals with our funding solutions.</p>
            </div>
          </div>

          {/* Two column layout for detailed lists */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-10 shadow-xl border border-momentum-navy/10">
              <h3 className="text-3xl font-bold text-momentum-navy mb-8 text-center">Why Choose Us</h3>
              <ul className="space-y-5">
                <li className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-momentum-green mt-1 flex-shrink-0" />
                  <span className="text-lg text-momentum-gray">Simple application with minimal paperwork requirements</span>
                </li>
                <li className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-momentum-green mt-1 flex-shrink-0" />
                  <span className="text-lg text-momentum-gray">Competitive interest rates customized for your business</span>
                </li>
                <li className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-momentum-green mt-1 flex-shrink-0" />
                  <span className="text-lg text-momentum-gray">Personal support specialist assigned to your account</span>
                </li>
                <li className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-momentum-green mt-1 flex-shrink-0" />
                  <span className="text-lg text-momentum-gray">Complete transparency with no surprise fees or charges</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-xl border border-momentum-navy/10">
              <h3 className="text-3xl font-bold text-momentum-navy mb-8 text-center">Ideal Investment Areas</h3>
              <ul className="space-y-5">
                <li className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-momentum-green mt-1 flex-shrink-0" />
                  <span className="text-lg text-momentum-gray">Modern equipment and cutting-edge technology upgrades</span>
                </li>
                <li className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-momentum-green mt-1 flex-shrink-0" />
                  <span className="text-lg text-momentum-gray">Strategic inventory expansion and seasonal stock preparation</span>
                </li>
                <li className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-momentum-green mt-1 flex-shrink-0" />
                  <span className="text-lg text-momentum-gray">Working capital optimization and daily operational needs</span>
                </li>
                <li className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-momentum-green mt-1 flex-shrink-0" />
                  <span className="text-lg text-momentum-gray">Strategic growth initiatives and market expansion opportunities</span>
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
