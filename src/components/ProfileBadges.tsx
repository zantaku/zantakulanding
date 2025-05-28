import React from 'react';
import { motion } from 'framer-motion';

interface BadgeConfig {
  id: string;
  icon: string;
  label: string;
  color: string;
  glow: string;
}

const BADGE_CONFIGS: Record<string, BadgeConfig> = {
  'owner': {
    id: 'owner',
    icon: '👑',
    label: 'Owner',
    color: '#FFD700',
    glow: 'rgba(255, 215, 0, 0.5)'
  },
  'staff': {
    id: 'staff',
    icon: '⚡',
    label: 'Staff',
    color: '#00BFFF',
    glow: 'rgba(0, 191, 255, 0.5)'
  },
  'verified': {
    id: 'verified',
    icon: '✓',
    label: 'Verified',
    color: '#50C878',
    glow: 'rgba(80, 200, 120, 0.5)'
  }
};

interface ProfileBadgesProps {
  badges: string[];
  className?: string;
}

export function ProfileBadges({ badges, className = '' }: ProfileBadgesProps) {
  return (
    <div className={`flex flex-wrap gap-2 justify-center ${className}`}>
      {badges.map((badgeId, index) => {
        const badge = BADGE_CONFIGS[badgeId.toLowerCase()];
        if (!badge) return null;

        return (
          <motion.div
            key={badge.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: index * 0.1
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            className="relative inline-flex items-center px-3 py-1.5 rounded-lg"
            style={{
              background: `linear-gradient(45deg, ${badge.color}15, ${badge.color}25)`,
              backdropFilter: 'blur(8px)',
              border: `1px solid ${badge.color}30`,
              boxShadow: `0 0 20px ${badge.glow}, inset 0 0 10px ${badge.glow}20`
            }}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-base relative">
                <span className="absolute -inset-1 blur-sm" style={{ color: badge.color }}>
                  {badge.icon}
                </span>
                <span className="relative" style={{ color: badge.color }}>
                  {badge.icon}
                </span>
              </span>
              <span 
                className="text-sm font-medium tracking-wide"
                style={{ 
                  color: badge.color,
                  textShadow: `0 0 10px ${badge.glow}`
                }}
              >
                {badge.label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
} 