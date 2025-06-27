import React, { useEffect } from 'react';
import { ENABLE_GA_IN_DEV } from '../config/analytics';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (command: string, ...args: unknown[]) => void;
  }
}

interface GoogleAnalyticsProps {
  measurementId: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ measurementId }) => {
  useEffect(() => {
    // Skip in development environment unless explicitly enabled
    if (process.env.NODE_ENV === 'development' && !ENABLE_GA_IN_DEV) {
      console.log('Google Analytics is disabled in development mode.');
      return;
    }

    // Skip if measurement ID is not set
    if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
      console.warn('Google Analytics Measurement ID is not set. Analytics will not be loaded.');
      return;
    }

    let script1: HTMLScriptElement | null = null;
    let script2: HTMLScriptElement | null = null;

    try {
      // Initialize dataLayer safely
      window.dataLayer = window.dataLayer || [];
      
      // Add Google Analytics script with error handling
      script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script1.onerror = (error) => {
        console.warn('Google Analytics script failed to load (likely blocked by adblocker):', error);
      };
      
      script2 = document.createElement('script');
      script2.innerHTML = `
        try {
          window.dataLayer = window.dataLayer || [];
          function gtag(){
            try {
              dataLayer.push(arguments);
            } catch(e) {
              console.warn('gtag dataLayer push failed:', e);
            }
          }
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            send_page_view: true,
            cookie_domain: 'zantaku.com'
          });
        } catch(e) {
          console.warn('Google Analytics initialization failed:', e);
        }
      `;
      
      document.head.appendChild(script1);
      document.head.appendChild(script2);
    } catch (error) {
      console.warn('Failed to initialize Google Analytics:', error);
    }

    return () => {
      // Clean up on unmount
      try {
        if (script1 && script1.parentNode) {
          script1.parentNode.removeChild(script1);
        }
        if (script2 && script2.parentNode) {
          script2.parentNode.removeChild(script2);
        }
      } catch (error) {
        console.warn('Failed to cleanup Google Analytics scripts:', error);
      }
    };
  }, [measurementId]);

  return null;
};

export default GoogleAnalytics; 