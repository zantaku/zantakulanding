import React, { ReactNode } from 'react';

interface SnapSectionProps {
  children: ReactNode;
  id: string;
  className?: string;
}

export function SnapSection({ children, id, className = '' }: SnapSectionProps) {
  return (
    <section 
      id={id}
      className={`snap-start snap-always min-h-screen max-h-screen h-screen w-full overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
} 