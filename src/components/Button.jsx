import React from 'react';
import { cn } from '../utils/cn';
import { Link } from 'react-router-dom';

export const Button = ({ children, variant = 'primary', className, to, onClick, type = 'button', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-5 py-2.5 font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal/50";
  const variants = {
    primary: "bg-teal text-navy hover:bg-teal-dark shadow-[0_0_15px_rgba(100,255,218,0.3)] hover:shadow-[0_0_25px_rgba(100,255,218,0.5)]",
    secondary: "bg-transparent border border-teal text-teal hover:bg-teal/10",
    ghost: "bg-transparent text-white hover:bg-white/10"
  };

  const classes = cn(baseStyles, variants[variant], className);

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
};
