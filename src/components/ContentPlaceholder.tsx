import React from 'react';

interface ContentPlaceholderProps {
  type?: 'text' | 'card' | 'list';
  className?: string;
  title?: string;
  lines?: number;
}

/**
 * A component that displays meaningful placeholder content
 * Used to ensure ad containers always have publisher content
 */
const ContentPlaceholder: React.FC<ContentPlaceholderProps> = ({
  type = 'text',
  className = '',
  title = 'Featured Resources',
  lines = 3,
}) => {
  const renderTextPlaceholder = () => {
    return (
      <div className={`content-placeholder ${className}`}>
        <h4 className="text-base font-medium mb-2 text-white/90">{title}</h4>
        {[...Array(lines)].map((_, i) => (
          <p key={i} className="text-sm text-white/70 mb-1.5">
            {i === 0 && "Check out our curated list of anime and manga resources to enhance your otaku experience."}
            {i === 1 && "Discover hidden gems and popular titles that match your unique taste."}
            {i === 2 && "Join our community to share recommendations and discuss your favorite series."}
          </p>
        ))}
        <div className="mt-3">
          <a 
            href="/explore" 
            className="text-sm font-medium text-[#7C1C1C] hover:underline"
          >
            Explore resources →
          </a>
        </div>
      </div>
    );
  };

  const renderCardPlaceholder = () => {
    return (
      <div className={`content-placeholder ${className}`}>
        <h4 className="text-base font-medium mb-3 text-white/90">{title}</h4>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              title: "Seasonal Picks",
              description: "Top anime this season"
            },
            {
              title: "Manga Spotlight",
              description: "Must-read series"
            }
          ].map((item, i) => (
            <div key={i} className="bg-[#1a1a1a] p-3 rounded-lg border border-white/10">
              <h5 className="text-sm font-medium text-white/90 mb-1">{item.title}</h5>
              <p className="text-xs text-white/60">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderListPlaceholder = () => {
    return (
      <div className={`content-placeholder ${className}`}>
        <h4 className="text-base font-medium mb-2 text-white/90">{title}</h4>
        <ul className="list-disc pl-5 space-y-1.5">
          {[
            "Discover new anime series based on your preferences",
            "Track your watch history and reading progress",
            "Connect with others who share your interests",
            "Get personalized recommendations"
          ].map((item, i) => (
            <li key={i} className="text-sm text-white/70">{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      {type === 'text' && renderTextPlaceholder()}
      {type === 'card' && renderCardPlaceholder()}
      {type === 'list' && renderListPlaceholder()}
    </>
  );
};

export default ContentPlaceholder; 