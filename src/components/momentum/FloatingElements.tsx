import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FloatingElementsProps {
  showBackToTop: boolean;
  scrollToTop: () => void;
}

const FloatingElements = ({ showBackToTop, scrollToTop }: FloatingElementsProps) => {
  return (
    <>
      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop} 
          className="back-to-top" 
          aria-label="Back to top"
          style={{
            // Ensure proper mobile positioning
            position: 'fixed',
            bottom: '1rem',
            right: '1rem',
            zIndex: 40,
          }}
        >
          <ArrowUp className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      )}
    </>
  );
};

export default FloatingElements;
