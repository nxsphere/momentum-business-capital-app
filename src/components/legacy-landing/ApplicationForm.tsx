import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

interface ApplicationFormProps {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

const ApplicationForm = ({ 
  formData,
  handleInputChange,
  handleSubmit,
  isDialogOpen, 
  setIsDialogOpen 
}: ApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
    <section id="application-form" className="py-8 lg:py-16 bg-gradient-to-br from-[#3b3b3b] via-[#2d2d2d] to-[#1a1a1a] min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-8 lg:mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl xl:text-6xl font-bold text-white mb-6">
            Ready to Fuel Your 
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"> Business Growth</span>?
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful businesses that have secured funding through our platform. 
            Complete our secure application and get approved as fast as 24 hours.
          </p>
        </div>

        {/* Form Section - Responsive */}
        <div className="relative w-full max-w-6xl mx-auto animate-slide-up">
          {/* Background decoration */}
          <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-3xl blur-xl opacity-20"></div>
          
          {/* Main form container */}
          <div id="application-form-container" className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden w-full">
            {/* Trust indicators bar */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 px-4 lg:px-8 py-3 lg:py-4 border-b border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4 text-center text-xs lg:text-sm">
                <div className="flex items-center justify-center gap-2 text-green-700">
                  <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-medium">256-bit SSL Encrypted</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-blue-700">
                  <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-medium">No Hidden Fees</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-purple-700">
                  <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-medium">Competitive Rates</span>
                </div>
              </div>
            </div>

            {/* Application Form Content */}
            <div className="p-6 md:p-8 lg:p-10">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8 md:mb-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 md:mb-6">
                    Apply for Funding
                  </h3>
                  <p className="text-lg md:text-xl text-slate-600 mb-6 md:mb-8">
                    Get approved in as little as 24 hours
                  </p>
                </div>

                <Card className="bg-white border-2 border-slate-200 shadow-xl">
                  <CardContent className="p-6 md:p-8 lg:p-10">
                    {isSuccess ? (
                      <div className="text-center py-8 md:py-12">
                        <div className="flex justify-center mb-6">
                          <Loader2 className="h-12 w-12 md:h-16 md:w-16 animate-spin text-slate-700" />
                        </div>
                        <h4 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
                          Application Submitted Successfully!
                        </h4>
                        <p className="text-base md:text-lg text-slate-600 mb-4 px-4">
                          Your information has been sent and you will be redirected to DocuSign shortly.
                        </p>
                        <div className="text-sm text-slate-500">
                          Please wait while we redirect you...
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                          <div>
                            <label className="block text-base md:text-lg font-semibold text-slate-700 mb-2 md:mb-3">
                              Business Name *
                            </label>
                            <Input
                              type="text"
                              required
                              value={formData.businessName}
                              onChange={(e) =>
                                handleInputChange("businessName", e.target.value)
                              }
                              className="w-full h-11 md:h-12 text-base md:text-lg border-2 border-slate-300 focus:border-slate-600 rounded-xl"
                              placeholder="Your Business Name"
                            />
                          </div>
                          <div>
                            <label className="block text-base md:text-lg font-semibold text-slate-700 mb-2 md:mb-3">
                              Contact Name *
                            </label>
                            <Input
                              type="text"
                              required
                              value={formData.contactName}
                              onChange={(e) =>
                                handleInputChange("contactName", e.target.value)
                              }
                              className="w-full h-11 md:h-12 text-base md:text-lg border-2 border-slate-300 focus:border-slate-600 rounded-xl"
                              placeholder="Your Full Name"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                          <div>
                            <label className="block text-base md:text-lg font-semibold text-slate-700 mb-2 md:mb-3">
                              Email *
                            </label>
                            <Input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                              className="w-full h-11 md:h-12 text-base md:text-lg border-2 border-slate-300 focus:border-slate-600 rounded-xl"
                              placeholder="your@email.com"
                            />
                          </div>
                          <div>
                            <label className="block text-base md:text-lg font-semibold text-slate-700 mb-2 md:mb-3">
                              Phone *
                            </label>
                            <Input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) =>
                                handleInputChange("phone", e.target.value)
                              }
                              className="w-full h-11 md:h-12 text-base md:text-lg border-2 border-slate-300 focus:border-slate-600 rounded-xl"
                              placeholder="(555) 123-4567"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                          <div>
                            <label className="block text-base md:text-lg font-semibold text-slate-700 mb-2 md:mb-3">
                              Business Type *
                            </label>
                            <Select
                              value={formData.businessType}
                              onValueChange={(value) =>
                                handleInputChange("businessType", value)
                              }
                            >
                              <SelectTrigger className="h-11 md:h-12 text-base md:text-lg border-2 border-slate-300 focus:border-slate-600 rounded-xl">
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
                            <label className="block text-base md:text-lg font-semibold text-slate-700 mb-2 md:mb-3">
                              Desired Amount *
                            </label>
                            <Select
                              value={formData.desiredAmount}
                              onValueChange={(value) =>
                                handleInputChange("desiredAmount", value)
                              }
                            >
                              <SelectTrigger className="h-11 md:h-12 text-base md:text-lg border-2 border-slate-300 focus:border-slate-600 rounded-xl">
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
                          className="w-full text-lg md:text-xl py-4 md:py-6 mt-6 md:mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Submitting Application...
                            </>
                          ) : (
                            "Submit Application & Continue to DocuSign"
                          )}
                        </Button>

                        <p className="text-slate-600 text-center leading-relaxed text-sm md:text-base px-4">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm; 