import React from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingElementsProps {
  showBackToTop: boolean;
  scrollToTop: () => void;
}

const FloatingElements = ({ showBackToTop, scrollToTop }: FloatingElementsProps) => {
  return (
    <>
      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button 
            onClick={scrollToTop} 
            className="back-to-top"
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 100 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20 
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: 360,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              <ArrowUp className="h-6 w-6" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingElements; 