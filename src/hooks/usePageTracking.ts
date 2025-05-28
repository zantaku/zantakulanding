import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

/**
 * A hook that tracks page views when the location changes
 */
export const usePageTracking = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view on location change
    trackPageView(location.pathname, document.title);
  }, [location]);
  
  return null;
}; 