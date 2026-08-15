import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { HiMenu, HiX, HiChevronDown, HiArrowRight } from 'react-icons/hi';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Desktop Dropdown Menu ─── */
const DropdownMenu = ({ label, items, currentPath }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = items.some((i) => currentPath === i.path);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1.5 text-sm font-bold transition-colors py-1 cursor-pointer select-none',
          isActive ? 'text-gold' : 'text-navy hover:text-gold'
        )}
        aria-expanded={open}
      >
        {label}
        <HiChevronDown className={cn('text-xs transition-transform duration-200', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 p-1.5"
          >
            {items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={cn(
                  'block px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors',
                  currentPath === item.path
                    ? 'text-gold bg-gold/10 font-bold'
                    : 'text-slate-700 hover:text-gold hover:bg-slate-50'
                )}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Main Navbar Component ─── */
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  /* --- Detect Scroll for Glassmorphism Background --- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* --- Close drawer automatically when route changes --- */
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  /* --- Lock background body scrolling when mobile menu is open --- */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /* --- Close menu on screen resize to desktop --- */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const primaryLinks = [
    { name: 'Home',       path: '/' },
    { name: 'Services',   path: '/services' },
    { name: 'Academy',    path: '/academy' },
    { name: 'Industries', path: '/industries' },
    { name: 'About Us',   path: '/about' },
    { name: 'Blog',       path: '/blog' },
    { name: 'Contact',    path: '/contact' },
  ];

  const moreLinks = [
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Pricing',      path: '/pricing' },
  ];

  const allLinks = [...primaryLinks, ...moreLinks];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 py-3'
          : 'bg-white/90 backdrop-blur-sm py-4 border-b border-slate-100'
      )}
    >
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
          <Logo size={36} className="transition-transform group-hover:scale-105" />
          <div className="flex flex-col justify-center">
            <span className="text-[15px] sm:text-[17px] font-extrabold text-navy tracking-wide leading-none">
              SALINOVA TECH LTD
            </span>
            <span className="text-[8px] sm:text-[10px] font-bold text-gold tracking-tight mt-0.5 uppercase">
              Building Skills. Creating Solutions.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center">
          {primaryLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-sm font-bold transition-colors whitespace-nowrap relative py-1',
                location.pathname === link.path ? 'text-gold' : 'text-navy hover:text-gold'
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full" />
              )}
            </Link>
          ))}
          <DropdownMenu label="More" items={moreLinks} currentPath={location.pathname} />
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center shrink-0">
          <Link
            to="/contact"
            className="bg-gold-gradient text-white font-bold text-sm py-2.5 px-5 rounded-xl hover:brightness-110 transition-all shadow-md shadow-gold/20 whitespace-nowrap flex items-center gap-2"
          >
            Book Consultation →
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="lg:hidden relative z-[10000] w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-navy text-2xl focus:outline-none hover:bg-gold/10 hover:text-gold active:scale-95 transition-all cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <HiX className="w-6 h-6 text-navy" /> : <HiMenu className="w-6 h-6 text-navy" />}
        </button>
      </div>

      {/* ─── Mobile Full-Screen Navigation Overlay Drawer ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-full h-screen bg-white z-[9999] flex flex-col lg:hidden"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-slate-100 shrink-0">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5">
                <Logo size={32} />
                <div className="flex flex-col">
                  <span className="text-base font-extrabold text-navy leading-none">SALINOVA TECH</span>
                  <span className="text-[9px] font-bold text-gold mt-0.5 uppercase">Creating Solutions</span>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-navy text-2xl focus:outline-none hover:bg-red-50 hover:text-red-500 active:scale-95 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <HiX className="w-6 h-6 text-navy" />
              </button>
            </div>

            {/* Drawer Navigation Links (Scrollable area) */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-1">
              {allLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-lg font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-between w-full',
                      isActive
                        ? 'text-gold bg-gold/10 font-extrabold'
                        : 'text-navy hover:bg-slate-50 active:bg-slate-100'
                    )}
                  >
                    <span>{link.name}</span>
                    <HiArrowRight className={cn('text-base transition-transform', isActive ? 'text-gold' : 'text-slate-400')} />
                  </Link>
                );
              })}
            </div>

            {/* Drawer Footer CTA */}
            <div className="p-5 sm:p-8 border-t border-slate-100 shrink-0 bg-slate-50/80">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-gold-gradient text-white font-bold text-base py-4 rounded-xl text-center shadow-lg shadow-gold/25 active:scale-[0.98] transition-all"
              >
                Book Free Consultation →
              </Link>
              <p className="text-center text-xs text-slate-500 font-medium mt-3">
                📞 Immediate Assistance:{' '}
                <a href="tel:+254750168458" className="text-gold font-bold hover:underline">
                  +254 750 168 458
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
