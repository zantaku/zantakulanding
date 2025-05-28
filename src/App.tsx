import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, MessageSquare, Instagram, Twitter } from 'lucide-react';
import { Modal } from './components/Modal';
import { NavButton } from './components/NavButton';
import { HeroSection } from './components/HeroSection';
import { PopularMediaSection } from './components/PopularMediaSection';
import { CustomLinkModal } from './components/CustomLinkModal';
import GoogleAdSense from './components/GoogleAdSense';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import UserLink from './templates/UserLink';
import BlogApp from './blog/app';
import LoginPage from './pages/LoginPage';
import AuthCallback from './pages/AuthCallback';
import AniListCallback from './pages/AniListCallback';
import { getCurrentUser, getUserProfileData } from './services/authService';
import GoogleAnalytics from './components/GoogleAnalytics';
import { GA_MEASUREMENT_ID } from './config/analytics';
import { usePageTracking } from './hooks/usePageTracking';

// Lazy load components that are not needed immediately
const FeaturePreview = lazy(() => import('./components/FeaturePreview').then(module => ({
  default: module.FeaturePreview
})));
const SupabaseDebug = lazy(() => import('./components/SupabaseDebug').then(module => ({
  default: module.SupabaseDebug
})));

// Neo-Tokyo color palette
const colors = {
  deepBlack: '#0A0A0A',
  crimsonRed: '#7C1C1C',
  burntMaroon: '#531111',
  mossyGreen: '#425A40',
  slateTeal: '#3E6257',
  softSkyBlue: '#2C7A8C'
};

// Reduced number of particles
const PARTICLE_COUNT = 10; // Reduced from 20

// Define types for the particles and MainLayout props
type Particle = {
  id: number;
  left: string;
  top: string;
  backgroundColor: string;
  animationDelay: string;
  opacity: number;
};

// Define a basic type for the profile
interface UserProfile {
  id?: number;
  username: string;
  pfp_url: string;
  about?: string;
  why_zantaku?: string;
  top_anime?: string[];
  top_manga?: string[];
  created_at?: string;
  otaku_signature?: string;
  badges?: string[];
  theme?: {
    id: number;
    name: string;
    description?: string;
    mode?: string;
    primary_color?: string;
    secondary_color?: string;
    background_color?: string;
    text_color?: string;
  };
  platform?: string;
}

interface MainLayoutProps {
  showDebug: boolean;
  showModal: boolean;
  modalMessage: string;
  handleDevFeatureClick: (feature: string) => void;
  particles: Particle[];
  colors?: Record<string, string>;
  setShowModal: (show: boolean) => void;
  showCustomLinkModal: boolean;
  setShowCustomLinkModal: (show: boolean) => void;
}

// Define specific error types for the MainLayout
type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;
  
  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

// Component to handle analytics tracking
const AnalyticsTracker = () => {
  usePageTracking();
  return null;
};

function App() {
  const [showDebug, setShowDebug] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCustomLinkModal, setShowCustomLinkModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  useEffect(() => {
    // Check for debug query parameter
    const params = new URLSearchParams(window.location.search);
    setShowDebug(params.has('debug'));
  }, []);
  
  const handleDevFeatureClick = (feature: string) => {
    if (feature === 'Custom Link') {
      setShowCustomLinkModal(true);
    } else if (feature === 'Blog') {
      setModalMessage('Our blog is currently under construction. We are working hard to bring you amazing content soon!');
      setShowModal(true);
    } else {
      setModalMessage(`The ${feature} feature is still in development. Try again later?`);
      setShowModal(true);
    }
  };

  // Generate particles only once
  const particles = React.useMemo(() => 
    [...Array(PARTICLE_COUNT)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      backgroundColor: [colors.crimsonRed, colors.mossyGreen, colors.slateTeal, colors.softSkyBlue][Math.floor(Math.random() * 4)],
      animationDelay: `${Math.random() * 5}s`,
      opacity: 0.3
    })), []);

  return (
    <BrowserRouter>
      {/* Add Google Analytics - it will only load in production */}
      <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
      <AnalyticsTracker />
      <Routes>
        <Route path="/adminp/login" element={<AdminLogin />} />
        <Route path="/adminp/dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        {/* AniList authentication callback routes */}
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/auth" element={<AniListCallback />} />
        {/* Only show blog in development mode */}
        {import.meta.env.DEV ? (
          <Route path="/blog" element={<BlogApp />} />
        ) : (
          <Route path="/blog" element={
            <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
              <div className="max-w-md mx-auto text-center px-4">
                <svg className="w-20 h-20 mx-auto mb-6 text-[#7C1C1C]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h1 className="text-2xl md:text-3xl font-bold mb-4">Blog Coming Soon</h1>
                <p className="text-gray-400 mb-6">Our blog is currently under construction. We're working hard to bring you amazing content soon!</p>
                <a 
                  href="/" 
                  className="px-6 py-3 bg-gradient-to-r from-[#7C1C1C] to-[#531111] text-white font-medium rounded-xl inline-block hover:brightness-110 transition-all"
                >
                  Return Home
                </a>
              </div>
            </div>
          } />
        )}
        <Route path="/:username" element={<UserLink />} />
        <Route path="/" element={
          <MainLayout 
            {...{ 
              showDebug, 
              showModal, 
              modalMessage, 
              handleDevFeatureClick, 
              particles, 
              setShowModal,
              showCustomLinkModal,
              setShowCustomLinkModal
            }} 
          />
        } />
      </Routes>
    </BrowserRouter>
  );
}

// Separate the main layout into its own component
const MainLayout = ({ 
  showDebug, 
  showModal, 
  modalMessage, 
  handleDevFeatureClick, 
  particles, 
  setShowModal,
  showCustomLinkModal,
  setShowCustomLinkModal 
}: MainLayoutProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and has a profile
    const checkUserProfile = async () => {
      try {
        const user = await getCurrentUser();
        
        if (user) {
          // Get associated profile data
          const profileData = await getUserProfileData();
          if (profileData?.profile) {
            setUserProfile(profileData.profile);
          }
        }
      } catch (err: unknown) {
        console.error('Error checking user profile:', getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    
    checkUserProfile();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden overflow-y-auto relative text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 min-h-screen bg-gradient-radial opacity-90 pointer-events-none"></div>
      
      {/* Particle Elements - only show in the hero area */}
      <div className="absolute top-0 h-screen w-full overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div 
            key={particle.id} 
            className="particle" 
            style={{ 
              left: particle.left, 
              top: particle.top,
              animationDelay: particle.animationDelay,
              backgroundColor: particle.backgroundColor,
              opacity: particle.opacity,
              willChange: 'transform' // Add will-change for better performance
            }}
          />
        ))}
      </div>
      
      {/* Shimmer Overlay */}
      <div className="absolute inset-0 animate-shimmer pointer-events-none"></div>
      
      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message={modalMessage}
      />
      
      {/* Custom Link Modal */}
      <CustomLinkModal
        isOpen={showCustomLinkModal}
        onClose={() => setShowCustomLinkModal(false)}
      />
      
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
        
          
          <div className="flex items-center gap-4">
        
            
            {/* Existing nav buttons */}
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="fixed top-2 sm:top-4 inset-x-0 mx-auto max-w-[95%] sm:max-w-2xl bg-neo-black/50 backdrop-blur-md rounded-full border border-white/20 p-1 sm:p-2 flex items-center justify-between z-50"
            >
              {/* Left: Blog icon */}
              <NavButton 
                icon={BookOpen} 
                text="BLOG" 
                onClick={() => handleDevFeatureClick('Blog')}
              />
              
              {/* Center: Logo (clicking will scroll to top) */}
              <div className="relative group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 text-white hover:text-neo-crimson transition-colors duration-300"
                  viewBox="0 0 500 500"
                >
                  <g fill="currentColor">
                    <rect x="131.12" y="146.01" width="103.83" height="23.21"/>
                    <rect x="131.12" y="185.1" width="103.83" height="23.21"/>
                    <polygon points="267.93 146.01 268.23 169.22 343.15 169.22 366.97 146.01 267.93 146.01"/>
                    <polygon points="267.93 185.1 329 185.1 328.37 381.31 305.79 356.01 305.79 208.31 267.93 208.31 267.93 185.1"/>
                    <polygon points="241.06 90.97 241.06 387.05 263.04 409.03 263.04 114.19 241.06 90.97"/>
                    <rect x="269.15" y="238.85" width="30.54" height="21.99"/>
                    <polygon points="404.24 238.85 333.89 238.85 333.89 260.83 382.25 260.83 404.24 238.85"/>
                    <polygon points="269.45 314.51 291.5 336.56 299.69 336.56 299.69 314.58 269.45 314.51"/>
                    <polygon points="386.65 314.58 333.89 314.46 333.89 336.56 364.66 336.56 386.65 314.58"/>
                    <polygon points="233.69 240.07 221.85 240.07 129.9 332.26 129.9 360.84 233.73 256.73 233.69 240.07"/>
                    <polygon points="215.9 238.85 95.76 238.85 116.85 260.83 193.91 260.83 215.9 238.85"/>
                    <polygon points="199.53 299.12 199.53 353.45 223.96 377.68 223.96 274.69 199.53 299.12"/>
                  </g>
                </svg>
              </div>
              
              {/* Right: User profile or claim your custom link button */}
              {!loading && userProfile ? (
                <Link 
                  to={`/${userProfile.username}`}
                  className="flex items-center gap-1 px-3 sm:px-5 py-2 sm:py-3 text-white font-medium rounded-full text-xs sm:text-sm whitespace-nowrap focus:outline-none overflow-hidden relative group"
                  style={{ 
                    background: "linear-gradient(90deg, #531111 0%, #7C1C1C 100%)",
                    boxShadow: "0 0 15px rgba(124, 28, 28, 0.3)"
                  }}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img 
                      src={userProfile.pfp_url} 
                      alt={userProfile.username}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://i.pinimg.com/originals/93/d3/e3/93d3e31639a4d07613de9dccdc8bd5e8.png";
                      }}
                    />
                  </div>
                  <span className="hidden sm:inline ml-2 font-medium">{userProfile.username}</span>
                </Link>
              ) : (
                <motion.button 
                  className="flex items-center gap-1 px-3 sm:px-5 py-2 sm:py-3 text-white font-medium rounded-full text-xs sm:text-sm whitespace-nowrap focus:outline-none overflow-hidden relative group"
                  onClick={() => handleDevFeatureClick('Custom Link')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    background: "linear-gradient(90deg, #531111 0%, #7C1C1C 100%)",
                    boxShadow: "0 0 15px rgba(124, 28, 28, 0.3)"
                  }}
                >
                  {/* Animated shine effect overlay */}
                  <motion.div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      backgroundSize: "200% 100%",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "-100% 0"
                    }}
                    animate={{ backgroundPosition: ["200% 0", "-100% 0"] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                  
                  {/* Border glow on hover */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ 
                    boxShadow: "0 0 10px rgba(124, 28, 28, 0.7), 0 0 20px rgba(124, 28, 28, 0.4)",
                  }}></div>
                  
                  {/* Icon and text */}
                  <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                    {/* Chain link icon - better design that fits the theme */}
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 transform -rotate-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path 
                        d="M13.5 12C13.5 15.18 10.93 17.75 7.75 17.75C4.57 17.75 2 15.18 2 12C2 8.82 4.57 6.25 7.75 6.25" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                      <path 
                        d="M10 12C10 8.82 12.57 6.25 15.75 6.25C18.93 6.25 21.5 8.82 21.5 12C21.5 15.18 18.93 17.75 15.75 17.75" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="hidden sm:inline font-medium">Claim your custom link</span>
                    <span className="sm:hidden font-medium">Claim link</span>
                  </span>
                </motion.button>
              )}
            </motion.nav>
          </div>
        </div>
      </header>

      {/* New Hero Section */}
      <HeroSection />
      
      {/* Ad after Hero Section - with content verification */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-3">Discover Anime & Manga Like Never Before</h2>
          <p className="text-lg mb-4">
            Zantaku brings you a revolutionary platform to track, discover, and share your anime and manga journey. 
            Our curated content and personalized recommendations help you find your next favorite series.
          </p>
        </div>
        <GoogleAdSense adSlot="1234567890" responsive={true} className="py-4" contentVerified={true} />
      </div>
      
      {/* Lazy load Feature Preview Section */}
      <Suspense fallback={<div className="h-40 bg-[#121212]"></div>}>
        <FeaturePreview />
      </Suspense>

      {/* Debug Section if enabled - lazy loaded */}
      {showDebug && (
        <Suspense fallback={<div className="h-20 bg-[#121212]"></div>}>
          <div className="container mx-auto px-4 py-12">
            <div className="mb-12">
              <SupabaseDebug />
            </div>
          </div>
        </Suspense>
      )}

      {/* Popular Media Section with AniList Data */}
      <PopularMediaSection />

      {/* Content section before ad to ensure compliance */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-3">Why Choose Zantaku</h2>
          <p className="text-lg mb-4">
            Zantaku stands out from other anime tracking platforms by offering a seamless experience
            across devices, with unique features designed specifically for passionate fans. Our community-driven
            approach ensures you're always connected to the latest trends and discussions.
          </p>

        </div>
        
        {/* Ad with verified content */}
        <GoogleAdSense adSlot="0987654321" responsive={true} className="py-4" contentVerified={true} />
      </div>
      
      {/* Call to Action Banner - Simplified */}
      <div className="relative py-20 bg-gradient-to-b from-[#181818] to-[#121212]">
        {/* Simplified floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Triangle */}
          <motion.div
            className="absolute w-20 h-20 border-2 border-neo-crimson/30 opacity-20"
            style={{ 
              top: '15%', 
              left: '10%', 
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              willChange: 'transform'
            }}
            animate={{
              rotate: [0, 180],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Square */}
          <motion.div
            className="absolute w-16 h-16 border-2 border-white/20 opacity-20"
            style={{ 
              bottom: '20%', 
              right: '15%',
              willChange: 'transform'
            }}
            animate={{
              rotate: [0, 180],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Join the Revolution?</h2>
            <p className="text-xl text-white/70 mb-10">
              Be part of the next-gen anime & manga experience. Early access available now.
            </p>
            <a 
              href="#" 
              className="px-8 py-4 bg-gradient-to-r from-neo-crimson to-neo-maroon text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition text-lg"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] py-12 relative">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-[#121212]/50 pointer-events-none"></div>
        
        {/* Logo and socials container */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <svg
                className="w-12 h-12 text-white/80 hover:text-neo-crimson transition-colors duration-300"
                viewBox="0 0 500 500"
              >
                <g fill="currentColor">
                  <rect x="131.12" y="146.01" width="103.83" height="23.21"/>
                  <rect x="131.12" y="185.1" width="103.83" height="23.21"/>
                  <polygon points="267.93 146.01 268.23 169.22 343.15 169.22 366.97 146.01 267.93 146.01"/>
                  <polygon points="267.93 185.1 329 185.1 328.37 381.31 305.79 356.01 305.79 208.31 267.93 208.31 267.93 185.1"/>
                  <polygon points="241.06 90.97 241.06 387.05 263.04 409.03 263.04 114.19 241.06 90.97"/>
                  <rect x="269.15" y="238.85" width="30.54" height="21.99"/>
                  <polygon points="404.24 238.85 333.89 238.85 333.89 260.83 382.25 260.83 404.24 238.85"/>
                  <polygon points="269.45 314.51 291.5 336.56 299.69 336.56 299.69 314.58 269.45 314.51"/>
                  <polygon points="386.65 314.58 333.89 314.46 333.89 336.56 364.66 336.56 386.65 314.58"/>
                  <polygon points="233.69 240.07 221.85 240.07 129.9 332.26 129.9 360.84 233.73 256.73 233.69 240.07"/>
                  <polygon points="215.9 238.85 95.76 238.85 116.85 260.83 193.91 260.83 215.9 238.85"/>
                  <polygon points="199.53 299.12 199.53 353.45 223.96 377.68 223.96 274.69 199.53 299.12"/>
                </g>
              </svg>
            </div>
            
            {/* Navigation Links - Added for more content */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-white/70">
              <div>
                <h4 className="font-semibold mb-3 text-white">About</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-neo-crimson transition-colors">Our Story</a></li>
                  <li><a href="#" className="hover:text-neo-crimson transition-colors">Team</a></li>
                  <li><a href="#" className="hover:text-neo-crimson transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-neo-crimson transition-colors">Press</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-white">Features</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-neo-crimson transition-colors">Anime Tracking</a></li>
                  <li><a href="#" className="hover:text-neo-crimson transition-colors">Manga Library</a></li>
                  <li><a href="#" className="hover:text-neo-crimson transition-colors">Custom Lists</a></li>
                  <li><a href="#" className="hover:text-neo-crimson transition-colors">Recommendations</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-white">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-neo-crimson transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-neo-crimson transition-colors">Community</a></li>
                  <li><a href="#" className="hover:text-neo-crimson transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-neo-crimson transition-colors">Feedback</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-white">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-neo-crimson transition-colors">Terms of Service</a></li>
                  <li><a href="/privacy-policy" className="hover:text-neo-crimson transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-neo-crimson transition-colors">Cookie Policy</a></li>
                  <li><a href="#" className="hover:text-neo-crimson transition-colors">Content Guidelines</a></li>
                </ul>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center gap-6 mb-8">
              <a 
                href="https://discord.gg/Pm7KyBYdA5" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300 group"
                aria-label="Discord"
              >
                <MessageSquare className="w-5 h-5 text-white group-hover:text-neo-crimson transition-colors duration-300" />
              </a>
              <a 
                href="https://www.instagram.com/zantaku_app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white group-hover:text-neo-crimson transition-colors duration-300" />
              </a>
              <a 
                href="https://x.com/zantaku_app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300 group"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5 text-white group-hover:text-neo-crimson transition-colors duration-300" />
              </a>
            </div>
            
            {/* Copyright */}
            <div className="text-center text-white/50 text-sm mb-8">
              <p className="mb-2">© {new Date().getFullYear()} Zantaku. All rights reserved.</p>
              <p>Zantaku is a community-driven platform for anime and manga enthusiasts. We're committed to providing the best experience for fans worldwide.</p>
            </div>
            
            {/* Footer Ad with content verification */}
            <div className="mt-8">
              <GoogleAdSense adSlot="2468013579" responsive={true} className="py-4" contentVerified={true} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;