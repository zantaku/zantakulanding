import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Import images using relative paths
import circlesImg from '../asset/circles.png';
import logoImg from '../asset/zantakulogoV2.png';
import { ParallaxBackground } from './ParallaxBackground';
import { PhoneRotation } from './PhoneRotation';
import { OptimizedImage } from './OptimizedImage';

// Color palette from spec
const colors = {
  deepBlack: '#0A0A0A',
  crimsonRed: '#7C1C1C',
  burntMaroon: '#531111',
  mossyGreen: '#425A40',
  slateTeal: '#3E6257',
  softSkyBlue: '#2C7A8C'
};

// Anime quotes that rotate
const animeQuotes = [
  { quote: "The world is not beautiful. Therefore, it is.", author: "Kino's Journey" },
  { quote: "Whatever you lose, you'll find it again. But what you throw away you'll never get back.", author: "Full Metal Alchemist" },
  { quote: "If you don't share someone's pain, you can never understand them.", author: "Naruto" },
  { quote: "The only ones who should kill are those prepared to be killed.", author: "Code Geass" },
  { quote: "A dropout will beat a genius through hard work.", author: "Rock Lee" }
];

// Otaku terms that rotate
const otakuTerms = [
  { term: "推し (Oshi)", meaning: "Your favorite character" },
  { term: "かわいい (Kawaii)", meaning: "Cute/Adorable" },
  { term: "尊い (Toutoi)", meaning: "Too precious" },
  { term: "神アニメ (Kami Anime)", meaning: "God-tier anime" },
  { term: "萌え (Moe)", meaning: "Heart-melting cuteness" }
];

// Reduced number of particles for better performance
const PARTICLE_COUNT = 10;

// Helper function to generate particles only once
const generateParticles = () => {
  return [...Array(PARTICLE_COUNT)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    backgroundColor: [colors.crimsonRed, colors.mossyGreen, colors.slateTeal, colors.softSkyBlue][Math.floor(Math.random() * 4)],
    animationDelay: `${Math.random() * 5}s`,
    opacity: 0.3
  }));
};

export function HeroSection() {
  const particles = useMemo(() => generateParticles(), []);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [termIndex, setTermIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [termVisible, setTermVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Add responsive layout adjustments via CSS media queries and scroll effects
  useEffect(() => {
    // Handle scroll events to detect when we've scrolled past the hero
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionHeight = sectionRef.current.offsetHeight;
        const scrollPosition = window.scrollY;
        
        // If we've scrolled past half the hero, consider it "scrolled"
        if (scrollPosition > sectionHeight * 0.3) {
          if (!hasScrolled) setHasScrolled(true);
        } else {
          if (hasScrolled) setHasScrolled(false);
        }
      }
    };
    
    // Listen for window resize for any future window-specific behavior
    const handleResize = () => {
      // Using CSS media queries for responsive design
      // No state tracking needed in this component
    };
    
    // Set up event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled]);
  
  // Rotate between quotes
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setQuoteIndex((prevIndex) => (prevIndex + 1) % animeQuotes.length);
        setQuoteVisible(true);
      }, 500);
    }, 8000);
    
    return () => clearInterval(quoteInterval);
  }, []);
  
  // Rotate between otaku terms
  useEffect(() => {
    const termInterval = setInterval(() => {
      setTermVisible(false);
      setTimeout(() => {
        setTermIndex((prevIndex) => (prevIndex + 1) % otakuTerms.length);
        setTermVisible(true);
      }, 500);
    }, 7000);
    
    return () => clearInterval(termInterval);
  }, []);

  // Handle the "Learn more" click event
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
  
  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with parallax effect */}
      <ParallaxBackground image={circlesImg} overlayOpacity={0.8} />
      
      {/* Down indicator arrow - only visible when not scrolled */}
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
            className="text-white"
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
      
      {/* Floating decorative particles for that Neo-Tokyo vibe */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full w-2 h-2 md:w-3 md:h-3 opacity-30"
          style={{
            left: particle.left,
            top: particle.top,
            backgroundColor: particle.backgroundColor,
            animationDelay: particle.animationDelay,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Main content container - floating layout on mobile */}
      <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center justify-between lg:gap-4 relative">
        {/* Logo and Subtitle Block - Moved to the top for mobile */}
        <div className="w-full mb-2 md:mb-4 order-1 lg:hidden text-center">
          {/* Glowing logo using Optimized Image */}
          <div className="relative inline-block mb-1">
            {/* Glow effect */}
            <div className="absolute inset-0 blur-md opacity-30 bg-neo-crimson rounded-full transform scale-125"></div>
            
            <OptimizedImage 
              src={logoImg}
              alt="Zantaku Logo"
              width={80}
              height={80}
              className="relative w-16 h-16"
              priority={true}
            />
          </div>
          
          {/* Japanese subtitle */}
          <h2 className="text-zantaku-cream opacity-80 font-medium text-xs">
            オタクコミュニティハブ
          </h2>
        </div>
        
        {/* Phone mockup - floats to the right on mobile, below logo */}
        <div className="absolute right-0 top-16 sm:top-12 w-[120px] sm:w-[150px] lg:static lg:w-1/2 flex justify-end items-start order-2 lg:justify-end overflow-visible">
          <PhoneRotation />
        </div>
        
        {/* Hero copy - appears third on mobile, positioned to avoid phone overlap */}
        <div className="w-full lg:w-1/2 text-left order-3 lg:order-1 mt-1 md:mt-0 pr-[130px] sm:pr-[160px] md:pr-0 lg:text-left">
          {/* Logo and Subtitle Block - Only visible on desktop */}
          <div className="mb-3 md:mb-6 hidden lg:block">
            {/* Glowing logo using Optimized Image */}
            <div className="relative inline-block mb-2 md:mb-4">
              {/* Glow effect */}
              <div className="absolute inset-0 blur-xl opacity-30 bg-neo-crimson rounded-full transform scale-125"></div>
              
              <OptimizedImage 
                src={logoImg}
                alt="Zantaku Logo"
                width={120}
                height={120}
                className="relative w-24 h-24 md:w-32 md:h-32 lg:w-[150px] lg:h-[150px]"
                priority={true}
              />
            </div>
            
            {/* Japanese subtitle */}
            <h2 className="text-zantaku-cream opacity-80 font-medium text-sm md:text-base lg:text-lg">
              オタクコミュニティハブ
            </h2>
          </div>
          
          {/* Main headline with gradient text */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 md:mb-4 leading-tight">
            The <span className="bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text">Anime & Manga</span> App
          </h1>
          
          {/* Anime quote rotation - Hide on very small screens */}
          <div className="mb-4 md:mb-8 h-16 md:h-20 hidden sm:block">
            <AnimatePresence mode="wait">
              {quoteVisible && (
                <motion.div
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-white/10"
                >
                  <p className="text-white/90 text-xs md:text-sm lg:text-base italic">"{animeQuotes[quoteIndex].quote}"</p>
                  <p className="text-white/70 text-[10px] md:text-xs lg:text-sm mt-1">— {animeQuotes[quoteIndex].author}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* CTA button with animation */}
          <div className="flex flex-col sm:flex-row items-start gap-2 md:gap-4 mb-4 md:mb-8">
            <motion.a
              href="https://github.com/zantaku/Zantaku/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-500 hover:to-pink-400 text-white font-bold px-5 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg shadow-red-600/30 w-full sm:w-auto text-center text-sm sm:text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Zantaku Is Out Now!
            </motion.a>
            
            {/* Learn more link - smooth scroll to content below hero */}
            <a 
              href="#"
              onClick={scrollBelowHero}
              className="text-white/80 hover:text-white font-medium underline underline-offset-4 w-full sm:w-auto text-center text-sm sm:text-base"
            >
              <motion.div
                className="bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-500 hover:to-pink-400 text-white font-bold px-5 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg shadow-red-600/30 w-full sm:w-auto text-center text-sm sm:text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Learn more
              </motion.div>
            </a>
          </div>
          
          {/* Otaku term rotation - Smaller text on mobile */}
          <div className="mb-4 hidden sm:block">
            <p className="text-white/70 text-xs md:text-sm mb-1 md:mb-2">Learn some Otaku lingo:</p>
            <AnimatePresence mode="wait">
              {termVisible && (
                <motion.div
                  key={termIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block bg-white/5 px-3 md:px-4 py-1 md:py-2 rounded-lg border border-white/10"
                >
                  <p className="text-white/90 font-medium text-xs md:text-sm">{otakuTerms[termIndex].term}</p>
                  <p className="text-white/70 text-[10px] md:text-xs">{otakuTerms[termIndex].meaning}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
} 