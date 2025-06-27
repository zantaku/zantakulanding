import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'white' | 'gradient';
}

export function Logo({ 
  size = 'medium', 
  className = '', 
  showText = false, 
  variant = 'default' 
}: LogoProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xlarge: 'w-24 h-24'
  };

  const textSizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-3xl',
    xlarge: 'text-4xl'
  };

  const logoSrc = size === 'small' ? '/asset/zantakulogotest_32x32.webp' : 
                  size === 'medium' ? '/asset/zantakulogotest_64x64.webp' :
                  '/asset/zantakulogoV2.webp';

  const textVariants = {
    default: 'text-white',
    white: 'text-white',
    gradient: 'bg-gradient-to-r from-[#7C1C1C] via-[#FF6B6B] to-[#7C1C1C] text-transparent bg-clip-text'
  };

  return (
    <motion.div
      className={`flex items-center gap-3 ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <motion.img
        src={logoSrc}
        alt="Zantaku Logo"
        className={`${sizeClasses[size]} object-contain`}
        whileHover={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.5 }}
      />
      {showText && (
        <motion.span
          className={`font-bold ${textSizeClasses[size]} ${textVariants[variant]}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Zantaku
        </motion.span>
      )}
    </motion.div>
  );
}

export function ToriiGate() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-64 h-64"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full text-zantaku-red">
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d="M20,80 L20,30 L40,20 L60,20 L80,30 L80,80 M10,30 L90,30 M10,25 L90,25"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}

export function TestimonialCard({ avatar, text, username }: { avatar: string; text: string; username: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-zantaku-black/50 p-6 rounded-xl backdrop-blur-sm border border-zantaku-red/20 hover:border-zantaku-red/50 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <img src={avatar} alt={username} className="w-12 h-12 rounded-full" />
        <div>
          <p className="text-zantaku-cream font-medium">{text}</p>
          <p className="text-zantaku-pink/80 text-sm">{username}</p>
        </div>
      </div>
    </motion.div>
  );
}