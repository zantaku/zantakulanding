import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

export function Modal({ isOpen, onClose, title = "Coming Soon", message }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
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

  // Handle click anywhere to close - simpler approach for mobile
  const handleClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm cursor-pointer touch-auto overflow-y-auto p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClick}
        >
          <motion.div
            ref={modalRef}
            className="bg-zantaku-black border border-zantaku-pink/30 rounded-xl p-4 sm:p-6 w-full max-w-xs sm:max-w-md mx-auto shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()} // Prevent modal itself from closing when clicked
          >
            <div className="text-center">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-zantaku-pink mb-2 sm:mb-3">{title}</h3>
              <p className="text-sm sm:text-base text-zantaku-cream mb-4 sm:mb-5">{message}</p>
              
              <motion.button
                onClick={onClose}
                className="mt-2 w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-white/10 text-zantaku-cream hover:bg-white/20 transition-colors duration-200 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 