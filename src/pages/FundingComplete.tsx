import React from 'react';
import { CheckCircle, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const FundingComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="shadow-2xl border-0">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <CheckCircle className="h-20 w-20 text-green-500" />
                <div className="absolute inset-0 animate-ping">
                  <CheckCircle className="h-20 w-20 text-green-400 opacity-75" />
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Documents Signed Successfully!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Thank you for completing your funding application. Your documents have been 
              received and are now being processed by our team.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-blue-900 mb-3">
                What happens next?
              </h2>
              <div className="text-left space-y-3 text-blue-800">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Our underwriting team will review your application within 24 hours</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>You'll receive an email confirmation with your application status</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>A funding specialist will contact you to discuss next steps</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-500 mb-6">
                Application ID: {new Date().getTime()}-MBC
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="inline-flex items-center space-x-2 px-6 py-3"
                >
                  <Home className="h-4 w-4" />
                  <span>Return to Home</span>
                </Button>
                
                <Button
                  onClick={() => navigate('/funding-2')}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Apply for Additional Funding</span>
                </Button>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Need immediate assistance? Contact us at{' '}
                <a 
                  href="tel:+1-800-MOMENTUM" 
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  1-800-MOMENTUM
                </a>
                {' '}or{' '}
                <a 
                  href="mailto:info@momentumbusinesscapital.com" 
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  info@momentumbusinesscapital.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FundingComplete; 