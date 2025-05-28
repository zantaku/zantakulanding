/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xxs': '320px',  // Extra extra small screens (iPhone 5/SE)
        'xs': '390px',   // Extra small screen size for mobile devices
      },
      colors: {
        'zantaku-red': '#F44336',
        'zantaku-pink': '#E91E63',
        'zantaku-cream': '#F5F5F5',
        
        // Neo-Tokyo/Vaporwave color palette
        'neo-black': '#0A0A0A',
        'neo-crimson': '#7C1C1C',
        'neo-maroon': '#531111',
        'neo-green': '#425A40',
        'neo-teal': '#3E6257',
        'neo-blue': '#2C7A8C',
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out forwards',
        'draw': 'draw 2s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'shimmer': 'shimmer 8s linear infinite',
        'bg-scroll': 'bg-scroll 15s ease infinite alternate',
        'particles': 'particles 4s ease-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      backgroundImage: {
        'japanese-waves': "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"12\" viewBox=\"0 0 20 12\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M6 12c0-2 2-2 2-4s-2-2-2-4 2-2 2-4M14 12c0-2 2-2 2-4s-2-2-2-4 2-2 2-4\" stroke=\"%238B1E3F\" fill=\"none\" stroke-opacity=\"0.15\" stroke-width=\"1\"/%3E%3C/svg%3E')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'neo-grid': 'linear-gradient(to right, rgba(124, 28, 28, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(124, 28, 28, 0.1) 1px, transparent 1px)',
      },
      fontSize: {
        'dynamic-hero': 'clamp(1.8rem, 8vw, 4rem)',
      },
    },
  },
  plugins: [],
};