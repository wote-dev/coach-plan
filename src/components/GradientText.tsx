import React, { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export default function GradientText({
  children,
  className = '',
  colors = ['#ffaa40', '#9c40ff', '#ffaa40'],
  animationSpeed = 8
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(45deg, ${colors.join(', ')})`,
    backgroundSize: '300% 100%',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    animation: `gradient ${animationSpeed}s ease infinite`
  };

  return (
    <span
      className={`inline-block ${className}`}
      style={gradientStyle}
    >
      {children}
    </span>
  );
}
