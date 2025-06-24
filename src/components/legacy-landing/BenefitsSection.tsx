import React from 'react';
import { Shield, Clock, DollarSign, CheckCircle } from 'lucide-react';

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#3b3b3b] mb-6">
            Why Choose Momentum Business Capital?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We make business funding simple, fast, and flexible for growing businesses
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#54b64e]">
            <div className="flex items-center justify-center w-16 h-16 bg-[#54b64e] rounded-full mb-6 mx-auto">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#3b3b3b] mb-4 text-center">No Collateral Required</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Secure funding without putting your personal or business assets at risk. Your business revenue is all we need.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#54b64e]">
            <div className="flex items-center justify-center w-16 h-16 bg-[#54b64e] rounded-full mb-6 mx-auto">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#3b3b3b] mb-4 text-center">Fast Approval Process</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Get approved in as little as 24 hours. Our streamlined process gets you the funds you need quickly.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#54b64e]">
            <div className="flex items-center justify-center w-16 h-16 bg-[#54b64e] rounded-full mb-6 mx-auto">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#3b3b3b] mb-4 text-center">Flexible Terms</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Customize your repayment terms to match your business cash flow. No hidden fees or prepayment penalties.
            </p>
          </div>
        </div>

        {/* Additional benefits list */}
        <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-[#3b3b3b] mb-6">Additional Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#54b64e] mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Simple application with minimal paperwork</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#54b64e] mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Competitive rates for qualified businesses</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#54b64e] mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Dedicated support throughout the process</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#3b3b3b] mb-6">Perfect For</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#54b64e] mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Equipment purchases and upgrades</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#54b64e] mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Inventory expansion and seasonal needs</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#54b64e] mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Working capital and growth opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection; 