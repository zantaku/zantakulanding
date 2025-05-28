import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
  priority?: boolean;
}

/**
 * OptimizedImage component
 * - Uses WebP format with fallback to original format
 * - Properly sizes images and includes dimensions
 * - Adds lazy loading for images
 * - Handles loading errors gracefully
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  fallbackSrc,
  onLoad,
  onError,
  style,
  priority = false
}: OptimizedImageProps) {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Convert the src to WebP if it's a local image (not an external URL)
  const webpSrc = src.startsWith('http') 
    ? src 
    : src.replace(/\.(png|jpg|jpeg)$/i, '.webp');

  // Fallback src is either provided or the original src
  const actualFallbackSrc = fallbackSrc || src;

  const handleError = () => {
    if (!imgError) {
      setImgError(true);
      onError?.();
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div 
      className={`relative ${className}`} 
      style={{ 
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
        ...style
      }}
    >
      {!isLoaded && !imgError && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          style={{ 
            width: width ? `${width}px` : '100%',
            height: height ? `${height}px` : '100%',
          }}
        />
      )}
      
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={imgError ? actualFallbackSrc : src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onError={handleError}
          onLoad={handleLoad}
          style={{
            objectFit: 'cover',
            width: width ? `${width}px` : '100%',
            height: height ? `${height}px` : '100%',
            ...style
          }}
        />
      </picture>
    </div>
  );
} 