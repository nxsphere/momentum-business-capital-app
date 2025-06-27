import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { sanitizeAndValidateFormData } from './security';
import Header from './Header';
import HeroSection from './HeroSection';
import ApplicationForm from './ApplicationForm';
import TestimonialsSection from './TestimonialsSection';
import Footer from './Footer';
import FloatingElements from './FloatingElements';

const LegacyMomentumLanding = () => {
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
  
  // Removed DocuSign URL - now using PandaDoc form integration
  
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
    <div className="min-h-screen bg-white parallax-container">
      <Header />
      <HeroSection 
        isDialogOpen={isDialogOpen} 
        setIsDialogOpen={setIsDialogOpen} 
      />
      <ApplicationForm 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
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

export default LegacyMomentumLanding; 