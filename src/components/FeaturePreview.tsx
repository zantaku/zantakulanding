import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Compass, BookOpen, Gamepad2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FeatureItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

// Using memo to prevent unnecessary re-renders
const FeatureItem = memo(({ icon: Icon, title, description, delay }: FeatureItemProps) => {
  return (
    <motion.div 
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      {/* Glowing border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7C1C1C] via-[#FF6B6B] to-[#7C1C1C] rounded-2xl opacity-30 group-hover:opacity-60 transition-all duration-500 blur-sm"></div>
      
      {/* Main card */}
      <div className="relative bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full flex flex-col items-center text-center">
        {/* Icon container with enhanced glow */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#7C1C1C]/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative p-4 bg-gradient-to-br from-[#7C1C1C] to-[#531111] rounded-full">
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>
        
        {/* Content */}
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#FF6B6B] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-white/70 text-base leading-relaxed group-hover:text-white/90 transition-colors duration-300">
          {description}
        </p>
        
        {/* Subtle bottom accent */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-[#7C1C1C] to-transparent rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </motion.div>
  );
});

// Add display name for debugging
FeatureItem.displayName = 'FeatureItem';

// Reduced number of animation particles
const PARTICLE_COUNT = 4; // Reduced for better performance

export function FeaturePreview() {
  const { t } = useTranslation();
  
  // Generate particles only once on component mount
  const particles = React.useMemo(() => 
    [...Array(PARTICLE_COUNT)].map((_, i) => ({
      id: i,
      width: Math.random() * 40 + 20,
      height: Math.random() * 40 + 20,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 5
    })), []);

  return (
    <section className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-[#0A0A0A] via-[#1A0A1A] to-[#0A0A0A]">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7C1C1C]/5 via-transparent to-[#7C1C1C]/5 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-[#7C1C1C]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[#531111]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-2/3 right-1/6 w-24 h-24 bg-[#2C7A8C]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>
      
      {/* Enhanced animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-[#7C1C1C]/20 to-[#FF6B6B]/20 blur-sm"
            style={{
              width: particle.width,
              height: particle.height,
              left: particle.left,
              top: particle.top,
              willChange: 'transform, opacity'
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Enhanced title section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('features.everythingYouNeed')} <span className="bg-gradient-to-r from-[#7C1C1C] via-[#FF6B6B] to-[#7C1C1C] text-transparent bg-clip-text">{t('features.onePlace')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            {t('features.experienceTheFuture')}
          </p>
        </motion.div>
        
        {/* Enhanced feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <FeatureItem 
            icon={Compass}
            title={t('features.discover')}
            description={t('features.discoverDesc')}
            delay={0.1}
          />
          <FeatureItem 
            icon={BookOpen}
            title={t('features.readWatch')}
            description={t('features.readWatchDesc')}
            delay={0.3}
          />
          <FeatureItem 
            icon={Gamepad2}
            title={t('features.syncShare')}
            description={t('features.syncShareDesc')}
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
} 