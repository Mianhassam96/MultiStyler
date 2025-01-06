import React from 'react';

interface PreviewBoxProps {
  style: React.CSSProperties;
  shape: 'square' | 'circle' | 'text';
  text?: string;
  className?: string;
}

export function PreviewBox({ style, shape, text = 'MultiStyler', className = '' }: PreviewBoxProps) {
  const baseClasses = 'transition-all duration-200 transform-gpu';
  const shapeClasses = {
    square: 'w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg',
    circle: 'w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full',
    text: 'text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500'
  };

  return (
    <div 
      className={`${baseClasses} ${shapeClasses[shape]} ${className}`} 
      style={{
        ...style,
        backfaceVisibility: 'hidden'
      }}
    >
      {shape === 'text' && text}
    </div>
  );
}