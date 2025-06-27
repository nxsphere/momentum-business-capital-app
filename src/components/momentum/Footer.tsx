import React from 'react';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-momentum-navy text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 md:mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              Momentum Business Capital
            </h3>
          </div>
          
          <div className="space-y-3 md:space-y-4 text-blue-200 mb-6 md:mb-8">
            <div className="flex items-center justify-center space-x-2 md:space-x-3">
              <Phone className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
              <a 
                href="tel:+13053075217"
                className="font-semibold text-base md:text-lg hover:text-white transition-colors"
              >
                (305) 307-5217
              </a>
            </div>
            
            <div className="flex items-start justify-center space-x-2 md:space-x-3 px-4">
              <MapPin className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm md:text-base leading-relaxed">
                4014 Chase Avenue, Suite 212, Miami Beach, FL 33140
              </span>
            </div>
            
            <div className="flex items-center justify-center space-x-2 md:space-x-3">
              <Mail className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
              <a 
                href="mailto:info@momentumbusinesscapital.com"
                className="text-sm md:text-base hover:text-white transition-colors break-all sm:break-normal"
              >
                info@momentumbusinesscapital.com
              </a>
            </div>
            
            <a 
              href="https://www.linkedin.com/company/momentum-business-capital/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 md:space-x-3 font-semibold hover:text-white transition-colors pt-2"
            >
              <Linkedin className="h-4 w-4 md:h-5 md:w-5 text-white" />
              <span className="text-sm md:text-base">Follow us on LinkedIn</span>
            </a>
          </div>
        </div>
        
        <div className="border-t border-momentum-navy-light mt-8 md:mt-12 pt-6 md:pt-8 text-center text-blue-200">
          <p className="text-xs md:text-sm">
            &copy; 2025 Momentum Business Capital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
