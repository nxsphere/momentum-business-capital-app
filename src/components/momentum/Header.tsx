
import React from 'react';
import { Phone } from 'lucide-react';

const Header = () => {
  return <>
      {/* Header */}
      <header className="shadow-md bg-slate-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/assets/og-image.png" alt="Momentum Business Capital" className="h-10 w-auto" />
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-momentum-navy">
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">Call us today:</span>
              <span className="font-semibold text-lg">(800) 839-8066</span>
            </div>
          </div>
        </div>
      </header>
    </>;
};

export default Header;
