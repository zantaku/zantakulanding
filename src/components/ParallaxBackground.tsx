import React, { useState, useEffect, useCallback } from 'react';

// Neo-Tokyo color palette
const colors = {
  deepBlack: '#0A0A0A',
  crimsonRed: '#7C1C1C',
  burntMaroon: '#531111',
  mossyGreen: '#425A40',
  slateTeal: '#3E6257',
  softSkyBlue: '#2C7A8C'
};

interface ParallaxBackgroundProps {
  image: string;
  overlayOpacity?: number;
}

export function ParallaxBackground({ image, overlayOpacity = 0.7 }: ParallaxBackgroundProps) {
  const [offsetY, setOffsetY] = useState(0);
  
  // Debounce the scroll handler to improve performance
  const handleScroll = useCallback(() => {
    // Use requestAnimationFrame for smoother performance
    window.requestAnimationFrame(() => {
      setOffsetY(window.pageYOffset);
    });
  }, []);
  
  useEffect(() => {
    // Add passive option to optimize scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Dark baseline layer */}
      <div className="absolute inset-0 bg-[#0A0A0A]"></div>
      
      {/* Enlarged background image with parallax effect */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          backgroundImage: `url(${image})`,
          backgroundSize: '130% 130%',
          backgroundPosition: 'center',
          transform: `translateY(${offsetY * 0.3}px) scale(1.2)`,
          opacity: 0.85,
          filter: 'blur(1px) contrast(1.1) saturate(1.1)',
          willChange: 'transform' // Hint to the browser to optimize for animation
        }}
      />
      
      {/* Dark overlay with neo-tokyo gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/95 via-[#0A0A0A]/85 to-[#0A0A0A]/90"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Neo-Tokyo color gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#531111]/15 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-[#3E6257]/10 to-transparent"></div>
      
      {/* Retro horizontal scanlines */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 50%)',
          backgroundSize: '100% 4px'
        }}
      ></div>
      
      {/* Vaporwave grid - faint */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, ${colors.crimsonRed} 1px, transparent 1px),
            linear-gradient(to bottom, ${colors.crimsonRed} 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          transformOrigin: 'center',
          transform: 'perspective(500px) rotateX(60deg) translateY(150px) scale(2.5)'
        }}
      ></div>
      
      {/* Stronger ambient glow effects */}
      <div className="absolute top-1/3 left-1/3 w-2/3 h-2/3 bg-[#7C1C1C]/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-[#3E6257]/15 blur-[80px] rounded-full"></div>
      
      {/* Additional focal point glow behind the phone */}
      <div className="absolute top-1/2 right-1/3 w-1/3 h-2/3 bg-[#2C7A8C]/15 blur-[120px] rounded-full transform -translate-y-1/2"></div>
      
      {/* Subtle light rays */}
      <div 
        className="absolute top-0 left-1/2 w-1/4 h-1/2 bg-gradient-to-b from-[#7C1C1C]/5 to-transparent"
        style={{ transform: 'translateX(-50%) rotate(15deg)' }}
      ></div>
      
      {/* Horizontal neon lines */}
      <div className="absolute h-[1px] w-1/3 left-0 top-[30%] bg-gradient-to-r from-transparent via-[#2C7A8C]/20 to-transparent blur-[1px]"></div>
      <div className="absolute h-[1px] w-1/2 right-0 top-[70%] bg-gradient-to-r from-transparent via-[#7C1C1C]/30 to-transparent blur-[1px]"></div>
    </div>
  );
}