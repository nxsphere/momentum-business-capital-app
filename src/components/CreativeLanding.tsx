import React, { useState, useEffect } from 'react';
import { ArrowUp, Shield, Clock, DollarSign, CheckCircle, Star, Zap, TrendingUp, Award, Users, ArrowRight, Phone, Mail, MapPin, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { sanitizeAndValidateFormData } from '@/utils/security';

interface FormData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  desiredAmount: string;
}

const CreativeLanding = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    desiredAmount: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationResult = sanitizeAndValidateFormData(formData);
    if (!validationResult.isValid) {
      console.error('Form validation errors:', validationResult.errors);
      return;
    }
    console.log('Form submitted with sanitized data:', validationResult.sanitizedData);
  };

  const handleFormSubmission = async () => {
    if (!formData.businessName || !formData.contactName || !formData.email || !formData.phone || !formData.businessType || !formData.desiredAmount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString(),
        source: "creative-landing",
      };

      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        toast({
          title: "Application Submitted Successfully!",
          description: "Your information has been sent. You will be redirected to DocuSign shortly.",
          duration: 5000,
        });

        Object.keys(formData).forEach(key => {
          handleInputChange(key, '');
        });

        setTimeout(() => {
          window.location.href = "https://powerforms.docusign.net/5e57a70a-e1aa-4f44-9317-fe32ca8cbe9c?env=na2&acct=b1f42fe1-f327-4d9f-bc8b-f3155fc84586&accountId=b1f42fe1-f327-4d9f-bc8b-f3155fc84586";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-white overflow-hidden">
      
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[rgb(84,182,78)] rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-600 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-5"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-md bg-white/80 border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/assets/og-image.png" alt="Momentum Business Capital" className="h-10 w-auto" />
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-800">
              <Phone className="h-4 w-4 text-[rgb(84,182,78)]" />
              <span className="text-sm font-medium">Call us today:</span>
              <span className="font-semibold text-lg text-[rgb(84,182,78)]">(305) 307-5217</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-32 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="animate-fade-in-up">
              <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-gray-100 to-[rgb(84,182,78)] bg-clip-text text-transparent leading-tight">
                Business Capital Solutions
              </h1>
              <div className="text-4xl md:text-6xl font-bold mb-6 text-[rgb(84,182,78)]">
                $7,500 - $150,000
              </div>
              <p className="text-xl md:text-2xl mb-8 text-gray-300 font-light">
                *Up to $2M for qualified businesses
              </p>
              <p className="text-2xl md:text-3xl mb-12 text-white font-medium">
                Professional Funding • Streamlined Process • Proven Results
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Button 
                  className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-[rgb(84,182,78)] to-green-700 hover:from-green-600 hover:to-green-800 rounded-lg shadow-2xl hover:shadow-[rgb(84,182,78)]/20 transition-all duration-300 transform hover:scale-105 text-white"
                  onClick={() => {
                    document.querySelector("#application")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <TrendingUp className="mr-2 h-6 w-6" />
                  Apply for Funding
                </Button>
              </div>

              {/* Professional Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="text-3xl font-bold text-[rgb(84,182,78)] mb-2">24hrs</div>
                  <div className="text-sm text-gray-300">Approval Time</div>
                </div>
                <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="text-3xl font-bold text-slate-300 mb-2">10k+</div>
                  <div className="text-sm text-gray-300">Businesses Funded</div>
                </div>
                <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="text-3xl font-bold text-gray-300 mb-2">$2M</div>
                  <div className="text-sm text-gray-300">Maximum Funding</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-[rgb(84,182,78)] bg-clip-text text-transparent">
              Why Choose Momentum?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Professional funding solutions designed for serious business growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="backdrop-blur-md bg-white/5 border border-white/10 text-center group hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-8">
                <div className="mx-auto w-20 h-20 bg-gradient-to-r from-[rgb(84,182,78)] to-green-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">No Collateral Required</h3>
                <p className="text-gray-300">
                  Secure funding without putting your personal or business assets at risk. Revenue-based qualification process.
                </p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/5 border border-white/10 text-center group hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-8">
                <div className="mx-auto w-20 h-20 bg-gradient-to-r from-slate-600 to-gray-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Clock className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Rapid Approval Process</h3>
                <p className="text-gray-300">
                  Get approved in as little as 24 hours. Our streamlined underwriting process delivers results quickly.
                </p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/5 border border-white/10 text-center group hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-8">
                <div className="mx-auto w-20 h-20 bg-gradient-to-r from-gray-600 to-slate-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <DollarSign className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Flexible Terms</h3>
                <p className="text-gray-300">
                  Customize repayment terms to align with your business cash flow. Transparent pricing with no hidden fees.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Funding Details */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main CTA */}
            <div className="backdrop-blur-md bg-gradient-to-r from-slate-700/20 to-[rgb(84,182,78)]/20 rounded-2xl p-16 text-center mb-16 border border-white/10">
              <h2 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-[rgb(84,182,78)] to-white bg-clip-text text-transparent">
                Up to $2M
              </h2>
              <p className="text-2xl mb-8 text-gray-200">Available for Strategic Business Growth</p>
              <Button 
                className="px-16 py-8 text-2xl font-bold bg-gradient-to-r from-[rgb(84,182,78)] to-green-700 hover:from-green-600 hover:to-green-800 rounded-lg shadow-2xl hover:shadow-[rgb(84,182,78)]/20 transition-all duration-300 transform hover:scale-105 text-white"
                onClick={() => {
                  document.querySelector("#application")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Begin Application
              </Button>
            </div>

            {/* Funding Tiers */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="backdrop-blur-md bg-white/5 rounded-xl p-8 text-center border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-4xl font-bold text-[rgb(84,182,78)] mb-4">$7,500 - $50,000</div>
                <h3 className="text-2xl font-semibold text-white mb-3">Growth Capital</h3>
                <p className="text-gray-300">Ideal for expanding operations and new opportunities</p>
              </div>

              <div className="backdrop-blur-md bg-gradient-to-r from-[rgb(84,182,78)]/10 to-green-600/10 rounded-xl p-8 text-center border-2 border-[rgb(84,182,78)]/50 transform scale-105">
                <div className="text-4xl font-bold text-[rgb(84,182,78)] mb-4">$50,000 - $150,000</div>
                <h3 className="text-2xl font-semibold text-white mb-3">Business Expansion</h3>
                <p className="text-gray-300">Perfect for significant growth initiatives</p>
                <Badge className="mt-4 bg-[rgb(84,182,78)] text-white">Most Popular</Badge>
              </div>

              <div className="backdrop-blur-md bg-white/5 rounded-xl p-8 text-center border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-4xl font-bold text-slate-300 mb-4">$150,000 - $2M</div>
                <h3 className="text-2xl font-semibold text-white mb-3">Enterprise Funding</h3>
                <p className="text-gray-300">For large-scale strategic investments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-[rgb(84,182,78)] bg-clip-text text-transparent">
                Submit Your Application
              </h2>
              <p className="text-xl text-gray-300 mb-8">Professional review and approval in 24 hours</p>
            </div>

            <Card className="backdrop-blur-md bg-white/5 border border-white/10">
              <CardContent className="p-10">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <div className="flex justify-center mb-6">
                      <Loader2 className="h-16 w-16 animate-spin text-[rgb(84,182,78)]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Application Submitted Successfully
                    </h3>
                    <p className="text-lg text-gray-300 mb-4">
                      Your application is being processed. You will be redirected to DocuSign shortly.
                    </p>
                    <p className="text-sm text-gray-400">Please wait while we redirect you...</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-lg font-semibold text-white mb-3">
                          Business Name *
                        </label>
                        <Input
                          type="text"
                          required
                          value={formData.businessName}
                          onChange={(e) => handleInputChange("businessName", e.target.value)}
                          className="w-full h-12 text-lg bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-[rgb(84,182,78)] rounded-lg backdrop-blur-md"
                          placeholder="Your Business Name"
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-semibold text-white mb-3">
                          Contact Name *
                        </label>
                        <Input
                          type="text"
                          required
                          value={formData.contactName}
                          onChange={(e) => handleInputChange("contactName", e.target.value)}
                          className="w-full h-12 text-lg bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-[rgb(84,182,78)] rounded-lg backdrop-blur-md"
                          placeholder="Your Full Name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-lg font-semibold text-white mb-3">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="w-full h-12 text-lg bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-[rgb(84,182,78)] rounded-lg backdrop-blur-md"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-semibold text-white mb-3">
                          Phone Number *
                        </label>
                        <Input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="w-full h-12 text-lg bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-[rgb(84,182,78)] rounded-lg backdrop-blur-md"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-lg font-semibold text-white mb-3">
                          Business Type *
                        </label>
                        <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                          <SelectTrigger className="w-full h-12 text-lg bg-white/5 border-white/20 text-white focus:border-[rgb(84,182,78)] rounded-lg backdrop-blur-md">
                            <SelectValue placeholder="Select Business Type" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-white/20 text-white">
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
                        <label className="block text-lg font-semibold text-white mb-3">
                          Funding Amount *
                        </label>
                        <Select value={formData.desiredAmount} onValueChange={(value) => handleInputChange("desiredAmount", value)}>
                          <SelectTrigger className="w-full h-12 text-lg bg-white/5 border-white/20 text-white focus:border-[rgb(84,182,78)] rounded-lg backdrop-blur-md">
                            <SelectValue placeholder="Select Amount" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-white/20 text-white">
                            <SelectItem value="7500-25000">$7,500 - $25,000</SelectItem>
                            <SelectItem value="25000-50000">$25,000 - $50,000</SelectItem>
                            <SelectItem value="50000-100000">$50,000 - $100,000</SelectItem>
                            <SelectItem value="100000-150000">$100,000 - $150,000</SelectItem>
                            <SelectItem value="150000+">$150,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="text-center pt-4">
                      <Button
                        type="button"
                        onClick={handleFormSubmission}
                        disabled={isSubmitting}
                        className="px-16 py-6 text-2xl font-bold bg-gradient-to-r from-[rgb(84,182,78)] to-green-700 hover:from-green-600 hover:to-green-800 rounded-lg shadow-2xl hover:shadow-[rgb(84,182,78)]/20 transition-all duration-300 transform hover:scale-105 text-white"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Submit Application
                            <ArrowRight className="ml-3 h-6 w-6" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6">
            <Badge className="text-lg px-8 py-4 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg">
              <Shield className="mr-2 h-5 w-5" />
              Bank-Grade Security
            </Badge>
            <Badge className="text-lg px-8 py-4 bg-gradient-to-r from-[rgb(84,182,78)] to-green-700 text-white rounded-lg">
              <Users className="mr-2 h-5 w-5" />
              10,000+ Businesses Funded
            </Badge>
            <Badge className="text-lg px-8 py-4 bg-gradient-to-r from-gray-600 to-slate-700 text-white rounded-lg">
              <Award className="mr-2 h-5 w-5" />
              A+ Business Rating
            </Badge>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 backdrop-blur-md bg-white/5 border-t border-white/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-6 text-white">Momentum Business Capital</h3>
            </div>
            
            <div className="space-y-4 text-gray-300 mb-8">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="h-5 w-5 text-[rgb(84,182,78)]" />
                <span className="font-semibold text-[rgb(84,182,78)]">(305) 307-5217</span>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="h-5 w-5 text-slate-400" />
                <span>4014 Chase Avenue, Suite 212, Miami Beach, FL 33140</span>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span>info@momentumbusinesscapital.com</span>
              </div>
              
              <a 
                href="https://www.linkedin.com/company/momentum-business-capital/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 font-semibold hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5 text-[rgb(84,182,78)]" />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Momentum Business Capital. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-[rgb(84,182,78)] to-green-700 text-white p-4 rounded-lg shadow-2xl hover:shadow-[rgb(84,182,78)]/20 transition-all duration-300 hover:scale-110 z-50"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default CreativeLanding; 