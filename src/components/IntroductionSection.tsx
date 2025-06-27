import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Zap } from 'lucide-react';

export function IntroductionSection() {

  return (
    <div className="relative h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A0A1A] to-[#7C1C1C]/20 flex flex-col justify-center items-center overflow-hidden">
      {/* Background decorations - reduced for mobile */}
      <div className="absolute inset-0 opacity-5 hidden sm:block">
        <div className="absolute top-10 left-10 text-3xl font-bold text-[#7C1C1C] rotate-12">愛</div>
        <div className="absolute bottom-16 right-16 text-2xl font-bold text-[#FF6B6B] -rotate-12">夢</div>
        <div className="absolute top-1/3 right-1/4 text-xl font-bold text-[#2C7A8C] rotate-45">心</div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-4 flex flex-col justify-center items-center h-full">
        {/* Compact Problem Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 sm:mb-6"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 leading-tight">
            Most anime fans are forced to choose between<br className="hidden sm:block" />
            <span className="text-[#FF6B6B]">piracy</span> or paying for <span className="text-[#FF6B6B]">5-10 different subscriptions</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/70 max-w-2xl mx-auto">
            Crunchyroll controls 75% of the market, raising concerns about accessibility and cultural gatekeeping.
          </p>
        </motion.div>

        {/* Compact Founder Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-[#7C1C1C]/20 to-[#FF6B6B]/20 backdrop-blur-sm border border-[#7C1C1C]/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 max-w-lg mx-auto"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#7C1C1C] to-[#FF6B6B] rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
              A
            </div>
            <div>
              <p className="text-white font-semibold text-sm sm:text-base">Ayodaza</p>
              <p className="text-white/60 text-xs">Founder of Zantaku</p>
            </div>
          </div>
          <p className="text-white/90 text-xs sm:text-sm italic leading-relaxed">
            "I created this app because I wanted my own platform where I can watch and read freely. No other apps let me do this."
          </p>
        </motion.div>

        {/* Compact Three Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-2xl"
        >
          <div className="text-center">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-[#FF6B6B] to-[#7C1C1C] rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
              <Heart className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
            </div>
            <h3 className="text-white font-semibold text-xs sm:text-sm mb-1">Born from Passion</h3>
            <p className="text-white/60 text-xs leading-tight">Made by fans, for fans</p>
          </div>
          
          <div className="text-center">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-[#2C7A8C] to-[#4A90A4] rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
              <Users className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
            </div>
            <h3 className="text-white font-semibold text-xs sm:text-sm mb-1">Community First</h3>
            <p className="text-white/60 text-xs leading-tight">Empowering otaku worldwide</p>
          </div>
          
          <div className="text-center">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
              <Zap className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
            </div>
            <h3 className="text-white font-semibold text-xs sm:text-sm mb-1">Cutting Edge</h3>
            <p className="text-white/60 text-xs leading-tight">API-native, zero extensions</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 