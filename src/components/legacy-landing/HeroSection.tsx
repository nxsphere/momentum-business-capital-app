import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Clock, Shield, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

const HeroSection = ({
  isDialogOpen,
  setIsDialogOpen
}: HeroSectionProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState('$50,000 - $150,000');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToApplicationForm = () => {
    const formContainer = document.getElementById('application-form-container');
    const section = document.getElementById('application-form');
    const targetElement = formContainer || section;
    
    if (targetElement) {
      const elementRect = targetElement.getBoundingClientRect();
      const elementTop = elementRect.top + window.pageYOffset;
      const elementHeight = elementRect.height;
      const windowHeight = window.innerHeight;
      
      let scrollPosition;
      if (elementHeight > windowHeight * 0.8) {
        scrollPosition = elementTop - 50;
      } else {
        scrollPosition = elementTop - (windowHeight - elementHeight) / 2;
      }
      
      window.scrollTo({
        top: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  };

  const fundingOptions = [
    {
      range: "$7,500 - $50,000",
      title: "Small Business",
      description: "Working capital for startups"
    },
    {
      range: "$50,000 - $150,000", 
      title: "Business Growth",
      description: "Expansion & equipment financing",
      featured: true
    },
    {
      range: "$150,000 - $2M",
      title: "Enterprise", 
      description: "Large-scale business funding"
    }
  ];

  return (
    <section className="relative text-white py-12 lg:py-20 overflow-hidden">
      {/* Professional gradient background - more conservative */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/20 via-transparent to-emerald-800/10"></div>
      
      {/* Subtle professional background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Conservative floating elements */}
        <div 
          className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        ></div>
        <div 
          className="absolute top-40 right-20 w-40 h-40 bg-emerald-400/8 rounded-full blur-2xl"
          style={{
            transform: `translateY(${scrollY * -0.15}px)`,
          }}
        ></div>
        <div 
          className="absolute bottom-20 left-1/3 w-24 h-24 bg-emerald-600/10 rounded-full blur-2xl"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Main Hero Content */}
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              <span className="block text-white">Business Funding</span>
              <span className="block text-emerald-400">$7,500 - $2,000,000</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Fast, secure business financing with competitive rates and flexible terms
            </p>
          </div>

          {/* Professional Funding Selection */}
          <div className="relative max-w-5xl mx-auto">
            {/* Conservative glassmorphism */}
            <div className="absolute inset-0 bg-slate-800/30 backdrop-blur-lg rounded-2xl border border-slate-700/30"></div>
            
            <div className="relative p-6 lg:p-10">
              <div className="text-center mb-8">
                <h2 className="text-xl lg:text-2xl font-bold mb-3 text-white">
                  Select Your Funding Amount
                </h2>
                <p className="text-gray-300 text-sm lg:text-base">
                  Choose the funding tier that best fits your business needs
                </p>
              </div>

              {/* Professional Funding Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
                {fundingOptions.map((option, index) => (
                  <div
                    key={option.range}
                    onClick={() => setSelectedAmount(option.range)}
                    className={`relative group cursor-pointer transition-all duration-300 ${
                      selectedAmount === option.range
                        ? 'transform scale-105'
                        : 'hover:transform hover:scale-102'
                    }`}
                  >
                    {/* Professional card design */}
                    <div className={`relative rounded-xl border-2 transition-all duration-300 ${
                      selectedAmount === option.range
                        ? 'bg-slate-700/60 border-emerald-400/60 shadow-lg shadow-emerald-400/20'
                        : 'bg-slate-800/40 border-slate-600/40 hover:border-emerald-400/30 hover:bg-slate-700/40'
                    }`}>
                      
                      <div className="relative p-6 text-center">
                        {option.featured && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span className="bg-emerald-500 text-white text-xs font-bold py-1 px-3 rounded-full">
                              Most Popular
                            </span>
                          </div>
                        )}
                        
                        <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ${
                          selectedAmount === option.range 
                            ? 'bg-emerald-500 shadow-lg' 
                            : 'bg-slate-700 group-hover:bg-emerald-500/50'
                        }`}>
                          <DollarSign className={`h-6 w-6 transition-colors duration-300 ${
                            selectedAmount === option.range ? 'text-white' : 'text-emerald-400 group-hover:text-white'
                          }`} />
                        </div>
                        
                        <div className="text-lg lg:text-xl font-bold text-emerald-400 mb-2">
                          {option.range}
                        </div>
                        <h3 className="text-base lg:text-lg font-semibold text-white mb-2">{option.title}</h3>
                        <p className="text-gray-400 text-xs lg:text-sm">{option.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Professional CTA */}
              <div className="text-center">
                <Button 
                  onClick={scrollToApplicationForm}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg lg:text-xl font-bold py-4 lg:py-6 px-8 lg:px-16 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Apply for {selectedAmount}
                  <ArrowRight className="ml-3 h-5 w-5 lg:h-6 lg:w-6" />
                </Button>
                <p className="text-gray-400 text-xs lg:text-sm mt-4">
                  Secure application • Get approved as fast as 24 hours
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection; 