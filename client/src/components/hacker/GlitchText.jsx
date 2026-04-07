import React from 'react';
import { motion } from 'framer-motion';

const GlitchText = ({ text, className = '' }) => {
  return (
    <motion.div
      className={`relative text-center lg:text-left ${className}`}
      animate={{
        x: [0, -2, 2, -2, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Main white text */}
      <span 
        data-text={text}
        className="text-white font-mono font-bold text-2xl md:text-4xl lg:text-5xl"
      >
        {text}
      </span>
      
      {/* Purple glitch layer */}
      <span className="absolute top-0 left-0 text-purple-400 opacity-80 
                       font-mono font-bold text-2xl md:text-4xl lg:text-5xl 
                       mix-blend-lighten pointer-events-none animate-glitch"
            style={{ 
              textShadow: '2px 0 10px rgba(168, 85, 247, 0.8)',
              filter: 'blur(0.5px)'
            }}>
        {text}
      </span>
      
      {/* Whiteish glitch layer */}
      <span className="absolute top-0 left-0 text-gray-300 opacity-90 
                       font-mono font-bold text-2xl md:text-4xl lg:text-5xl 
                       mix-blend-overlay pointer-events-none animate-glitch-2"
            style={{ 
              textShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
              filter: 'blur(0.3px)'
            }}>
        {text}
      </span>
    </motion.div>
  );
};

export default GlitchText;