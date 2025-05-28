import { GA_MEASUREMENT_ID, ENABLE_GA_IN_DEV, ENABLE_ADSENSE_IN_DEV } from '../config/analytics';

/**
 * Tracks a page view in Google Analytics
 * @param path The page path to track
 * @param title The page title
 */
export const trackPageView = (path: string, title?: string) => {
  if (
    !window.gtag ||
    (process.env.NODE_ENV === 'development' && !ENABLE_GA_IN_DEV) ||
    GA_MEASUREMENT_ID === 'G-XXXXXXXXXX'
  ) {
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href
  });
};

/**
 * Checks if AdSense should be loaded based on environment
 * @returns boolean indicating if AdSense should be loaded
 */
export const shouldLoadAdSense = (): boolean => {
  return process.env.NODE_ENV === 'production' || ENABLE_ADSENSE_IN_DEV;
};

/**
 * Dynamically loads the AdSense script
 * Can be used in any component that needs to ensure AdSense is loaded
 */
export const loadAdSenseScript = (): void => {
  // Skip in development environment unless explicitly enabled
  if (process.env.NODE_ENV === 'development' && !ENABLE_ADSENSE_IN_DEV) {
    console.log('Google AdSense is disabled in development mode.');
    return;
  }

  // Check if script already exists
  if (document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
    return;
  }

  // Create and append the script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7036570320623661';
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
};

/**
 * Tracks a custom event in Google Analytics
 * @param eventName The name of the event
 * @param eventParams Additional parameters for the event
 */
export const trackEvent = (
  eventName: string, 
  eventParams?: Record<string, string | number | boolean>
) => {
  if (
    !window.gtag ||
    (process.env.NODE_ENV === 'development' && !ENABLE_GA_IN_DEV) ||
    GA_MEASUREMENT_ID === 'G-XXXXXXXXXX'
  ) {
    return;
  }

  window.gtag('event', eventName, eventParams);
};

/**
 * Example usage of analytics events:
 * 
 * // Track a page view
 * trackPageView('/profile', 'User Profile');
 * 
 * // Track a button click
 * trackEvent('button_click', { button_id: 'signup_button' });
 * 
 * // Track a form submission
 * trackEvent('form_submit', { form_name: 'contact_form', success: true });
 */ 