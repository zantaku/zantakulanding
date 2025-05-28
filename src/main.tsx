import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createLaunchTimer } from './utils/createLaunchTimer.ts'
import { registerSW } from 'virtual:pwa-register'

// Initialize the launch timer in the database (will be a no-op if it already exists)
createLaunchTimer('site-launch', 10)
  .then(timer => {
    if (import.meta.env.DEV) {
      console.log('Launch timer initialized:', timer)
    }
  })
  .catch(err => console.error('Failed to initialize timer:', err))

// Register Service Worker for PWA support
if ('serviceWorker' in navigator) {
  // Wait for the page to load
  window.addEventListener('load', () => {
    const updateSW = registerSW({
      onNeedRefresh() {
        if (confirm('New content available. Reload?')) {
          updateSW(true)
        }
      },
      onOfflineReady() {
        console.log('App is ready for offline use')
      },
    })
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
