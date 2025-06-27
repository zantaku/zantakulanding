import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Twitter, MessageCircle, Mail, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Logo } from './Logo';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/zantaku', label: 'GitHub' },
    { icon: Twitter, href: 'https://x.com/zantaku_app', label: 'Twitter' },
    { icon: MessageCircle, href: 'https://discord.gg/Pm7KyBYdA5', label: 'Discord' },
    { icon: Send, href: 'https://t.me/zantakuapp', label: 'Telegram' },
    { icon: Mail, href: 'mailto:contact@zantaku.com', label: 'Email' }
  ];

  return (
    <footer className="relative bg-gradient-to-t from-[#0A0A0A] via-[#1A0A1A] to-transparent py-8 sm:py-12">
      {/* Background decoration - minimal */}
      <div className="absolute inset-0 opacity-5 hidden sm:block">
        <div className="absolute bottom-6 left-6 text-3xl font-bold text-[#7C1C1C] rotate-12">終</div>
        <div className="absolute top-6 right-6 text-2xl font-bold text-[#FF6B6B] -rotate-12">♡</div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Logo */}
          <div className="mb-6">
            <Logo size="large" showText={false} />
          </div>

          {/* Social links */}
          <div className="flex justify-center items-center flex-wrap gap-4 mb-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gradient-to-br from-[#7C1C1C]/20 to-[#FF6B6B]/20 border border-[#7C1C1C]/30 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:border-[#7C1C1C] transition-all duration-200"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-white/60 text-sm text-center">
            © {currentYear} All rights reserved. Made with{' '}
            <Heart className="inline w-4 h-4 text-[#FF6B6B] mx-1" />
            for the anime community.
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 