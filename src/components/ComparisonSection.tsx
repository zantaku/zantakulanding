import React, { useState, useEffect } from 'react';

const ComparisonSection: React.FC = () => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const platforms = [
    { 
      name: 'Our App', 
      tier: 'S',
      color: '#e74c3c',
      gradient: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500',
      score: 100,
      features: [
        '✅ Built-in reader',
        '✅ AniList sync', 
        '✅ API-powered',
        '✅ No extensions'
      ],
      reasoning: 'Complete experience—no extensions, no hacks, no compromise.'
    },
    { 
      name: 'Dantotsu', 
      tier: 'A',
      color: '#3498db',
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500',
      score: 80,
      features: [
        '✅ Anime + Manga + LN',
        '⚠️ Extension-based',
        '⚠️ Complex setup',
        '🔧 Tech-savvy required'
      ],
      reasoning: 'Has everything but requires technical knowledge and multiple extensions.'
    },
    { 
      name: 'Crunchyroll', 
      tier: 'B',
      color: '#f39c12',
      gradient: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500',
      score: 60,
      features: [
        '💰 Paid subscription',
        '❌ No manga/LN',
        '🌍 Region locked',
        '📺 Anime streaming'
      ],
      reasoning: 'Premium anime streaming but limited scope and expensive.'
    },
    { 
      name: 'Anilab', 
      tier: 'C',
      color: '#9b59b6',
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500',
      score: 40,
      features: [
        '📺 Anime only',
        '❌ No manga support',
        '❌ No light novels',
        '⚠️ Limited features'
      ],
      reasoning: 'Basic anime app with very limited functionality and scope.'
    }
  ];

  const getTierBg = (tier: string) => {
    switch (tier) {
      case 'S': return 'bg-yellow-500';
      case 'A': return 'bg-green-500';
      case 'B': return 'bg-blue-500';
      case 'C': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="h-full bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white relative overflow-hidden flex flex-col justify-center py-8 sm:py-12">
      {/* Animated background particles - reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full animate-pulse hidden sm:block"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Title Section */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 bg-clip-text text-transparent flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            🚀 Why <img src="/asset/zantakulogotest_32x32.webp" alt="Zantaku Logo" className="w-6 h-6 sm:w-8 sm:h-8" /> Leads the Pack
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-2">
            Our app gives you a complete experience—no extensions, no hacks, no compromise.
          </p>
        </div>

        {/* Horizontal Bar Chart */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {platforms.map((platform, index) => (
            <div
              key={platform.name}
              className={`transition-all duration-700 ${
                animateIn ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Platform Row */}
              <div className="flex items-center gap-2 sm:gap-4 mb-2">
                {/* Tier Badge */}
                <div className={`w-6 h-6 sm:w-8 sm:h-8 ${getTierBg(platform.tier)} rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0`}>
                  {platform.tier}
                </div>
                
                {/* Platform Name */}
                <div className="w-16 sm:w-24 text-right font-bold text-white flex-shrink-0 text-xs sm:text-base">
                  {platform.name}
                </div>
                
                {/* Progress Bar Container */}
                <div className="flex-1 relative">
                  <div className="w-full bg-gray-800 rounded-full h-6 sm:h-8 overflow-hidden">
                    {/* Animated Bar */}
                    <div 
                      className={`h-full bg-gradient-to-r ${platform.gradient} transition-all duration-1000 flex items-center justify-end pr-2 sm:pr-3 ${
                        platform.name === 'Our App' ? 'shadow-lg shadow-red-500/50' : ''
                      }`}
                      style={{ 
                        width: animateIn ? `${platform.score}%` : '0%',
                        transitionDelay: `${index * 150 + 300}ms`
                      }}
                    >
                      <span className="text-white font-bold text-xs sm:text-sm">
                        {platform.score}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Special Our App Glow */}
                  {platform.name === 'Our App' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full animate-pulse" />
                  )}
                </div>
              </div>
              
              {/* Features List - Mobile optimized */}
              <div className="ml-20 sm:ml-36 text-xs text-gray-400 mb-1 hidden sm:block">
                {platform.features.join(' • ')}
              </div>
              
              {/* Mobile Features List - Stacked */}
              <div className="ml-20 text-xs text-gray-400 mb-1 sm:hidden">
                <div className="grid grid-cols-2 gap-1">
                  {platform.features.map((feature, idx) => (
                    <div key={idx} className="truncate">{feature}</div>
                  ))}
                </div>
              </div>
              
              {/* Reasoning - Hidden on very small screens */}
              <div className="ml-20 sm:ml-36 text-xs text-gray-500 italic hidden md:block">
                {platform.reasoning}
              </div>
            </div>
          ))}
        </div>

        {/* API Native Callout */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-block bg-gradient-to-r from-red-600 via-red-500 to-pink-600 p-1 rounded-xl">
            <div className="bg-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg">
              <p className="text-base sm:text-lg font-bold">
                ⚡ <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                  100% API Native
                </span>
              </p>
              <p className="text-xs sm:text-sm text-gray-300">
                Built for Otaku, by Otaku
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default ComparisonSection; 