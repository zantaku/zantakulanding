import React, { useEffect, useState } from 'react';
import { ENABLE_ADSENSE_IN_DEV } from '../config/analytics';

interface GoogleAdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical';
  style?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
  layout?: string;
  contentVerified?: boolean;
}

const GoogleAdSense: React.FC<GoogleAdSenseProps> = ({
  adSlot,
  adFormat = 'auto',
  style = {},
  className = '',
  responsive = true,
  layout = '',
  contentVerified = true,
}) => {
  const [hasContent, setHasContent] = useState(false);
  const [adsBlocked, setAdsBlocked] = useState(false);
  
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !ENABLE_ADSENSE_IN_DEV) {
      console.log('Google AdSense is disabled in development mode.');
      return;
    }
    
    const verifyContent = () => {
      if (!contentVerified) {
        console.warn('AdSense: Content not verified for high-quality. Skipping ad display.');
        setHasContent(false);
        return;
      }
      
      const adElement = document.querySelector(`[data-ad-slot="${adSlot}"]`);
      if (!adElement) {
        setHasContent(false);
        return;
      }
      
      const parentContainer = adElement.closest('div.container, section, article, main');
      if (!parentContainer) {
        setHasContent(false);
        return;
      }
      
      const textContent = parentContainer.textContent || '';
      const contentLength = textContent.trim().length;
      
      if (contentLength < 300) {
        console.warn('AdSense: Not enough content around ad. Google policy requires substantial content around ads.');
        setHasContent(false);
        return;
      }
      
      setHasContent(true);
    };

    // Check if ads are blocked
    const checkAdBlock = () => {
      try {
        const testDiv = document.createElement('div');
        testDiv.className = 'adsbygoogle';
        testDiv.style.position = 'absolute';
        testDiv.style.left = '-10000px';
        testDiv.style.width = '1px';
        testDiv.style.height = '1px';
        document.body.appendChild(testDiv);
        
        setTimeout(() => {
          try {
            const isBlocked = testDiv.offsetHeight === 0 || window.getComputedStyle(testDiv).display === 'none';
            if (testDiv.parentNode) {
              testDiv.parentNode.removeChild(testDiv);
            }
            setAdsBlocked(isBlocked);
            if (isBlocked) {
              console.log('AdSense: Ads are blocked by adblocker');
            }
          } catch (error) {
            console.warn('AdSense: Error checking ad block status:', error);
            setAdsBlocked(true);
          }
        }, 100);
      } catch (error) {
        console.warn('AdSense: Failed to create ad block test:', error);
        setAdsBlocked(true);
      }
    };
    
    setTimeout(() => {
      verifyContent();
      checkAdBlock();
    }, 500);
    
    // Only try to load ads if they're not blocked
    if (hasContent && !adsBlocked) {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (error) {
        console.warn('Error loading Google AdSense:', error);
      }
    }
  }, [adSlot, contentVerified, hasContent, adsBlocked]);

  if (process.env.NODE_ENV === 'development' && !ENABLE_ADSENSE_IN_DEV) {
    return (
      <div className={`google-adsense-placeholder ${className}`} style={{ 
        ...style,
        minHeight: '100px',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px dashed #ccc'
      }}>
        <p style={{ color: '#666', textAlign: 'center' }}>AdSense disabled in development</p>
      </div>
    );
  }

  if (adsBlocked) {
    // Don't show anything when ads are blocked - just return null to avoid layout shifts
    return null;
  }
  
  if (!hasContent && contentVerified) {
    return (
      <div className={`google-adsense-placeholder ${className}`} style={{ 
        ...style,
        minHeight: '100px',
        backgroundColor: '#f8f8f8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px dashed #eee'
      }}>
        <p style={{ color: '#999', textAlign: 'center', fontSize: '12px' }}>Ad disabled: insufficient content</p>
      </div>
    );
  }

  return (
    <div className={`google-adsense ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          ...(responsive ? { width: '100%' } : {}),
        }}
        data-ad-client="ca-pub-7036570320623661"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        {...(layout ? { 'data-ad-layout': layout } : {})}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default GoogleAdSense;

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
} 