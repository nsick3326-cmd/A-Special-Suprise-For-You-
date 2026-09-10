import React from 'react';

export const GlassCard = ({ children, className = '', hover = true, onClick, style }) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`glass-card rounded-3xl p-6 relative overflow-hidden transition-all duration-300 ${
        hover ? 'glass-card-hover cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
