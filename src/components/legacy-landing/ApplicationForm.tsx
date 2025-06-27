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
import { Loader2, ArrowRight } from "lucide-react";

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
  handleSubmit
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
        source: "funding-2",
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
          duration: 5000,
        });

        // Reset form after successful submission
        Object.keys(formData).forEach(key => {
          handleInputChange(key, '');
        });

        // Redirect after 2 seconds to DocuSign
        setTimeout(() => {
          const docusignUrl =
            "https://powerforms.docusign.net/5e57a70a-e1aa-4f44-9317-fe32ca8cbe9c?env=na2&acct=b1f42fe1-f327-4d9f-bc8b-f3155fc84586&accountId=b1f42fe1-f327-4d9f-bc8b-f3155fc84586";
          window.location.href = docusignUrl;
        }, 2000);
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
    <section id="application" className="py-20 bg-[#3b3b3b]">
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
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-6">
                    <Loader2 className="h-16 w-16 animate-spin text-[#54b64e]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#3b3b3b] mb-4">
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Your information has been sent and you will be redirected to DocuSign shortly.
                  </p>
                  <div className="text-sm text-gray-500">
                    Please wait while we redirect you...
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-[#3b3b3b] mb-4">Start Your Application</h3>
                    <p className="text-gray-600 mb-8">
                      Complete our secure form and get a decision within 24 hours
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-lg font-semibold text-[#3b3b3b] mb-3 text-left">
                          Business Name *
                        </label>
                        <Input
                          type="text"
                          required
                          value={formData.businessName}
                          onChange={(e) =>
                            handleInputChange("businessName", e.target.value)
                          }
                          className="w-full h-12 text-lg border-2 border-gray-200 focus:border-[#54b64e] rounded-xl"
                          placeholder="Your Business Name"
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-semibold text-[#3b3b3b] mb-3 text-left">
                          Contact Name *
                        </label>
                        <Input
                          type="text"
                          required
                          value={formData.contactName}
                          onChange={(e) =>
                            handleInputChange("contactName", e.target.value)
                          }
                          className="w-full h-12 text-lg border-2 border-gray-200 focus:border-[#54b64e] rounded-xl"
                          placeholder="Your Full Name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-lg font-semibold text-[#3b3b3b] mb-3 text-left">
                          Email *
                        </label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full h-12 text-lg border-2 border-gray-200 focus:border-[#54b64e] rounded-xl"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-semibold text-[#3b3b3b] mb-3 text-left">
                          Phone *
                        </label>
                        <Input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="w-full h-12 text-lg border-2 border-gray-200 focus:border-[#54b64e] rounded-xl"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-lg font-semibold text-[#3b3b3b] mb-3 text-left">
                          Business Type *
                        </label>
                        <Select 
                          value={formData.businessType} 
                          onValueChange={(value) => handleInputChange("businessType", value)}
                        >
                          <SelectTrigger className="w-full h-12 text-lg border-2 border-gray-200 focus:border-[#54b64e] rounded-xl">
                            <SelectValue placeholder="Select Business Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="restaurant">Restaurant</SelectItem>
                            <SelectItem value="service">Service</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="construction">Construction</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-lg font-semibold text-[#3b3b3b] mb-3 text-left">
                          Desired Amount *
                        </label>
                        <Select 
                          value={formData.desiredAmount} 
                          onValueChange={(value) => handleInputChange("desiredAmount", value)}
                        >
                          <SelectTrigger className="w-full h-12 text-lg border-2 border-gray-200 focus:border-[#54b64e] rounded-xl">
                            <SelectValue placeholder="Select Amount" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7500-25000">$7,500 - $25,000</SelectItem>
                            <SelectItem value="25000-50000">$25,000 - $50,000</SelectItem>
                            <SelectItem value="50000-100000">$50,000 - $100,000</SelectItem>
                            <SelectItem value="100000-150000">$100,000 - $150,000</SelectItem>
                            <SelectItem value="150000+">$150,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={handleFormSubmission}
                      disabled={isSubmitting}
                      className="bg-[#54b64e] hover:bg-[#4a9d45] text-white text-2xl font-bold py-8 px-16 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group w-full lg:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm text-gray-600 mt-8">
                    <div>✓ Secure SSL Encrypted</div>
                    <div>✓ No Hidden Fees</div>
                    <div>✓ Fast Approval</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm; 