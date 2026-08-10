import React from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative p-2 rounded-full transition-all duration-300 flex items-center justify-center border ${
        isLight
          ? 'bg-slate-200 border-teal text-teal-800 hover:bg-slate-300'
          : 'bg-navy-light/80 border-teal/30 text-teal hover:bg-navy-light hover:border-teal'
      } ${className}`}
      aria-label="Toggle light/dark theme"
      title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
    >
      {isLight ? (
        <HiMoon className="w-5 h-5 text-teal-700 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <HiSun className="w-5 h-5 text-teal transition-transform duration-300 hover:rotate-90" />
      )}
    </button>
  );
};
