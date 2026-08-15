import React from 'react';
import { cn } from '../utils/cn';
import { Link } from 'react-router-dom';

export const Button = ({ children, variant = 'primary', className, to, onClick, type = 'button', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-5 py-2.5 font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all duration-300 ease-in-out focus:outline-none focus:ring-primary/50"
  const variants = {
    primary: "bg-primary text-navy font-bold hover:bg-primary-light shadow-[0_0_15px_rgba(201,168,76,0.3)] hover:shadow-[0_0_25px_rgba(201,168,76,0.5)]",
    secondary: "bg-transparent border border-primary text-primary hover:bg-primary/10",
    ghost: "bg-transparent text-text hover:bg-white/10"
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
