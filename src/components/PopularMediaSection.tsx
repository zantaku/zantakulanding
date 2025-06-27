import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { MediaType, Media, AniListMediaResponse } from '../types/media';
import { OptimizedImage } from './OptimizedImage';
import { useTranslation } from 'react-i18next';

// Card flip styles
const cardFlipStyles = `
  .card-container {
    perspective: 1000px;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
  }
  
  .card {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s;
  }
  
  .card.flipped {
    transform: rotateY(180deg);
  }
  
  .card-face {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    overflow: hidden;
    border-radius: 0.75rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  
  .card-front {
    z-index: 1;
    transform: rotateY(0deg);
  }
  
  .card-back {
    transform: rotateY(180deg);
    z-index: 0;
  }
  
  /* Fix for Safari and some mobile browsers */
  @media not all and (min-resolution:.001dpcm) { 
    @supports (-webkit-appearance:none) {
      .card-face {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
      }
      .card-front {
        transform: rotateY(0deg);
      }
      .card-back {
        transform: rotateY(180deg);
      }
    }
  }
`;

// Helper functions for card
const getTypeLabel = (type: MediaType) => {
  return type === 'ANIME' ? 'Anime' : 'Manga';
};

const getTypeIcon = (type: MediaType) => {
  return type === 'ANIME' ? '📺' : '📚';
};

const getGenreColor = (genre: string) => {
  const genreColors: { [key: string]: string } = {
    'Action': 'bg-red-500/70',
    'Adventure': 'bg-green-500/70',
    'Comedy': 'bg-yellow-500/70',
    'Drama': 'bg-purple-500/70',
    'Fantasy': 'bg-blue-500/70',
    'Horror': 'bg-black/70',
    'Mystery': 'bg-indigo-500/70',
    'Romance': 'bg-pink-500/70',
    'Sci-Fi': 'bg-cyan-500/70',
    'Slice of Life': 'bg-orange-500/70',
    'Supernatural': 'bg-violet-500/70',
    'Thriller': 'bg-red-700/70',
  };
  
  return genreColors[genre] || 'bg-gray-500/70';
};

const truncateDescription = (description: string | null) => {
  if (!description) return 'No description available.';
  
  // Remove HTML tags if any
  const plainText = description.replace(/<[^>]*>/g, '');
  
  // Truncate to 150 characters
  return plainText.length > 150 ? 
    plainText.substring(0, 150) + '...' : 
    plainText;
};

export function PopularMediaSection() {
  const [popularMedia, setPopularMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const constraintsRef = useRef(null);
  
  // Use translation context
  const { t } = useTranslation();

  useEffect(() => {
    const fetchPopularMedia = async () => {
      try {
        const query = `
          query {
            anime: Page(page: 1, perPage: 5) {
              media(sort: TRENDING_DESC, type: ANIME) {
                id
                title {
                  romaji
                  english
                }
                coverImage {
                  large
                  extraLarge
                }
                meanScore
                episodes
                genres
                description(asHtml: false)
              }
            }
            manga: Page(page: 1, perPage: 5) {
              media(sort: TRENDING_DESC, type: MANGA) {
                id
                title {
                  romaji
                  english
                }
                coverImage {
                  large
                  extraLarge
                }
                meanScore
                chapters
                genres
                description(asHtml: false)
              }
            }
          }
        `;

        const response = await fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();
        
        if (data.errors) {
          console.error('GraphQL Errors:', data.errors);
          throw new Error('GraphQL query failed');
        }

        // Process anime data and add type
        const animeResults: Media[] = data.data.anime.media.map((anime: AniListMediaResponse) => ({
          id: anime.id,
          title: {
            romaji: anime.title.romaji,
            english: anime.title.english || anime.title.romaji
          },
          coverImage: {
            large: anime.coverImage.extraLarge || anime.coverImage.large
          },
          meanScore: anime.meanScore || 0,
          episodes: anime.episodes || undefined,
          genres: anime.genres || [],
          type: 'ANIME' as const,
          description: anime.description || null
        }));
        
        // Process manga data and add type
        const mangaResults: Media[] = data.data.manga.media.map((manga: AniListMediaResponse) => ({
          id: manga.id,
          title: {
            romaji: manga.title.romaji,
            english: manga.title.english || manga.title.romaji
          },
          coverImage: {
            large: manga.coverImage.extraLarge || manga.coverImage.large
          },
          meanScore: manga.meanScore || 0,
          chapters: manga.chapters || undefined,
          genres: manga.genres || [],
          type: 'MANGA' as const,
          description: manga.description || null
        }));
        
        // Interleave anime and manga
        const combined: Media[] = [];
        const maxLength = Math.max(animeResults.length, mangaResults.length);
        
        for (let i = 0; i < maxLength; i++) {
          if (i < animeResults.length) combined.push(animeResults[i]);
          if (i < mangaResults.length) combined.push(mangaResults[i]);
        }
        
        console.log("Media data loaded:", combined);
        
        setPopularMedia(combined);
        
        // Set loading state to false
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchPopularMedia();
  }, []);

  const paginate = (newDirection: number) => {
    // Don't paginate if card is flipped - first unflip it
    if (flipped) {
      setFlipped(false);
      setTimeout(() => {
        setDirection(newDirection);
        setCurrentIndex(prevIndex => {
          const nextIndex = prevIndex + newDirection;
          // Handle wrapping
          if (nextIndex < 0) return popularMedia.length - 1;
          if (nextIndex >= popularMedia.length) return 0;
          return nextIndex;
        });
      }, 300); // Wait for flip animation to complete
    } else {
      setDirection(newDirection);
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex + newDirection;
        // Handle wrapping
        if (nextIndex < 0) return popularMedia.length - 1;
        if (nextIndex >= popularMedia.length) return 0;
        return nextIndex;
      });
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100; // minimum distance required for a swipe
    
    // If card is flipped, only handle vertical swipes to unflip
    if (flipped) {
      if (info.offset.y > threshold) {
        setFlipped(false);
      }
      return;
    }
    
    // Horizontal swipes for pagination - improved for better mobile experience
    if (info.offset.x > threshold) {
      paginate(-1); // swipe right to see previous
    } else if (info.offset.x < -threshold) {
      paginate(1); // swipe left to see next
    }
    
    // Vertical swipe for flipping
    if (info.offset.y < -threshold) {
      setFlipped(true);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger flip if clicking on button or internal interactive elements
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    
    // Toggle flip state
    setFlipped(!flipped);
  };

  if (loading) {
    return (
      <div className="relative py-20 md:py-24 bg-gradient-to-b from-[#0A0A0A] via-[#1A0A1A] to-[#0A0A0A] overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#7C1C1C]/8 via-transparent to-[#7C1C1C]/8 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/5 left-1/3 w-32 h-32 bg-[#7C1C1C]/15 rounded-full blur-2xl animate-bounce"></div>
            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-[#531111]/15 rounded-full blur-2xl animate-bounce"></div>
            <div className="absolute top-1/2 right-2/3 w-20 h-20 bg-[#2C7A8C]/15 rounded-full blur-2xl animate-bounce"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-8 w-40 bg-white/10 rounded mb-4 mx-auto animate-pulse"></div>
              <div className="h-12 w-80 bg-white/10 rounded mb-8 mx-auto animate-pulse"></div>
              <div className="flex justify-center gap-2 mb-8">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-white/10 rounded-full animate-pulse"></div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#7C1C1C] via-[#FF6B6B] to-[#7C1C1C] rounded-2xl opacity-30 blur-sm animate-pulse"></div>
                <div className="relative w-full max-w-[220px] aspect-[3/4] bg-black/60 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-20 md:py-24 bg-gradient-to-b from-[#0A0A0A] via-[#1A0A1A] to-[#0A0A0A] overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7C1C1C]/8 via-transparent to-[#7C1C1C]/8 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/5 left-1/3 w-32 h-32 bg-[#7C1C1C]/15 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-[#531111]/15 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 right-2/3 w-20 h-20 bg-[#2C7A8C]/15 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl md:text-3xl text-white/80 font-medium mb-4">{t('popular.subtitle')}</h3>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-[#7C1C1C] via-[#FF6B6B] to-[#7C1C1C] text-transparent bg-clip-text">{t('popular.title')}</span>
            </h2>
            <div className="flex justify-center items-center gap-2 mb-8">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#7C1C1C]"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Pagination indicator */}
          {popularMedia.length > 0 && (
            <div className="flex justify-center gap-1 mb-5">
              {popularMedia.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setFlipped(false);
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-neo-crimson w-3' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Card Container */}
          <div className="relative flex justify-center items-center">
            <style dangerouslySetInnerHTML={{ __html: cardFlipStyles }} />
            
            {/* Previous Card Preview */}
            {popularMedia.length > 1 && (
              <div 
                className="absolute -left-8 sm:-left-12 md:-left-16 lg:-left-20 top-1/2 -translate-y-1/2 w-24 sm:w-32 md:w-40 lg:w-48 h-36 sm:h-48 md:h-60 lg:h-72 z-0 opacity-70 transform -rotate-3 scale-90 cursor-pointer hover:opacity-90 hover:scale-95 transition-all duration-300"
                onClick={() => paginate(-1)}
              >
                <div className="w-full h-full rounded-xl overflow-hidden shadow-xl border border-white/10">
                  <img 
                    src={popularMedia[(currentIndex - 1 + popularMedia.length) % popularMedia.length].coverImage.large}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: "center center" }}
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute bottom-3 left-0 right-0 text-center text-white text-xs md:text-sm font-medium px-3">
                    <div className="bg-black/60 rounded-lg px-2 py-1">
                      {popularMedia[(currentIndex - 1 + popularMedia.length) % popularMedia.length].title.english}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Main Card */}
            <div
              className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] aspect-[3/4] cursor-pointer z-10"
              ref={constraintsRef}
            >
              <AnimatePresence initial={false} custom={direction}>
                {popularMedia.length > 0 && (
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 300 : -300, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: direction < 0 ? 300 : -300, scale: 0.8 }}
                    transition={{
                      x: { type: "spring", stiffness: 400, damping: 35 },
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.4 }
                    }}
                    drag="x"
                    dragDirectionLock
                    dragElastic={0.2}
                    dragConstraints={constraintsRef}
                    onDragEnd={handleDragEnd}
                    whileDrag={{
                      scale: 0.95,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.5)"
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 30px 60px rgba(124, 28, 28, 0.3)"
                    }}
                    dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
                    className="absolute w-full h-full card-container"
                    onClick={handleCardClick}
                  >
                    {/* Glow effect behind card */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#7C1C1C]/30 via-[#FF6B6B]/20 to-[#7C1C1C]/30 rounded-2xl blur-xl opacity-75"></div>
                    
                    <div className={`card ${flipped ? 'flipped' : ''} relative`}>
                      {/* Card Front */}
                      <div className="card-face card-front rounded-xl overflow-hidden shadow-2xl border border-white/10">
                        <div className="relative w-full h-full">
                          <OptimizedImage 
                            src={popularMedia[currentIndex].coverImage.large}
                            alt={popularMedia[currentIndex].title.english}
                            width={420}
                            height={560}
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{
                              objectPosition: "center center"
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/10 pointer-events-none"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="inline-flex items-center px-3 py-1 rounded-full bg-neo-crimson/90 text-sm font-medium text-white shadow-lg">
                                {getTypeIcon(popularMedia[currentIndex].type)} {getTypeLabel(popularMedia[currentIndex].type)}
                              </span>
                              <div className="flex items-center text-white/90">
                                <span className="text-yellow-400 mr-1 text-lg">★</span>
                                <span className="font-bold text-lg">{((popularMedia[currentIndex].meanScore || 0) / 10).toFixed(1)}</span>
                              </div>
                            </div>
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white line-clamp-2 leading-tight">
                              {popularMedia[currentIndex].title.english}
                            </h3>
                            <p className="text-white/80 text-sm md:text-base mt-2">
                              {popularMedia[currentIndex].type === 'ANIME' 
                                ? `${popularMedia[currentIndex].episodes || '?'} ${t('popular.episodes')}` 
                                : `${popularMedia[currentIndex].chapters || '?'} ${t('popular.chapters')}`}
                            </p>
                          </div>
                          
                          {/* Click to flip indicator */}
                          <div className="absolute top-4 right-4 bg-black/60 rounded-full p-2 text-white/80 text-xs">
                            <span className="hidden sm:block">{t('popular.clickToFlip')}</span>
                            <span className="sm:hidden">{t('popular.tap')}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Card Back */}
                      <div className="card-face card-back rounded-xl overflow-hidden shadow-2xl border border-white/10">
                        <div className="relative w-full h-full bg-black/95">
                          <div className="absolute inset-0 opacity-20 blur-md">
                            <img 
                              src={popularMedia[currentIndex].coverImage.large}
                              alt=""
                              className="absolute inset-0 w-full h-full object-cover"
                              style={{ objectPosition: "center center" }}
                            />
                          </div>
                          <div className="relative z-10 flex flex-col h-full p-4 md:p-6">
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-neo-crimson/90 text-sm font-medium text-white">
                                  {getTypeIcon(popularMedia[currentIndex].type)} {getTypeLabel(popularMedia[currentIndex].type)}
                                </span>
                                <div className="flex items-center text-white/90">
                                  <span className="text-yellow-400 mr-1 text-xl">★</span>
                                  <span className="font-bold text-xl">{((popularMedia[currentIndex].meanScore || 0) / 10).toFixed(1)}</span>
                                </div>
                              </div>
                              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2 leading-tight">
                                {popularMedia[currentIndex].title.english}
                              </h3>
                              <p className="text-white/80 text-sm md:text-base mb-3">
                                {popularMedia[currentIndex].type === 'ANIME' 
                                  ? `${popularMedia[currentIndex].episodes || '?'} ${t('popular.episodes')}` 
                                  : `${popularMedia[currentIndex].chapters || '?'} ${t('popular.chapters')}`}
                              </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {popularMedia[currentIndex].genres.slice(0, 4).map((genre, index) => (
                                <span 
                                  key={index}
                                  className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getGenreColor(genre)} shadow-lg`}
                                >
                                  {genre}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex-1 overflow-hidden">
                              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                                {truncateDescription(popularMedia[currentIndex].description || null)}
                              </p>
                            </div>
                            
                            {/* Back to front indicator */}
                            <div className="mt-4 text-center">
                              <span className="text-white/60 text-xs">{t('popular.clickToSeeCover')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Next Card Preview */}
            {popularMedia.length > 1 && (
              <div 
                className="absolute -right-8 sm:-right-12 md:-right-16 lg:-right-20 top-1/2 -translate-y-1/2 w-24 sm:w-32 md:w-40 lg:w-48 h-36 sm:h-48 md:h-60 lg:h-72 z-0 opacity-70 transform rotate-3 scale-90 cursor-pointer hover:opacity-90 hover:scale-95 transition-all duration-300"
                onClick={() => paginate(1)}
              >
                <div className="w-full h-full rounded-xl overflow-hidden shadow-xl border border-white/10">
                  <img 
                    src={popularMedia[(currentIndex + 1) % popularMedia.length].coverImage.large}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: "center center" }}
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute bottom-3 left-0 right-0 text-center text-white text-xs md:text-sm font-medium px-3">
                    <div className="bg-black/60 rounded-lg px-2 py-1">
                      {popularMedia[(currentIndex + 1) % popularMedia.length].title.english}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation arrows - more prominent */}
            {popularMedia.length > 1 && (
              <>
                <button
                  onClick={() => paginate(-1)}
                  className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 border border-white/20"
                  aria-label="Previous anime"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 border border-white/20"
                  aria-label="Next anime"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 