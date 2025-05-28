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
      whileHover={{ scale: 1.02 }}
      className="bg-zantaku-black/50 p-6 rounded-xl backdrop-blur-sm border border-zantaku-red/20 hover:border-zantaku-red/50 transition-all duration-300 flex flex-col items-center gap-4 text-center"
    >
      <Icon size={32} className="text-zantaku-red" />
      <h3 className="text-zantaku-cream font-medium">{title}</h3>
      <p className="text-zantaku-cream/80 text-sm">{description}</p>
    </motion.div>
  );
}