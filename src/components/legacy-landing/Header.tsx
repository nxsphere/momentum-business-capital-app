import React from 'react';
import { Phone } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <a href="#" className="mr-6">
              <img
                src="/assets/og-image.png"
                alt="Momentum Business Capital"
                className="h-10 w-auto"
              />
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-[#3b3b3b]">
              <Phone className="h-5 w-5 text-[#54b64e]" />
              <span className="text-sm font-medium">Call us today:</span>
              <span className="font-bold text-xl text-[#54b64e]">(305) 307-5217</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 