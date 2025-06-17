
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface ApplicationFormProps {
  formData: {
    businessName: string;
    contactName: string;
    email: string;
    phone: string;
    businessType: string;
    desiredAmount: string;
  };
  handleInputChange: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  docusignUrl: string;
}

const ApplicationForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  isDialogOpen,
  setIsDialogOpen,
  docusignUrl
}: ApplicationFormProps) => {
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
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-momentum-navy mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-momentum-gray mb-10">
            Complete our secure application form and get approved fast!
          </p>
          
          <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto bg-momentum-navy hover:bg-momentum-navy-light text-white font-bold py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-base sm:text-lg">
                Start Your Application
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl w-[95vw] h-[95vh] p-0">
              <DialogHeader className="p-6 pb-2">
                <DialogTitle className="text-2xl font-bold text-momentum-navy">
                  Complete Your Application
                </DialogTitle>
              </DialogHeader>
              <div className="flex-1 px-6 pb-6 relative">
                {isIframeLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg">
                    <div className="flex flex-col items-center space-y-4">
                      <Loader2 className="h-8 w-8 animate-spin text-momentum-navy" />
                      <p className="text-momentum-navy font-medium">Loading application form...</p>
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
          
          <div className="mt-8 text-center">
            <p className="text-momentum-gray">
              Secure application process • Fast approval • No hidden fees
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
