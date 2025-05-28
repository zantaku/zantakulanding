import React from 'react';

interface NavButtonProps {
  icon: React.ElementType;
  text: string;
  onClick?: () => void;
}

export function NavButton({ icon: Icon, text, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 text-zantaku-cream/90 hover:text-zantaku-cream transition-colors duration-200 hover:bg-white/10 rounded-full text-xs sm:text-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-white/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-zantaku-red/0 via-zantaku-red/5 to-zantaku-red/0 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      <Icon size={18} className="flex-shrink-0 relative z-10" />
      <span className="hidden xxs:inline relative z-10">{text}</span>
    </button>
  );
} 