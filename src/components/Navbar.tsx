import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, MessageCircle, Share2, Send, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Logo } from './Logo';

interface NavbarProps {
  countdownMode?: boolean;
}

type NavItem = {
  name: string;
  action?: () => void;
  id?: string;
};

export function Navbar({ countdownMode = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const { t, i18n } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const communityLinks = [
    {
      name: 'Discord',
      href: 'https://discord.gg/Pm7KyBYdA5',
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
  
  // Initialize and sync language state with i18n
  useEffect(() => {
    setCurrentLang(i18n.language || 'en');
    
    // Listen for language changes
    const handleLanguageChanged = (lng: string) => {
      setCurrentLang(lng);
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

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

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ja' : 'en';
    i18n.changeLanguage(newLang)
      .then(() => {
        console.log(`Language changed to ${newLang}`);
        document.documentElement.lang = newLang;
        // Store the language preference in localStorage
        localStorage.setItem('zantaku-language', newLang);
      })
      .catch(err => console.error('Error changing language:', err));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Zantaku - Coming Soon!',
        text: 'Check out this exciting countdown!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };



  // Different navigation items based on mode
  const navItems: NavItem[] = countdownMode ? [
    { name: 'Countdown', action: () => scrollToSection('countdown') },
    { name: 'About', action: () => scrollToSection('about') },
  ] : [
    { name: 'Home', id: 'hero' },
    { name: 'Compare', id: 'comparison' },
    { name: 'Features', id: 'features' },
  ];

  const handleNavItemClick = (item: NavItem) => {
    if (item.action) {
      item.action();
    } else if (item.id) {
      scrollToSection(item.id);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-[#7C1C1C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Logo size="medium" showText={false} />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleNavItemClick(item)}
                  className="text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-[#7C1C1C]/20 rounded-lg"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:flex items-center space-x-4"
          >
            {countdownMode ? (
              <>
                {/* Share button for countdown mode */}
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-[#7C1C1C]/30 text-white text-sm font-medium rounded-lg hover:border-[#7C1C1C] hover:bg-[#7C1C1C]/10 transition-all duration-200"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>

                {/* Community dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7C1C1C] to-[#FF6B6B] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-[#7C1C1C]/30 transition-all duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Community</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-md border border-[#7C1C1C]/30 rounded-lg shadow-xl z-50"
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
              </>
            ) : (
              <>
                {/* Community dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-[#7C1C1C]/30 text-white text-sm font-medium rounded-lg hover:border-[#7C1C1C] hover:bg-[#7C1C1C]/10 transition-all duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Community</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-md border border-[#7C1C1C]/30 rounded-lg shadow-xl z-50"
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

                {/* Download button */}
                <a 
                  href="https://github.com/zantaku/Zantaku/releases" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF6B6B] to-[#FF4444] text-white text-sm font-black rounded-lg hover:shadow-lg hover:shadow-[#FF6B6B]/50 transition-all duration-200 animate-pulse"
                >
                  <Download className="w-4 h-4 animate-bounce" />
                  <span>Get App</span>
                </a>
              </>
            )}
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-[#7C1C1C]/20 transition-colors duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-black/90 backdrop-blur-md border-t border-[#7C1C1C]/20"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  handleNavItemClick(item);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-[#7C1C1C]/20 rounded-lg transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
            
            {/* Mobile buttons */}
            <div className="pt-4 space-y-2">
              {!countdownMode && (
                <button
                  onClick={toggleLanguage}
                  className="flex items-center w-full text-left px-3 py-2 text-white/70 hover:text-white hover:bg-[#7C1C1C]/20 rounded-lg transition-colors duration-200"
                  aria-label={`Switch to ${currentLang === 'en' ? 'Japanese' : 'English'}`}
                >
                  <span className="w-4 h-4 rounded-full bg-gradient-to-r from-[#7C1C1C] to-[#FF6B6B] inline-block mr-2"></span>
                  {t('nav.language')}
                </button>
              )}

              {countdownMode && (
                <button
                  onClick={() => {
                    handleShare();
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-black/30 border border-[#7C1C1C]/30 text-white rounded-lg hover:border-[#7C1C1C] transition-all duration-200"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Countdown</span>
                </button>
              )}
              
              {/* Community links for mobile */}
              {communityLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-black/30 border border-[#7C1C1C]/30 text-white rounded-lg hover:border-[#7C1C1C] transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className="w-4 h-4" />
                  <span>Join {link.name}</span>
                </a>
              ))}
              
              {!countdownMode && (
                <a 
                  href="https://github.com/zantaku/Zantaku/releases" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-gradient-to-r from-[#FF6B6B] to-[#FF4444] text-white rounded-lg hover:shadow-lg transition-all duration-200 animate-pulse font-black"
                  onClick={() => setIsOpen(false)}
                >
                  <Download className="w-4 h-4 animate-bounce" />
                  <span>Get the App</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
} 