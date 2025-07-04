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
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleFormSubmission = async () => {
    // Validate form data
    if (
      !formData.businessName ||
      !formData.contactName ||
      !formData.email ||
      !formData.phone ||
      !formData.businessType ||
      !formData.desiredAmount
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
      // Prepare form data for API submission
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString(),
        source: window.location.pathname.includes("funding-1") ? "funding-1" : "funding-2",
      };

      // Send data to our API endpoint
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success) {
        // Show success state in the form container
        setIsSuccess(true);
        
        // Also show toast notification
        toast({
          title: "Application Submitted Successfully!",
          description: "Your information has been sent. You will be redirected to DocuSign shortly.",
          duration: 5000, // Show for 5 seconds
        });

        // Reset form after successful submission
        Object.keys(formData).forEach(key => {
          handleInputChange(key, '');
        });

        // Redirect after 2 seconds to allow user to see success message
        setTimeout(() => {
          // Redirect to DocuSign PowerForms URL in the same tab after successful submission
          const docusignUrl =
            "https://powerforms.docusign.net/5e57a70a-e1aa-4f44-9317-fe32ca8cbe9c?env=na2&acct=b1f42fe1-f327-4d9f-bc8b-f3155fc84586&accountId=b1f42fe1-f327-4d9f-bc8b-f3155fc84586";
          window.location.href = docusignUrl;
        }, 2000); // 2 second delay
      } else {
        toast({
          title: "Submission Failed",
          description: result.message || "Failed to submit application. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Connection Error",
        description: "Unable to submit application. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="application" className="py-12 md:py-16 lg:py-20 section-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-momentum-navy mb-4 md:mb-6 px-4">
              Apply for Funding
            </h2>
            <p className="text-lg md:text-xl text-momentum-gray mb-6 md:mb-8 px-4">
              Get approved in as little as 24 hours
            </p>
          </div>

          <Card className="momentum-card">
            <CardContent className="p-6 md:p-8 lg:p-10">
              {isSuccess ? (
                <div className="text-center py-8 md:py-12">
                  <div className="flex justify-center mb-6">
                    <Loader2 className="h-12 w-12 md:h-16 md:w-16 animate-spin text-momentum-navy" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-momentum-navy mb-4">
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-base md:text-lg text-momentum-gray mb-4 px-4">
                    Your information has been sent and you will be redirected to DocuSign shortly.
                  </p>
                  <div className="text-sm text-momentum-gray">
                    Please wait while we redirect you...
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div>
                      <label className="block text-base md:text-lg font-semibold text-momentum-navy mb-2 md:mb-3">
                      Business Name *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) =>
                        handleInputChange("businessName", e.target.value)
                      }
                        className="w-full h-11 md:h-12 text-base md:text-lg border-2 border-gray-200 focus:border-momentum-navy rounded-xl"
                      placeholder="Your Business Name"
                    />
                  </div>
                  <div>
                      <label className="block text-base md:text-lg font-semibold text-momentum-navy mb-2 md:mb-3">
                      Contact Name *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) =>
                        handleInputChange("contactName", e.target.value)
                      }
                        className="w-full h-11 md:h-12 text-base md:text-lg border-2 border-gray-200 focus:border-momentum-navy rounded-xl"
                      placeholder="Your Full Name"
                    />
                  </div>
                </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div>
                      <label className="block text-base md:text-lg font-semibold text-momentum-navy mb-2 md:mb-3">
                      Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                        className="w-full h-11 md:h-12 text-base md:text-lg border-2 border-gray-200 focus:border-momentum-navy rounded-xl"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                      <label className="block text-base md:text-lg font-semibold text-momentum-navy mb-2 md:mb-3">
                      Phone *
                    </label>
                    <Input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                        className="w-full h-11 md:h-12 text-base md:text-lg border-2 border-gray-200 focus:border-momentum-navy rounded-xl"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div>
                      <label className="block text-base md:text-lg font-semibold text-momentum-navy mb-2 md:mb-3">
                      Business Type *
                    </label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) =>
                        handleInputChange("businessType", value)
                      }
                    >
                        <SelectTrigger className="h-11 md:h-12 text-base md:text-lg border-2 border-gray-200 focus:border-momentum-navy rounded-xl">
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
                      <label className="block text-base md:text-lg font-semibold text-momentum-navy mb-2 md:mb-3">
                      Desired Amount *
                    </label>
                    <Select
                      value={formData.desiredAmount}
                      onValueChange={(value) =>
                        handleInputChange("desiredAmount", value)
                      }
                    >
                        <SelectTrigger className="h-11 md:h-12 text-base md:text-lg border-2 border-gray-200 focus:border-momentum-navy rounded-xl">
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
                    className="momentum-cta-button w-full text-lg md:text-xl py-4 md:py-6 mt-6 md:mt-8"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>

                  <p className="text-momentum-gray text-center leading-relaxed text-sm md:text-base px-4">
                  By submitting this form, you agree to our terms and privacy
                  policy. A representative will contact you within 24 Business
                  hours.
                </p>
              </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
