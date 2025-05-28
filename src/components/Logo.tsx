import React from 'react';
import { motion } from 'framer-motion';

export function Logo() {
  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <svg
        className="w-12 h-12 text-white transition-all duration-500 group-hover:text-zantaku-red"
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-zantaku-pink"
      >
      </motion.div>
    </motion.div>
  );
}

export function ToriiGate() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-64 h-64"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full text-zantaku-red">
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d="M20,80 L20,30 L40,20 L60,20 L80,30 L80,80 M10,30 L90,30 M10,25 L90,25"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}

export function TestimonialCard({ avatar, text, username }: { avatar: string; text: string; username: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-zantaku-black/50 p-6 rounded-xl backdrop-blur-sm border border-zantaku-red/20 hover:border-zantaku-red/50 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <img src={avatar} alt={username} className="w-12 h-12 rounded-full" />
        <div>
          <p className="text-zantaku-cream font-medium">{text}</p>
          <p className="text-zantaku-pink/80 text-sm">{username}</p>
        </div>
      </div>
    </motion.div>
  );
}