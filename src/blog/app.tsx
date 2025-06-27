import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Instagram, Twitter, Search, Clock, ArrowRight, Star, Flame, Brain, HeartCrack } from 'lucide-react';
import { FloatingMascot } from '../components/FloatingMascot';

// Blog categories with color coding
const categories = [
  { name: "Anime", color: "#7C1C1C" },
  { name: "Manga", color: "#3E6257" },
  { name: "News", color: "#2C7A8C" },
  { name: "Guides", color: "#425A40" },
  { name: "VTuber", color: "#8C2C7A" }, // Purple variation
];

// Define post interface
interface Post {
  id: number;
  title: string;
  excerpt?: string;
  coverImage: string;
  category: string;
  date: string;
  readTime?: string;
  badge?: string;
}

// Featured blog posts
const featuredPosts: Post[] = [
  {
    id: 1,
    title: "How To Own Manga For Free",
    excerpt: "Discover legal ways to read manga without spending a dime...",
    coverImage: "https://placehold.co/600x400/531111/FFFFFF?text=Manga+Collection",
    category: "Manga",
    date: "March 17, 2023",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Top Ten Trends In Manga To Watch",
    excerpt: "The latest trends that are shaping the future of manga...",
    coverImage: "https://placehold.co/600x400/3E6257/FFFFFF?text=Manga+Trends", 
    category: "Manga",
    date: "March 17, 2023",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Why Are Children So Obsessed With Manga",
    excerpt: "Understanding the appeal of manga to younger audiences...",
    coverImage: "https://placehold.co/600x400/2C7A8C/FFFFFF?text=Manga+Kids",
    category: "Analysis",
    date: "March 17, 2023",
    readTime: "6 min read"
  }
];

// Popular posts for sidebar
const popularPosts: Post[] = [
  {
    id: 4,
    title: "Top Ten Trends In Manga To Watch",
    coverImage: "https://placehold.co/300x200/3E6257/FFFFFF?text=Manga+Trends",
    date: "March 17, 2023",
    category: "Manga"
  },
  {
    id: 5,
    title: "How To Own Manga For Free",
    coverImage: "https://placehold.co/300x200/531111/FFFFFF?text=Manga+Collection",
    date: "March 17, 2023",
    category: "Manga"
  },
  {
    id: 6,
    title: "Why Are Children So Obsessed With Manga",
    coverImage: "https://placehold.co/300x200/2C7A8C/FFFFFF?text=Manga+Kids",
    date: "March 17, 2023",
    category: "Analysis"
  }
];

// Editor's picks for sidebar
const editorsPicks: Post[] = [
  {
    id: 7,
    title: "The Evolution of Isekai Anime",
    coverImage: "https://placehold.co/300x200/8C2C7A/FFFFFF?text=Isekai+Anime",
    date: "March 15, 2023",
    category: "Anime"
  },
  {
    id: 8,
    title: "Must-Read Manga of 2023",
    coverImage: "https://placehold.co/300x200/425A40/FFFFFF?text=2023+Manga",
    date: "March 14, 2023",
    category: "Manga"
  }
];

// Recent blog posts
const recentPosts: Post[] = [
  {
    id: 9,
    title: "The Rise of Seinen Manga in Western Markets",
    excerpt: "How mature manga is finding new audiences outside Japan...",
    coverImage: "https://placehold.co/600x400/7C1C1C/FFFFFF?text=Seinen+Manga",
    category: "Manga",
    date: "March 16, 2023",
    readTime: "8 min read"
  },
  {
    id: 10,
    title: "Anime Industry Report: Spring 2023",
    excerpt: "Breaking down the statistics and trends of this season's anime releases...",
    coverImage: "https://placehold.co/600x400/2C7A8C/FFFFFF?text=Anime+Stats",
    category: "Analysis",
    date: "March 15, 2023",
    readTime: "10 min read"
  },
  {
    id: 11,
    title: "Interview: Voice Actor Behind Popular Shonen Protagonist",
    excerpt: "An exclusive look into the life of voice acting for anime...",
    coverImage: "https://placehold.co/600x400/425A40/FFFFFF?text=Voice+Actor",
    category: "Interview",
    date: "March 14, 2023",
    readTime: "12 min read"
  },
  {
    id: 12,
    title: "Beginner's Guide to Light Novels",
    excerpt: "Everything you need to know to start your light novel journey...",
    coverImage: "https://placehold.co/600x400/8C2C7A/FFFFFF?text=Light+Novels",
    category: "Guides",
    date: "March 13, 2023",
    readTime: "9 min read"
  }
];

// Custom Badges for blog cards
const badgeMap: Record<string, { icon: JSX.Element; label: string; color: string }> = {
  'Hype': { icon: <Flame className="inline w-4 h-4 mr-1" />, label: 'Hype Alert', color: '#FF4B4B' },
  'S-Tier': { icon: <Star className="inline w-4 h-4 mr-1" />, label: 'S-tier', color: '#FFD700' },
  'Deep Dive': { icon: <Brain className="inline w-4 h-4 mr-1" />, label: 'Otaku Deep Dive', color: '#2C7A8C' },
  'Heartbreak': { icon: <HeartCrack className="inline w-4 h-4 mr-1" />, label: 'Heartbreak', color: '#E11D48' },
};

// Example: Add a badge property to some posts (for demo)
featuredPosts[0].badge = 'Hype';
featuredPosts[1].badge = 'S-Tier';
featuredPosts[2].badge = 'Heartbreak';
recentPosts[0].badge = 'Deep Dive';
recentPosts[1].badge = 'Hype';
recentPosts[2].badge = 'S-Tier';
recentPosts[3].badge = 'Heartbreak';

// Category Badge component
const CategoryBadge = ({ category }: { category: string }) => {
  const categoryObj = categories.find(c => c.name === category) || categories[0];
  
  return (
    <span 
      className="text-xs font-semibold px-2.5 py-0.5 rounded-full" 
      style={{ 
        backgroundColor: `${categoryObj.color}40`, // 40 = 25% opacity
        color: categoryObj.color,
        border: `1px solid ${categoryObj.color}80` // 80 = 50% opacity
      }}
    >
      {category}
    </span>
  );
};

// Category design type
type CategoryStyle = {
  gradient: string;
  borderGlow: string;
  icon: string;
  decorationClass: string;
};

type CategoryDesigns = {
  [key: string]: CategoryStyle;
};

// Category-specific design configurations
const categoryDesigns: CategoryDesigns = {
  "Anime": {
    gradient: "from-pink-500/20 to-purple-600/20",
    borderGlow: "rgba(236, 72, 153, 0.3)",
    icon: "🎬",
    decorationClass: "anime-card"
  },
  "Manga": {
    gradient: "from-blue-500/20 to-cyan-600/20",
    borderGlow: "rgba(59, 130, 246, 0.3)",
    icon: "📚",
    decorationClass: "manga-card"
  },
  "News": {
    gradient: "from-red-500/20 to-orange-600/20",
    borderGlow: "rgba(239, 68, 68, 0.3)",
    icon: "📰",
    decorationClass: "news-card"
  },
  "Guides": {
    gradient: "from-green-500/20 to-emerald-600/20",
    borderGlow: "rgba(16, 185, 129, 0.3)",
    icon: "🎮",
    decorationClass: "guide-card"
  },
  "VTuber": {
    gradient: "from-purple-500/20 to-pink-600/20",
    borderGlow: "rgba(168, 85, 247, 0.3)",
    icon: "🎭",
    decorationClass: "vtuber-card"
  },
  "Interview": {
    gradient: "from-yellow-500/20 to-amber-600/20",
    borderGlow: "rgba(245, 158, 11, 0.3)",
    icon: "🎙️",
    decorationClass: "interview-card"
  },
  "Analysis": {
    gradient: "from-indigo-500/20 to-blue-600/20",
    borderGlow: "rgba(99, 102, 241, 0.3)",
    icon: "🔍",
    decorationClass: "analysis-card"
  }
};

// Blog Post Card component
const BlogPostCard = ({ post, featured = false }: { post: Post, featured?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [reactions, setReactions] = useState({
    fire: 0,
    heart: 0,
    cry: 0,
    think: 0
  });

  const categoryStyle = categoryDesigns[post.category] || categoryDesigns["Anime"];

  return (
    <motion.div 
      className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${categoryStyle.gradient} backdrop-blur-sm border border-white/10 ${featured ? 'h-full' : ''}`}
      whileHover={{ 
        y: -5, 
        scale: 1.02,
        boxShadow: `0 10px 30px -15px ${categoryStyle.borderGlow}`,
        borderColor: `${categoryStyle.borderGlow}`
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Category-specific decoration */}
      <div className={`absolute -right-12 -top-12 w-24 h-24 opacity-10 rotate-12 ${categoryStyle.decorationClass}`}>
        <span className="text-4xl">{categoryStyle.icon}</span>
      </div>

      <div className="relative overflow-hidden aspect-video">
        <motion.img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <CategoryBadge category={post.category} />
          {post.badge && badgeMap[post.badge] && (
            <motion.span
              className="text-xs font-bold px-2 py-0.5 rounded-full flex items-center shadow-md"
              style={{
                background: `${badgeMap[post.badge].color}22`,
                color: badgeMap[post.badge].color,
                border: `1px solid ${badgeMap[post.badge].color}88`,
                textShadow: '0 1px 4px #0008',
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {badgeMap[post.badge].icon}{badgeMap[post.badge].label}
            </motion.span>
          )}
        </div>
      </div>

      <div className="p-5">
        <motion.h3 
          className="text-xl font-bold text-white mb-2 line-clamp-2 font-otaku-header group-hover:text-glow"
          animate={isHovered ? { textShadow: `0 0 8px ${categoryStyle.borderGlow}` } : {}}
        >
          {post.title}
        </motion.h3>
        {post.excerpt && (
          <p className="text-white/70 mb-4 line-clamp-2 group-hover:text-white/90 transition-colors">
            {post.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-white/50">
          <span className="flex items-center gap-2">
          <span>{post.date}</span>
          {post.readTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          )}
          </span>
        </div>

        {/* Reaction Bar */}
        <motion.div 
          className="mt-4 flex items-center gap-3 pt-3 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={isHovered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
        >
          <button 
            onClick={() => setReactions(r => ({ ...r, fire: r.fire + 1 }))}
            className="reaction-btn"
          >
            <span>🔥 {reactions.fire}</span>
          </button>
          <button 
            onClick={() => setReactions(r => ({ ...r, heart: r.heart + 1 }))}
            className="reaction-btn"
          >
            <span>❤️ {reactions.heart}</span>
          </button>
          <button 
            onClick={() => setReactions(r => ({ ...r, cry: r.cry + 1 }))}
            className="reaction-btn"
          >
            <span>😭 {reactions.cry}</span>
          </button>
          <button 
            onClick={() => setReactions(r => ({ ...r, think: r.think + 1 }))}
            className="reaction-btn"
          >
            <span>🤔 {reactions.think}</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Small Post component for sidebar
const SmallPost = ({ post }: { post: Post }) => {
  return (
    <div className="flex gap-3 mb-4">
      <img 
        src={post.coverImage} 
        alt={post.title} 
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div>
        <h4 className="text-sm font-semibold text-white line-clamp-2">{post.title}</h4>
        <span className="text-xs text-white/50">{post.date}</span>
      </div>
    </div>
  );
};

// Hero background scenes for rotation
const heroBackgrounds = [
  {
    url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186",
    alt: "Neon-lit Tokyo street at night",
    caption: "Your Gateway to Anime Culture"
  },
  {
    url: "https://images.unsplash.com/photo-1553899017-4ff76981e169",
    alt: "Anime-style cherry blossoms",
    caption: "Where Stories Come to Life"
  },
  {
    url: "https://images.unsplash.com/photo-1580584126903-c17d41830450",
    alt: "Futuristic cityscape",
    caption: "Discover Your Next Obsession"
  },
  {
    url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    alt: "Temple at twilight",
    caption: "Escape into Another World"
  }
];

// Quick navigation links
const quickNavLinks = [
  { icon: "📰", label: "What's New", href: "#latest" },
  { icon: "🔥", label: "Trending", href: "#trending" },
  { icon: "🎤", label: "Interviews", href: "#interviews" },
  { icon: "💖", label: "Otaku Terms", href: "#terms" },
  { icon: "💻", label: "Submit Post", href: "#submit" }
];

// Main Blog Layout component
const BlogApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [showMascot, setShowMascot] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(false);

  // Background rotation effect
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((i) => (i + 1) % heroBackgrounds.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Mascot visibility control
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowMascot(scrollPosition < 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden relative text-white font-sans bg-[#0A0A0A]">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Cinematic Background with Enhanced Parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ 
            scale: 1,
            transition: { duration: 20, repeat: Infinity, repeatType: "reverse" }
          }}
        >
          {heroBackgrounds.map((bg, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentBgIndex === index ? 1 : 0,
                scale: currentBgIndex === index ? 1.05 : 1
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-neo-crimson/10 to-transparent mix-blend-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 5, repeat: Infinity }}
          />
          <img
                src={bg.url}
                alt={bg.alt}
                className="w-full h-full object-cover object-center"
                style={{ 
                  filter: 'brightness(0.3) contrast(1.2) saturate(0.8)',
                }}
              />
              {/* Modified Overlay Effects for smooth transition */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-transparent via-[#0A0A0A]/30 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 0.5 }}
              />
              <motion.div 
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(10,10,10,0.3)_100%)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.5 }}
              />
            </motion.div>
          ))}
          
          {/* Atmospheric Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/10 rounded-full"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: -20,
                  scale: Math.random() * 0.5 + 0.5,
                  opacity: Math.random() * 0.4 + 0.1
                }}
                animate={{
                  y: "120%",
                  opacity: 0
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5
                }}
              />
            ))}
        </div>
        </motion.div>

        {/* Animated Sakura Petals */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3"
              initial={{
                top: -20,
                left: `${Math.random() * 100}%`,
                rotate: 0,
                opacity: 0.8
              }}
              animate={{
                top: '120%',
                left: `${Math.random() * 100}%`,
                rotate: 360,
                opacity: 0
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            >
              <svg viewBox="0 0 24 24" className="w-full h-full text-pink-200/30">
                <path fill="currentColor" d="M12,1L8,5H11V14H13V5H16M12,23L16,19H13V10H11V19H8L12,23Z" />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Title with Enhanced Typography and Animation */}
            <motion.div
              className="relative mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <motion.h1 
                className="text-6xl md:text-8xl font-otaku-header font-extrabold text-white mb-12 relative z-10 text-shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1.2,
                  delay: 0.5,
                  ease: "easeOut" 
                }}
              >
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
                    <motion.span
                      className="inline-block"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      style={{
                        backgroundSize: "200% 200%",
                        backgroundImage: "linear-gradient(45deg, #ff3d71, #ffaa00, #ff3d71)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline-block"
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      オタク
                    </motion.span>
                    <span>ゾーン</span>
                  </span>
                  <motion.span 
                    className="absolute -inset-x-6 inset-y-0 bg-neo-crimson/30 blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </span>
              </motion.h1>

              {/* New Tagline with Japanese flavor */}
              <motion.div
                className="relative z-10 mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                <p className="text-xl md:text-3xl text-white/80 font-medium mb-4">
                  Enter the world of Japanese pop culture
                </p>
                <p className="text-lg md:text-xl text-white/60 mt-4">
                  あなたの冒険が始まります — Your adventure begins here
                </p>
              </motion.div>
            </motion.div>

            {/* Enhanced Tagline Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="inline-block relative mb-16"
            >
              <div className="px-8 py-4 rounded-full bg-gradient-to-r from-neo-crimson/30 to-neo-maroon/30 backdrop-blur-sm border border-white/20
                            hover:from-neo-crimson/40 hover:to-neo-maroon/40 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <span className="text-xl md:text-2xl font-otaku-brush bg-gradient-to-r from-pink-400 to-white bg-clip-text text-transparent">
                    Otaku Intelligence Hub
                  </span>
                  <motion.span 
                    className="text-pink-400 text-2xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    💖
                  </motion.span>
          </div>
        </div>
            </motion.div>

            {/* Dynamic Caption with Fade Effect */}
            <motion.div
              className="mt-8 mb-16 overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              <motion.p
                key={currentBgIndex}
                className="text-xl md:text-3xl text-white/90 font-medium max-w-2xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {heroBackgrounds[currentBgIndex].caption}
              </motion.p>
              
              {/* Anime Quote Section */}
              <motion.div
                className="mt-8 text-lg text-white/60 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
              >
                "A lesson without pain is meaningless."
                <span className="block text-sm mt-2 font-normal">— Fullmetal Alchemist</span>
              </motion.div>
            </motion.div>

            {/* Quick Navigation - Positioned higher in the hero section */}
            <motion.div
              className="mt-8 mb-36 flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2 }}
            >
              {quickNavLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 
                           hover:bg-gradient-to-r hover:from-neo-crimson/30 hover:to-neo-maroon/30 
                           hover:border-neo-crimson/40 relative overflow-hidden"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0px 10px 20px -10px rgba(124, 28, 28, 0.6)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2 + index * 0.1 }}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{link.icon}</span>
                    <span className="font-medium text-white text-lg">{link.label}</span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
      </div>
      
        {/* Sound Toggle */}
        <motion.button
          className="absolute top-24 right-8 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm 
                     border border-white/20 hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSoundOn(!isSoundOn)}
        >
          {isSoundOn ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18l-6-6H2V12h4l6-6z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </motion.button>

        {/* Zantaku-chan Welcome Message */}
        <motion.div
          className="absolute top-24 left-8 z-20"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.8, type: "spring" }}
        >
          <div className="relative">
            <motion.div 
              className="absolute -top-16 -right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 max-w-[200px]"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="relative">
                <p className="text-sm text-white">
                  ✨ Welcome back, senpai! Ready to dive into some anime goodness?
                </p>
                <div className="absolute -bottom-3 left-10 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-white/10 border-r-[10px] border-r-transparent"></div>
              </div>
            </motion.div>
            <div className="size-16 rounded-full bg-neo-crimson/20 backdrop-blur-md border-2 border-neo-crimson/40 flex items-center justify-center overflow-hidden">
              <motion.span 
                className="text-3xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🌸
              </motion.span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced transitional element - Connect hero to content directly */}
      <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-b from-transparent to-[#0A0A0A] z-10 pointer-events-none" />
      
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-2 sm:top-4 inset-x-0 mx-auto max-w-[95%] sm:max-w-2xl bg-neo-black/50 backdrop-blur-md rounded-full border border-white/20 p-1 sm:p-2 flex items-center justify-between z-50"
      >
        {/* Left: Home icon */}
        <motion.a 
          href="/"
          className="flex items-center gap-1 px-3 sm:px-4 py-2 text-white rounded-full text-xs sm:text-sm focus:outline-none hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="font-medium">HOME</span>
        </motion.a>
        
        {/* Center: Logo (clicking will scroll to top) */}
        <div className="relative group cursor-pointer flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <svg
            className="w-10 h-10 sm:w-12 sm:h-12 text-white hover:text-neo-crimson transition-colors duration-300"
            viewBox="0 0 500 500"
          >
            <g fill="currentColor">
              <rect x="131.12" y="146.01" width="103.83" height="23.21"/>
              <rect x="131.12" y="185.1" width="103.83" height="23.21"/>
              <polygon points="267.93 146.01 268.23 169.22 343.15 169.22 366.97 146.01 267.93 146.01"/>
              <polygon points="267.93 185.1 329 185.1 328.37 381.31 305.79 356.01 305.79 208.31 267.93 208.31 267.93 185.1"/>
              <polygon points="241.06 90.97 241.06 387.05 263.04 409.03 263.04 114.19 241.06 90.97"/>
              <rect x="269.15" y="238.85" width="30.54" height="21.99"/>
              <polygon points="404.24 238.85 333.89 238.85 333.89 260.83 382.25 260.83 404.24 238.85"/>
              <polygon points="269.45 314.51 291.5 336.56 299.69 336.56 299.69 314.58 269.45 314.51"/>
              <polygon points="386.65 314.58 333.89 314.46 333.89 336.56 364.66 336.56 386.65 314.58"/>
              <polygon points="233.69 240.07 221.85 240.07 129.9 332.26 129.9 360.84 233.73 256.73 233.69 240.07"/>
              <polygon points="215.9 238.85 95.76 238.85 116.85 260.83 193.91 260.83 215.9 238.85"/>
              <polygon points="199.53 299.12 199.53 353.45 223.96 377.68 223.96 274.69 199.53 299.12"/>
            </g>
          </svg>
          <span className="ml-2 font-medium text-xs sm:text-sm bg-gradient-to-r from-neo-crimson to-white bg-clip-text text-transparent">BLOG</span>
        </div>
        
        {/* Right: Search button */}
        <motion.button 
          className="flex items-center gap-1 px-3 sm:px-4 py-2 text-white rounded-full text-xs sm:text-sm focus:outline-none hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline font-medium">Search</span>
        </motion.button>
      </motion.nav>

      <main className="relative mt-[-10vh]">
        {/* Modified Transition Section with better connection */}
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-transparent via-transparent to-transparent z-10 pointer-events-none">
          {/* Animated neon glow lines */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute h-px w-full top-1/3 bg-gradient-to-r from-transparent via-neo-crimson/40 to-transparent"
              animate={{
                opacity: [0.2, 0.6, 0.2],
                y: [0, 5, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute h-px w-full top-2/3 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
              animate={{
                opacity: [0.1, 0.5, 0.1],
                y: [0, -5, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </div>
        </div>
        
        {/* Immersive Animated Bridge Section */}
        <div className="relative w-full min-h-[50vh] overflow-hidden perspective-1000 mt-16">
          {/* Background effect layer */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#100C0C]"
            style={{
              backgroundImage: "radial-gradient(circle at 50% 50%, rgba(124, 28, 28, 0.15), transparent 80%)"
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          />

          {/* Center hero quote with dramatic animation */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="max-w-4xl px-6 text-center">
              <motion.div
                className="mb-10 overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true, margin: "-10%" }}
              >
                <motion.h2 
                  className="text-4xl md:text-5xl xl:text-6xl font-otaku-header text-white mb-6 leading-tight"
                  initial={{ y: 50 }}
                  whileInView={{ y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    type: "spring",
                    stiffness: 50
                  }}
                  viewport={{ once: true, margin: "-10%" }}
                >
                  <span className="bg-gradient-to-br from-white via-pink-100 to-white bg-clip-text text-transparent inline-block relative">
                    In the world of Zantaku, 
                    <motion.span
                      className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-transparent via-neo-crimson to-transparent w-full opacity-70"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      viewport={{ once: true }}
                    />
                  </span>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-2"
                  >
                    <span className="bg-gradient-to-r from-neo-crimson via-pink-400 to-neo-crimson bg-clip-text text-transparent relative inline-block">
                      knowledge is power, fandom is fire
                      <motion.span
                        className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-transparent via-pink-400 to-transparent w-full opacity-70"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                        viewport={{ once: true }}
                      />
                    </span>
                  </motion.div>
                </motion.h2>

                {/* Stylized divider */}
                <motion.div 
                  className="flex items-center justify-center gap-3 mt-8 mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="h-px bg-gradient-to-r from-transparent via-neo-crimson/70 to-transparent"
                    style={{ width: "40%" }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    viewport={{ once: true }}
                  />
                  <motion.div
                    className="relative w-12 h-12 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 1.2,
                      type: "spring",
                      stiffness: 100
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-neo-crimson/20 to-neo-maroon/20 rounded-full blur-md" />
                    <div className="absolute inset-0 border border-neo-crimson/40 rounded-full animate-pulse" />
                    <svg className="w-6 h-6 text-neo-crimson" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </motion.div>
                  <motion.div 
                    className="h-px bg-gradient-to-r from-transparent via-neo-crimson/70 to-transparent"
                    style={{ width: "40%" }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    viewport={{ once: true }}
                  />
                </motion.div>

                {/* Animated subtitle */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  viewport={{ once: true }}
                >
                  <p className="text-lg text-white/60 uppercase tracking-widest font-medium">
                    WELCOME TO THE ARCHIVES
                  </p>
                  <motion.div 
                    className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1"
                    initial={{ width: 0 }}
                    whileInView={{ width: 80 }}
                    transition={{ duration: 1, delay: 1.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-neo-crimson/60 to-transparent" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Floating content cards */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => {
              // Calculate varying sizes
              const size = 30 + Math.random() * 40;
              const isLeft = Math.random() > 0.5;
              
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-md shadow-xl overflow-hidden"
                  style={{
                    width: `${size}px`,
                    height: `${size * 1.4}px`,
                    transformStyle: "preserve-3d",
                    backgroundImage: `
                      linear-gradient(135deg, 
                      ${[
                        'rgba(124, 28, 28, 0.8)',
                        'rgba(62, 98, 87, 0.8)',
                        'rgba(44, 122, 140, 0.8)',
                        'rgba(66, 90, 64, 0.8)',
                        'rgba(140, 44, 122, 0.8)',
                        'rgba(83, 17, 17, 0.8)',
                        'rgba(83, 17, 17, 0.8)',
                        'rgba(124, 28, 28, 0.8)'
                      ][i % 8]}, rgba(10, 10, 10, 0.6))
                    `,
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    left: `${isLeft ? 5 + Math.random() * 20 : 75 + Math.random() * 20}%`,
                    top: `${Math.random() * 70 + 10}%`,
                    zIndex: Math.floor(Math.random() * 10) + 10
                  }}
                  initial={{
                    x: isLeft ? -100 : 100,
                    y: Math.random() * 100 - 50,
                    rotateX: Math.random() * 20 - 10,
                    rotateY: Math.random() * 20 - 10,
                    rotateZ: Math.random() * 10 - 5,
                    scale: 0.8,
                    opacity: 0
                  }}
                  whileInView={{
                    x: 0,
                    y: 0, 
                    rotateX: Math.random() * 10 - 5,
                    rotateY: Math.random() * 10 - 5,
                    rotateZ: Math.random() * 5 - 2.5,
                    scale: 1,
                    opacity: 0.6
                  }}
                  transition={{
                    duration: 1.2 + Math.random() * 0.8,
                    delay: 0.5 + i * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true, margin: "-20%" }}
                />
              );
            })}
          </div>

          {/* Enhanced sakura petals and other particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen">
            {/* Sakura petals */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`enhanced-petal-${i}`}
                className="absolute"
                style={{
                  width: `${8 + Math.random() * 8}px`,
                  height: `${8 + Math.random() * 8}px`,
                  filter: "blur(0.5px)"
                }}
                initial={{
                  left: `${Math.random() * 100}%`,
                  top: `${-10 - Math.random() * 10}%`,
                  rotate: 0,
                  scale: Math.random() * 0.5 + 0.5,
                  opacity: 0.8
                }}
                animate={{
                  top: `${100 + Math.random() * 20}%`,
                  left: `${Math.random() * 100}%`,
                  rotate: 360 * (Math.round(Math.random()) * 2 - 1), // Rotate either 360 or -360
                  opacity: 0
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  ease: "linear",
                  repeat: Infinity,
                  delay: Math.random() * 10
                }}
              >
                <svg viewBox="0 0 24 24" className="w-full h-full text-pink-300/40">
                  <path fill="currentColor" d="M12,1L8,5H11V14H13V5H16M12,23L16,19H13V10H11V19H8L12,23Z" />
                </svg>
              </motion.div>
            ))}

            {/* Glowing particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${1 + Math.random() * 3}px`,
                  height: `${1 + Math.random() * 3}px`,
                  background: [
                    'rgba(255, 255, 255, 0.6)',
                    'rgba(255, 200, 200, 0.6)',
                    'rgba(200, 200, 255, 0.6)',
                    'rgba(255, 200, 255, 0.6)'
                  ][Math.floor(Math.random() * 4)],
                  boxShadow: `0 0 ${3 + Math.random() * 5}px ${[
                    'rgba(255, 255, 255, 0.6)',
                    'rgba(255, 100, 100, 0.6)',
                    'rgba(100, 100, 255, 0.6)',
                    'rgba(255, 100, 255, 0.6)'
                  ][Math.floor(Math.random() * 4)]}`
                }}
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  scale: 0,
                  opacity: 0
                }}
                animate={{
                  scale: [0, 1, 0.5, 0],
                  opacity: [0, 0.8, 0.4, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 10,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Dynamic scroll indicator */}
          <motion.div 
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="text-white/80 text-sm font-medium mb-3 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.3)" }}
              transition={{ duration: 0.2 }}
            >
              <span className="mr-2">✨</span>
              <span>Scroll to Discover Treasures</span>
              <span className="ml-2">✨</span>
            </motion.div>
            <motion.div
              className="relative w-8 h-12 rounded-full border-2 border-white/20 flex justify-center"
              initial={{ y: 0 }}
              animate={{ 
                boxShadow: ["0 0 0px rgba(255,255,255,0.1)", "0 0 10px rgba(255,255,255,0.3)", "0 0 0px rgba(255,255,255,0.1)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1.5 h-3 bg-white/60 rounded-full mt-2"
                animate={{ y: [0, 4, 0], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Parallax star field for depth */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute rounded-full"
                style={{
                  width: Math.random() > 0.9 ? "2px" : "1px",
                  height: Math.random() > 0.9 ? "2px" : "1px",
                  backgroundColor: Math.random() > 0.9 ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.5)",
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.6 + 0.2
                }}
                animate={{
                  opacity: [
                    Math.random() * 0.2 + 0.1,
                    Math.random() * 0.5 + 0.5,
                    Math.random() * 0.2 + 0.1
                  ]
                }}
                transition={{
                  duration: 1 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 3
                }}
              />
            ))}
          </div>

          {/* Bottom gradient transition to content */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
        </div>

        {/* Content Container with Visual Continuity */}
        <div className="relative z-20 container mx-auto px-4 pt-24 pb-20">
          {/* Hero Section with fade-in animation for cards */}
        <section className="mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#531111]/30 to-[#0A0A0A]/30 rounded-2xl pointer-events-none"></div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="relative grid grid-cols-1 md:grid-cols-3 gap-6"
              >
            {featuredPosts.map((post, index) => (
                  <motion.div 
                    key={post.id} 
                    className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.2 + (index * 0.1),
                      ease: "easeOut"
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                <BlogPostCard post={post} featured={index === 0} />
                  </motion.div>
            ))}
              </motion.div>
            </motion.div>
        </section>

          {/* Categories with staggered animation */}
          <motion.section 
            className="mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {categories.map((category, index) => (
              <motion.button
                key={category.name}
                className="px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium backdrop-blur-sm"
                style={{ 
                  backgroundColor: `${category.color}20`,
                  border: `1px solid ${category.color}40`,
                  color: 'white'
                }}
                whileHover={{ 
                  backgroundColor: `${category.color}40`,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  viewport={{ once: true }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
          </motion.section>

          {/* Content + Sidebar with visual continuity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content with staggered animation */}
          <div className="lg:col-span-2">
              <motion.div 
                className="flex items-center justify-between mb-6"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
              <h2 className="text-2xl font-bold">Latest Articles</h2>
              <button className="text-sm text-white/70 hover:text-white flex items-center gap-1 transition-colors">
                View All <ArrowRight className="w-4 h-4" />
              </button>
              </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <BlogPostCard post={post} />
                  </motion.div>
              ))}
            </div>
          </div>
          
            {/* Sidebar with staggered animation */}
          <div>
            {/* Search Bar */}
              <motion.div 
                className="mb-8 bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
              <h3 className="text-xl font-bold mb-4">Search</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full py-2 px-4 pr-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-neo-crimson/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="w-5 h-5 text-white/50" />
                </button>
              </div>
              </motion.div>
            
            {/* Popular Posts */}
              <motion.div 
                className="mb-8 bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
              <h3 className="text-xl font-bold mb-4">Popular Posts</h3>
              <div>
                  {popularPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      <SmallPost post={post} />
                    </motion.div>
                ))}
              </div>
              </motion.div>
            
            {/* Editor's Picks */}
              <motion.div 
                className="mb-8 bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
              <h3 className="text-xl font-bold mb-4">Editor's Picks</h3>
              <div>
                  {editorsPicks.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      <SmallPost post={post} />
                    </motion.div>
                ))}
              </div>
              </motion.div>
            
            {/* Ad Space */}
              <motion.div 
                className="mb-8 bg-gradient-to-br from-neo-crimson/30 to-black rounded-xl p-1 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Your ads here</h3>
                <p className="text-white/70 text-sm mb-4">Reach our passionate anime & manga community</p>
                <motion.button
                  className="px-4 py-2 bg-neo-crimson text-white rounded-lg text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
                </motion.button>
              </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Newsletter Section with smoother transition */}
      <motion.section 
        className="relative py-16 bg-gradient-to-b from-[#181818] to-[#121212]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
              <p className="text-white/70">Get the latest anime and manga news delivered to your inbox</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 py-3 px-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-neo-crimson/50"
              />
              <motion.button
                className="py-3 px-6 bg-gradient-to-r from-neo-crimson to-neo-maroon text-white font-medium rounded-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Add FloatingMascot */}
      {showMascot && <FloatingMascot />}

      {/* Footer */}
      <footer className="bg-[#0A0A0A] py-12 relative">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-[#121212]/50 pointer-events-none"></div>
        
        {/* Logo and socials container */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img 
                src="/asset/zantakulogotest_64x64.webp" 
                alt="Zantaku Logo" 
                className="w-12 h-12 hover:opacity-80 transition-opacity duration-300"
              />
            </div>
            
            {/* Blog Categories */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href="#"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  {category.name}
                </a>
              ))}
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center gap-6 mb-8">
              <a 
                href="https://github.com/zantaku" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300 group"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-white group-hover:text-neo-crimson transition-colors duration-300" />
              </a>
              <a 
                href="https://www.instagram.com/zantaku_app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white group-hover:text-neo-crimson transition-colors duration-300" />
              </a>
              <a 
                href="https://x.com/zantaku_app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300 group"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5 text-white group-hover:text-neo-crimson transition-colors duration-300" />
              </a>
            </div>
            
            {/* Copyright */}
            <div className="text-center text-white/50 text-sm">
              <p>© {new Date().getFullYear()} Zantaku. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogApp;
