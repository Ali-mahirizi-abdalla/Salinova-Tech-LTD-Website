import React from 'react';
import { cn } from '../utils/cn';

export const Card = ({ children, className, ...props }) => {
  return (
    <div 
      className={cn(
        "bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gold/40 text-navy",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
