import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ApplicationFormProps {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  docusignUrl: string;
}

const ApplicationForm = ({ 
  isDialogOpen, 
  setIsDialogOpen, 
  docusignUrl 
}: ApplicationFormProps) => {
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
    <section className="py-20 bg-[#3b3b3b]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Fuel Your Business Growth?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of successful businesses that have secured funding through our platform. 
              Start your application today and get approved fast.
            </p>

            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-2xl">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-[#3b3b3b] mb-4">Start Your Application</h3>
                  <p className="text-gray-600 mb-8">
                    Complete our secure form and get a decision within 24 hours
                  </p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#54b64e] hover:bg-[#4a9d45] text-white text-2xl font-bold py-8 px-16 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group w-full lg:w-auto">
                      Start Application Now
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
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
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm text-gray-600 mt-8">
                  <div>✓ Secure SSL Encrypted</div>
                  <div>✓ No Hidden Fees</div>
                  <div>✓ Fast Approval</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm; 