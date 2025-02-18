import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function PreLoader() {
  // Disable scroll when component mounts
  useEffect(() => {
    // Disable scroll
    document.body.style.overflow = 'hidden';
    
    // Enable scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Prevent right click
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center select-none"
      onContextMenu={handleContextMenu}
    >
      <motion.div 
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.div
          className="w-16 h-16 border-2 border-black dark:border-white rounded-xl relative overflow-hidden"
          animate={{
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <motion.div
            className="absolute inset-0 bg-black dark:bg-white"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </motion.div>
        
        {/* Loading Text */}
        <motion.p
          className="mt-4 text-sm font-medium text-black dark:text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
} 