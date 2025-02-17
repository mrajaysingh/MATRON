import React, { useState, useEffect } from 'react';
import { Box, Pentagon, Aperture, Diamond } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const icons = [
  { Icon: Box, color: '#000000' },
  { Icon: Pentagon, color: '#000000' },
  { Icon: Aperture, color: '#000000' },
  { Icon: Diamond, color: '#000000' }
];

export default function AnimatedLogo({ isDarkMode = false }: { isDarkMode?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % icons.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsTransitioning(true);
    
    // Smooth transition back to initial icon
    const currentPos = currentIndex;
    const totalSteps = currentPos > 0 ? currentPos : icons.length;
    let step = 0;
    
    const transitionInterval = setInterval(() => {
      step++;
      setCurrentIndex((prev) => (prev + 1) % icons.length);
      
      if (step >= totalSteps) {
        clearInterval(transitionInterval);
        setCurrentIndex(0);
        setIsTransitioning(false);
      }
    }, 200); // Faster interval for return transition
  };

  return (
    <div
      className="relative w-8 h-8 cursor-pointer"
      onMouseEnter={() => {
        setIsHovered(true);
        setIsTransitioning(false);
      }}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ 
            opacity: 0,
            scale: 0.7,
            rotate: -90,
            filter: "blur(10px)"
          }}
          animate={{ 
            opacity: 1,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)"
          }}
          exit={{ 
            opacity: 0,
            scale: 0.7,
            rotate: 90,
            filter: "blur(10px)"
          }}
          transition={{ 
            duration: isTransitioning ? 0.3 : 1.2, // Faster duration during return transition
            ease: [0.4, 0, 0.2, 1],
            opacity: { duration: isTransitioning ? 0.2 : 0.8 },
            scale: { duration: isTransitioning ? 0.3 : 1 },
            rotate: { duration: isTransitioning ? 0.3 : 1 },
            filter: { duration: isTransitioning ? 0.2 : 0.8 }
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {React.createElement(icons[currentIndex].Icon, {
              className: `w-8 h-8 ${isDarkMode ? 'text-white' : 'text-black'}`,
              strokeWidth: 1.5
            })}
          </motion.div>
        </motion.div>
      </AnimatePresence>
      
      <motion.div
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.2 : 0
        }}
        transition={{
          duration: isTransitioning ? 0.3 : 0.8,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-current rounded-full filter blur-xl"
        style={{
          backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
        }}
      />
    </div>
  );
} 