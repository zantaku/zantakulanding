import { useState } from 'react';
import { motion } from 'framer-motion';

interface AnilistAuthButtonProps {
  className?: string;
  onAuthClick?: () => void;
  label?: string;
  isProcessing?: boolean;
}

export function AnilistAuthButton({
  className = '',
  onAuthClick,
  label = 'Connect AniList',
  isProcessing = false
}: AnilistAuthButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleAuth = () => {
    if (onAuthClick && !isProcessing) {
      onAuthClick();
    }
  };

  return (
    <motion.button
      className={`relative overflow-hidden rounded-lg px-4 py-2 
        font-medium text-white shadow-md ${className}
        ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}
        bg-gradient-to-r from-anilist-blue to-anilist-blue-dark`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleAuth}
      disabled={isProcessing}
    >
      <div className="flex items-center justify-center gap-2">
        {/* AniList logo */}
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 25 25" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M14.6229 7.91064H19.2V21.8651H14.6229V7.91064Z" 
            fill="white" 
          />
          <path 
            d="M2.7998 3.99976H7.37691V21.8651H2.7998V3.99976Z" 
            fill="white" 
          />
          <path 
            d="M9.14398 21.8651L13.7211 14.4222V21.8651H9.14398Z" 
            fill="white" 
          />
          <path 
            d="M13.7211 7.91064V12.6563L9.14398 21.8651V7.91064H13.7211Z" 
            fill="white" 
          />
        </svg>

        {isProcessing ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connecting...
          </span>
        ) : (
          <span>{label}</span>
        )}
      </div>

      {isHovered && !isProcessing && (
        <motion.div
          className="absolute inset-0 bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.button>
  );
} 