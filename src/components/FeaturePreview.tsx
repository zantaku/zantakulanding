import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Compass, BookOpen, Gamepad2 } from 'lucide-react';

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
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/5 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="p-3 bg-zantaku-red/20 rounded-full mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/70 text-sm md:text-base">{description}</p>
    </motion.div>
  );
});

// Add display name for debugging
FeatureItem.displayName = 'FeatureItem';

// Reduced number of animation particles
const PARTICLE_COUNT = 3; // Reduced from 6

export function FeaturePreview() {
  // Generate particles only once on component mount
  const particles = React.useMemo(() => 
    [...Array(PARTICLE_COUNT)].map((_, i) => ({
      id: i,
      width: Math.random() * 30 + 10,
      height: Math.random() * 30 + 10,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    })), []);

  return (
    <section className="relative pt-20 md:pt-32 pb-24 px-4 md:px-8 bg-[#121212]">
      {/* Subtle top glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-zantaku-red/5 blur-[60px] rounded-full"></div>
      
      {/* Subtle animated particles - reduced count */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/5"
            style={{
              width: particle.width,
              height: particle.height,
              left: particle.left,
              top: particle.top,
              willChange: 'transform, opacity' // Add will-change for better performance
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay
            }}
          />
        ))}
      </div>
      
      <div className="relative max-w-6xl mx-auto">
        <motion.h2 
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Everything You Need in One Place
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <FeatureItem 
            icon={Compass}
            title="Discover"
            description="Explore your favorite anime and manga while discovering exciting new series tailored to your interests."
            delay={0.1}
          />
          <FeatureItem 
            icon={BookOpen}
            title="Read & Watch"
            description="Enjoy a seamless reading and watching experience with our curated collection. Premium content without premium pricing."
            delay={0.3}
          />
          <FeatureItem 
            icon={Gamepad2}
            title="Sync & Share"
            description="Connect with AniList to track your progress, showcase your collection, and discover what other fans are enjoying."
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
} 