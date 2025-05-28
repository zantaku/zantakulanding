import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
    exclude: ['lucide-react'],
  },
  server: {
    port: 8081,
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
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'animations': ['framer-motion', 'react-type-animation', 'react-intersection-observer'],
          'ui': ['lucide-react', 'react-icons', 'clsx']
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name) {
            if (/\.(png|jpe?g|gif|svg|webp)$/.test(assetInfo.name)) {
              return `asset/images/[name]-[hash][extname]`;
            }
            if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name)) {
              return `asset/fonts/[name]-[hash][extname]`;
            }
          }
          return `asset/[name]-[hash][extname]`;
        },
        chunkFileNames: 'asset/js/[name]-[hash].js',
        entryFileNames: 'asset/js/[name]-[hash].js',
      }
    },
    sourcemap: false,
    target: 'es2015',
    cssMinify: true,
  },
  publicDir: 'public',
  define: {
    APP_NAME: JSON.stringify('Zantaku'),
    APP_DESCRIPTION: JSON.stringify('Your Ultimate Anime Community')
  }
});
