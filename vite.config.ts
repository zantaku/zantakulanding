import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh optimizations
      babel: {
        plugins: process.env.NODE_ENV === 'production' 
          ? ['babel-plugin-transform-remove-console']
          : []
      }
    }),
    splitVendorChunkPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'robots.txt'],
      manifest: {
        name: 'Zantaku - Anime & Manga Community',
        short_name: 'Zantaku',
        description: 'Read manga, watch anime, earn rewards, and connect with otaku worldwide.',
        theme_color: '#7C1C1C',
        background_color: '#0A0A0A',
        icons: [
          {
            src: 'asset/zantakulogotest_64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'asset/zantakulogotest_16x16.png',
            sizes: '16x16',
            type: 'image/png'
          },
          {
            src: 'asset/zantakulogotest_32x32.png',
            sizes: '32x32',
            type: 'image/png'
          }
        ]
      }
    }),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  optimizeDeps: {
    // Pre-bundle these dependencies for faster dev server startup
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      '@supabase/supabase-js'
    ],
    exclude: ['lucide-react'],
  },
  server: {
    port: 8081,
    // Enable HMR optimizations
    hmr: {
      overlay: true
    },
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'asset',
    copyPublicDir: true,
    minify: 'terser',
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3, // Increased passes for better compression
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      },
      mangle: {
        safari10: true
      }
    },
    rollupOptions: {
      output: {
        // More aggressive chunk splitting for better caching
        manualChunks: {
          // Core React libraries
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          
          // Animation libraries
          'animations': ['framer-motion', 'react-type-animation', 'react-intersection-observer'],
          
          // UI libraries
          'ui-icons': ['lucide-react', 'react-icons'],
          
          // Supabase and auth
          'supabase': ['@supabase/supabase-js'],
          
          // Utilities
          'utils': ['clsx']
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name) {
            if (/\.(png|jpe?g|gif|svg|webp)$/.test(assetInfo.name)) {
              return `asset/images/[name]-[hash][extname]`;
            }
            if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name)) {
              return `asset/fonts/[name]-[hash][extname]`;
            }
            if (/\.css$/.test(assetInfo.name)) {
              return `asset/css/[name]-[hash][extname]`;
            }
          }
          return `asset/[name]-[hash][extname]`;
        },
        chunkFileNames: 'asset/js/[name]-[hash].js',
        entryFileNames: 'asset/js/[name]-[hash].js',
      }
    },
    sourcemap: false,
    target: 'es2020', // Updated target for better performance
    cssMinify: true,
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
  publicDir: 'public',
  define: {
    APP_NAME: JSON.stringify('Zantaku'),
    APP_DESCRIPTION: JSON.stringify('Your Ultimate Anime Community'),
    // Define global constants for better tree shaking
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
  },
  // Enable esbuild optimizations
  esbuild: {
    // Remove console statements in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : undefined,
    // Target modern browsers for better performance
    target: 'es2020'
  }
});
