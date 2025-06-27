import React from 'react';

interface MonetagProps {
  enableInDev?: boolean;
}

// Enhanced component that manages both MindMate and Monetag initialization
const Monetag: React.FC<MonetagProps> = ({ enableInDev = false }) => {
  React.useEffect(() => {
    const shouldLoad = import.meta.env.PROD || enableInDev;
    
    if (shouldLoad) {
      console.log('🎯 Initializing ad networks...');
      
      // Check and initialize MindMate
      const initializeMindMate = () => {
        if (typeof window !== 'undefined') {
          // MindMate scripts should auto-initialize, but we can check if they're loaded
          const mindMateInterstitial = document.querySelector('script[src*="ss.mrmnd.com/interstitial.js"]');
          const mindMateDynamic = document.querySelector('script[src*="ss.mrmnd.com/dynamic.js"]');
          
          if (mindMateInterstitial && mindMateDynamic) {
            console.log('✅ MindMate scripts detected and loaded');
            
            // Check if MindMate global is available
            setTimeout(() => {
              if ((window as any).mrmnd) {
                console.log('✅ MindMate global object available');
              } else {
                console.log('⚠️ MindMate scripts loaded but global object not yet available');
              }
            }, 2000);
          } else {
            console.log('❌ MindMate scripts not found in DOM');
          }
        }
      };

      // Check and initialize Monetag
      const initializeMonetag = () => {
        if (typeof window !== 'undefined') {
          // Check if Monetag scripts are loaded
          const monetagScripts = document.querySelectorAll('script[src*="groleegni.net"]');
          
          if (monetagScripts.length > 0) {
            console.log(`✅ Monetag scripts detected (${monetagScripts.length} scripts)`);
            
            // Add Monetag meta verification
            const monetagMeta = document.querySelector('meta[name="monetag"]');
            if (monetagMeta) {
              console.log('✅ Monetag meta tag verified');
            } else {
              console.log('❌ Monetag meta tag missing');
            }
            
            // Trigger Monetag initialization if available
            setTimeout(() => {
              if ((window as any).monetag) {
                console.log('✅ Monetag global object available');
                try {
                  (window as any).monetag.init();
                  console.log('✅ Monetag initialized');
                } catch (error) {
                  console.warn('⚠️ Monetag initialization error:', error);
                }
              } else {
                console.log('⚠️ Monetag scripts loaded but global object not yet available');
              }
            }, 1500);
          } else {
            console.log('❌ Monetag scripts not found in DOM');
          }
        }
      };

      // Initialize both networks
      initializeMindMate();
      initializeMonetag();
      
      // Global ad debugging helper
      if (import.meta.env.DEV) {
        (window as any).debugAds = () => {
          console.log('🔍 Ad Network Debug Info:');
          console.log('MindMate available:', !!(window as any).mrmnd);
          console.log('Monetag available:', !!(window as any).monetag);
          console.log('Ad containers:', document.querySelectorAll('[data-ad-container="true"]').length);
          console.log('MindMate containers:', document.querySelectorAll('.mrmnd-ad-slot').length);
          console.log('Monetag containers:', document.querySelectorAll('.monetag-ad-slot').length);
        };
        console.log('🧪 Dev mode: Use debugAds() to check ad network status');
      }
      
      console.log('🎯 Ad networks initialization completed');
    } else {
      console.log('🚫 Development mode - Ad networks disabled');
    }
  }, [enableInDev]);

  return null;
};

export default Monetag; 