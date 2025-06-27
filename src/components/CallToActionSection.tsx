import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MediaItem {
  id: number;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  coverImage: {
    large: string;
    medium: string;
  };
  format: string;
  status: string;
  averageScore: number;
  genres: string[];
  episodes?: number;
  chapters?: number;
}

const SOCIAL_MEDIA_POSTS = [
  {
    platform: 'twitter',
    user: '@AnimeLovers2025',
    content: "Just discovered this amazing anime tracking app! The community features are incredible 📱 #Anime #Community #Zantaku #AnimeTracking #AniList",
    likes: '1.2K',
    retweets: '856',
    replies: '312'
  },
  {
    platform: 'twitter', 
    user: '@OtakuDaily',
    content: "The personalized recommendations on this app are spot-on! Finally found some hidden gems I never would have discovered 🎌 #AnimeLife #Otaku #Zantaku",
    likes: '2.1K',
    retweets: '1.4K', 
    replies: '523'
  },
  {
    platform: 'twitter',
    user: '@MangaReaderX',
    content: "This anime app has everything in one place - tracking, social features, and great recommendations 🚀 #AnimeApp #Community #Zantaku",
    likes: '987',
    retweets: '654',
    replies: '198'
  }
];

const DISCORD_MESSAGES = [
  {
    user: 'AnimeExplorer',
    avatar: '🌸',
    message: "Hey everyone! Found this great anime tracking app that syncs with AniList perfectly.\n\nZantaku has some really cool community features: https://zantaku.com"
  },
  {
    user: 'OtakuVibe',
    avatar: '⚡',
    message: "The recommendation engine on this app is really impressive. It suggested some anime that are now in my top 10!\n\nDefinitely worth checking out: https://zantaku.com"
  }
];

const REDDIT_POSTS = [
  {
    subreddit: 'r/anime',
    user: 'u/animetracker2025',
    upvotes: '1.5k',
    title: "New anime tracking app with great community features",
    preview: "I've been using this app for tracking my anime and manga, and it has some really cool features that other apps are missing. The community aspect is great, and it syncs perfectly with AniList.\n\nBefore anyone asks - yes it's legitimate and open source. Thought you all should know about this since it's made by anime fans for anime fans."
  },
  {
    subreddit: 'r/animesuggest', 
    user: 'u/recommendation_bot',
    upvotes: '892',
    title: "App with great AI-powered anime recommendations",
    preview: "For anyone looking for better anime recommendations, this app has been really helpful. The AI suggestions are much better than what I've tried before.\n\nIt's community-driven and has a lot of features that are actually useful for anime fans. Worth trying if you're into tracking and discovering new shows."
  }
];

export function CallToActionSection() {
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch sample anime/manga from AniList
  const fetchPreviewData = async () => {
    const query = `
      query {
        trending: Page(page: 1, perPage: 4) {
          media(type: ANIME, sort: TRENDING_DESC) {
            id
            title {
              romaji
              english
              native
            }
            coverImage {
              large
              medium
            }
            format
            status
            averageScore
            genres
            episodes
          }
        }
        manga: Page(page: 1, perPage: 2) {
          media(type: MANGA, sort: TRENDING_DESC) {
            id
            title {
              romaji
              english
              native
            }
            coverImage {
              large
              medium
            }
            format
            status
            averageScore
            genres
            chapters
          }
        }
      }
    `;

    try {
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      
      if (data.data) {
        // Mix anime and manga, take first 4 items
        const combined = [
          ...data.data.trending.media.slice(0, 2),
          ...data.data.manga.media.slice(0, 2)
        ];
        setPreviewMedia(combined);
      }
    } catch (error) {
      console.error('Error fetching AniList data:', error);
      // Fallback to empty array - component will handle gracefully
      setPreviewMedia([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPreviewData();
  }, []);

  // Show tooltip after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const getDisplayTitle = (media: MediaItem) => {
    return media.title.english || media.title.romaji;
  };

  const getStatusText = (media: MediaItem, index: number) => {
    const statusMap = [
      '📺 Resume from Episode 8',
      '📖 New Chapter Available', 
      '✅ Completed • Rate it?',
      '📅 Plan to Watch'
    ];
    return statusMap[index] || '📺 Ready to start';
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#1A0A1A] via-[#0A0A0A] to-[#7C1C1C]/10 flex flex-col justify-center items-center overflow-hidden">
      {/* Minimal Background decoration */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-20 left-20 text-lg font-light text-[#7C1C1C]/30">始</div>
        <div className="absolute bottom-20 right-20 text-lg font-light text-[#7C1C1C]/30">今</div>
      </div>

             <div className="w-full max-w-4xl mx-auto text-center px-6 py-6 flex flex-col justify-center items-center min-h-screen">
         
         {/* Social Sharing - Moved to Top */}
         <motion.div
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="text-center mb-8"
         >
           <p className="text-white/40 text-xs mb-3 font-light">
             Share Zantaku with fellow anime fans 🔗
           </p>
           <div className="flex justify-center gap-3 relative z-20">
             <button
               onClick={() => {
                 const messages = [
                   "Just discovered this amazing anime tracking app! The community features are incredible 📱 #Anime #Community #Zantaku #AnimeTracking #AniList",
                   "The personalized recommendations on this app are spot-on! Finally found some hidden gems I never would have discovered 🎌 #AnimeLife #Otaku #Zantaku",
                   "This anime app has everything in one place - tracking, social features, and great recommendations 🚀 #AnimeApp #Community #Zantaku"
                 ];
                 const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                 const url = window.location.href;
                 window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(randomMessage)}&url=${encodeURIComponent(url)}`, '_blank');
               }}
               className="w-8 h-8 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg flex items-center justify-center transition-all duration-200 relative z-20"
               title="Share on Twitter"
             >
               <span className="text-xs">𝕏</span>
             </button>
             <button
               onClick={() => {
                 const messages = [
                   "Hey everyone! Found this great anime tracking app that syncs with AniList perfectly.\n\nZantaku has some really cool community features: https://zantaku.com",
                   "The recommendation engine on this app is really impressive. It suggested some anime that are now in my top 10!\n\nDefinitely worth checking out: https://zantaku.com"
                 ];
                 const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                 navigator.clipboard.writeText(randomMessage).then(() => {
                   alert('Message copied to clipboard! Paste it in Discord 📋');
                 });
               }}
               className="w-8 h-8 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg flex items-center justify-center transition-all duration-200 relative z-20"
               title="Copy Discord message"
             >
               <span className="text-xs">💬</span>
             </button>
             <button
               onClick={() => {
                 const posts = [
                   {
                     title: "New anime tracking app with great community features",
                     text: "I've been using this app for tracking my anime and manga, and it has some really cool features that other apps are missing. The community aspect is great, and it syncs perfectly with AniList.\n\nBefore anyone asks - yes it's legitimate and open source. Thought you all should know about this since it's made by anime fans for anime fans."
                   },
                   {
                     title: "App with great AI-powered anime recommendations",
                     text: "For anyone looking for better anime recommendations, this app has been really helpful. The AI suggestions are much better than what I've tried before.\n\nIt's community-driven and has a lot of features that are actually useful for anime fans. Worth trying if you're into tracking and discovering new shows."
                   }
                 ];
                 const randomPost = posts[Math.floor(Math.random() * posts.length)];
                 const url = window.location.href;
                 window.open(`https://reddit.com/submit?title=${encodeURIComponent(randomPost.title)}&text=${encodeURIComponent(randomPost.text)}&url=${encodeURIComponent(url)}`, '_blank');
               }}
               className="w-8 h-8 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg flex items-center justify-center transition-all duration-200 relative z-20"
               title="Share on Reddit"
             >
               <span className="text-xs">📱</span>
             </button>
           </div>
         </motion.div>

         {/* Clean Header Block */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className="mb-8"
         >
           {/* Main Headline - Honest & Fire */}
           <h2 className="text-white text-2xl font-medium mb-2 leading-tight">
             All your anime + manga. Synced in 1 tap.
           </h2>
           <p className="text-white/60 text-sm font-light max-w-lg mx-auto leading-relaxed">
             AniList knows what you love. Zantaku just makes it look better.
           </p>
         </motion.div>

         {/* Clean Shelf Display */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.6 }}
           className="relative mb-8"
         >
      

                     {/* Dynamic AniList Preview Cards */}
           {isLoading ? (
             <div className="flex items-center justify-center py-8">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff4d4d]"></div>
             </div>
           ) : (
             <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
               {previewMedia.slice(0, 4).map((media, index) => (
                 <motion.div
                   key={media.id}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                   whileHover={{ y: -2 }}
                   className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 hover:border-white/20 transition-all duration-300 relative z-10"
                 >
                   <div className="flex items-center gap-2 mb-2">
                     <div className="w-8 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-md flex items-center justify-center overflow-hidden">
                       <img
                         src={media.coverImage.large}
                         alt={getDisplayTitle(media)}
                         className="w-full h-full object-cover rounded-md"
                         loading="lazy"
                       />
                     </div>
                     <div className="flex-1 text-left">
                       <div className="flex items-center gap-1 mb-0.5">
                         <span className="text-blue-400 text-xs font-medium">📘 AniList</span>
                       </div>
                       <h3 className="text-white text-sm font-medium leading-tight truncate">
                         {getDisplayTitle(media)}
                       </h3>
                       <p className="text-white/60 text-xs">
                         {getStatusText(media, index)}
                       </p>
                     </div>
                   </div>
                   <button className="w-full bg-[#ff4d4d]/10 hover:bg-[#ff4d4d]/20 border border-[#ff4d4d]/30 text-[#ff4d4d] text-xs font-medium py-1.5 rounded-md transition-colors relative z-20">
                     ▶️ Open in Zantaku
                   </button>
                 </motion.div>
               ))}
             </div>
           )}

                     {/* Powered by AniList - Clean Badge */}
           <motion.div
             initial={{ opacity: 0, y: 5 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.7 }}
             className="text-center mt-4"
           >
             <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1">
               <span className="text-blue-400/80 text-xs font-light">Preview from AniList</span>
             </div>
           </motion.div>
         </motion.div>

         {/* Honest Badge */}
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 1.0 }}
           className="mb-6"
         >
           <div className="bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1.5 flex items-center justify-center gap-2">
             <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
             <span className="text-blue-400/80 font-light text-xs">
               Trusted by AniList users worldwide
             </span>
           </div>
         </motion.div>

         {/* Clean Buttons Section */}
         <motion.div
           initial={{ opacity: 0, y: 15 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 1.1 }}
           className="flex flex-col sm:flex-row gap-3 justify-center items-center"
         >
                     <motion.a 
             href="https://github.com/zantaku/Zantaku/releases" 
             target="_blank" 
             rel="noopener noreferrer"
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
             animate={{ 
               boxShadow: [
                 "0 0 0px rgba(255, 77, 77, 0)",
                 "0 0 15px rgba(255, 77, 77, 0.3)",
                 "0 0 0px rgba(255, 77, 77, 0)"
               ]
             }}
             transition={{ 
               boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
               scale: { duration: 0.2 }
             }}
             className="px-6 py-2.5 bg-[#ff4d4d] hover:bg-[#ff4d4d]/90 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 relative z-20"
           >
             <Download className="w-4 h-4" />
             <span className="text-sm">Join the Revolution</span>
           </motion.a>
         </motion.div>
      </div>

      
    </div>
  );
} 