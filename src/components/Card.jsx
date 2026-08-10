import React from 'react';
import { cn } from '../utils/cn';

export const Card = ({ children, className, ...props }) => {
  return (
    <div 
      className={cn(
        "bg-navy-light/80 backdrop-blur-md border border-teal/15 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal/10 hover:border-teal/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
