import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';

interface AdBlockerNotificationProps {
  delay?: number; // Delay before showing the modal (in milliseconds)
  enableInDev?: boolean; // Allow testing in development
}

// Extend window interface for development helpers
declare global {
  interface Window {
    simulateAdblock?: () => void;
    clearAdblockSimulation?: () => void;
  }
}

const AdBlockerNotification: React.FC<AdBlockerNotificationProps> = ({ 
  delay = 3000, 
  enableInDev = true 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [adsBlocked, setAdsBlocked] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Skip if in development and not enabled for dev
    if (import.meta.env.DEV && !enableInDev) {
      console.log('AdBlocker notification disabled in development mode');
      return;
    }

    const detectAdBlocker = async () => {
      try {
        // Multiple detection methods for better accuracy
        const tests = [
          // Test 1: Check if common ad-related elements are blocked
          () => {
            const testDiv = document.createElement('div');
            testDiv.innerHTML = '&nbsp;';
            testDiv.className = 'adsbox adsbygoogle ad-banner ad-slot googleads';
            testDiv.style.position = 'absolute';
            testDiv.style.left = '-10000px';
            testDiv.style.width = '1px';
            testDiv.style.height = '1px';
            document.body.appendChild(testDiv);
            
            setTimeout(() => {
              try {
                const isBlocked = testDiv.offsetHeight === 0 || 
                                window.getComputedStyle(testDiv).display === 'none' ||
                                window.getComputedStyle(testDiv).visibility === 'hidden';
                
                if (testDiv.parentNode) {
                  testDiv.parentNode.removeChild(testDiv);
                }
                
                setAdsBlocked(isBlocked);
                setHasChecked(true);
                
                if (isBlocked) {
                  console.log('🛡️ AdBlocker detected via DOM test');
                  setTimeout(() => {
                    setShowModal(true);
                  }, delay);
                } else {
                  console.log('✅ No adblocker detected');
                }
              } catch (error) {
                console.warn('AdBlocker DOM test failed:', error);
                setHasChecked(true);
              }
            }, 100);
            
            return false; // Return false initially, real result comes async
          },

          // Test 2: Try to fetch a common ad script (for non-dev environments)
          () => {
            if (import.meta.env.DEV) return false; // Skip script test in dev
            
            return new Promise<boolean>((resolve) => {
              const script = document.createElement('script');
              script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
              script.onerror = () => {
                console.log('🛡️ AdBlocker detected via script loading');
                resolve(true);
              };
              script.onload = () => {
                console.log('✅ AdSense script loaded successfully');
                resolve(false);
                if (script.parentNode) {
                  script.parentNode.removeChild(script);
                }
              };
              
              setTimeout(() => {
                console.log('🛡️ AdBlocker detected via script timeout');
                resolve(true);
              }, 3000);
              
              try {
                document.head.appendChild(script);
              } catch (error) {
                console.warn('Failed to load ad script:', error);
                resolve(true);
              }
            });
          },

          // Test 3: Check for adblocker in dev mode (simulate detection)
          () => {
            if (import.meta.env.DEV) {
              // In dev mode, simulate adblocker detection for testing
              const hasAdblock = localStorage.getItem('simulate-adblock') === 'true';
              if (hasAdblock) {
                console.log('🧪 Simulating adblocker in development mode');
              }
              return hasAdblock;
            }
            return 'adsbygoogle' in window === false;
          }
        ];

        // Run the first test (DOM-based)
        tests[0]();
        
        // Run additional tests if not in dev mode
        if (!import.meta.env.DEV) {
          const asyncResult = await tests[1]();
          const syncResult = tests[2]();
          
          if (asyncResult || syncResult) {
            setAdsBlocked(true);
            setHasChecked(true);
            setTimeout(() => {
              setShowModal(true);
            }, delay);
          }
        } else {
          // In dev mode, just run the sync test
          const devResult = tests[2]();
          if (devResult && !hasChecked) {
            setAdsBlocked(true);
            setHasChecked(true);
            setTimeout(() => {
              setShowModal(true);
            }, delay);
          }
        }

      } catch (error) {
        console.warn('AdBlocker detection failed:', error);
        setHasChecked(true);
      }
    };

    // Start detection after a short delay to ensure page is loaded
    setTimeout(detectAdBlocker, 1000);
  }, [delay, enableInDev, hasChecked]);

  const handleClose = () => {
    setShowModal(false);
    // Store in localStorage to not show again for this session
    localStorage.setItem('adblock-notification-dismissed', Date.now().toString());
  };

  // Don't show if already dismissed recently (within 1 hour in dev, 24 hours in prod)
  useEffect(() => {
    const dismissed = localStorage.getItem('adblock-notification-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const now = Date.now();
      const timeLimit = import.meta.env.DEV ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 1 hour in dev, 24 hours in prod
      
      if (now - dismissedTime < timeLimit) {
        setShowModal(false);
        return;
      }
    }
  }, []);

  // Development helper: Add a way to simulate adblocker
  useEffect(() => {
    if (import.meta.env.DEV) {
      // Add a global function to simulate adblocker for testing
      window.simulateAdblock = () => {
        localStorage.setItem('simulate-adblock', 'true');
        window.location.reload();
      };
      
      window.clearAdblockSimulation = () => {
        localStorage.removeItem('simulate-adblock');
        localStorage.removeItem('adblock-notification-dismissed');
        window.location.reload();
      };
      
      console.log('🧪 Dev mode: Use simulateAdblock() to test the modal');
      console.log('🧪 Dev mode: Use clearAdblockSimulation() to reset');
    }
  }, []);

  if (!hasChecked || !adsBlocked) {
    return null;
  }

  // Create the modal content
  const modalMessage = import.meta.env.DEV 
    ? `🧪 DEVELOPMENT MODE: Simulating adblocker detection

This modal would normally appear for users with adblockers enabled.

To test: Open browser console and type:
• simulateAdblock() - to enable simulation
• clearAdblockSimulation() - to reset

In production, this will show actual adblocker detection.`
    : `We noticed you're using an ad blocker. We totally understand!

Why we show ads:
• Ads help us keep Zantaku free for everyone
• They support our development and server costs  
• We only show relevant, non-intrusive ads

To support us: Consider whitelisting zantaku.com in your ad blocker settings.`;

  return (
    <Modal
      isOpen={showModal}
      onClose={handleClose}
      title={import.meta.env.DEV ? "🧪 AdBlocker Test" : "🛡️ Ad Blocker Detected"}
      message={modalMessage}
    />
  );
};

export default AdBlockerNotification; 