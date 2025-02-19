import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A'
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Outer cursor */}
      <motion.div
        className="custom-cursor-outer fixed pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
      >
        <div className={`w-6 h-6 rounded-full border-2 -translate-x-1/2 -translate-y-1/2 ${
          isPointer ? 'border-black/30 dark:border-white/30' : 'border-black dark:border-white'
        }`} />
      </motion.div>

      {/* Inner cursor */}
      <motion.div
        className="custom-cursor-inner fixed pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isPointer ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 15,
          mass: 0.1
        }}
      >
        <div className="w-1 h-1 rounded-full bg-black dark:bg-white -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
    </>
  );
} 