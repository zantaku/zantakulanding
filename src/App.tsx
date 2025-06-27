import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './i18n'; // Initialize i18next

import { GA_MEASUREMENT_ID } from './config/analytics';
import { usePageTracking } from './hooks/usePageTracking';

// Core components that need to be loaded immediately
import GoogleAnalytics from './components/GoogleAnalytics';
// import Monetag from './components/Monetag'; // Temporarily disabled for Google Security Review
// import AdBlockerNotification from './components/AdBlockerNotification'; // Disabled for Google Security Review
import { HeroSectionCountdown } from './components/HeroSectionCountdown';

// Lazy load ALL heavy components
const MainLayoutNew = lazy(() => import('./components/MainLayoutNew'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const UserLink = lazy(() => import('./templates/UserLink'));
const BlogApp = lazy(() => import('./blog/app'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AuthCallback = lazy(() => import('./pages/AuthCallback'));
const AniListCallback = lazy(() => import('./pages/AniListCallback'));

// Lazy load components that are not needed immediately
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FeaturePreview = lazy(() => import('./components/FeaturePreview').then(module => ({
  default: module.FeaturePreview
})));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SupabaseDebug = lazy(() => import('./components/SupabaseDebug').then(module => ({
  default: module.SupabaseDebug
})));

// Neo-Tokyo color palette
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const colors = {
  deepBlack: '#0A0A0A',
  crimsonRed: '#7C1C1C',
  burntMaroon: '#531111',
  mossyGreen: '#425A40',
  slateTeal: '#3E6257',
  softSkyBlue: '#2C7A8C'
};

// Reduced number of particles
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

// Minimal loading component
const PageLoader = () => (
  <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#7C1C1C] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Component to handle analytics tracking
const AnalyticsTracker = () => {
  usePageTracking();
  return null;
};

// Check if countdown is active or expired
const isCountdownActive = () => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // Check if user has chosen to bypass the countdown
    if (localStorage.getItem('bypass_countdown') === 'true') {
      return false;
    }
  }
  
  const targetDate = new Date('2025-06-22T16:00:00-07:00');
  const now = new Date();
  return now < targetDate;
};

function App() {
  const [showDebug, setShowDebug] = useState(false);
  
  useEffect(() => {
    // Check for debug query parameter
    const params = new URLSearchParams(window.location.search);
    setShowDebug(params.has('debug'));
  }, []);

  // Determine if countdown is currently active
  const countdownActive = isCountdownActive();

  return (
    <BrowserRouter>
      {/* Add Google Analytics - it will only load in production */}
      <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
      {/* Add Monetag ads - TEMPORARILY DISABLED for Google Security Review */}
      {/* <Monetag enableInDev={true} /> */}
      {/* Add AdBlocker notification - DISABLED for Google Security Review */}
      {/* <AdBlockerNotification delay={5000} /> */}
      <AnalyticsTracker />
      
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/adminp/login" element={<AdminLogin />} />
          <Route path="/adminp/dashboard" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          {/* AniList authentication callback routes */}
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/auth" element={<AniListCallback />} />
          {/* Countdown page */}
          <Route path="/countdown" element={<HeroSectionCountdown />} />
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
            countdownActive ? <HeroSectionCountdown /> : <MainLayoutNew showDebug={showDebug} countdownMode={false} />
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;