import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Users, Play, Download, MessageCircle, ChevronDown, Send } from 'lucide-react';
import { githubService, type GitHubStats } from '../services/githubService';
import { Logo } from './Logo';

// Removed fake notification component - keeping it honest

// Removed animated star counter - keeping it simple and honest

export function HeroSectionEnhanced() {
  const [githubStats, setGithubStats] = useState<GitHubStats>({ stars: 4218, forks: 92, contributors: 12 });
  const [loading, setLoading] = useState(true);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const communityLinks = [
    {
      name: 'Discord',
      href: 'https://discord.gg/zantaku',
      icon: MessageCircle,
      description: 'Join our Discord server'
    },
    {
      name: 'Telegram',
      href: 'https://t.me/zantakuapp',
      icon: Send,
      description: 'Follow us on Telegram'
    }
  ];

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch GitHub stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await githubService.getRepoStats();
        setGithubStats(stats);
      } catch (error) {
        console.warn('Using fallback GitHub stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Handle clicking outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle video modal
  const openVideoModal = () => setShowVideoModal(true);
  const closeVideoModal = () => setShowVideoModal(false);

  // Handle GitHub redirect
  const openGitHub = () => {
    window.open('https://github.com/zantaku/Zantaku', '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#1A0A1A] to-[#0A0A0A]"
    >
      {/* Removed fake notifications - keeping it real */}

      {/* Video Modal */}
      <AnimatePresence>
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
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-[#7C1C1C]/50"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors"
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
      </AnimatePresence>

      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7C1C1C]/10 via-transparent to-[#7C1C1C]/10 animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#7C1C1C]/20 rounded-full blur-xl animate-bounce" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-[#531111]/20 rounded-full blur-xl animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-[#2C7A8C]/20 rounded-full blur-xl animate-bounce" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center py-2">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-2 flex justify-center"
        >
          <Logo size={isMobile ? "small" : "medium"} showText={false} />
        </motion.div>

        {/* Hook Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-2"
        >
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
            <span className="bg-gradient-to-r from-[#FF6B6B] via-[#7C1C1C] to-[#FF6B6B] bg-clip-text text-transparent">
              You weren't supposed to see this…
            </span>
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-white/80 font-medium max-w-2xl mx-auto">
                                The comprehensive anime and manga tracking platform that syncs with AniList.
          </p>
        </motion.div>

                 {/* Real Quote */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.5 }}
           className="mb-2"
         >
          
         </motion.div>

         {/* Honest Social Proof */}
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.6 }}
           className="mb-3 flex flex-wrap justify-center gap-2 md:gap-4"
         >
           <motion.div 
             className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-[#7C1C1C]/30"
             whileHover={{ scale: 1.05, borderColor: 'rgba(255, 107, 107, 0.5)' }}
             transition={{ duration: 0.2 }}
           >
             <Star className="w-4 h-4 text-yellow-400 fill-current star-twinkle" />
             <span className="text-white font-medium text-sm">
               {loading ? (
                 <div className="w-32 h-3 bg-gray-600 animate-shimmer rounded" />
               ) : (
                 `Zantaku just launched — be one of the first ${githubStats.stars} to star it`
               )}
             </span>
           </motion.div>

           <motion.div 
             className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-[#7C1C1C]/30"
             whileHover={{ scale: 1.05, borderColor: 'rgba(255, 107, 107, 0.5)' }}
             transition={{ duration: 0.2 }}
           >
             <Users className="w-4 h-4 text-green-400" />
             <span className="text-white font-medium text-sm">
               Built by anime fans.
             </span>
           </motion.div>
         </motion.div>

                 {/* Video Preview */}
         <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.8 }}
           className="relative mx-auto max-w-lg md:max-w-xl mb-3"
         >
           {/* Glow effects */}
           <div className="absolute -inset-2 bg-gradient-to-r from-[#7C1C1C]/30 via-[#FF6B6B]/40 to-[#7C1C1C]/30 rounded-xl opacity-80 blur-lg animate-pulse" />
           <div className="absolute -inset-1 bg-gradient-to-r from-[#531111]/40 via-[#7C1C1C]/50 to-[#531111]/40 rounded-xl opacity-60 blur-md" />
           
           {/* Video container */}
           <div className="relative bg-gradient-to-br from-[#0D0D0D] via-[#1A0A1A] to-[#0D0D0D] rounded-lg overflow-hidden shadow-lg shadow-[#7C1C1C]/50 border border-[#7C1C1C]/20">
             <div className="aspect-video w-full relative group cursor-pointer" onClick={openVideoModal}>
                                {/* Video thumbnail with fake phone frame */}
                 <div className="absolute inset-0 bg-gradient-to-br from-[#1A0A1A] to-[#0A0A0A] flex items-center justify-center">
                   {/* Phone frame mockup */}
                   <div className="relative">
                     <div className="w-24 h-40 md:w-28 md:h-48 bg-black rounded-xl p-1 shadow-lg border border-gray-600">
                       <div className="w-full h-full bg-gradient-to-b from-[#FF6B6B]/20 to-[#7C1C1C]/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                         {/* Fake app UI elements */}
                         <div className="absolute top-1.5 left-1.5 right-1.5 flex justify-between items-center">
                           <div className="w-3 h-3 bg-[#FF6B6B] rounded-full opacity-80"></div>
                           <div className="text-white text-xs font-bold">ZANTAKU</div>
                           <div className="w-2.5 h-2.5 bg-white/20 rounded"></div>
                         </div>
                         
                         {/* Play button */}
                         <motion.div
                           whileHover={{ scale: 1.1 }}
                           whileTap={{ scale: 0.95 }}
                           className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-[#FF6B6B] to-[#7C1C1C] rounded-full flex items-center justify-center shadow-lg shadow-[#7C1C1C]/50 z-10"
                         >
                           <Play className="w-3 h-3 md:w-4 md:h-4 text-white ml-0.5" fill="currentColor" />
                         </motion.div>
                         
                         {/* Fake anime cards */}
                         <div className="absolute bottom-2 left-1.5 right-1.5 space-y-0.5">
                           <div className="h-1.5 bg-white/30 rounded animate-pulse"></div>
                           <div className="h-1.5 bg-white/20 rounded animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                           <div className="h-1.5 bg-white/10 rounded animate-pulse" style={{ animationDelay: '1s' }}></div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               
                                {/* Honest hover overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                     <p className="text-white font-bold text-lg mb-2">See Zantaku in action</p>
                   </div>
                 </div>
             </div>
           </div>
        </motion.div>

                 {/* CTA Buttons */}
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 1.0 }}
           className="flex flex-col sm:flex-row gap-2 justify-center items-center mb-2"
         >
           <motion.button
             whileHover={{ scale: 1.08, boxShadow: '0 0 40px rgba(255, 107, 107, 0.8)' }}
             whileTap={{ scale: 0.95 }}
             onClick={openGitHub}
             animate={{ 
               boxShadow: [
                 "0 0 20px rgba(255, 107, 107, 0.4)",
                 "0 0 30px rgba(255, 107, 107, 0.6)",
                 "0 0 20px rgba(255, 107, 107, 0.4)"
               ]
             }}
             transition={{ 
               boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
               scale: { duration: 0.2 }
             }}
             className="bg-gradient-to-r from-[#FF6B6B] to-[#FF4444] text-white px-6 py-3 rounded-full font-black text-base shadow-2xl shadow-[#FF6B6B]/60 border-2 border-[#FF6B6B]/50 flex items-center space-x-2 min-w-[240px] justify-center relative overflow-hidden group"
           >
             {/* Animated background shine effect */}
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
             
             <Download className="w-5 h-5 animate-bounce" />
                           <span className="relative z-10 tracking-wide">Get the App</span>
             <motion.div
               animate={{ rotate: [0, 10, -10, 0] }}
               transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
               className="text-yellow-300"
             >
               🔥
             </motion.div>
           </motion.button>

           <div className="relative" ref={dropdownRef}>
             <motion.button
               whileHover={{ scale: 1.05, borderColor: 'rgba(255, 107, 107, 0.6)' }}
               whileTap={{ scale: 0.95 }}
               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
               className="bg-transparent border-2 border-[#7C1C1C]/50 text-white px-4 py-2 rounded-full font-medium flex items-center space-x-1.5 hover:bg-[#7C1C1C]/10 transition-all text-sm"
             >
               <MessageCircle className="w-3 h-3" />
               <span>Community</span>
               <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
             </motion.button>

             <AnimatePresence>
               {isDropdownOpen && (
                 <motion.div
                   initial={{ opacity: 0, y: -10, scale: 0.95 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, y: -10, scale: 0.95 }}
                   transition={{ duration: 0.2 }}
                   className={`absolute ${isMobile ? 'right-0' : 'left-1/2 transform -translate-x-1/2'} mt-2 w-48 bg-black/90 backdrop-blur-md border border-[#7C1C1C]/30 rounded-lg shadow-xl z-50`}
                 >
                   {communityLinks.map((link) => (
                     <a
                       key={link.name}
                       href={link.href}
                       target="_blank"
                       rel="noopener noreferrer"
                       onClick={() => setIsDropdownOpen(false)}
                       className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-[#7C1C1C]/20 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                     >
                       <link.icon className="w-4 h-4" />
                       <div>
                         <div className="font-medium">{link.name}</div>
                         <div className="text-xs text-white/60">{link.description}</div>
                       </div>
                     </a>
                   ))}
                 </motion.div>
               )}
             </AnimatePresence>
           </div>
         </motion.div>

         {/* Compelling CTA context - BEGGING */}
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.8, delay: 1.2 }}
           className="text-center mb-2"
         >
           <p className="text-white/90 text-sm mb-1 font-bold">
             🙏 PLEASE don't let this opportunity slip away! 
           </p>
          
         </motion.div>

         {/* Urgency Message */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 1.4 }}
           className="text-center mb-24"
         >
           <p className="text-yellow-300 text-xs font-bold animate-bounce">
             ⚡ Your anime journey starts with ONE CLICK ⚡
           </p>
         </motion.div>

         {/* Scroll hint */}
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 2 }}
           className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
         >
           <motion.div
             animate={{ y: [0, 6, 0] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             className="flex flex-col items-center text-white/40"
           >
             <span className="text-xs mb-0.5">Scroll to explore</span>
             <ChevronDown className="w-3 h-3" />
           </motion.div>
         </motion.div>
      </div>
    </section>
  );
} 