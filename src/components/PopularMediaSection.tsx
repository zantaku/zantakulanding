import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { MediaType, Media, AniListMediaResponse } from '../types/media';
import { OptimizedImage } from './OptimizedImage';

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
      <div className="relative py-12 md:py-16 bg-gradient-to-b from-[#121212] to-[#181818] overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <div className="h-6 w-32 bg-white/10 rounded mb-4 mx-auto"></div>
              <div className="h-10 w-64 bg-white/10 rounded mb-8 mx-auto"></div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[220px] aspect-[3/4] bg-white/10 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-12 md:py-16 bg-gradient-to-b from-[#121212] to-[#181818] overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h3 className="text-xl md:text-2xl text-white/80 font-medium mb-2">The Future of Anime & Manga</h3>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-neo-crimson/90">
              Everyone Is Here
            </h2>
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
                className="absolute -left-2 sm:-left-4 md:-left-20 top-1/2 -translate-y-1/2 w-16 sm:w-20 md:w-32 h-28 sm:h-32 md:h-48 z-0 opacity-60 transform -rotate-6 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => paginate(-1)}
              >
                <div className="w-full h-full rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={popularMedia[(currentIndex - 1 + popularMedia.length) % popularMedia.length].coverImage.large}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: "center center" }}
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                  <div className="absolute bottom-2 left-0 right-0 text-center text-white text-[10px] md:text-xs font-medium opacity-80 px-2 truncate">
                    {popularMedia[(currentIndex - 1 + popularMedia.length) % popularMedia.length].title.english}
                  </div>
                </div>
              </div>
            )}
            
            {/* Main Card */}
            <div
              className="relative w-full max-w-[190px] sm:max-w-[220px] md:max-w-xs aspect-[3/4] cursor-pointer z-10"
              ref={constraintsRef}
            >
              <AnimatePresence initial={false} custom={direction}>
                {popularMedia.length > 0 && (
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction < 0 ? 300 : -300 }}
                    transition={{
                      x: { type: "spring", stiffness: 400, damping: 35 },
                      opacity: { duration: 0.3 }
                    }}
                    drag="x"
                    dragDirectionLock
                    dragElastic={0.2}
                    dragConstraints={constraintsRef}
                    onDragEnd={handleDragEnd}
                    whileDrag={{
                      scale: 0.95,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
                    }}
                    dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
                    className="absolute w-full h-full card-container"
                    onClick={handleCardClick}
                  >
                    <div className={`card ${flipped ? 'flipped' : ''}`}>
                      {/* Card Front */}
                      <div className="card-face card-front rounded-xl overflow-hidden shadow-2xl">
                        <div className="relative w-full h-full">
                          <OptimizedImage 
                            src={popularMedia[currentIndex].coverImage.large}
                            alt={popularMedia[currentIndex].title.english}
                            width={240}
                            height={340}
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{
                              objectPosition: "center center"
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-white/5 to-white/20 pointer-events-none"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                            <span className="inline-block px-2 py-0.5 mb-2 rounded-full bg-neo-crimson/80 text-xs font-medium text-white">
                              {getTypeIcon(popularMedia[currentIndex].type)} {getTypeLabel(popularMedia[currentIndex].type)}
                            </span>
                            <h3 className="text-lg md:text-xl font-bold text-white line-clamp-1">
                              {popularMedia[currentIndex].title.english}
                            </h3>
                          </div>
                        </div>
                      </div>
                      
                      {/* Card Back */}
                      <div className="card-face card-back rounded-xl overflow-hidden shadow-2xl">
                        <div className="relative w-full h-full bg-black/90">
                          <div className="absolute inset-0 opacity-30 blur-md">
                            <img 
                              src={popularMedia[currentIndex].coverImage.large}
                              alt=""
                              className="absolute inset-0 w-full h-full object-cover"
                              style={{ objectPosition: "center center" }}
                            />
                          </div>
                          <div className="relative z-10 flex flex-col h-full p-4 md:p-5">
                            <div className="mb-3">
                              <span className="inline-block px-2 py-0.5 mb-1 rounded-full bg-neo-crimson/80 text-xs font-medium text-white">
                                {getTypeIcon(popularMedia[currentIndex].type)} {getTypeLabel(popularMedia[currentIndex].type)}
                              </span>
                              <h3 className="text-lg md:text-xl font-bold text-white mb-1 line-clamp-2">
                                {popularMedia[currentIndex].title.english}
                              </h3>
                              <div className="flex items-center text-base text-white/90 mb-1">
                                <span className="text-yellow-400 mr-1 text-lg">★</span>
                                <span className="font-bold">{((popularMedia[currentIndex].meanScore || 0) / 10).toFixed(1)}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {popularMedia[currentIndex].genres.slice(0, 3).map((genre, index) => (
                                <span 
                                  key={index}
                                  className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${getGenreColor(genre)}`}
                                >
                                  {genre}
                                </span>
                              ))}
                            </div>
                            <p className="text-white/70 text-xs">
                              {popularMedia[currentIndex].type === 'ANIME' 
                                ? `${popularMedia[currentIndex].episodes || '?'} Episodes` 
                                : `${popularMedia[currentIndex].chapters || '?'} Chapters`}
                            </p>
                            <div className="mb-auto overflow-y-auto">
                              <p className="text-white/80 text-xs italic leading-relaxed">
                                {truncateDescription(popularMedia[currentIndex].description || null)}
                              </p>
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
                className="absolute -right-2 sm:-right-4 md:-right-20 top-1/2 -translate-y-1/2 w-16 sm:w-20 md:w-32 h-28 sm:h-32 md:h-48 z-0 opacity-60 transform rotate-6 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => paginate(1)}
              >
                <div className="w-full h-full rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={popularMedia[(currentIndex + 1) % popularMedia.length].coverImage.large}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: "center center" }}
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                  <div className="absolute bottom-2 left-0 right-0 text-center text-white text-[10px] md:text-xs font-medium opacity-80 px-2 truncate">
                    {popularMedia[(currentIndex + 1) % popularMedia.length].title.english}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 