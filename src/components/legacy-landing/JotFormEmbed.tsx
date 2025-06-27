import React, { useState } from 'react';

interface JotFormEmbedProps {
  onLoad?: () => void;
  height?: string;
  className?: string;
}

const JotFormEmbed: React.FC<JotFormEmbedProps> = ({
  onLoad,
  height = 'min-h-[600px]',
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative w-full ${height} ${className}`}>
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center z-10 rounded-lg">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-white px-4 lg:px-6 py-3 lg:py-4 rounded-xl shadow-lg">
              <div className="animate-spin rounded-full h-5 w-5 lg:h-6 lg:w-6 border-2 border-green-500 border-t-transparent"></div>
              <div>
                <div className="text-xs lg:text-sm font-medium text-gray-700">Loading application form...</div>
                <div className="text-xs text-gray-500 mt-1">Just a moment please</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-red-50 flex items-center justify-center z-10 rounded-lg">
          <div className="text-center p-4 lg:p-8">
            <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 max-w-sm lg:max-w-md mx-auto">
              <div className="text-red-500 mb-4">
                <svg className="w-10 h-10 lg:w-12 lg:h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">Unable to Load Form</h3>
              <p className="text-sm lg:text-base text-gray-600 mb-4">
                We're having trouble loading the application form. Please try refreshing the page.
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm lg:text-base"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive JotForm iframe */}
      <iframe
        title="Momentum Business Application"
        src="https://www.jotform.com/sign/251676624502053/invite/01jxzsq7sn7e88c5fd11ed19d5?signEmbed=1"
        className={`w-full h-full border-0 rounded-lg transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          minHeight: '600px',
          height: '100%',
          width: '100%'
        }}
        onLoad={handleLoad}
        onError={handleError}
        allow="geolocation; microphone; camera"
        allowFullScreen
      />
    </div>
  );
};

export default JotFormEmbed; 