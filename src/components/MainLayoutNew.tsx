import React, { useState, useEffect } from 'react';
import { SnapSection } from './SnapSection';
import { HeroSectionEnhanced } from './HeroSectionEnhanced';
import { IntroductionSection } from './IntroductionSection';
import ComparisonSection from './ComparisonSection';
import { FeaturesSection } from './FeaturesSection';
import { CallToActionSection } from './CallToActionSection';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';

interface MainLayoutNewProps {
  showDebug?: boolean;
  countdownMode?: boolean;
}

export function MainLayoutNew({ showDebug = false, countdownMode = false }: MainLayoutNewProps) {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.querySelector('.snap-y');
      if (!scrollContainer) return;

      const heroSection = document.getElementById('hero');
      if (!heroSection) return;

      const heroRect = heroSection.getBoundingClientRect();
      const isInHeroSection = heroRect.bottom > 100; // Show navbar when hero is mostly out of view
      
      setShowNavbar(!isInHeroSection);
    };

    const scrollContainer = document.querySelector('.snap-y');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* Scroll-aware Navbar */}
      <AnimatePresence>
        {showNavbar && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50"
          >
            <Navbar countdownMode={countdownMode} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="snap-y snap-mandatory overflow-y-scroll h-screen">
        {/* Hero Section */}
        <SnapSection id="hero" className="bg-gradient-to-br from-[#0A0A0A] via-[#1A0A1A] to-[#0A0A0A]">
          <HeroSectionEnhanced />
        </SnapSection>

        {/* Introduction Section */}
        <SnapSection id="introduction" className="bg-gradient-to-b from-[#0A0A0A] via-[#1A0A1A] to-[#0A0A0A]">
          <IntroductionSection />
        </SnapSection>

        {/* Comparison Section */}
        <SnapSection id="comparison" className="bg-gradient-to-b from-[#1A0A1A] via-[#0A0A0A] to-[#1A0A1A]">
          <ComparisonSection />
        </SnapSection>

        {/* Features Section */}
        <SnapSection id="features" className="bg-gradient-to-b from-[#0A0A0A] via-[#1A0A1A] to-[#0A0A0A]">
          <FeaturesSection />
        </SnapSection>

        {/* Call to Action Section */}
        <SnapSection id="cta" className="bg-gradient-to-br from-[#1A0A1A] via-[#0A0A0A] to-[#7C1C1C]/20">
          <CallToActionSection />
        </SnapSection>

        {/* Footer Section - Outside of snap behavior */}
        <div id="footer" className="bg-gradient-to-t from-[#0A0A0A] via-[#1A0A1A] to-transparent">
          <Footer />
        </div>

        {/* Debug info if needed */}
        {showDebug && (
          <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm z-50">
            <p>Debug Mode: ON</p>
            <p>Sections: 5 + Footer</p>
            <p>Scroll Mode: Snap + Footer</p>
            <p>Countdown Mode: {countdownMode ? 'ON' : 'OFF'}</p>
            <p>Enhanced Hero: ACTIVE</p>
            <p>Navbar Visible: {showNavbar ? 'YES' : 'NO'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainLayoutNew; 