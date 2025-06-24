import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#3b3b3b] mb-6">
            Trusted by 10,000+ Businesses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our clients say about their funding experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-[#54b64e] fill-current" />
              ))}
            </div>
            <p className="text-gray-700 mb-6 italic">
              "Momentum Business Capital helped us secure the funding we needed to expand our operations. 
              The process was incredibly fast and professional."
            </p>
            <div className="font-semibold text-[#3b3b3b]">Sarah Johnson</div>
            <div className="text-gray-600 text-sm">Restaurant Owner</div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-[#54b64e] fill-current" />
              ))}
            </div>
            <p className="text-gray-700 mb-6 italic">
              "The team at Momentum was transparent throughout the entire process. 
              No hidden fees, just straightforward funding when we needed it most."
            </p>
            <div className="font-semibold text-[#3b3b3b]">Mike Chen</div>
            <div className="text-gray-600 text-sm">Manufacturing Business</div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-[#54b64e] fill-current" />
              ))}
            </div>
            <p className="text-gray-700 mb-6 italic">
              "From application to funding in just 3 days! This allowed us to take advantage 
              of a time-sensitive business opportunity."
            </p>
            <div className="font-semibold text-[#3b3b3b]">Lisa Rodriguez</div>
            <div className="text-gray-600 text-sm">Retail Store Owner</div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-75">
          <div className="bg-white px-6 py-3 rounded-lg shadow-sm border">
            <span className="text-[#54b64e] font-semibold">A+ BBB Rating</span>
          </div>
          <div className="bg-white px-6 py-3 rounded-lg shadow-sm border">
            <span className="text-[#54b64e] font-semibold">SSL Encrypted</span>
          </div>
          <div className="bg-white px-6 py-3 rounded-lg shadow-sm border">
            <span className="text-[#54b64e] font-semibold">Bank-Level Security</span>
          </div>
          <div className="bg-white px-6 py-3 rounded-lg shadow-sm border">
            <span className="text-[#54b64e] font-semibold">10,000+ Funded</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 