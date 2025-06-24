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
        <button onClick={scrollToTop} className="back-to-top" aria-label="Back to top">
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default FloatingElements; 