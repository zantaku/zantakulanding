import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { Navbar } from './Navbar';

export function HeroSectionCountdown() {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [countdownComplete, setCountdownComplete] = useState(false);

  // YouTube video ID
  const youtubeVideoId = "7EzFBLPzWis";

  // Target date: June 22, 2025, 4:00 PM PST
  const targetDate = new Date('2025-06-22T16:00:00-07:00');

  // Open video modal
  const openVideoModal = () => setShowVideoModal(true);
  
  // Close video modal
  const closeVideoModal = () => setShowVideoModal(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setCountdownComplete(true);
        setTimeLeft(0);
        
        // Redirect to main site after a short delay when countdown completes
        setTimeout(() => {
          localStorage.setItem('bypass_countdown', 'true');
          window.location.href = '/';
        }, 3000);
        
        return;
      }
      
      setTimeLeft(difference);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Format the countdown display
  const formatCountdown = () => {
    if (timeLeft === null) return { days: '--', hours: '--', minutes: '--', seconds: '--' };
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    return {
      days: days.toString().padStart(2, '0'),
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    };
  };

  const { days, hours, minutes, seconds } = formatCountdown();

  return (
    <div className="relative bg-gradient-to-br from-[#0A0A0A] via-[#1A0A1A] to-[#0A0A0A]">
      {/* Navbar with countdown mode */}
      <Navbar countdownMode={true} />
      
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
              src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&controls=1&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
              title="Teaser Video"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}

      {/* Main Countdown Section */}
      <div id="countdown" className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Japanese-inspired background elements */}
        <div className="absolute inset-0 opacity-20">
          {/* Traditional wave patterns */}
          <div className="absolute inset-0 bg-japanese-waves bg-repeat opacity-30"></div>
          
          {/* Glowing circles */}
          <div className="absolute top-20 left-20 w-40 h-40 border border-[#FF6B6B] rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 border border-[#FF6B6B] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 border border-[#7C1C1C] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Sakura petals */}
          <div className="sakura-petal" style={{ left: '10%', animationDuration: '15s' }}></div>
          <div className="sakura-petal" style={{ left: '30%', animationDuration: '18s', animationDelay: '2s' }}></div>
          <div className="sakura-petal" style={{ left: '50%', animationDuration: '20s', animationDelay: '4s' }}></div>
          <div className="sakura-petal" style={{ left: '70%', animationDuration: '16s', animationDelay: '6s' }}></div>
          <div className="sakura-petal" style={{ left: '90%', animationDuration: '22s', animationDelay: '8s' }}></div>
        </div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mt-16 sm:mt-0 z-10"
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

          {/* Video Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative mx-auto mb-8 sm:mb-12 max-w-2xl"
          >
            <div className="relative group cursor-pointer" onClick={openVideoModal}>
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-[#7C1C1C]/30 via-[#FF6B6B]/40 to-[#7C1C1C]/30 rounded-2xl sm:rounded-3xl opacity-80 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative aspect-video bg-gradient-to-br from-[#1A0A1A] to-[#0A0A0A] rounded-xl sm:rounded-2xl overflow-hidden border border-[#7C1C1C]/30">
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/30 transition-colors">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#7C1C1C] to-[#FF6B6B] rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                    <p className="text-white text-base sm:text-lg font-medium">Watch Teaser</p>
                  </div>
                </div>
                
                {/* Video thumbnail with overlay */}
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg)` }}></div>
              </div>
            </div>
          </motion.div>

          {/* Japanese-inspired Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-10 sm:mb-12"
          >
            <AnimatePresence>
              {!countdownComplete ? (
                <motion.div 
                  key="countdown"
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center"
                >
                  <div className="mb-4 text-white/80 font-medium text-xl">
                    Countdown
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                    {/* Days */}
                    <div className="flex flex-col items-center">
                      <div className="bg-[#0A0A0A]/80 backdrop-blur-md border border-[#7C1C1C]/50 rounded-lg p-3 sm:p-4 w-20 sm:w-24 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#7C1C1C]/10 to-[#FF6B6B]/10"></div>
                        <span className="relative z-10 block text-3xl sm:text-4xl font-mono text-[#FF6B6B] font-bold">{days}</span>
                      </div>
                      <span className="text-white/60 text-sm mt-1">Days</span>
                    </div>
                    
                    {/* Hours */}
                    <div className="flex flex-col items-center">
                      <div className="bg-[#0A0A0A]/80 backdrop-blur-md border border-[#7C1C1C]/50 rounded-lg p-3 sm:p-4 w-20 sm:w-24 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#7C1C1C]/10 to-[#FF6B6B]/10"></div>
                        <span className="relative z-10 block text-3xl sm:text-4xl font-mono text-[#FF6B6B] font-bold">{hours}</span>
                      </div>
                      <span className="text-white/60 text-sm mt-1">Hours</span>
                    </div>
                    
                    {/* Minutes */}
                    <div className="flex flex-col items-center">
                      <div className="bg-[#0A0A0A]/80 backdrop-blur-md border border-[#7C1C1C]/50 rounded-lg p-3 sm:p-4 w-20 sm:w-24 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#7C1C1C]/10 to-[#FF6B6B]/10"></div>
                        <span className="relative z-10 block text-3xl sm:text-4xl font-mono text-[#FF6B6B] font-bold">{minutes}</span>
                      </div>
                      <span className="text-white/60 text-sm mt-1">Minutes</span>
                    </div>
                    
                    {/* Seconds */}
                    <div className="flex flex-col items-center">
                      <div className="bg-[#0A0A0A]/80 backdrop-blur-md border border-[#7C1C1C]/50 rounded-lg p-3 sm:p-4 w-20 sm:w-24 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#7C1C1C]/10 to-[#FF6B6B]/10"></div>
                        <span className="relative z-10 block text-3xl sm:text-4xl font-mono text-[#FF6B6B] font-bold">{seconds}</span>
                      </div>
                      <span className="text-white/60 text-sm mt-1">Seconds</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[#FF6B6B] font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest text-center bg-gradient-to-r from-[#7C1C1C] to-[#FF6B6B] bg-clip-text text-transparent px-2"
                >
                  🎉 Launch Time! 🎉
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
          >
            {/* Download App button */}
            <a 
              href="https://github.com/zantaku/Zantaku/releases" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF4444] text-white font-black rounded-full hover:shadow-2xl hover:shadow-[#FF6B6B]/80 transition-all duration-300 hover:scale-110 flex items-center justify-center gap-3 animate-pulse"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span className="text-base sm:text-lg tracking-wide">Get the App</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF4444] to-[#FF6B6B] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </a>

            {/* Share button */}
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Coming Soon!',
                    text: 'Check out this countdown!',
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black/30 backdrop-blur-sm border border-[#7C1C1C]/30 text-white font-semibold rounded-full hover:border-[#7C1C1C] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
              <span className="text-base sm:text-lg">Share</span>
            </button>
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
            <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce"></div>
          </div>
        </motion.div>
      </div>

      {/* Additional Content Section - What users see when they scroll down */}
      <div id="about" className="relative min-h-screen bg-gradient-to-b from-[#1A0A1A] to-[#0A0A0A] px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Coming Soon Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-[#7C1C1C] via-[#FF6B6B] to-[#7C1C1C] text-transparent bg-clip-text">
                Something Amazing
              </span>
            </h2>
            <h3 className="text-2xl sm:text-3xl text-white/80 mb-8">
              Is Coming Soon
            </h3>
            <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              We're crafting an extraordinary experience that will revolutionize how you discover and enjoy anime and manga. 
              Join our community and be the first to know when we launch.
            </p>
          </motion.div>

          {/* Feature Teasers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "🎬",
                title: "Anime Discovery",
                description: "Discover your next favorite anime with our advanced recommendation system"
              },
              {
                icon: "📚",
                title: "Manga Reading",
                description: "Read manga with our beautiful, optimized reading experience"
              },
              {
                icon: "🌟",
                title: "Community",
                description: "Connect with fellow otaku and share your passion for anime culture"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-[#0A0A0A]/50 backdrop-blur-sm border border-[#7C1C1C]/30 rounded-xl p-6 text-center hover:border-[#FF6B6B]/50 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-white/80 mb-8 text-lg">
              Don't miss out on the future of anime and manga
            </p>
            <a 
              href="https://discord.gg/Pm7KyBYdA5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#7C1C1C] to-[#FF6B6B] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#7C1C1C]/50 transition-all duration-300 hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Join Our Discord Community
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 