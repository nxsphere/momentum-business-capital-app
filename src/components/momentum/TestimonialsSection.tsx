import React from 'react';
import { Badge } from '@/components/ui/badge';

const TestimonialsSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 section-gradient">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
          <Badge 
            variant="outline" 
            className="text-base md:text-lg px-4 md:px-6 py-2 md:py-3 border-momentum-green text-momentum-green hover:bg-momentum-green hover:text-white transition-colors"
          >
            Secure SSL Encrypted
          </Badge>
          <Badge 
            variant="outline" 
            className="text-base md:text-lg px-4 md:px-6 py-2 md:py-3 border-momentum-navy text-momentum-navy hover:bg-momentum-navy hover:text-white transition-colors"
          >
            Trusted by 10,000+ Businesses
          </Badge>
          <Badge 
            variant="outline" 
            className="text-base md:text-lg px-4 md:px-6 py-2 md:py-3 border-momentum-orange text-momentum-orange hover:bg-momentum-orange hover:text-white transition-colors"
          >
            Get Approved Today!
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
