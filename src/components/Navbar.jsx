import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { cn } from '../utils/cn';

const DropdownMenu = ({ label, items, currentPath }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = items.some(i => currentPath === i.path);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1 text-sm font-medium transition-colors',
          isActive ? 'text-teal' : 'text-text hover:text-teal'
        )}
      >
        {label}
        <HiChevronDown className={cn('text-xs transition-transform duration-200', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-navy-light border border-teal/15 rounded-xl shadow-xl overflow-hidden z-50">
          <div className="py-2">
            {items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={cn(
                  'block px-4 py-2.5 text-sm transition-colors',
                  currentPath === item.path
                    ? 'text-teal bg-teal/10'
                    : 'text-text-muted hover:text-teal hover:bg-teal/5'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Primary nav links shown inline
  const primaryLinks = [
    { name: 'Services',   path: '/services' },
    { name: 'Academy',    path: '/academy' },
    { name: 'Industries', path: '/industries' },
    { name: 'Blog',       path: '/blog' },
  ];

  // Secondary links inside "More" dropdown
  const moreLinks = [
    { name: 'About Us',     path: '/about' },
    { name: 'Pricing',      path: '/pricing' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Contact',      path: '/contact' },
  ];

  // All links for mobile drawer
  const allLinks = [...primaryLinks, ...moreLinks];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled
          ? 'bg-navy/90 backdrop-blur-md shadow-lg py-3 border-b border-teal/10'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <img
            src="/assets/logo-white.png"
            alt="Salinova Tech LTD"
            className="h-9 w-auto object-contain"
          />
          <span className="text-lg font-bold text-text tracking-tight leading-none whitespace-nowrap">
            SALINOVA<span className="text-teal ml-1">TECH</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7 flex-1 justify-center">
          {primaryLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors whitespace-nowrap',
                location.pathname === link.path ? 'text-teal' : 'text-text hover:text-teal'
              )}
            >
              {link.name}
            </Link>
          ))}

          <DropdownMenu
            label="More"
            items={moreLinks}
            currentPath={location.pathname}
          />
        </nav>

        {/* Desktop Actions (CTA + Theme Toggle) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <Button to="/contact" variant="primary" className="py-2 px-5 text-sm whitespace-nowrap">
            Book Consultation →
          </Button>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            className="text-teal text-2xl focus:outline-none shrink-0"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-navy border-t border-teal/10 shadow-xl py-6 flex flex-col items-center gap-5">
          {allLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-lg transition-colors',
                location.pathname === link.path ? 'text-teal font-semibold' : 'text-text hover:text-teal'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button to="/contact" variant="primary" className="w-4/5 text-center mt-2">
            Book Free Consultation →
          </Button>
        </div>
      )}
    </header>
  );
};
