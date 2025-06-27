import React from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Smartphone, 
  Download, 
  BookOpen, 
  Gamepad2, 
  Users, 
  Zap, 
  Brain, 
  Shield, 
  Palette 
} from 'lucide-react';


export function FeaturesSection() {

  const completedFeatures = [
    {
      icon: Smartphone,
      title: 'AniList Client with Syncing',
      description: 'Full AniList integration with syncing across all formats',
      status: 'complete'
    },
    {
      icon: Download,
      title: 'Anime App',
      description: 'Complete anime streaming and tracking application',
      status: 'complete'
    },
    {
      icon: BookOpen,
      title: 'Manga Reader & Webtoon Support',
      description: 'Built-in manga reader with full webtoon support',
      status: 'complete'
    },
    {
      icon: Gamepad2,
      title: 'Light Novel Support',
      description: 'Simple install light novel reading with clean interface',
      status: 'complete'
    }
  ];

  const comingSoonFeatures = [
    { icon: Brain, title: 'AI-Powered Recommendations', status: 'coming-soon' },
    { icon: Users, title: 'Social Features', status: 'coming-soon' },
    { icon: Download, title: 'Offline Mode', status: 'coming-soon' },
    { icon: Shield, title: 'Release Tracker', status: 'coming-soon' },
    { icon: Palette, title: 'Custom Profiles', status: 'coming-soon' },
    { icon: Zap, title: 'Gamification', status: 'coming-soon' }
  ];

  return (
    <div className="relative h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A0A1A] to-[#7C1C1C]/20 flex flex-col justify-center overflow-hidden">
      {/* Background decorations - minimal on mobile */}
      <div className="absolute inset-0 opacity-5 hidden sm:block">
        <div className="absolute top-16 right-16 text-2xl font-bold text-[#7C1C1C] rotate-12">機</div>
        <div className="absolute bottom-20 left-20 text-xl font-bold text-[#FF6B6B] -rotate-12">能</div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-4 flex flex-col justify-center h-full">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-3 sm:mb-4"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
            A <span className="bg-gradient-to-r from-[#7C1C1C] via-[#FF6B6B] to-[#7C1C1C] text-transparent bg-clip-text">Complete</span> Otaku Experience
          </h2>
          <p className="text-xs sm:text-sm text-white/70 max-w-2xl mx-auto">
            Everything you need in one place
          </p>
        </motion.div>

        {/* Core App Complete Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-3 sm:mb-4"
        >
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-2">
            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
            <span className="text-green-400 font-semibold text-xs sm:text-sm">CORE APP COMPLETE</span>
          </div>
        </motion.div>

        {/* Completed Features - Compact Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6 max-w-3xl mx-auto"
        >
          {completedFeatures.map((feature) => (
            <div
              key={feature.title}
              className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-sm border border-green-500/20 rounded-lg p-2 sm:p-3 hover:border-green-500/40 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <feature.icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 ml-auto" />
              </div>
              <h3 className="text-white font-semibold text-xs sm:text-sm mb-1 leading-tight">
                {feature.title}
              </h3>
              <p className="text-white/60 text-xs leading-tight">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>



        {/* Coming Soon Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mb-2 sm:mb-3"
        >
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full px-3 sm:px-4 py-1 flex items-center gap-1 sm:gap-2">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
            <span className="text-orange-400 font-semibold text-xs sm:text-sm">COMING SOON</span>
          </div>
        </motion.div>

        {/* Coming Soon Features - Compact Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2 max-w-4xl mx-auto"
        >
          {comingSoonFeatures.map((feature) => (
            <div
              key={feature.title}
              className="bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-sm border border-orange-500/20 rounded-lg p-2 sm:p-3 hover:border-orange-500/40 transition-all duration-300 text-center"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
                <feature.icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <h3 className="text-white font-semibold text-xs leading-tight">
                {feature.title}
              </h3>
            </div>
          ))}
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-3 sm:mt-4"
        >
          <div className="bg-gradient-to-r from-[#7C1C1C]/20 to-[#FF6B6B]/20 border border-[#7C1C1C]/30 rounded-lg p-2 sm:p-3 max-w-2xl mx-auto">
            <p className="text-white/80 text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF6B6B]" />
              More features being added regularly - join our Discord for updates!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 