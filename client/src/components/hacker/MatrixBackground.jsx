import React, { useEffect, useRef, useState } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Matrix characters
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const characters = matrix.split("");
    const fontSize = 12; // Reduced for better performance
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    
    // Store the last frame for freezing
    let lastFrame = null;
    
    // Drawing function
    const draw = () => {
      if (!isAnimating) return;
      
      // Semi-transparent black for trailing effect
      ctx.fillStyle = "rgba(10, 10, 10, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#00FF41";
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Reset drop when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
      
      // Save the current frame when animation stops
      lastFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };
    
    // Animation loop
    const animate = () => {
      draw();
      if (isAnimating) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    // Start animation
    animate();
    
    // Stop animation after 3 seconds
    const stopTimer = setTimeout(() => {
      setIsAnimating(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Keep the last frame visible
      if (lastFrame) {
        ctx.putImageData(lastFrame, 0, 0);
      }
    }, 3000);
    
    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(stopTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isAnimating]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ 
        mixBlendMode: 'screen',
        opacity: 0.3 // Reduced opacity for better performance
      }}
    />
  );
};

export default MatrixBackground;