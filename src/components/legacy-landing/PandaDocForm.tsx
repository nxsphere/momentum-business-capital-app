import React, { useEffect, useRef, useState } from 'react';

interface PandaDocFormProps {
  onLoad?: () => void;
  onStarted?: (data: any) => void;
  onCompleted?: (data: any) => void;
  onException?: (data: any) => void;
  height?: string;
  width?: string;
  className?: string;
}

const PandaDocForm: React.FC<PandaDocFormProps> = ({
  onLoad,
  onStarted,
  onCompleted,
  onException,
  height = '80vh', // Responsive viewport height
  width = '100%',  // Full width responsive
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = (error: any) => {
    setIsLoading(false);
    setHasError(true);
    onException?.(error);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const config = {
      nodeId: containerRef.current.id,
      width,
      height,
      url: 'https://eform.pandadoc.com/?eform=23edeb93-77d4-47f5-a067-db480b5158b0',
      events: {
        loaded: handleLoad,
        started: onStarted || (() => {}),
        completed: onCompleted || (() => {}),
        exception: handleError
      },
      data: {},
    };

    const dataQueryString = config.data ? Object.keys(config.data)
      .map(function (key) {
        return '&' + key + '=' + encodeURIComponent(JSON.stringify(config.data[key]));
      })
      .join('') : '';

    const iframe = document.createElement('iframe');
    iframe.frameBorder = '0';
    iframe.src = config.url + dataQueryString;
    iframe.height = '100%';
    iframe.width = '100%';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '0';
    iframe.style.display = 'block';

    // Add loading event listener
    iframe.onload = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Small delay to ensure form is fully rendered
    };

    iframe.onerror = () => {
      handleError('Failed to load form');
    };

    const node = containerRef.current;
    node.style.height = config.height;
    node.style.width = config.width;
    node.appendChild(iframe);

    // Store iframe reference for cleanup
    iframeRef.current = iframe;

    // Event listener for iframe messages
    const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
    const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

    const messageHandler = (e: MessageEvent) => {
      if (e && e.data && config && iframe && e.source === iframe.contentWindow) {
        try {
          const message = JSON.parse(e.data);
          if (message && message.event) {
            const event = message.event.replace('embed.form.', '');
            const callback = config.events ? (config.events as any)[event] : null;
            if (callback) {
              callback(message.data);
            }
          }
        } catch(error) {
          console.warn('Error parsing PandaDoc message:', error);
        }
      }
    };

    window[eventMethod](messageEvent as any, messageHandler, false);

    // Cleanup function
    return () => {
      if (iframeRef.current && node.contains(iframeRef.current)) {
        node.removeChild(iframeRef.current);
      }
      window.removeEventListener('message', messageHandler);
    };
  }, [onLoad, onStarted, onCompleted, onException, height, width]);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center z-10 rounded-lg">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-white px-4 lg:px-6 py-3 lg:py-4 rounded-xl shadow-lg">
              <div className="animate-spin rounded-full h-5 w-5 lg:h-6 lg:w-6 border-2 border-green-500 border-t-transparent"></div>
              <div>
                <div className="text-xs lg:text-sm font-medium text-gray-700">Loading secure form...</div>
                <div className="text-xs text-gray-500 mt-1">This may take a few seconds</div>
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

      {/* Form container - Responsive viewport sizing */}
      <div 
        ref={containerRef}
        id={`pandadoc-form-${Math.random().toString(36).substr(2, 9)}`}
        className="pandadoc-form-container w-full overflow-hidden"
        style={{ 
          width: width,
          height: height,
          minHeight: height,
          padding: 0,
          margin: 0,
          borderRadius: '0',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
    </div>
  );
};

export default PandaDocForm; 