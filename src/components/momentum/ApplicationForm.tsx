import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface FormData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  desiredAmount: string;
}

interface ApplicationFormProps {
  formData: FormData;
  handleInputChange: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ApplicationForm = ({
  formData,
  handleInputChange,
  handleSubmit,
}: ApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFormSubmission = async () => {
    // Validate form data
    if (
      !formData.businessName ||
      !formData.contactName ||
      !formData.email ||
      !formData.phone
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData: FormSubmissionData = {
        ...formData,
        timestamp: new Date().toISOString(),
        source: window.location.pathname.includes("funding-1")
          ? "funding-1"
          : "funding-2",
      };

      const result = await submitApplicationForm(submissionData);

      if (result.success) {
        // Open DocuSign after successful submission
        setIsIframeLoading(true); // Reset loading state when opening dialog
        setIsDialogOpen(true);
      } else {
        toast({
          title: "Submission Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="application" className="py-20 section-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-momentum-navy mb-6">
              Apply for Funding
            </h2>
            <p className="text-xl text-momentum-gray">
              Get your approval in as little as 24 hours
            </p>
          </div>

          <Card className="momentum-card">
            <CardContent className="p-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-lg font-semibold text-momentum-navy mb-3">
                      Business Name *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) =>
                        handleInputChange("businessName", e.target.value)
                      }
                      className="w-full h-12 text-lg border-2 border-gray-200 focus:border-momentum-navy rounded-xl"
                      placeholder="Your Business Name"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-semibold text-momentum-navy mb-3">
                      Contact Name *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) =>
                        handleInputChange("contactName", e.target.value)
                      }
                      className="w-full h-12 text-lg border-2 border-gray-200 focus:border-momentum-navy rounded-xl"
                      placeholder="Your Full Name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-lg font-semibold text-momentum-navy mb-3">
                      Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full h-12 text-lg border-2 border-gray-200 focus:border-momentum-navy rounded-xl"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-semibold text-momentum-navy mb-3">
                      Phone *
                    </label>
                    <Input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full h-12 text-lg border-2 border-gray-200 focus:border-momentum-navy rounded-xl"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-lg font-semibold text-momentum-navy mb-3">
                      Business Type *
                    </label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) =>
                        handleInputChange("businessType", value)
                      }
                    >
                      <SelectTrigger className="h-12 text-lg border-2 border-gray-200 focus:border-momentum-navy rounded-xl">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="service">Service</SelectItem>
                        <SelectItem value="manufacturing">
                          Manufacturing
                        </SelectItem>
                        <SelectItem value="construction">
                          Construction
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-lg font-semibold text-momentum-navy mb-3">
                      Desired Amount *
                    </label>
                    <Select
                      value={formData.desiredAmount}
                      onValueChange={(value) =>
                        handleInputChange("desiredAmount", value)
                      }
                    >
                      <SelectTrigger className="h-12 text-lg border-2 border-gray-200 focus:border-momentum-navy rounded-xl">
                        <SelectValue placeholder="Select amount range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7500-25000">
                          $7,500 - $25,000
                        </SelectItem>
                        <SelectItem value="25000-50000">
                          $25,000 - $50,000
                        </SelectItem>
                        <SelectItem value="50000-100000">
                          $50,000 - $100,000
                        </SelectItem>
                        <SelectItem value="100000-150000">
                          $100,000 - $150,000
                        </SelectItem>
                        <SelectItem value="150000+">$150,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleFormSubmission}
                  disabled={isSubmitting}
                  className="momentum-cta-button w-full text-xl py-6 mt-8"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <div style={{ display: "none" }} />
                  </DialogTrigger>
                  <DialogContent className="max-w-7xl w-[95vw] h-[95vh] p-0">
                    <DialogHeader className="p-6 pb-2">
                      <DialogTitle className="text-2xl font-bold text-momentum-navy">
                        Complete Your Application
                      </DialogTitle>
                      <DialogDescription className="text-momentum-gray">
                        Please complete the DocuSign form to finalize your
                        funding application.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 px-6 pb-6 relative">
                      {isIframeLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg z-10">
                          <div className="flex flex-col items-center space-y-4">
                            <Loader2 className="h-12 w-12 animate-spin text-momentum-navy" />
                            <div className="text-center">
                              <p className="text-momentum-navy font-medium text-lg">
                                Loading DocuSign...
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      <iframe
                        src={docusignUrl}
                        className="w-full h-[calc(95vh-120px)] border-0 rounded-lg"
                        title="DocuSign Application Form"
                        sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-top-navigation allow-top-navigation-by-user-activation allow-presentation allow-downloads"
                        allow="geolocation 'none'; microphone 'none'; camera 'none'"
                        onLoad={() => setIsIframeLoading(false)}
                        onError={() => {
                          console.error("DocuSign iframe failed to load");
                          setIsIframeLoading(false);
                        }}
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    </div>
                  </DialogContent>
                </Dialog>

                <p className="text-momentum-gray text-center leading-relaxed">
                  By submitting this form, you agree to our terms and privacy
                  policy. A representative will contact you within 24 Business
                  hours.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
