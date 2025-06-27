import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, MessageCircle, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Navbar } from './Navbar';
import { Logo } from './Logo';

interface HeroSectionNewProps {
  countdownMode?: boolean;
}

export function HeroSectionNew({ countdownMode = false }: HeroSectionNewProps) {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const { t } = useTranslation();

  const openVideoModal = () => setShowVideoModal(true);
  const closeVideoModal = () => setShowVideoModal(false);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A0A1A] to-[#0A0A0A] px-4 sm:px-6 lg:px-8">
      {/* Navbar */}
      <Navbar countdownMode={countdownMode} />
      
      {/* Video Modal */}
      {showVideoModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeVideoModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
            >
              ✕
            </button>
            <iframe
              src="https://www.youtube.com/embed/I8siljACiiQ?autoplay=1&controls=1&showinfo=0&rel=0&modestbranding=1&playsinline=1"
              title="Zantaku App Trailer"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}

      {/* Background elements - hidden on small screens to reduce clutter */}
      <div className="absolute inset-0 opacity-10 hidden sm:block">
        <div className="absolute top-20 left-20 w-40 h-40 border border-[#7C1C1C] rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-32 h-32 border border-[#FF6B6B] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 border border-[#2C7A8C] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto mt-16 sm:mt-0"
      >
        {/* Logo/Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 sm:mb-8 flex justify-center"
        >
          <Logo size="xlarge" showText={false} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 mb-8 sm:mb-12 font-light tracking-wide px-4"
        >
          {t('hero.tagline', 'The Future of Anime & Manga Discovery')}
        </motion.p>

        {/* Video Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative mx-auto mb-8 sm:mb-12 max-w-2xl"
        >
          <div className="relative group cursor-pointer" onClick={openVideoModal}>
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-[#7C1C1C]/30 via-[#FF6B6B]/40 to-[#7C1C1C]/30 rounded-2xl sm:rounded-3xl opacity-80 blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative aspect-video bg-gradient-to-br from-[#1A0A1A] to-[#0A0A0A] rounded-xl sm:rounded-2xl overflow-hidden border border-[#7C1C1C]/30">
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/30 transition-colors">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#7C1C1C] to-[#FF6B6B] rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" />
                  </div>
                  <p className="text-white text-base sm:text-lg font-medium">Watch Trailer</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
        >
          {/* Download button */}
          <a 
            href="https://github.com/zantaku/Zantaku/releases" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF4444] text-white font-black rounded-full hover:shadow-2xl hover:shadow-[#FF6B6B]/80 transition-all duration-300 hover:scale-110 flex items-center justify-center gap-3 animate-pulse"
          >
            <Download className="w-5 h-5 animate-bounce" />
                          <span className="text-base sm:text-lg tracking-wide">Get the App</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF4444] to-[#FF6B6B] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </a>

          {/* Discord button */}
          <a 
            href="https://discord.gg/Pm7KyBYdA5" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black/30 backdrop-blur-sm border border-[#7C1C1C]/30 text-white font-semibold rounded-full hover:border-[#7C1C1C] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
          >
            <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
            <span className="text-base sm:text-lg">Join Discord</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </div>
  );
} 