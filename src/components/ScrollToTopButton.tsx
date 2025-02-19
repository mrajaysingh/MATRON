import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

interface ScrollToTopButtonProps {
  progress: number;
  onClick: () => void;
  isVisible: boolean;
}

const ScrollToTopButton = ({ progress, onClick, isVisible }: ScrollToTopButtonProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
      }}
      onClick={onClick}
      className="fixed bottom-20 right-8 z-50 p-3 overflow-hidden"
    >
      <div className="relative w-12 h-12">
        {/* Progress border */}
        <svg 
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 48 48"
        >
          {/* Background triangle */}
          <path
            d="M24 4 L44 40 L4 40 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-300 dark:text-gray-600"
          />
          {/* Progress triangle */}
          <path
            d="M24 4 L44 40 L4 40 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${progress * 120} 120`}
            className="text-black dark:text-white"
          />
        </svg>
        
        {/* Button content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center bg-white dark:bg-gray-800" 
               style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}>
            <ChevronUp 
              className="w-5 h-5 text-black dark:text-white transform translate-y-1" 
            />
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default ScrollToTopButton; 