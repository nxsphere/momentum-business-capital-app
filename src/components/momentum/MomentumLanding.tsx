import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { sanitizeAndValidateFormData } from '@/utils/security';
import Header from './Header';
import HeroSection from './HeroSection';
import BenefitsSection from './BenefitsSection';
import FundingDetailsSection from './FundingDetailsSection';
import ApplicationForm from './ApplicationForm';
import TestimonialsSection from './TestimonialsSection';
import Footer from './Footer';
import FloatingElements from './FloatingElements';

const MomentumLanding = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    desiredAmount: ''
  });
  
  const DOCUSIGN_URL = 'https://powerforms.docusign.net/5e57a70a-e1aa-4f44-9317-fe32ca8cbe9c?env=na2&acct=b1f42fe1-f327-4d9f-bc8b-f3155fc84586&accountId=b1f42fe1-f327-4d9f-bc8b-f3155fc84586';
  
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sanitize and validate form data
    const validationResult = sanitizeAndValidateFormData(formData);
    
    if (!validationResult.isValid) {
      console.error('Form validation errors:', validationResult.errors);
      // In a real app, you would show these errors to the user
      return;
    }
    
    console.log('Form submitted with sanitized data:', validationResult.sanitizedData);
    // Handle form submission with sanitized data
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection 
        isDialogOpen={isDialogOpen} 
        setIsDialogOpen={setIsDialogOpen} 
        docusignUrl={DOCUSIGN_URL} 
      />
      <BenefitsSection />
      <FundingDetailsSection 
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        docusignUrl={DOCUSIGN_URL}
      />
      <ApplicationForm 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <TestimonialsSection />
      <Footer />
      <FloatingElements 
        showBackToTop={showBackToTop}
        scrollToTop={scrollToTop}
      />
    </div>
  );
};

export default MomentumLanding;
