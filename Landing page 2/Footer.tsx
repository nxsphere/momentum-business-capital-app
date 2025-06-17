
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-momentum-navy text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-3xl font-bold mb-6">Momentum Business Capital</h3>
          </div>
          
          <div className="space-y-4 text-blue-200 mb-8">
            <div className="flex items-center justify-center space-x-3">
              <Phone className="h-5 w-5" />
              <span className="font-semibold">(800) 839-8066</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <MapPin className="h-5 w-5" />
              <span>4014 Chase Avenue, Suite 212, Miami Beach, FL 33140</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <Mail className="h-5 w-5" />
              <span>info@momentumbusinesscapital.com</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-momentum-navy-light mt-12 pt-8 text-center text-blue-200">
          <p>&copy; 2025 Momentum Business Capital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
