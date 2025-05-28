import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Theme colors for gradients and glow effects
const THEME = {
  primaryGlow: "0 0 15px rgba(203, 70, 133, 0.7), 0 0 30px rgba(203, 70, 133, 0.4)",
  primaryGradient: "linear-gradient(135deg, #7C1C1C 0%, #cb4685 100%)",
  secondaryGradient: "linear-gradient(135deg, rgba(124, 28, 28, 0.8) 0%, rgba(203, 70, 133, 0.8) 100%)",
  backgroundGradient: "linear-gradient(180deg, rgba(20, 20, 30, 0.95) 0%, rgba(30, 20, 40, 0.95) 100%)",
  borderGlow: "0 0 10px rgba(203, 70, 133, 0.3)"
};

interface CustomLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomLinkModal({ isOpen, onClose }: CustomLinkModalProps) {
  // Close on escape key
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'visible';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'rgba(0, 0, 0, 0.85)'
          }}
        >
          <motion.div
            className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            style={{
              background: THEME.backgroundGradient,
              boxShadow: `${THEME.borderGlow}, 0 0 30px rgba(0, 0, 0, 0.5)`,
            }}
          >
            {/* Animated border glow */}
            <div 
              className="absolute inset-0 -z-10 rounded-2xl" 
              style={{
                background: THEME.primaryGradient,
                filter: 'blur(8px)',
                opacity: 0.4,
                transform: 'scale(1.015)'
              }}
            />
            
            {/* Header with glowing icon */}
            <div 
              className="pt-8 pb-4 px-8 text-center border-b border-white/10"
              style={{
                background: 'linear-gradient(to bottom, rgba(124, 28, 28, 0.2), transparent)'
              }}
            >
              <motion.span 
                className="inline-block text-4xl mb-3"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                🏮
              </motion.span>
              
              <motion.h2 
                className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-wide"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Custom Links Coming Soon!
              </motion.h2>
              
              <motion.p 
                className="text-white/70 text-sm sm:text-base tracking-wide mb-4"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                We're building something special for you
              </motion.p>
            </div>
            
            {/* Main content */}
            <div className="px-8 py-6">
              <div className="space-y-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <p className="text-white/80 text-lg">
                    Our custom link system is currently under development! We're working hard to bring you a seamless experience for creating and sharing your anime profile.
                  </p>
                  
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10 mt-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Want to be among the first to get access?</h3>
                    <p className="text-white/70 mb-6">
                      Join our Discord community to:
                    </p>
                    <ul className="text-left text-white/80 space-y-3 mb-6">
                      <li className="flex items-center gap-3">
                        <span className="text-zantaku-pink">✦</span>
                        Get early access to custom links
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-zantaku-pink">✦</span>
                        Be notified when the feature launches
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-zantaku-pink">✦</span>
                        Connect with fellow anime enthusiasts
                      </li>
                                  </ul>
                    
                          <a 
                            href="https://discord.gg/Pm7KyBYdA5"
                            target="_blank"
                            rel="noopener noreferrer"
                      className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-zantaku-red to-zantaku-pink text-white font-medium shadow-lg shadow-zantaku-pink/20 hover:scale-105 transition-transform duration-200"
                    >
                      Join Our Discord
                    </a>
                    </div>
              </motion.div>
            </div>
            </div>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 