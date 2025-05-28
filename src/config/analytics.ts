/**
 * Google Analytics Configuration
 * 
 * To set up Google Analytics for your site:
 * 
 * 1. Create a Google Analytics 4 property at https://analytics.google.com/
 * 2. Get your Measurement ID (format: G-XXXXXXXXXX)
 * 3. Replace the placeholder below with your actual Measurement ID
 * 4. For production deployment, set an environment variable:
 *    VITE_GA_MEASUREMENT_ID=your-measurement-id
 * 
 * The analytics scripts will only be loaded in production environments 
 * to avoid tracking during development.
 */

// Using the actual GA4 Measurement ID from Google Analytics
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-3CVEVJ74CK';

// Set this to true to enable GA in development mode (not recommended)
export const ENABLE_GA_IN_DEV = false;

// Set this to true to enable AdSense in development mode (not recommended)
export const ENABLE_ADSENSE_IN_DEV = false; 