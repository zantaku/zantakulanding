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

    // Add Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}', {
        send_page_view: true,
        cookie_domain: 'zantaku.com'
      });
    `;
    
    document.head.appendChild(script1);
    document.head.appendChild(script2);

    return () => {
      // Clean up on unmount
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, [measurementId]);

  return null;
};

export default GoogleAnalytics; 