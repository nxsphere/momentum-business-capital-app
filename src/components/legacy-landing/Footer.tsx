import React from 'react';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#3b3b3b] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="bg-white p-3 rounded-lg inline-block mb-6">
              <img 
                src="/assets/og-image.png" 
                alt="Momentum Business Capital" 
                className="h-12 w-auto" 
              />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Empowering businesses with fast, flexible funding solutions. 
              We help entrepreneurs achieve their goals with competitive rates and transparent terms.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[#54b64e] font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#54b64e]" />
                <span>(305) 307-5217</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#54b64e]" />
                <span>info@momentumbusinesscapital.com</span>
              </div>
              <a 
                href="https://www.linkedin.com/company/momentum-business-capital/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-[#54b64e] transition-colors"
              >
                <Linkedin className="h-4 w-4 text-[#54b64e]" />
                <span>Follow us on LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-[#54b64e] font-semibold text-lg mb-4">Office</h4>
            <div className="flex items-start space-x-3">
              <MapPin className="h-4 w-4 text-[#54b64e] mt-1" />
              <span className="text-gray-300">
                4014 Chase Avenue, Suite 212<br />
                Miami Beach, FL 33140
              </span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 Momentum Business Capital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 