import React from 'react';
import { Button } from '@/components/ui/button';

const FundingDetailsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main funding showcase */}
          <div className="bg-[#3b3b3b] rounded-2xl p-12 lg:p-16 text-white text-center mb-16">
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-6xl font-bold">Up to $2M available</h2>
              <p className="text-xl lg:text-2xl text-gray-300">
                Flexible funding amounts tailored to your business requirements
              </p>
              
              <Button 
                className="bg-[#54b64e] hover:bg-[#4a9d45] text-white text-xl font-bold py-6 px-12 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mt-8"
                onClick={() => {
                  const applicationSection = document.querySelector("#application");
                  if (applicationSection) {
                    applicationSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Apply Now
              </Button>
            </div>
          </div>

          {/* Funding ranges */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 rounded-xl p-8 text-center border-2 border-transparent hover:border-[#54b64e] transition-colors">
              <div className="text-3xl font-bold text-[#54b64e] mb-4">$7,500 - $50,000</div>
              <h3 className="text-xl font-semibold text-[#3b3b3b] mb-3">Small Business</h3>
              <p className="text-gray-600">Perfect for new businesses and small operations looking to grow</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center border-2 border-[#54b64e] transform scale-105">
              <div className="text-3xl font-bold text-[#54b64e] mb-4">$50,000 - $150,000</div>
              <h3 className="text-xl font-semibold text-[#3b3b3b] mb-3">Growing Business</h3>
              <p className="text-gray-600">Ideal for established businesses ready to expand operations</p>
              <div className="mt-4 bg-[#54b64e] text-white text-sm font-semibold py-1 px-3 rounded-full inline-block">
                Most Popular
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center border-2 border-transparent hover:border-[#54b64e] transition-colors">
              <div className="text-3xl font-bold text-[#54b64e] mb-4">$150,000 - $2M</div>
              <h3 className="text-xl font-semibold text-[#3b3b3b] mb-3">Enterprise</h3>
              <p className="text-gray-600">For large businesses with significant growth opportunities</p>
            </div>
          </div>

          {/* Process steps */}
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-[#3b3b3b] text-center mb-12">Simple 3-Step Process</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[#54b64e] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h4 className="text-xl font-semibold text-[#3b3b3b] mb-3">Apply Online</h4>
                <p className="text-gray-600">Complete our secure 5-minute application form</p>
              </div>
              <div className="text-center">
                <div className="bg-[#54b64e] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h4 className="text-xl font-semibold text-[#3b3b3b] mb-3">Get Approved</h4>
                <p className="text-gray-600">Receive approval decision within 24 hours</p>
              </div>
              <div className="text-center">
                <div className="bg-[#54b64e] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h4 className="text-xl font-semibold text-[#3b3b3b] mb-3">Get Funded</h4>
                <p className="text-gray-600">Funds deposited directly into your account</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundingDetailsSection; 