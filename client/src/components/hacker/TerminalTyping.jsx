import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const TerminalTyping = React.memo(({ lines, speed = 15, onComplete }) => { // Default speed 15ms
  const [displayedText, setDisplayedText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLine < lines.length) {
      const line = lines[currentLine];
      
      if (currentChar < line.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev + line[currentChar]);
          setCurrentChar(prev => prev + 1);
        }, speed);
        
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          if (currentLine === lines.length - 1) {
            setIsTyping(false);
            if (onComplete) onComplete();
          } else {
            setDisplayedText(prev => prev + '\n');
            setCurrentLine(prev => prev + 1);
            setCurrentChar(0);
          }
        }, 50); // Very short pause between lines
        return () => clearTimeout(timeout);
      }
    }
  }, [currentLine, currentChar, lines, speed, onComplete]);

  return (
    <div className="font-mono text-matrix-green whitespace-pre-wrap text-sm">
      {displayedText}
      {isTyping && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="ml-0.5"
        >
          █
        </motion.span>
      )}
    </div>
  );
});

export default TerminalTyping;