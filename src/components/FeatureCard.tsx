import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group"
    >
      {/* Glowing border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7C1C1C] via-[#FF6B6B] to-[#7C1C1C] rounded-2xl opacity-30 group-hover:opacity-60 transition-all duration-500 blur-sm"></div>
      
      {/* Main card */}
      <div className="relative bg-black/60 backdrop-blur-sm p-8 rounded-2xl border border-white/10 h-full flex flex-col items-center gap-6 text-center">
        {/* Icon with enhanced glow */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#7C1C1C]/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative p-4 bg-gradient-to-br from-[#7C1C1C] to-[#531111] rounded-full">
            <Icon size={32} className="text-white" />
          </div>
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold text-white group-hover:text-[#FF6B6B] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
          {description}
        </p>
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-[#7C1C1C] to-transparent rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </motion.div>
  );
}