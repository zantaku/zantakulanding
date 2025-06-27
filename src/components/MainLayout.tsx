import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ExternalLink, Download } from 'lucide-react';
import { Modal } from './Modal';
import { useTranslation } from 'react-i18next';
import { Logo } from './Logo';

import { CustomLinkModal } from './CustomLinkModal';

import { getCurrentUser, getUserProfileData } from '../services/authService';

// Lazy load heavy components
const SupabaseDebug = lazy(() => import('./SupabaseDebug').then(module => ({
  default: module.SupabaseDebug
})));

// Japanese-inspired Feature Card Component
const FeatureCard = ({ icon, titleJa, titleEn, descJa, descEn, index }: {
  icon: string;
  titleJa: string;
  titleEn: string;
  descJa: string;
  descEn: string;
  index: number;
}) => {
  const { i18n } = useTranslation();
  const isJapanese = i18n.language === 'ja';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative group p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-[#E63946]/30 transition-all duration-700 traditional-pattern ${
        index % 2 === 0 ? 'md:translate-x-4' : 'md:-translate-x-4'
      }`}
    >
      {/* Soft glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E63946]/20 via-transparent to-[#E63946]/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
      
      <div className="relative z-10">
        {/* Icon with zen-like presentation */}
        <div className="w-16 h-16 mb-6 mx-auto md:mx-0 flex items-center justify-center text-3xl bg-gradient-to-br from-[#E63946]/20 to-[#E63946]/10 rounded-2xl border border-[#E63946]/20">
          {icon}
        </div>
        
        {/* Title - Japanese style with subtle emphasis */}
        <h3 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">
          <span className="japanese-text text-white block mb-1">
            {isJapanese ? titleJa : titleEn}
          </span>
          {isJapanese && (
            <span className="text-sm text-white/60 font-normal">
              {titleEn}
            </span>
          )}
        </h3>
        
        {/* Description with poetic spacing */}
        <p className="japanese-text text-white/80 leading-relaxed text-center md:text-left">
          {isJapanese ? descJa : descEn}
        </p>
      </div>
    </motion.div>
  );
};

// Sakura petals animation component
const SakuraPetals = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="sakura-petal"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
};

// Navigation component with Japanese design principles
const JapaneseNavigation = ({ onLanguageToggle }: { onLanguageToggle: () => void }) => {
  const { i18n } = useTranslation();
  const isJapanese = i18n.language === 'ja';
  
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with Japanese aesthetic */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <Logo size="medium" showText={false} />
          </motion.div>
          
          {/* Navigation items */}
          <div className="hidden md:flex items-center space-x-8 japanese-text">
            <a href="#home" className="text-white/80 hover:text-white transition-colors relative group">
              {isJapanese ? 'ホーム' : 'Home'}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E63946] group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#features" className="text-white/80 hover:text-white transition-colors relative group">
              {isJapanese ? '機能' : 'Features'}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E63946] group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#community" className="text-white/80 hover:text-white transition-colors relative group">
              {isJapanese ? 'コミュニティ' : 'Community'}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E63946] group-hover:w-full transition-all duration-300" />
            </a>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLanguageToggle}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Globe className="w-5 h-5 text-white" />
            </motion.button>
            
            {/* Download button */}
            <motion.a
              href="https://github.com/zantaku/Zantaku/releases"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-[#E63946] hover:bg-[#E63946]/90 text-white rounded-full font-medium transition-colors japanese-text"
            >
              {isJapanese ? 'ダウンロード' : 'Download'}
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// Hero section with centered YouTube video
const JapaneseHeroSection = () => {
  const { i18n } = useTranslation();
  const isJapanese = i18n.language === 'ja';
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 pt-20">
      {/* Gradient background with Japanese aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#1A0A1A] to-[#0A0A0A]" />
      
      {/* Floating geometric elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-[#E63946]/30 rounded-full gentle-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-[#E63946]/20 rounded-lg gentle-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-[#E63946]/10 rounded-full gentle-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
        {/* Welcome text with Japanese aesthetic */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="japanese-text mb-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              <span className="inline-block">
                {isJapanese ? 'ようこそ、' : 'Welcome to'}
              </span>
              <br />
              <div className="flex items-center justify-center">
                <img src="/asset/zantakulogoV2.webp" alt="Zantaku Logo" className="w-32 h-32" />
              </div>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-2">
              {isJapanese ? 'アニメを発見。マンガを追跡。日本を探索。' : 'Discover anime. Track manga. Explore Japan.'}
            </p>
            {isJapanese && (
              <p className="text-lg text-white/60">
                Discover anime. Track manga. Explore Japan.
              </p>
            )}
          </div>
        </motion.div>

        {/* Centered YouTube Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative mx-auto max-w-4xl mb-12"
        >
          {/* Multiple layered glow effects for depth */}
          <div className="absolute -inset-8 bg-gradient-to-r from-[#E63946]/20 via-[#FF6B6B]/30 to-[#E63946]/20 rounded-3xl opacity-80 blur-3xl gentle-pulse" />
          <div className="absolute -inset-6 bg-gradient-to-r from-[#E63946]/30 via-[#FF6B6B]/40 to-[#E63946]/30 rounded-3xl opacity-60 blur-2xl" />
          <div className="absolute -inset-4 bg-gradient-to-r from-[#E63946] via-[#FF6B6B] to-[#E63946] rounded-3xl opacity-20 blur-lg" />
          
          {/* Video container with Japanese design elements */}
          <div className="relative bg-gradient-to-br from-[#0D0D0D] via-[#1A0A1A] to-[#0D0D0D] rounded-3xl overflow-hidden shadow-2xl border border-[#E63946]/30 video-glow">
            <div className="aspect-video w-full relative">
              {/* Loading state with Japanese aesthetic */}
              {!isVideoLoaded && (
                <div className="absolute inset-0 z-20 bg-gradient-to-br from-[#0D0D0D] via-[#1A0A1A] to-[#0D0D0D] flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-2 border-[#E63946] border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-white/60 japanese-text">
                      {isJapanese ? '読み込み中...' : 'Loading...'}
                    </p>
                  </div>
                </div>
              )}
              
              {/* YouTube iframe */}
              <iframe
                src="https://www.youtube.com/embed/I8siljACiiQ?controls=1&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                title="Zantaku App Trailer"
                className="w-full h-full rounded-2xl"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setIsVideoLoaded(true)}
              />
            </div>
          </div>
        </motion.div>

        {/* Call to action with Japanese styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="space-y-4"
        >
          <p className="text-white/60 japanese-text mb-6">
            {isJapanese ? '物語が始まる場所' : 'Where stories begin.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#E63946] hover:bg-[#E63946]/90 text-white rounded-full font-semibold transition-colors japanese-text flex items-center space-x-2 zen-hover"
            >
              <Download className="w-5 h-5" />
              <span>{isJapanese ? 'アプリをダウンロード' : 'Download App'}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-colors japanese-text border border-white/20 zen-hover"
            >
              {isJapanese ? '詳細を見る' : 'Learn More'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Features section with Japanese card design
const JapaneseFeaturesSection = () => {
  const { i18n } = useTranslation();
  const isJapanese = i18n.language === 'ja';
  
  const features = [
    {
      icon: '📱',
      titleJa: 'スマートトラッキング',
      titleEn: 'Smart Tracking',
      descJa: '見たアニメや読んだマンガを自動的に記録し、あなたの物語の旅を追跡します。',
      descEn: 'Automatically track your anime and manga consumption with intelligent progress monitoring.'
    },
    {
      icon: '📖',
      titleJa: 'マンガリーダー',
      titleEn: 'Manga Reader',
      descJa: '美しく設計されたリーダーで、お気に入りのマンガを楽しみましょう。',
      descEn: 'Enjoy your favorite manga with our beautifully designed, immersive reading experience.'
    },
    {
      icon: '🌸',
      titleJa: 'コミュニティ',
      titleEn: 'Community',
      descJa: '同じ趣味を持つオタク仲間とつながり、おすすめを共有しましょう。',
      descEn: 'Connect with fellow otaku and share recommendations in our vibrant community.'
    },
    {
      icon: '🎌',
      titleJa: 'カルチャーガイド',
      titleEn: 'Culture Guide',
      descJa: '日本の文化と言語を深く理解し、体験しましょう。',
      descEn: 'Immerse yourself in Japanese culture and language with our comprehensive guides.'
    }
  ];
  
  return (
    <section id="features" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 japanese-text">
            {isJapanese ? '機能' : 'Features'}
          </h2>
          <p className="text-xl text-white/70 japanese-text max-w-2xl mx-auto">
            {isJapanese 
              ? 'あなたのオタクライフを豊かにする機能の数々' 
              : 'Thoughtfully crafted features to enhance your otaku journey'}
          </p>
        </motion.div>
        
        {/* Features grid with staggered layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              titleJa={feature.titleJa}
              titleEn={feature.titleEn}
              descJa={feature.descJa}
              descEn={feature.descEn}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Japanese-inspired footer
const JapaneseFooter = () => {
  const { i18n } = useTranslation();
  const isJapanese = i18n.language === 'ja';
  
  return (
    <footer className="bg-gradient-to-t from-[#0A0A0A] to-[#1A0A1A] py-16 relative traditional-pattern">
      <div className="max-w-7xl mx-auto px-6">
        {/* Logo and tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="mb-6 flex justify-center">
            <Logo size="large" showText={false} />
          </div>
          <p className="text-white/60 japanese-text">
            {isJapanese ? '物語が始まる場所' : 'Where stories begin.'}
          </p>
        </motion.div>
        
        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center space-x-6 mb-12"
        >
          {[
            { href: 'https://github.com/zantaku', icon: 'GitHub', label: 'GitHub' },
            { href: 'https://www.instagram.com/zantaku_app/', icon: 'Instagram', label: 'Instagram' },
            { href: 'https://x.com/zantaku_app', icon: 'X', label: 'X (Twitter)' }
          ].map((social) => (
            <motion.a
              key={social.label}
              whileHover={{ scale: 1.1, y: -2 }}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 hover:bg-[#E63946]/20 rounded-full flex items-center justify-center transition-colors duration-300 group"
              aria-label={social.label}
            >
              <ExternalLink className="w-5 h-5 text-white group-hover:text-[#E63946] transition-colors" />
            </motion.a>
          ))}
        </motion.div>
        
        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center border-t border-white/10 pt-8"
        >
          <p className="text-white/50 text-sm japanese-text">
            © {new Date().getFullYear()} {isJapanese ? 'すべての権利予約済み。' : 'All rights reserved.'}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

// Main component with all Japanese design elements
const MainLayout = React.memo(({ showDebug }: { showDebug: boolean }) => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showCustomLinkModal, setShowCustomLinkModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { t, i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ja' : 'en';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const checkUserProfile = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          const profile = await getUserProfileData(user.id);
          setUserProfile(profile);
        }
      } catch (error) {
        console.log('No user profile found');
      } finally {
        setLoading(false);
      }
    };

    checkUserProfile();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative overflow-x-hidden">
      {/* Sakura petals animation */}
      <SakuraPetals />
      
      {/* Japanese Navigation */}
      <JapaneseNavigation onLanguageToggle={toggleLanguage} />
      
      {/* Main content */}
      <main>
        {/* Hero Section with centered YouTube video */}
        <JapaneseHeroSection />
        
        {/* Features Section */}
        <JapaneseFeaturesSection />
        

      </main>
      
      {/* Japanese Footer */}
      <JapaneseFooter />
      
      {/* Debug panel */}
      {showDebug && (
        <Suspense fallback={<div>Loading debug...</div>}>
          <SupabaseDebug />
        </Suspense>
      )}
      
      {/* Modals */}
      <AnimatePresence>
        {showModal && (
          <Modal 
            isOpen={showModal} 
            onClose={() => setShowModal(false)} 
            title={t('modal.title')}
          >
            <p className="japanese-text">{modalMessage}</p>
          </Modal>
        )}
        
        {showCustomLinkModal && (
          <CustomLinkModal
            isOpen={showCustomLinkModal}
            onClose={() => setShowCustomLinkModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
});

MainLayout.displayName = 'MainLayout';

export default MainLayout;
