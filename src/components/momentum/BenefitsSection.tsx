import React from 'react';
import { Shield, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const BenefitsSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 section-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-momentum-navy mb-4 md:mb-6 px-4">
            Why Choose Momentum Business Capital?
          </h2>
          <p className="text-lg md:text-xl text-momentum-gray max-w-2xl mx-auto px-4">
            We make business funding simple, fast, and flexible
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <Card className="momentum-card text-center group h-full">
            <CardHeader className="pb-4">
              <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-momentum-light-blue rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 md:h-10 md:w-10 text-momentum-navy" />
              </div>
              <CardTitle className="text-xl md:text-2xl text-momentum-navy px-2">
                No Collateral Required
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-base md:text-lg text-momentum-gray leading-relaxed px-2">
                Secure funding without putting your personal or business assets at risk. Your business revenue is all we need.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="momentum-card text-center group h-full">
            <CardHeader className="pb-4">
              <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-momentum-light-blue rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 md:h-10 md:w-10 text-momentum-navy" />
              </div>
              <CardTitle className="text-xl md:text-2xl text-momentum-navy px-2">
                Fast Approval Process
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-base md:text-lg text-momentum-gray leading-relaxed px-2">
                Get approved in as little as 24 hours. Our streamlined process gets you the funds you need quickly.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="momentum-card text-center group h-full md:col-span-2 lg:col-span-1">
            <CardHeader className="pb-4">
              <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-momentum-light-blue rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-8 w-8 md:h-10 md:w-10 text-momentum-navy" />
              </div>
              <CardTitle className="text-xl md:text-2xl text-momentum-navy px-2">
                Flexible Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-base md:text-lg text-momentum-gray leading-relaxed px-2">
                Customize your repayment terms to match your business cash flow. No hidden fees or prepayment penalties.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
