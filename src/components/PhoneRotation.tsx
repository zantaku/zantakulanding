import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { OptimizedImage } from './OptimizedImage';

// Use WebP images
import view1 from '../asset/Views Zantaku/view 1 mf zantaku.png';
import view2 from '../asset/Views Zantaku/view 2 zantaku.png';
import view3 from '../asset/Views Zantaku/view 3 zantaku.png';
import view4 from '../asset/Views Zantaku/view 4 zantaku.png';

const images = [view1, view2, view3, view4];

export function PhoneRotation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastMouseXRef = useRef(0);

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Listen for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Auto-rotation effect when not interacting
  useEffect(() => {
    if (isHovered || isHolding) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered, isHolding]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (isMobile) return; // Disable rotation on mobile
    setIsHolding(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    lastMouseXRef.current = clientX;
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isHolding || isMobile) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - lastMouseXRef.current;
    const threshold = 30;

    if (Math.abs(deltaX) > threshold) {
      const direction = deltaX > 0 ? 1 : -1;
      setCurrentIndex((prev) => (prev + direction + images.length) % images.length);
      lastMouseXRef.current = clientX;
    }
  };

  const handleMouseUp = () => {
    setIsHolding(false);
    setCurrentIndex(0);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsHolding(false);
    setCurrentIndex(0);
  };

  return (
    <motion.div
      className="relative w-full max-w-[120px] sm:max-w-[150px] md:max-w-[220px] lg:max-w-[280px] xl:max-w-[320px] mx-auto cursor-pointer mt-0 md:mt-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      whileHover={isMobile ? {} : { scale: 1.02 }}
      style={{ 
        touchAction: 'none',
        zIndex: isMobile ? 1 : 2 // Lower z-index on mobile
      }}
    >
      {/* Simplified glow effects - smaller on mobile */}
      <div className="absolute inset-0 -top-3 -bottom-3 -right-3 -left-3 md:-top-10 md:-bottom-10 md:-right-10 md:-left-10 bg-[#7C1C1C]/10 md:bg-[#7C1C1C]/20 rounded-full blur-[20px] md:blur-[40px]"></div>
      
      {/* Phone images with transition */}
      <div className="relative w-full aspect-[9/16]">
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="absolute w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentIndex ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <OptimizedImage
              src={src}
              alt={`Phone view ${index + 1}`}
              width={400}
              height={711}
              className="w-full h-full object-contain"
              priority={index === 0}
              style={{
                filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.2))',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Hold and move indicator - only show on non-mobile */}
      {!isMobile && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white/60 text-[10px] sm:text-xs bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
          Hold & drag to rotate
        </div>
      )}
    </motion.div>
  );
} 