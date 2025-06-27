import React from 'react';
import { ArrowRight, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FundingDetailsSectionProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

const FundingDetailsSection = ({ 
  isDialogOpen, 
  setIsDialogOpen 
}: FundingDetailsSectionProps) => {

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

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          
          {/* Simple header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#3b3b3b] mb-4">
              Choose Your Funding Amount
            </h2>
            <p className="text-lg text-gray-600">
              Select the amount that fits your business needs
            </p>
          </div>

          {/* Clean funding cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                range: "$7,500 - $50,000",
                title: "Starter", 
                featured: false
              },
              {
                range: "$50,000 - $150,000",
                title: "Growth",
                featured: true
              },
              {
                range: "$150,000 - $2M",
                title: "Enterprise",
                featured: false
              }
            ].map((card, index) => (
              <div
                key={card.title}
                className={`relative bg-white rounded-xl p-8 text-center border-2 transition-all duration-300 hover:shadow-lg ${
                  card.featured 
                    ? 'border-[#54b64e] shadow-md scale-105' 
                    : 'border-gray-200 hover:border-[#54b64e]'
                }`}
              >
                {card.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#54b64e] text-white text-sm font-bold py-1 px-4 rounded-full">
                      Popular
                    </span>
                  </div>
                )}
                
                <div className="mb-6">
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 ${
                    card.featured ? 'bg-[#54b64e]' : 'bg-gray-100'
                  }`}>
                    <DollarSign className={`h-6 w-6 ${
                      card.featured ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="text-2xl font-bold text-[#54b64e] mb-2">{card.range}</div>
                  <h3 className="text-lg font-semibold text-[#3b3b3b] mb-4">{card.title}</h3>
                </div>
                
                <Button 
                  onClick={scrollToApplicationForm}
                  className={`w-full transition-all ${
                    card.featured 
                      ? 'bg-[#54b64e] hover:bg-[#4a9d45] text-white' 
                      : 'bg-gray-100 hover:bg-[#54b64e] text-gray-700 hover:text-white'
                  }`}
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FundingDetailsSection; 