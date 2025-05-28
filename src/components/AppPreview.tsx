import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';

export function AppPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-md mx-auto"
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-zantaku-red/30 to-zantaku-pink/30 blur-3xl rounded-full transform scale-150 opacity-30" />
      
      {/* Main Preview Container */}
      <div className="relative bg-gradient-to-br from-zantaku-red/10 to-zantaku-pink/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
        <div className="flex flex-col items-center gap-6">
          <motion.div
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <Smartphone className="w-16 h-16 text-zantaku-red" />
          </motion.div>

          <div className="text-center space-y-2">
            <p className="text-xl font-medium bg-gradient-to-r from-zantaku-red to-zantaku-pink bg-clip-text text-transparent">
              Experience manga your way
            </p>
            <p className="text-zantaku-cream/60">Coming soon to your world</p>
          </div>

          {/* Mock UI Preview */}
          <div className="w-full space-y-4">
            {/* Mock Navigation */}
            <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-zantaku-red/20" />
              <div className="space-x-2">
                {[1, 2, 3].map((i) => (
                  <motion.span
                    key={i}
                    className="inline-block w-2 h-2 rounded-full bg-zantaku-red/40"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ 
                      duration: 1.5,
                      delay: i * 0.2,
                      repeat: Infinity
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Mock Content Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="aspect-[3/4] rounded-lg bg-black/30 p-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-full h-full rounded bg-gradient-to-br from-zantaku-red/10 to-zantaku-pink/10" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}