import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Smartphone, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Logo } from './Logo';

export function HeroSection() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Use translation context
  const { t } = useTranslation();
  
  // Ensure content shows immediately, don't wait for video
  useEffect(() => {
    // Show content immediately
    setContentReady(true);
    
    // Set video as loaded after a reasonable timeout even if it doesn't load
    const videoTimeout = setTimeout(() => {
      if (!videoLoaded) {
        console.log('Video timeout - showing content anyway');
        setVideoLoaded(true);
      }
    }, 2000); // 2 seconds max wait
    
    return () => clearTimeout(videoTimeout);
  }, [videoLoaded]);
  
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Handle scroll events to show/hide scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionHeight = sectionRef.current.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > sectionHeight * 0.3) {
          if (!hasScrolled) setHasScrolled(true);
        } else {
          if (hasScrolled) setHasScrolled(false);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  // Improved video load handling - don't block UI
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  
  // Handle the scroll to content below hero
  const scrollBelowHero = (e: React.MouseEvent) => {
    e.preventDefault();
    if (sectionRef.current) {
      const sectionHeight = sectionRef.current.offsetHeight;
      window.scrollTo({
        top: sectionHeight,
        behavior: 'smooth'
      });
    }
  };

  // Handle video modal open
  const openVideoModal = () => {
    setShowVideoModal(true);
  };

  // Handle video modal close
  const closeVideoModal = () => {
    setShowVideoModal(false);
  };

  // Handle video load success
  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    setVideoLoaded(true);
    setVideoError(false);
  };

  // Handle video load error
  const handleVideoError = () => {
    console.warn('Video failed to load');
    setVideoError(true);
    setVideoLoaded(true); // Still show the section
  };
  
  return (
    <section 
      ref={sectionRef}
      className={`relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#1A0A1A] to-[#0A0A0A] transition-opacity duration-500 ${contentReady ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Video Modal */}
      {showVideoModal ? (
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
            exit={{ scale: 0.8, opacity: 0 }}
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
              onLoad={handleVideoLoad}
              onError={handleVideoError}
            />
          </motion.div>
        </motion.div>
      ) : null}

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7C1C1C]/10 via-transparent to-[#7C1C1C]/10 animate-pulse" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#7C1C1C]/20 rounded-full blur-xl animate-bounce" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-[#531111]/20 rounded-full blur-xl animate-bounce" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-[#2C7A8C]/20 rounded-full blur-xl animate-bounce" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Main content container - Always visible */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">
        {/* Title above video - smaller on mobile to give more space to video */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`mb-4 ${isMobile ? 'md:mb-8' : 'mb-8'}`}
        >
          <div className={`${isMobile ? 'mb-2' : 'mb-2 md:mb-4'} flex justify-center`}>
            <Logo size={isMobile ? "large" : "xlarge"} showText={false} />
          </div>
          <p className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} text-white/80 font-medium`}>
            {t('hero.title')}
          </p>
        </motion.div>

        {/* Enhanced Video container with mobile-first design - HIDDEN ON MOBILE */}
        {!isMobile ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative mx-auto max-w-4xl"
          >
            {/* Multiple layered glow effects for depth */}
            <div className="absolute -inset-6 bg-gradient-to-r from-[#7C1C1C]/30 via-[#FF6B6B]/40 to-[#7C1C1C]/30 rounded-3xl opacity-80 blur-2xl animate-pulse" />
            <div className="absolute -inset-4 bg-gradient-to-r from-[#531111]/40 via-[#7C1C1C]/50 to-[#531111]/40 rounded-3xl opacity-60 blur-xl" />
            <div className="absolute -inset-2 bg-gradient-to-r from-[#7C1C1C] via-[#FF6B6B] to-[#7C1C1C] rounded-3xl opacity-75 blur-lg animate-pulse" />
            
            {/* Video embed container with enhanced theming */}
            <div className="relative bg-gradient-to-br from-[#0D0D0D] via-[#1A0A1A] to-[#0D0D0D] rounded-2xl overflow-hidden shadow-2xl shadow-[#7C1C1C]/50 border border-[#7C1C1C]/20 video-glow">
              {/* Ambient lighting effect around video */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B6B]/20 via-transparent to-[#FF6B6B]/20 rounded-2xl blur-sm cyber-border" />
              
              <div className="aspect-video w-full relative">
                {/* Video loading placeholder - only show if video hasn't loaded yet */}
                {!videoLoaded && !videoError ? (
                  <div className="absolute inset-0 z-20 bg-gradient-to-br from-[#0D0D0D] via-[#1A0A1A] to-[#0D0D0D] flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 border-2 border-[#FF6B6B]/30 border-t-[#FF6B6B] rounded-full animate-spin mx-auto" />
                      <div className="text-white/60 text-sm japanese-text">動画を読み込み中...</div>
                      <div className="text-white/40 text-xs">Loading Trailer</div>
                    </div>
                  </div>
                ) : null}

                {/* Video error placeholder */}
                {videoError ? (
                  <div className="absolute inset-0 z-20 bg-gradient-to-br from-[#0D0D0D] via-[#1A0A1A] to-[#0D0D0D] flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-[#7C1C1C]/20 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-[#FF6B6B]" />
                      </div>
                      <div className="text-white/60 text-sm">Video unavailable</div>
                      <button
                        onClick={openVideoModal}
                        className="px-4 py-2 bg-[#7C1C1C] hover:bg-[#531111] text-white rounded-lg transition-colors text-xs"
                      >
                        Try opening in modal
                      </button>
                    </div>
                  </div>
                ) : null}
                
                {/* Dark overlay to reduce white background impact */}
                <div className={`absolute inset-0 z-10 bg-gradient-to-br from-[#0A0A0A]/40 via-transparent to-[#0A0A0A]/40 transition-opacity duration-1000 ${videoLoaded ? 'opacity-30' : 'opacity-70'} pointer-events-none`} />
                
                {/* Subtle vignette effect */}
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-transparent via-transparent to-[#0A0A0A]/60 pointer-events-none" />
                <div className="absolute inset-0 z-10 bg-gradient-to-tl from-transparent via-transparent to-[#0A0A0A]/60 pointer-events-none" />
                
                {/* Enhanced phone screen glow simulation */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <div className="absolute left-1/2 top-1/2 w-1/3 h-4/5 bg-gradient-to-r from-[#FF6B6B]/15 via-[#FF6B6B]/8 to-[#FF6B6B]/15 rounded-3xl blur-xl phone-glow" />
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-3/5 bg-gradient-to-b from-[#7C1C1C]/10 via-transparent to-[#7C1C1C]/10 rounded-2xl blur-lg" />
                </div>
                
                {/* Additional overlay blend modes for better integration */}
                <div className="absolute inset-0 z-10 video-overlay-darken pointer-events-none" />
                <div className="absolute inset-0 z-10 video-overlay-screen pointer-events-none" />
                
                {/* Corner accent glows and lens flares */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-[#7C1C1C]/20 rounded-full blur-2xl z-10 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#FF6B6B]/15 rounded-full blur-2xl z-10 pointer-events-none" />
                
                {/* Cinematic lens flares */}
                <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-[#FF6B6B]/80 rounded-full blur-sm z-10 pointer-events-none animate-pulse" />
                <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-[#7C1C1C]/60 rounded-full blur-xs z-10 pointer-events-none" style={{ animationDelay: '1s' }} />
                
                <iframe
                  src="https://www.youtube.com/embed/I8siljACiiQ?autoplay=1&mute=1&controls=1&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                  title="Zantaku App Trailer"
                  className="w-full h-full relative z-0"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onLoad={handleVideoLoad}
                  onError={handleVideoError}
                />
              </div>
              
              {/* Subtle animated border with data stream effect */}
              <div className="absolute inset-0 rounded-2xl border border-[#FF6B6B]/30 pointer-events-none" />
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-transparent via-[#FF6B6B]/20 to-transparent bg-clip-border pointer-events-none opacity-60" />
              
              {/* Film grain effect overlay */}
              <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: '256px 256px'
              }} />
            </div>

            {/* Floating particles around video */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#FF6B6B]/60 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + (i % 3) * 30}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : null}

        {/* Mobile-optimized call-to-action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className={`${isMobile ? 'mt-6' : 'mt-8'} flex flex-col ${isMobile ? 'gap-3' : 'sm:flex-row gap-4'} items-center justify-center`}
        >
          {/* BIG Android Download Button for Mobile */}
          {isMobile ? (
            <motion.a
              href="https://github.com/zantaku/Zantaku/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group w-full max-w-xs bg-gradient-to-r from-[#7C1C1C] to-[#531111] hover:from-[#FF6B6B] hover:to-[#7C1C1C] text-white font-bold px-8 py-5 rounded-2xl shadow-2xl shadow-[#7C1C1C]/40 text-lg transition-all duration-500 transform overflow-hidden"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700" />
              
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Download className="w-6 h-6" />
                <div className="text-center">
                  <div className="text-xl font-bold">{t('hero.downloadButton')}</div>
                  <div className="text-sm opacity-90">Free Android App</div>
                </div>
                <Smartphone className="w-6 h-6" />
              </span>
            </motion.a>
          ) : (
            /* Desktop Primary CTA with Japanese flair */
            <motion.a
              href="https://github.com/zantaku/Zantaku/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group bg-gradient-to-r from-[#7C1C1C] to-[#531111] hover:from-[#FF6B6B] hover:to-[#7C1C1C] text-white font-bold px-10 py-4 rounded-2xl shadow-2xl shadow-[#7C1C1C]/40 text-lg transition-all duration-500 transform overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700" />
              
              <span className="relative z-10 flex items-center gap-2">
                <Download className="w-5 h-5" />
                <span>{t('hero.downloadButton')}</span>
              </span>
            </motion.a>
          )}
          
          {/* Video Thumbnail Button (Mobile) / Discord Button (Desktop) */}
          {isMobile ? (
            <motion.button
              onClick={openVideoModal}
              className="relative group w-full max-w-xs bg-gradient-to-br from-[#0D0D0D] via-[#1A0A1A] to-[#0D0D0D] rounded-xl overflow-hidden border-2 border-white/10 hover:border-[#7C1C1C]/50 transition-all duration-500"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Video thumbnail background */}
              <div className="relative aspect-video bg-gradient-to-br from-[#7C1C1C]/20 to-[#FF6B6B]/20">
                {/* YouTube thumbnail (using maxresdefault for better quality) */}
                <img 
                  src="https://img.youtube.com/vi/I8siljACiiQ/maxresdefault.jpg" 
                  alt="Zantaku Trailer Thumbnail"
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                />
                
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60" />
                
                {/* YouTube Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Play button background */}
                    <div className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-300 group-hover:scale-110">
                      <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 w-16 h-16 bg-red-600/30 rounded-full blur-lg animate-pulse" />
                  </div>
                </div>
                
                {/* Small text overlay */}
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-medium text-center">{t('hero.watchDemo')}</p>
                </div>
              </div>
            </motion.button>
          ) : (
            <motion.a
              href="https://discord.gg/Pm7KyBYdA5"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:from-[#4752C4] hover:to-[#3C45A5] text-white font-medium px-8 py-4 rounded-2xl text-lg transition-all duration-500 transform overflow-hidden shadow-2xl shadow-[#5865F2]/40"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700" />
              
              <span className="relative z-10 flex items-center gap-3">
                {/* Discord Icon SVG */}
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <div className="text-center">
                  <div className="font-bold">{t('cta.discordButton')}</div>
                  <div className="text-sm opacity-90">{t('cta.discordSubtext')}</div>
                </div>
              </span>
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator arrow */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: hasScrolled ? 0 : 0.8, 
          y: hasScrolled ? -20 : 0
        }}
        transition={{ duration: 0.3 }}
        onClick={scrollBelowHero}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        >
          <svg 
            width="36" 
            height="36" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white/60 hover:text-[#7C1C1C] transition-colors"
          >
            <path 
              d="M12 5V19M12 19L19 12M12 19L5 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
} 