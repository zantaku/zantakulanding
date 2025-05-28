import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { fetchProfileData } from '../services/profileService';
import { ProfileBadges } from '../components/ProfileBadges';
import { FaGithub, FaYoutube, FaDiscord, FaInstagram, FaTwitch, FaTiktok, FaLinkedin } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { Helmet } from 'react-helmet';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug logs
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key exists:', !!supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

// AniList GraphQL query
const ANILIST_QUERY = `
  query ($search: String, $type: MediaType) {
    Media(search: $search, type: $type) {
      id
      title {
        romaji
        english
      }
      coverImage {
        large
      }
      averageScore
      genres
    }
  }
`;

// Types for AniList API Response
interface MediaData {
  id: number;
  title: {
    romaji: string;
    english: string | null;
  };
  coverImage: {
    large: string;
  };
  averageScore: number;
  genres: string[];
}

interface AniListResponse {
  data: {
    Media: MediaData;
  };
  errors?: Array<{
    message: string;
    status?: number;
  }>;
}

interface Theme {
  id: number;
  name: string;
  description: string;
  mode: string;
  primary_color: string;
  secondary_color: string;
  background_color: string;
  text_color: string;
}

interface AffiliateProfile {
  id?: number;
  username: string;
  pfp_url: string;
  about: string;
  why_zantaku: string;
  top_anime: string[];
  top_manga: string[];
  created_at: string;
  otaku_signature?: string;
  badge?: string[];
  theme?: Theme;
  platform?: string;
}

interface SocialLink {
  id?: number;
  profile_id: number;
  platform_name: string;
  url: string;
  position: number;
}

interface AnimeMangaItem {
  id: number;
  title: string;
  coverImage: string;
  score: number;
  type: 'anime' | 'manga';
  genre?: string;
}

interface ThemeStyles {
  background: string;
  primary: string;
  secondary: string;
  text: string;
  cardBg: string;
  gradientFrom: string;
  gradientTo: string;
}

const getThemeStyles = (theme?: Theme): ThemeStyles => {
  // Default dark theme (Dark Yoru Mode)
  const defaultTheme = {
    background: '#0D0D0D',
    primary: '#FF4554',
    secondary: '#1A1A2E',
    text: '#FFFFFF',
    cardBg: '#1A1D25',
    gradientFrom: '#FF4554',
    gradientTo: '#FF6B6B'
  };

  if (!theme) {
    return defaultTheme;
  }

  // Predefined themes
  const themePresets: Record<string, ThemeStyles> = {
    'Dark Yoru Mode': {
      background: '#0D0D0D',
      primary: '#FF4554',
      secondary: '#1A1A2E',
      text: '#FFFFFF',
      cardBg: '#1A1D25',
      gradientFrom: '#FF4554',
      gradientTo: '#1A1A2E'
    },
    'Light Hikari Mode': {
      background: '#FAFAFA',
      primary: '#FF7680',
      secondary: '#FFFFFF',
      text: '#1A1A1A',
      cardBg: '#FFFFFF',
      gradientFrom: '#FF7680',
      gradientTo: '#FFFFFF'
    },
    'Sakura Bloom': {
      background: '#FFF5F9',
      primary: '#FF87C5',
      secondary: '#FDEFF2',
      text: '#5D3A3A',
      cardBg: '#FFFFFF',
      gradientFrom: '#FF87C5',
      gradientTo: '#FDEFF2'
    },
    'Akuma Red': {
      background: '#0B0B0B',
      primary: '#E10600',
      secondary: '#2D0000',
      text: '#E0E0E0',
      cardBg: '#1A1D25',
      gradientFrom: '#E10600',
      gradientTo: '#2D0000'
    },
    'Kyoto Twilight': {
      background: '#1E1B2E',
      primary: '#FFD700',
      secondary: '#1E1B2E',
      text: '#F0E6FF',
      cardBg: '#2A2639',
      gradientFrom: '#FFD700',
      gradientTo: '#1E1B2E'
    }
  };

  // If theme name matches a preset, use it
  if (theme.name && themePresets[theme.name]) {
    return themePresets[theme.name];
  }

  // Otherwise, use the custom colors from the theme
  return {
    background: theme.background_color || defaultTheme.background,
    primary: theme.primary_color || defaultTheme.primary,
    secondary: theme.secondary_color || defaultTheme.secondary,
    text: theme.text_color || defaultTheme.text,
    cardBg: theme.mode === 'dark' ? '#1A1D25' : '#FFFFFF',
    gradientFrom: theme.primary_color || defaultTheme.gradientFrom,
    gradientTo: theme.secondary_color || defaultTheme.gradientTo
  };
};

// Add the PendingApprovalPage component
const PendingApprovalPage = ({ username }: { username: string }) => {
  // Use default theme for pending page
  const themeStyles = getThemeStyles();

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: themeStyles.background }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          style={{ background: `linear-gradient(to bottom, ${themeStyles.gradientFrom}05, transparent)` }}
          className="absolute inset-0"
        ></motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-auto p-6 relative z-10"
      >
        <div style={{ background: `${themeStyles.cardBg}90`, backdropFilter: 'blur(10px)' }} className="rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-yellow-500/20 flex items-center justify-center"
            >
              <span className="text-4xl">🔒</span>
            </motion.div>

            <h1 className="text-2xl font-bold mb-3" style={{ color: themeStyles.text }}>
              @{username}'s Page is Locked
            </h1>

            <p className="text-lg mb-6" style={{ color: `${themeStyles.text}CC` }}>
              This page is waiting for admin approval before going public.
            </p>

            <div className="space-y-4">
              <div style={{ background: `${themeStyles.secondary}40` }} className="p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p style={{ color: themeStyles.text }} className="font-medium">
                    24 Hour Review Period
                  </p>
                </div>
                <p style={{ color: `${themeStyles.text}99` }} className="text-sm">
                  Our team will review your application within 24 hours.
                </p>
              </div>

              <div style={{ background: `${themeStyles.secondary}40` }} className="p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p style={{ color: themeStyles.text }} className="font-medium">
                    What's Next?
                  </p>
                </div>
                <ul style={{ color: `${themeStyles.text}99` }} className="text-sm list-disc ml-5 space-y-1">
                  <li>We'll review your profile information</li>
                  <li>Check back in 24 hours</li>
                  <li>You'll be notified via your preferred contact method</li>
                </ul>
              </div>
            </div>

            <a
              href="/"
              style={{ background: themeStyles.primary }}
              className="mt-8 inline-block px-6 py-3 rounded-full text-white font-medium hover:opacity-90 transition-opacity"
            >
              Return to Homepage
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Add this after the BADGE_CONFIGS or before the UserLink component
const MEDIA_IMAGES: Record<string, string[]> = {
  'Chainsaw Man': [
    'https://staticg.sportskeeda.com/editor/2022/10/43b25-16654606476914-1920.jpg',
    'https://www.hindustantimes.com/ht-img/img/2023/07/25/1600x900/Screenshot_2023-07-25_131754_1690273198048_1690273207909.png',
    'https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2022/12/13/chainsaw-man-denji-power.jpeg',
    'https://www.hindustantimes.com/ht-img/img/2023/01/11/1600x900/Chainsaw-Man_1673419011457_1673419011731_1673419011731.jpg'
  ],
  'One Piece': [
    'https://sportshub.cbsistatic.com/i/2023/07/17/28e30809-47a7-4eb6-8afa-5c800716b357/one-piece-live-action-luffy-inaki-godoy.jpg',
    'https://assets-prd.ignimgs.com/2023/01/01/onepiece-1672617905259.jpg',
    'https://www.hindustantimes.com/ht-img/img/2023/08/27/1600x900/one_piece_live_action_1693126127847_1693126128047.jpg',
    'https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/06/19/one-piece-chapter-1087-spoilers-luffy-sabo.jpeg'
  ],
  'JUJUTSU KAISEN': [
    'https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2023/07/10/3246246057.png',
    'https://www.hindustantimes.com/ht-img/img/2023/07/24/1600x900/jujutsu_kaisen_1690178242586_1690178242826.jpg',
    'https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/08/17/jujutsu-kaisen-gojo-sukuna.jpeg',
    'https://staticg.sportskeeda.com/editor/2023/08/5d3e4-16915661796925-1920.jpg'
  ],
  'Fairy Tail': [
    'https://m.media-amazon.com/images/M/MV5BMzZjNmRhNWQtNTAyYy00YzQxLWJiMTQtNDhkZGZiZWViYjY0XkEyXkFqcGdeQXVyMTA1OTEwNjE@._V1_FMjpg_UX1000_.jpg',
    'https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/05/10/fairy-tail-100-years-quest-anime.jpeg',
    'https://staticg.sportskeeda.com/editor/2022/07/39502-16573049001649-1920.jpg',
    'https://i0.wp.com/anitrendz.net/news/wp-content/uploads/2022/09/fairytail100yearquest_announcement.jpg'
  ],
  'Dandadan': [
    'https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/07/05/dandadan-manga.jpeg',
    'https://staticg.sportskeeda.com/editor/2023/06/7e9e1-16861356246981-1920.jpg',
    'https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/04/19/dandadan-chapter-102.jpeg',
    'https://preview.redd.it/dandadan-volume-1-cover-clean-v0-zqc14aqj1qb91.png?width=640&crop=smart&auto=webp&s=0c0f7e7a2b2c5e7f0e0d2b8b8b8b8b8b8b8b8b8'
  ],
  'Frieren: Beyond Journey\'s End': [
    'https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/09/15/frieren-beyond-journeys-end-episode-2.jpeg',
    'https://www.animenewsnetwork.com/thumbnails/crop1200x630gE5/herald/183775/frieren.jpg',
    'https://staticg.sportskeeda.com/editor/2023/09/19c4c-16949320002541-1920.jpg',
    'https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/09/08/frieren-beyond-journeys-end-anime.jpeg'
  ]
};

// Add this helper function before the UserLink component
const getRandomImage = (title: string): string => {
  const images = MEDIA_IMAGES[title] || [];
  if (images.length === 0) return '';
  return images[Math.floor(Math.random() * images.length)];
};

// Add this before the UserLink component
const SOCIAL_CONFIGS: Record<string, { icon: React.ReactNode; gradient: string[]; hoverText: string }> = {
  'Twitter': {
    icon: <SiX />,
    gradient: ['#1DA1F2', '#0D8BD9'],
    hoverText: 'Follow me on Twitter'
  },
  'Discord': {
    icon: <FaDiscord />,
    gradient: ['#5865F2', '#404EED'],
    hoverText: 'Join my Discord'
  },
  'Github': {
    icon: <FaGithub />,
    gradient: ['#333333', '#24292E'],
    hoverText: 'Check out my Github'
  },
  'YouTube': {
    icon: <FaYoutube />,
    gradient: ['#FF0000', '#CC0000'],
    hoverText: 'Subscribe to my channel'
  },
  'Instagram': {
    icon: <FaInstagram />,
    gradient: ['#833AB4', '#FD1D1D'],
    hoverText: 'Follow me on Instagram'
  },
  'Twitch': {
    icon: <FaTwitch />,
    gradient: ['#9146FF', '#6441A5'],
    hoverText: 'Watch me on Twitch'
  },
  'TikTok': {
    icon: <FaTiktok />,
    gradient: ['#000000', '#25F4EE'],
    hoverText: 'Follow me on TikTok'
  },
  'LinkedIn': {
    icon: <FaLinkedin />,
    gradient: ['#0077B5', '#00669C'],
    hoverText: 'Connect on LinkedIn'
  }
};

const UserLink = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<AffiliateProfile | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [animeList, setAnimeList] = useState<AnimeMangaItem[]>([]);
  const [mangaList, setMangaList] = useState<AnimeMangaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<AnimeMangaItem | null>(null);
  const [showRecommendModal, setShowRecommendModal] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isPendingApproval, setIsPendingApproval] = useState(false);
  const [isLoadingPlatformPfp, setIsLoadingPlatformPfp] = useState(false);
  
  // Add console logging for theme and badges
  useEffect(() => {
    if (profile?.badge) {
      console.log('Profile badges available for rendering:', profile.badge);
    }
  }, [profile?.badge]);

  // Add console logging for theme
  const themeStyles = getThemeStyles(profile?.theme);
  console.log('Current profile theme:', profile?.theme);
  console.log('Applied theme styles:', themeStyles);

  // Default placeholder profile picture URL
  const placeholderPfp = "https://i.pinimg.com/originals/93/d3/e3/93d3e31639a4d07613de9dccdc8bd5e8.png";

  const handleImageError = () => {
    setImgError(true);
  };

  useEffect(() => {
    if (username) {
      fetchUserData(username);
    }
  }, [username]);

  const setDefaultAnimeMangaData = () => {
    setAnimeList([
      { 
        id: 1, 
        title: 'Chainsaw Man', 
        coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-FlochcFsyoF4.png', 
        score: 8.4, 
        type: 'anime', 
        genre: 'Action' 
      },
      { 
        id: 2, 
        title: 'JUJUTSU KAISEN', 
        coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145064-5fa4ZBbW4dqA.jpg', 
        score: 8.8, 
        type: 'anime', 
        genre: 'Action' 
      },
      { 
        id: 3, 
        title: 'Fairy Tail', 
        coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx6702-4cHoYZbEJZQX.png', 
        score: 7.6, 
        type: 'anime', 
        genre: 'Action' 
      }
    ]);
    
    setMangaList([
      { 
        id: 4, 
        title: 'One Piece', 
        coverImage: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30013-oT7YguhEK1TE.jpg', 
        score: 8.3, 
        type: 'manga', 
        genre: 'Adventure' 
      },
      { 
        id: 5, 
        title: 'Dandadan', 
        coverImage: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx132029-qZgNURhMj3Mk.jpg', 
        score: 8.3, 
        type: 'manga', 
        genre: 'Action' 
      },
      { 
        id: 6, 
        title: 'Frieren: Beyond Journey\'s End', 
        coverImage: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx126287-ZGjkexsqmz8J.jpg', 
        score: 8.7, 
        type: 'manga', 
        genre: 'Adventure' 
      }
    ]);
  };

  const fetchAniListData = async (title: string, type: 'ANIME' | 'MANGA'): Promise<MediaData | null> => {
    try {
      console.log(`Fetching AniList ${type} data for title:`, title);
      
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: ANILIST_QUERY,
          variables: { search: title, type }
        })
      });

      if (!response.ok) {
        console.error('AniList API error:', response.status);
        return null;
      }

      const data = await response.json() as AniListResponse;
      
      if (data.errors) {
        console.error('AniList GraphQL errors:', data.errors);
        return null;
      }

      return data.data.Media;
    } catch (error) {
      console.error('Error fetching AniList data:', error);
      return null;
    }
  };

  // New function to fetch and update profile picture from AniList/MAL
  const fetchProfilePicture = async (profileData: AffiliateProfile) => {
    if (!profileData || !profileData.platform || !profileData.username) {
      console.log('Missing platform or username for profile picture fetch');
      return null;
    }

    try {
      setIsLoadingPlatformPfp(true);
      console.log(`Fetching profile picture from ${profileData.platform} for ${profileData.username}`);
      
      const platformProfileData = await fetchProfileData(profileData.platform, profileData.username);
      
      if (platformProfileData && platformProfileData.pfp_url) {
        console.log('Found profile picture:', platformProfileData.pfp_url);
        
        // Update the pfp_url in the Supabase database
        const { error } = await supabase
          .from('affiliate_profiles')
          .update({ pfp_url: platformProfileData.pfp_url })
          .eq('id', profileData.id);
          
        if (error) {
          console.error('Error updating profile picture in database:', error);
        } else {
          console.log('Successfully updated profile picture in database');
          // Update the local state
          setProfile({
            ...profileData,
            pfp_url: platformProfileData.pfp_url
          });
          
          // Reset image error state since we have a new image
          setImgError(false);
        }
      } else {
        console.log('No profile picture found from platform API');
      }
    } catch (error) {
      console.error('Error fetching profile picture:', error);
    } finally {
      setIsLoadingPlatformPfp(false);
    }
  };

  const fetchUserData = async (username: string) => {
    try {
      console.log('Fetching data for username:', username);
      
      const { data: profileData, error: profileError } = await supabase
        .from('affiliate_profiles')
        .select(`
          *,
          themes!affiliate_profiles_theme_id_fkey (*),
          affiliate_social_links (
            id,
            platform_name,
            url,
            position
          )
        `)
        .eq('username', username)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        setError(`Profile @${username} not found. Please check the username and try again.`);
        setLoading(false);
        return;
      }

      // Check if profile is approved
      if (profileData && profileData.is_approved === false) {
        console.log('Profile is pending approval:', profileData.username);
        setIsPendingApproval(true);
        setLoading(false);
        return;
      }

      // Set default data first
      setDefaultAnimeMangaData();

      // Set profile data
      setProfile({
        ...profileData,
        theme: profileData.themes
      });

      // Set social links
      setSocialLinks(profileData.affiliate_social_links || []);

      // If the profile has a platform and username but no profile picture or uses the default,
      // try to fetch the profile picture from the platform
      if (
        profileData.platform && 
        profileData.username && 
        (!profileData.pfp_url || profileData.pfp_url === placeholderPfp)
      ) {
        fetchProfilePicture(profileData);
      }

      // Try to fetch AniList data in the background
      try {
        if (profileData.top_anime?.length > 0) {
          const animePromises = profileData.top_anime.slice(0, 3).map(async (animeTitle: string) => {
            const mediaData = await fetchAniListData(animeTitle, 'ANIME');
            if (mediaData) {
              return {
                id: mediaData.id,
                title: mediaData.title.english || mediaData.title.romaji,
                coverImage: mediaData.coverImage.large,
                score: mediaData.averageScore / 10,
                type: 'anime' as const,
                genre: mediaData.genres[0] || 'Unknown'
              };
            }
            return null;
          });

          const animeResults = await Promise.all(animePromises);
          const validAnimeResults = animeResults.filter((result): result is AnimeMangaItem => result !== null);
          if (validAnimeResults.length > 0) {
            setAnimeList(validAnimeResults);
          }
        }

        if (profileData.top_manga?.length > 0) {
          const mangaPromises = profileData.top_manga.slice(0, 3).map(async (mangaTitle: string) => {
            const mediaData = await fetchAniListData(mangaTitle, 'MANGA');
            if (mediaData) {
              return {
                id: mediaData.id,
                title: mediaData.title.english || mediaData.title.romaji,
                coverImage: mediaData.coverImage.large,
                score: mediaData.averageScore / 10,
                type: 'manga' as const,
                genre: mediaData.genres[0] || 'Unknown'
              };
            }
            return null;
          });

          const mangaResults = await Promise.all(mangaPromises);
          const validMangaResults = mangaResults.filter((result): result is AnimeMangaItem => result !== null);
          if (validMangaResults.length > 0) {
            setMangaList(validMangaResults);
          }
        }
      } catch (error) {
        console.error('Error fetching AniList data:', error);
        // Keep default data if AniList fetch fails
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error loading profile');
      setDefaultAnimeMangaData();
    } finally {
      setLoading(false);
    }
  };

  const handleVisitLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getGenreColor = (genre: string | undefined) => {
    switch (genre?.toLowerCase()) {
      case 'action':
        return 'bg-[#E94F4F]';
      case 'romance':
        return 'bg-[#FF69B4]';
      case 'comedy':
        return 'bg-[#FFD700]';
      case 'drama':
        return 'bg-[#9370DB]';
      case 'fantasy':
        return 'bg-[#4B0082]';
      case 'sci-fi':
        return 'bg-[#00BFFF]';
      default:
        return 'bg-[#E94F4F]';
    }
  };

  const getRecommendationText = (media: AnimeMangaItem) => {
    const recommendations: Record<string, string> = {
      'Demon Slayer': 'with its breathtaking animation and intense action scenes, this show will keep you on the edge of your seat!',
      'Spy x Family': 'this heartwarming blend of action, comedy, and family dynamics is impossible not to love!',
      'Jujutsu Kaisen': 'featuring unique curse battles and compelling characters, it\'s a must-watch for any anime fan!',
      'Chainsaw Man': 'this groundbreaking manga perfectly balances action, dark humor, and deep emotional moments!',
      'Solo Leveling': 'with its stunning art and thrilling power progression, it\'s the perfect gateway to manhwa!',
      'Blue Lock': 'if you love sports and psychological warfare, this intense soccer manga will hook you instantly!'
    };
    return recommendations[media.title] || 'this is a must-read/watch that you won\'t want to miss!';
  };

  const handleMediaClick = (media: AnimeMangaItem) => {
    setSelectedMedia(media);
    setShowRecommendModal(true);
  };

  // SEO metadata generation
  const generateSeoTitle = () => {
    if (!profile) return `${username} is excited for Zantaku, are you too?`;
    return `${profile.username}`;
  };

  const generateSeoDescription = () => {
    if (!profile) return `Check out ${username}'s Zantaku profile`;
    let description = `${profile.username} is a verified Zantaku Affiliate.`;
    
    if (profile.why_zantaku) {
      description += ` "${profile.why_zantaku.substring(0, 100)}${profile.why_zantaku.length > 100 ? '...' : ''}"`;
    }
    
    return description + " Join Zantaku today for the ultimate anime experience!";
  };

  const getProfileImage = () => {
    return imgError || !profile?.pfp_url ? placeholderPfp : profile.pfp_url;
  };

  if (loading) {
    return (
      <div className={`min-h-screen text-${themeStyles.text}`} style={{ background: themeStyles.background }}>
        <Helmet>
          <title>{generateSeoTitle()}</title>
          <meta name="description" content={generateSeoDescription()} />
          
          {/* OpenGraph Meta Tags */}
          <meta property="og:title" content={generateSeoTitle()} />
          <meta property="og:description" content={generateSeoDescription()} />
          <meta property="og:image" content={getProfileImage()} />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:type" content="profile" />
          <meta property="og:site_name" content="Zantaku - Read, Watch, Sync better" />
          
          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={generateSeoTitle()} />
          <meta name="twitter:description" content={generateSeoDescription()} />
          <meta name="twitter:image" content={getProfileImage()} />
        </Helmet>
        
        <div className="flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#1A1D25]/50 backdrop-blur-sm p-8 rounded-lg shadow-lg text-center"
          >
            <div className="animate-spin w-12 h-12 border-4 border-[#E94F4F] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white">Loading your anime shrine...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (isPendingApproval && username) {
    return (
      <>
        <Helmet>
          <title>{generateSeoTitle()}</title>
          <meta name="description" content={generateSeoDescription()} />
          
          {/* OpenGraph Meta Tags */}
          <meta property="og:title" content={generateSeoTitle()} />
          <meta property="og:description" content={generateSeoDescription()} />
          <meta property="og:image" content={getProfileImage()} />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:type" content="profile" />
          <meta property="og:site_name" content="Zantaku - Your Ultimate Anime Community" />
          
          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={generateSeoTitle()} />
          <meta name="twitter:description" content={generateSeoDescription()} />
          <meta name="twitter:image" content={getProfileImage()} />
        </Helmet>
        <PendingApprovalPage username={username} />
      </>
    );
  }

  if (error || !profile) {
    return (
      <div className={`min-h-screen text-${themeStyles.text}`} style={{ background: themeStyles.background }}>
        <Helmet>
          <title>{username ? `${username} - Zantaku Profile Not Found` : 'Profile Not Found'}</title>
          <meta name="description" content="This Zantaku profile could not be found. Join Zantaku - the ultimate anime community platform!" />
          
          {/* OpenGraph Meta Tags */}
          <meta property="og:title" content={username ? `${username} - Zantaku Profile Not Found` : 'Profile Not Found'} />
          <meta property="og:description" content="This Zantaku profile could not be found. Join Zantaku - the ultimate anime community platform!" />
          <meta property="og:image" content="https://i.pinimg.com/originals/93/d3/e3/93d3e31639a4d07613de9dccdc8bd5e8.png" />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Zantaku - Your Ultimate Anime Community" />
          
          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={username ? `${username} - Zantaku Profile Not Found` : 'Profile Not Found'} />
          <meta name="twitter:description" content="This Zantaku profile could not be found. Join Zantaku - the ultimate anime community platform!" />
          <meta name="twitter:image" content="https://i.pinimg.com/originals/93/d3/e3/93d3e31639a4d07613de9dccdc8bd5e8.png" />
        </Helmet>
        
        <div className="flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1A1D25]/50 backdrop-blur-sm p-8 rounded-lg shadow-lg text-center max-w-md"
          >
            <div className="text-[#E94F4F] text-5xl mb-4">😕</div>
            <h2 className="text-white text-2xl font-bold mb-4">Profile Not Found</h2>
            <p className="text-gray-300 mb-6">Are you in the wrong page?</p>
            <a 
              href="/"
              className="px-6 py-3 bg-[#E94F4F] text-white rounded-full hover:bg-[#d14545] transition-colors inline-block"
            >
              Return to Homepage
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen text-${themeStyles.text}`} style={{ background: themeStyles.background }}>
      <Helmet>
        <title>{generateSeoTitle()}</title>
        <meta name="description" content={generateSeoDescription()} />
        
        {/* OpenGraph Meta Tags */}
        <meta property="og:title" content={generateSeoTitle()} />
        <meta property="og:description" content={generateSeoDescription()} />
        <meta property="og:image" content={getProfileImage()} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="Zantaku - Your Ultimate Anime Community" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={generateSeoTitle()} />
        <meta name="twitter:description" content={generateSeoDescription()} />
        <meta name="twitter:image" content={getProfileImage()} />
      </Helmet>
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          style={{ background: `linear-gradient(to bottom, ${themeStyles.gradientFrom}05, transparent)` }}
          className="absolute inset-0"
        ></motion.div>
        <div className={`absolute top-1/4 -left-10 text-[150px] font-bold opacity-5 transform -rotate-90`} style={{ color: themeStyles.text }}>
          オタク
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-2xl mx-auto px-4 py-8 relative">
        {/* Profile Header */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block mb-6">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{ background: themeStyles.primary }}
              className="absolute inset-0 rounded-full blur-lg opacity-20"
            ></motion.div>
            {isLoadingPlatformPfp ? (
              <div className="w-32 h-32 rounded-full border-4 relative z-10 flex items-center justify-center" 
                   style={{ borderColor: themeStyles.primary, background: `${themeStyles.secondary}80` }}>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-4 border-t-transparent rounded-full"
                  style={{ borderColor: `${themeStyles.primary}` }}
                />
              </div>
            ) : (
              <img 
                src={imgError ? placeholderPfp : profile?.pfp_url || placeholderPfp}
                alt={profile?.username}
                onError={handleImageError}
                style={{ borderColor: themeStyles.primary }}
                className="w-32 h-32 rounded-full border-4 relative z-10 object-cover"
              />
            )}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ borderColor: `${themeStyles.primary}30` }}
              className="absolute inset-0 rounded-full border-2"
            ></motion.div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">@{profile?.username}</h1>
          {profile?.badge && profile.badge.length > 0 && (
            <ProfileBadges badges={profile.badge} className="mb-2" />
          )}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ background: `${themeStyles.primary}20`, color: themeStyles.primary }}
            className="inline-block px-4 py-1 rounded-full text-sm font-medium"
          >
            Zantaku Affiliate
          </motion.div>
        </motion.section>

        {/* Personal Message */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ background: `${themeStyles.cardBg}80`, backdropFilter: 'blur(8px)' }}
          className="rounded-lg p-6 mb-8"
        >
          <div className="text-center mb-8">
            <TypeAnimation
              sequence={[profile.why_zantaku || "Zantaku feels like home."]}
              wrapper="h2"
              speed={50}
              style={{ color: themeStyles.primary }}
              className="text-2xl font-medium"
            />
          </div>
          
          <div style={{ color: `${themeStyles.text}CC` }}>
            <p className="mb-4">{profile.about}</p>
            {profile.otaku_signature && (
              <div style={{ borderColor: themeStyles.secondary, color: themeStyles.primary }} 
                   className="border-t pt-4 mt-4 text-center italic">
                "{profile.otaku_signature}"
              </div>
            )}
          </div>
        </motion.section>

        {/* Anime & Manga Showcase */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {/* Anime Section */}
          <div style={{ background: `${themeStyles.cardBg}80`, backdropFilter: 'blur(8px)' }} className="rounded-lg p-6">
            <h3 style={{ color: themeStyles.primary }} className="text-xl font-semibold mb-4 flex items-center">
              <span className="mr-2">🎬</span> Top Anime
            </h3>
            <div className="space-y-4">
              {animeList.map((anime) => (
                <motion.div
                  key={anime.id}
                  whileHover={{ x: 5 }}
                  style={{ background: `${themeStyles.secondary}80` }}
                  className="rounded-lg p-3 flex items-center gap-4 group cursor-pointer"
                  onClick={() => handleMediaClick(anime)}
                >
                  <div className="relative w-20 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                    <img 
                      src={anime.coverImage} 
                      alt={anime.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute top-0 right-0 ${getGenreColor(anime.genre)} text-white text-xs px-2 py-1 rounded-bl-lg font-medium`}>
                      {anime.score.toFixed(1)}
                    </div>
                  </div>
                  <div>
                    <h4 style={{ color: themeStyles.text }} className="font-medium group-hover:text-[#E94F4F] transition-colors">
                      {anime.title}
                    </h4>
                    <p style={{ color: `${themeStyles.text}99` }} className="text-sm">
                      {anime.genre}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Manga Section */}
          <div style={{ background: `${themeStyles.cardBg}80`, backdropFilter: 'blur(8px)' }} className="rounded-lg p-6">
            <h3 style={{ color: themeStyles.primary }} className="text-xl font-semibold mb-4 flex items-center">
              <span className="mr-2">📚</span> Top Manga
            </h3>
            <div className="space-y-4">
              {mangaList.map((manga) => (
                <motion.div
                  key={manga.id}
                  whileHover={{ x: 5 }}
                  style={{ background: `${themeStyles.secondary}80` }}
                  className="rounded-lg p-3 flex items-center gap-4 group cursor-pointer"
                  onClick={() => handleMediaClick(manga)}
                >
                  <div className="relative w-20 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                    <img 
                      src={manga.coverImage} 
                      alt={manga.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute top-0 right-0 ${getGenreColor(manga.genre)} text-white text-xs px-2 py-1 rounded-bl-lg font-medium`}>
                      {manga.score.toFixed(1)}
                    </div>
                  </div>
                  <div>
                    <h4 style={{ color: themeStyles.text }} className="font-medium group-hover:text-[#E94F4F] transition-colors">
                      {manga.title}
                    </h4>
                    <p style={{ color: `${themeStyles.text}99` }} className="text-sm">
                      {manga.genre}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Social Links */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ background: `${themeStyles.cardBg}80`, backdropFilter: 'blur(8px)' }}
          className="rounded-lg p-6 mb-8"
        >
          <h3 style={{ color: themeStyles.text }} className="text-xl font-semibold mb-6 text-center">Connect With Me</h3>
          <div className="grid gap-4">
            {socialLinks
              .sort((a, b) => (a.position || 0) - (b.position || 0))
              .map((link) => {
                const config = SOCIAL_CONFIGS[link.platform_name];
                return (
                  <motion.button
                    key={link.url}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleVisitLink(link.url)}
                    className="w-full p-4 rounded-lg transition-all relative overflow-hidden group"
                    style={{ background: `${themeStyles.secondary}80` }}
                  >
                    {/* Gradient background that shows on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      style={{
                        background: config ? `linear-gradient(45deg, ${config.gradient[0]}, ${config.gradient[1]})` : undefined
                      }}
                    />
                    
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Icon with glow effect */}
                        <div className="w-8 h-8 flex items-center justify-center relative">
                          <div className="text-xl relative">
                            {/* Glow effect */}
                            <div 
                              className="absolute inset-0 blur-sm opacity-50 group-hover:opacity-100 transition-opacity"
                              style={{ color: config?.gradient[0] }}
                            >
                              {config?.icon}
                            </div>
                            {/* Actual icon */}
                            <div className="relative" style={{ color: themeStyles.text }}>
                              {config?.icon}
                            </div>
                          </div>
                        </div>
                        
                        {/* Platform name */}
                        <span 
                          style={{ color: themeStyles.text }} 
                          className="font-medium text-lg"
                        >
                          {link.platform_name}
                        </span>
                      </div>

                      {/* Hover text and arrow */}
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-sm opacity-0 group-hover:opacity-70 transition-opacity"
                          style={{ color: themeStyles.text }}
                        >
                          {config?.hoverText}
                        </span>
                        <motion.span
                          className="opacity-50 group-hover:opacity-100"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          style={{ color: config?.gradient[0] }}
                        >
                          →
                        </motion.span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
          </div>
        </motion.section>

        {/* Recommendation Modal */}
        {showRecommendModal && selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            style={{ background: `${themeStyles.background}CC` }}
            onClick={() => setShowRecommendModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{ background: themeStyles.cardBg }}
              className="rounded-xl p-6 max-w-md w-full space-y-4 relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Background Glow */}
              <div 
                className="absolute inset-0 opacity-30 z-0"
                style={{ 
                  background: `linear-gradient(45deg, ${themeStyles.gradientFrom}, ${themeStyles.gradientTo})`,
                  filter: 'blur(40px)'
                }}
              />

              {/* Content Container */}
              <div className="relative z-10">
                {/* Score Badge */}
                <div 
                  className={`absolute top-0 right-0 z-20 text-white text-sm px-3 py-1 rounded-bl-lg font-medium backdrop-blur-md`}
                  style={{ background: `${getGenreColor(selectedMedia.genre)}CC` }}
                >
                  {selectedMedia.score.toFixed(1)} ★
                </div>

                {/* Media Title */}
                <h3 
                  style={{ color: themeStyles.primary }} 
                  className="text-2xl font-bold mb-4"
                >
                  {selectedMedia.title}
                </h3>

                {/* Image Container */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6 bg-black/20">
                  <img 
                    src={getRandomImage(selectedMedia.title) || selectedMedia.coverImage}
                    alt={selectedMedia.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = selectedMedia.coverImage;
                    }}
                  />
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <p style={{ color: themeStyles.text }}>
                    <span className="font-medium">@{profile?.username}</span> loves {selectedMedia.title} and is watching this on Zantaku.
                  </p>
                  
                  <p style={{ color: `${themeStyles.text}CC` }}>
                    {getRecommendationText(selectedMedia)}
                  </p>
                </div>

                {/* Download Button */}
                <a
                  href="/"
                  className="block w-full mt-6 relative group"
                >
                  <div 
                    style={{ background: `linear-gradient(to right, ${themeStyles.gradientFrom}, ${themeStyles.gradientTo})` }} 
                    className="absolute inset-0 rounded-lg blur group-hover:blur-md transition-all"
                  />
                  <button 
                    style={{ background: `linear-gradient(to right, ${themeStyles.gradientFrom}, ${themeStyles.gradientTo})` }} 
                    className="relative w-full text-white font-bold py-3 px-6 rounded-lg group-hover:scale-[1.02] transition-transform"
                  >
                    Download Zantaku
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </button>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserLink; 