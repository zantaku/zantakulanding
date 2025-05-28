import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from './Modal';

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showNewCTA, setShowNewCTA] = useState(false);
  const [showCountdown, setShowCountdown] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  // Calculate if we're in the final countdown (less than 10 seconds)
  const isLastSeconds = timeLeft !== null && timeLeft < 10000;
  // If less than a minute, add more urgency
  const isLastMinute = timeLeft !== null && timeLeft < 60000;

  const handleAffiliateClick = () => {
    setModalMessage('Our affiliate program is still in development. Please check back later!');
    setShowModal(true);
  };

  useEffect(() => {
    const fetchTimer = async () => {
      if (import.meta.env.DEV) {
        console.log('Fetching timer from Supabase...');
      }
      const { data, error } = await supabase
        .from('launch_timer')
        .select('expires_at, show')
        .eq('label', 'site-launch')
        .single();

      if (import.meta.env.DEV) {
        console.log('Supabase response:', { data, error });
      }

      if (error) {
        console.error('Error fetching timer:', error);
        setError(error.message);
        return;
      }

      if (!data?.expires_at) {
        console.error('No expires_at data found');
        setError('No expiration date found');
        return;
      }

      // Set the show flag from the database (default to true if not present)
      setShowCountdown(data.show !== undefined ? data.show : true);
      if (import.meta.env.DEV) {
        console.log('Show countdown flag:', data.show);
      }

      const target = new Date(data.expires_at);
      if (import.meta.env.DEV) {
        console.log('Timer target date:', target);
      }

      const update = () => {
        const now = new Date();
        const remaining = Math.max(0, target.getTime() - now.getTime());
        setTimeLeft(remaining);
        
        // Check if we just hit zero
        if (remaining === 0) {
          setShowNewCTA(true);
        }
      };

      update();
      const i = setInterval(update, 1000);
      return () => clearInterval(i);
    };

    fetchTimer();
  }, []);

  if (error) return (
    <div className="text-red-500 bg-red-900/20 border border-red-500/20 p-4 rounded-lg">
      <p className="font-bold">Error loading countdown:</p>
      <p>{error}</p>
    </div>
  );

  if (timeLeft === null || showCountdown === null) return (
    <div className="text-zantaku-pink font-mono text-4xl sm:text-5xl font-bold tracking-widest text-center">
      Loading...
    </div>
  );

  // Coming Soon view
  if (showCountdown === false) {
    return (
      <div className="mt-4 sm:mt-6 flex flex-col items-center">
        <Modal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
          message={modalMessage}
        />
        
        <div className="text-zantaku-pink font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest text-center px-2 mb-8 sm:mb-10 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-zantaku-red/10 to-zantaku-pink/10 blur-2xl rounded-full opacity-50"></div>
          Coming Soon...
        </div>
        
        <div className="mt-6 sm:mt-8 w-full flex flex-col sm:flex-row gap-8 sm:gap-10 justify-center px-4 sm:px-0">
          <a 
            href="https://discord.gg/Pm7KyBYdA5"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-zantaku-red to-zantaku-pink text-white w-full sm:w-auto min-h-[68px] px-10 sm:px-12 py-5 sm:py-6 rounded-full font-semibold flex items-center gap-2 justify-center shadow-lg shadow-zantaku-red/20 text-lg sm:text-xl hover:brightness-110 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-pink-500/50 relative"
          >
            <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            🚀 Join the Discord! ⭐
          </a>
          
          <a 
            href="#affiliate"
            onClick={(e) => {
              e.preventDefault();
              handleAffiliateClick();
            }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-zantaku-pink w-full sm:w-auto min-h-[68px] px-10 sm:px-12 py-5 sm:py-6 rounded-full font-semibold flex items-center gap-2 justify-center shadow-lg text-lg sm:text-xl hover:bg-white/20 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-zantaku-pink/50 relative"
          >
            <div className="absolute inset-0 bg-zantaku-pink/5 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            Become an Affiliate 🌟
          </a>
        </div>
      </div>
    );
  }

  // When countdown reaches zero
  if (timeLeft === 0) {
    return (
      <div className="mt-4 sm:mt-6 flex flex-col items-center gap-4">
        <div className="text-zantaku-pink font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest text-center bg-gradient-to-r from-zantaku-red to-zantaku-pink bg-clip-text text-transparent px-2">
          🎉 Launch Time! 🎉
        </div>
        
        <AnimatePresence>
          {showNewCTA && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="mt-6 sm:mt-8 bg-zantaku-pink text-white text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:brightness-110 transition-all duration-300"
            >
              🔥 Access Now — You're In! 🔥
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Normal countdown display
  const seconds = Math.floor(timeLeft / 1000) % 60;
  const minutes = Math.floor(timeLeft / 1000 / 60) % 60;
  const hours = Math.floor(timeLeft / 1000 / 60 / 60);

  // Style based on urgency level
  const getCountdownStyles = () => {
    if (isLastSeconds) {
      return 'text-zantaku-red';
    }
    if (isLastMinute) {
      return 'text-zantaku-red'; 
    }
    return 'text-zantaku-pink';
  };

  return (
    <div className="mt-4 sm:mt-6 flex flex-col items-center">
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        message={modalMessage}
      />
      
      <div className={`font-mono text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest text-center ${getCountdownStyles()} px-2 mb-8 sm:mb-10 relative`}>
        <div className="absolute inset-0 bg-gradient-to-r from-zantaku-red/10 to-zantaku-pink/10 blur-2xl rounded-full opacity-50"></div>
        ⏳ Launching in {hours.toString().padStart(2, '0')}h {minutes.toString().padStart(2, '0')}m {seconds.toString().padStart(2, '0')}s
      </div>
      
      <div className="mt-6 sm:mt-8 w-full flex flex-col sm:flex-row gap-8 sm:gap-10 justify-center px-4 sm:px-0">
        <a 
          href="https://discord.gg/Pm7KyBYdA5"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-zantaku-red to-zantaku-pink text-white w-full sm:w-auto min-h-[68px] px-10 sm:px-12 py-5 sm:py-6 rounded-full font-semibold flex items-center gap-2 justify-center shadow-lg shadow-zantaku-red/20 text-lg sm:text-xl hover:brightness-110 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-pink-500/50 relative"
        >
          <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          🚀 Join the Discord! ⭐
        </a>
        
        <a 
          href="#affiliate"
          onClick={(e) => {
            e.preventDefault();
            handleAffiliateClick();
          }}
          className="bg-white/10 backdrop-blur-sm border border-white/20 text-zantaku-pink w-full sm:w-auto min-h-[68px] px-10 sm:px-12 py-5 sm:py-6 rounded-full font-semibold flex items-center gap-2 justify-center shadow-lg text-lg sm:text-xl hover:bg-white/20 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-zantaku-pink/50 relative"
        >
          <div className="absolute inset-0 bg-zantaku-pink/5 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          Become an Affiliate 🌟
        </a>
      </div>
    </div>
  );
}