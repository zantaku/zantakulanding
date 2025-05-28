import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { signOut, getCurrentUser, getUserProfileData } from '../services/authService';
import { AnilistAuthButton } from './AnilistAuthButton';

// Define types for user data and profile
interface UserProfile {
  id?: number;
  username: string;
  pfp_url: string;
}

interface UserData {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
  app_metadata?: Record<string, unknown>;
}

interface UserAuthWidgetProps {
  className?: string;
}

export function UserAuthWidget({ className = '' }: UserAuthWidgetProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAnilistAuthProcessing, setIsAnilistAuthProcessing] = useState(false);

  useEffect(() => {
    // Check user authentication status on mount
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      
      // Check if user is authenticated
      const user = await getCurrentUser();
      
      if (user) {
        setIsAuthenticated(true);
        setUserData(user);
        
        // Get associated profile data
        const profileData = await getUserProfileData();
        if (profileData?.profile) {
          setUserProfile(profileData.profile);
        }
      } else {
        setIsAuthenticated(false);
        setUserData(null);
        setUserProfile(null);
      }
    } catch (err) {
      console.error('Error checking auth status:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUserData(null);
      setUserProfile(null);
      setShowDropdown(false);
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const handleAnilistAuth = () => {
    setIsAnilistAuthProcessing(true);
    
    // Create and store a random state value for CSRF protection
    const state = Math.random().toString(36).substring(2, 15);
    localStorage.setItem('anilist_state', state);
    
    // Open AniList authorization window
    const clientId = import.meta.env.VITE_ANILIST_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/callback`;
    const anilistAuthUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&state=${state}`;
    
    window.open(anilistAuthUrl, '_blank', 'width=600,height=800');
    
    // Reset the processing state after a delay
    setTimeout(() => {
      setIsAnilistAuthProcessing(false);
    }, 1000);
  };

  return (
    <div className={`relative ${className}`}>
      {loading ? (
        <div className="h-10 w-10 rounded-full bg-white/5 animate-pulse"></div>
      ) : isAuthenticated && userProfile ? (
        <>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden">
              {userProfile.pfp_url ? (
                <img 
                  src={userProfile.pfp_url} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://i.pinimg.com/originals/93/d3/e3/93d3e31639a4d07613de9dccdc8bd5e8.png";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-zantaku-pink/20 flex items-center justify-center">
                  <span className="text-white text-xs">
                    {userData?.email?.substring(0, 1)?.toUpperCase() || '?'}
                  </span>
                </div>
              )}
            </div>
            <span className="text-white text-sm hidden sm:block">
              {userProfile.username || userData?.email?.split('@')[0] || 'User'}
            </span>
            <svg 
              className={`w-4 h-4 text-white/70 transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden"
              >
                <div className="p-3 border-b border-gray-700">
                  <div className="text-white font-medium">
                    {userProfile.username || userData?.email?.split('@')[0] || 'User'}
                  </div>
                  <div className="text-white/60 text-xs truncate">
                    {userData?.email || ''}
                  </div>
                </div>
                
                <div className="py-1">
                  <Link 
                    to={`/${userProfile.username}`}
                    className="block px-4 py-2 text-white hover:bg-white/5 transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    View My Profile
                  </Link>
                  
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-900/20 transition-colors"
                  >
                    Sign Out
                  </button>

                  {userData && !userData.user_metadata?.anilist_connected && (
                    <div className="px-4 py-2">
                      <AnilistAuthButton 
                        onAuthClick={handleAnilistAuth} 
                        isProcessing={isAnilistAuthProcessing}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : null}
    </div>
  );
} 