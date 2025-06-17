
import React from 'react';
import { Shield, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const BenefitsSection = () => {
  return (
    <section className="py-20 section-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-momentum-navy mb-6">
            Why Choose Momentum Business Capital?
          </h2>
          <p className="text-xl text-momentum-gray max-w-2xl mx-auto">
            We make business funding simple, fast, and flexible
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="momentum-card text-center group">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-momentum-light-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-10 w-10 text-momentum-navy" />
              </div>
              <CardTitle className="text-2xl text-momentum-navy">No Collateral Required</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg text-momentum-gray">
                Secure funding without putting your personal or business assets at risk. Your business revenue is all we need.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="momentum-card text-center group">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-momentum-light-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-10 w-10 text-momentum-navy" />
              </div>
              <CardTitle className="text-2xl text-momentum-navy">Fast Approval Process</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg text-momentum-gray">
                Get approved in as little as 24 hours. Our streamlined process gets you the funds you need quickly.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="momentum-card text-center group">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-momentum-light-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-10 w-10 text-momentum-navy" />
              </div>
              <CardTitle className="text-2xl text-momentum-navy">Flexible Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg text-momentum-gray">
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
