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

  const handleFormSubmission = () => {
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

    // Open DocuSign PowerForms URL in new tab
    const docusignUrl =
      "https://powerforms.docusign.net/5e57a70a-e1aa-4f44-9317-fe32ca8cbe9c?env=na2&acct=b1f42fe1-f327-4d9f-bc8b-f3155fc84586&accountId=b1f42fe1-f327-4d9f-bc8b-f3155fc84586";
    window.open(docusignUrl, "_blank", "noopener,noreferrer");

    toast({
      title: "Redirecting to Application",
      description: "Opening DocuSign application form in a new tab.",
    });
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
                  className="momentum-cta-button w-full text-xl py-6 mt-8"
                >
                  Submit Application
                </Button>

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
