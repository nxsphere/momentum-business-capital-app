import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { sanitizeAndValidateFormData } from '@/utils/security';
import Header from './momentum/Header';
import HeroSection from './momentum/HeroSection';
import BenefitsSection from './momentum/BenefitsSection';
import FundingDetailsSection from './momentum/FundingDetailsSection';
import ApplicationForm from './momentum/ApplicationForm';
import TestimonialsSection from './momentum/TestimonialsSection';
import Footer from './momentum/Footer';
import FloatingElements from './momentum/FloatingElements';

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
    
    const validationResult = sanitizeAndValidateFormData(formData);
    
    if (!validationResult.isValid) {
      console.error('Form validation errors:', validationResult.errors);
      return;
    }
    
    console.log('Form submitted with sanitized data:', validationResult.sanitizedData);
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
