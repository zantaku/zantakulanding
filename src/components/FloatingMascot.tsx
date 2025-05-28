import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type MessageType = 'greeting' | 'fact' | 'news' | 'tip' | 'meme' | 'debate' | 'joke';

interface MascotMessage {
  text: string;
  type: MessageType;
}

// Mascot messages that rotate
const mascotMessages: MascotMessage[] = [
  { text: "Welcome to Zantaku! I'm Zantaku-chan! 👋", type: 'greeting' },
  { text: "Did you know? 'Otaku' originally meant 'your house' in Japanese! 🏠", type: 'fact' },
  { text: "New chapter of One Piece just dropped! 🏴‍☠️", type: 'news' },
  { text: "Remember to stay hydrated while binge-watching! 🥤", type: 'tip' },
  { text: "Watching anime with friends hits different! 🫂", type: 'meme' },
  { text: "Sub vs Dub? Why not both! 🎭", type: 'debate' },
  { text: "Time to touch some grass... after this episode! 🌱", type: 'joke' }
];

// Message type colors
const messageColors: Record<MessageType, string> = {
  greeting: 'from-pink-500 to-purple-500',
  fact: 'from-blue-500 to-cyan-500',
  news: 'from-red-500 to-orange-500',
  tip: 'from-green-500 to-emerald-500',
  meme: 'from-purple-500 to-pink-500',
  debate: 'from-yellow-500 to-amber-500',
  joke: 'from-indigo-500 to-blue-500'
};

export function FloatingMascot() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showMessage, setShowMessage] = useState(true);

  // Rotate messages
  useEffect(() => {
    const timer = setInterval(() => {
      setShowMessage(false);
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % mascotMessages.length);
        setShowMessage(true);
      }, 500);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const currentMessage = mascotMessages[messageIndex];

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 flex items-end gap-4"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Message Bubble */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className={`max-w-xs bg-gradient-to-r ${messageColors[currentMessage.type]} p-[1px] rounded-2xl shadow-lg`}
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-black/90 backdrop-blur-sm p-4 rounded-2xl">
              <p className="text-white text-sm">{currentMessage.text}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot */}
      <motion.div
        className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-[2px] cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          y: [0, -10, 0],
          rotate: isHovered ? [0, -5, 5, -5, 0] : 0
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          },
          rotate: {
            duration: 0.5,
            repeat: isHovered ? 3 : 0,
            repeatType: "reverse"
          }
        }}
      >
        <div className="w-full h-full bg-black rounded-full flex items-center justify-center overflow-hidden">
          {/* Replace with actual mascot image when available */}
          <span className="text-4xl select-none">🌸</span>
        </div>
      </motion.div>
    </motion.div>
  );
} 