import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { HiChevronDown } from 'react-icons/hi';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Desktop Dropdown ─── */
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
          'flex items-center gap-1 text-sm font-bold transition-colors py-1',
          isActive ? 'text-gold' : 'text-navy hover:text-gold'
        )}
      >
        {label}
        <HiChevronDown className={cn('text-xs transition-transform duration-200', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
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

/* ─── Animated Hamburger / X Icon ─── */
const HamburgerIcon = ({ isOpen }) => (
  <div className="w-5 h-4 relative flex flex-col justify-between">
    <span
      className={cn(
        'block h-[2px] w-full bg-current rounded-full transition-all duration-300 origin-center',
        isOpen ? 'translate-y-[7px] rotate-45' : ''
      )}
    />
    <span
      className={cn(
        'block h-[2px] w-full bg-current rounded-full transition-all duration-300',
        isOpen ? 'opacity-0 scale-x-0' : ''
      )}
    />
    <span
      className={cn(
        'block h-[2px] w-full bg-current rounded-full transition-all duration-300 origin-center',
        isOpen ? '-translate-y-[7px] -rotate-45' : ''
      )}
    />
  </div>
);

/* ─── Mobile Drawer Link ─── */
const MobileLink = ({ link, index, currentPath, onClick }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.25, delay: 0.05 + index * 0.04 }}
  >
    <Link
      to={link.path}
      className={cn(
        'text-lg font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-between group',
        currentPath === link.path
          ? 'text-gold bg-gold/10 font-extrabold'
          : 'text-navy hover:bg-slate-50 active:bg-slate-100'
      )}
      onClick={onClick}
    >
      <span>{link.name}</span>
      <span
        className={cn(
          'text-sm transition-transform duration-200 group-hover:translate-x-1',
          currentPath === link.path ? 'text-gold' : 'text-slate-400'
        )}
      >
        →
      </span>
    </Link>
  </motion.div>
);

/* ─── Main Navbar ─── */
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const drawerRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const firstFocusableRef = useRef(null);

  /* --- Scroll detection --- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* --- Close on route change --- */
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  /* --- Lock body scroll when drawer is open --- */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  /* --- Close on Escape key --- */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  /* --- Focus trap: return focus to hamburger button --- */
  const hamburgerRef = useRef(null);
  useEffect(() => {
    if (!isOpen && hamburgerRef.current) {
      hamburgerRef.current.focus();
    }
  }, [isOpen]);

  /* --- Swipe-to-close gesture (swipe up) --- */
  const handleTouchStart = useCallback((e) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }, []);

  const handleTouchEnd = useCallback((e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    // Swipe up (> 80px vertical, mostly vertical) closes the drawer
    if (deltaY < -80 && Math.abs(deltaX) < Math.abs(deltaY)) {
      setIsOpen(false);
    }
  }, []);

  /* --- Close on window resize past breakpoint --- */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

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
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 py-2 sm:py-3'
          : 'bg-white/90 backdrop-blur-sm py-3 sm:py-4 border-b border-slate-100'
      )}
    >
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group">
          <Logo size={scrolled ? 30 : 36} className="transition-all duration-300 group-hover:scale-105" />
          <div className="flex flex-col justify-center">
            <span className="text-[14px] sm:text-[15px] md:text-[17px] font-extrabold text-navy tracking-wide leading-none">
              SALINOVA TECH LTD
            </span>
            <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-gold tracking-tight mt-0.5 uppercase">
              Building Skills. Creating Solutions.
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center">
          {primaryLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-sm font-bold transition-colors whitespace-nowrap relative group',
                location.pathname === link.path ? 'text-gold' : 'text-navy hover:text-gold'
              )}
            >
              {link.name}
              {/* Active underline indicator */}
              <span
                className={cn(
                  'absolute -bottom-1 left-0 h-0.5 bg-gold rounded-full transition-all duration-300',
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                )}
              />
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

        {/* Mobile Hamburger Button */}
        <button
          ref={hamburgerRef}
          className={cn(
            'lg:hidden w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
            isOpen
              ? 'bg-gold/10 text-gold'
              : 'bg-slate-100 text-navy hover:bg-gold/10 hover:text-gold active:scale-95'
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-drawer"
        >
          <HamburgerIcon isOpen={isOpen} />
        </button>
      </div>

      {/* ─── Mobile Drawer ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[998] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <motion.nav
              ref={drawerRef}
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className={cn(
                'fixed inset-x-0 top-0 bg-white z-[999] flex flex-col lg:hidden',
                'max-h-[100dvh] overflow-y-auto overscroll-contain',
                'safe-area-inset'
              )}
              style={{
                paddingTop: 'env(safe-area-inset-top, 0px)',
                paddingBottom: 'env(safe-area-inset-bottom, 0px)',
              }}
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-100%' }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 shrink-0">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5"
                  ref={firstFocusableRef}
                >
                  <Logo size={30} />
                  <div className="flex flex-col">
                    <span className="text-[15px] sm:text-base font-extrabold text-navy leading-none">SALINOVA TECH</span>
                    <span className="text-[8px] sm:text-[9px] font-bold text-gold mt-0.5 uppercase">Creating Solutions</span>
                  </div>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-navy transition-colors hover:bg-red-50 hover:text-red-500 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                  aria-label="Close menu"
                >
                  <HamburgerIcon isOpen={true} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-1 px-4 sm:px-5 py-4 sm:py-5 flex-1 overflow-y-auto">
                {allLinks.map((link, i) => (
                  <MobileLink
                    key={link.name}
                    link={link}
                    index={i}
                    currentPath={location.pathname}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
              </div>

              {/* Drawer Footer CTA */}
              <motion.div
                className="px-5 sm:px-6 py-5 border-t border-slate-100 shrink-0 bg-slate-50/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Link
                  to="/contact"
                  className="block w-full bg-gold-gradient text-white font-bold text-base py-4 rounded-xl text-center shadow-lg shadow-gold/25 hover:brightness-110 active:scale-[0.98] transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Book Free Consultation →
                </Link>
                <p className="text-center text-xs text-slate-500 font-medium mt-3">
                  📞 Need immediate help? Call{' '}
                  <a
                    href="tel:+254750168458"
                    className="text-gold font-semibold hover:underline"
                  >
                    +254 750 168 458
                  </a>
                </p>
              </motion.div>

              {/* Swipe indicator pill */}
              <div className="flex justify-center pb-3 pt-1 shrink-0">
                <div className="w-10 h-1 rounded-full bg-slate-300" />
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
