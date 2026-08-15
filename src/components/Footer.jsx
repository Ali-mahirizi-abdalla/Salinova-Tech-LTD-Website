import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { FaLinkedin, FaTwitter, FaYoutube, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-navy pt-12 sm:pt-16 pb-8 mt-auto font-inter">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-14">

        {/* Column 1: Brand */}
        <div>
          <Link to="/" className="flex items-center gap-3 mb-4 group">
            <Logo size={36} className="transition-transform group-hover:scale-105" />
            <div className="flex flex-col justify-center">
              <span className="text-[18px] font-bold text-gold tracking-wide leading-none">
                SALINOVA TECH LTD
              </span>
              <span className="text-[10px] font-medium text-white/80 tracking-tight mt-0.5 uppercase">
                Building Skills. Creating Solutions.
              </span>
            </div>
          </Link>
          <p className="text-white/70 text-[14px] leading-relaxed mb-6">
            Empowering businesses and individuals through technology, education, and innovation.
          </p>
          <div className="flex gap-4">
            {[
              { icon: <FaLinkedin size={18} />, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: <FaTwitter size={18} />, href: 'https://twitter.com', label: 'Twitter' },
              { icon: <FaYoutube size={18} />, href: 'https://youtube.com', label: 'YouTube' },
              { icon: <FaInstagram size={18} />, href: 'https://instagram.com', label: 'Instagram' },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gold hover:text-white transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-gold font-semibold text-[16px] mb-6">Quick Links</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[14px]">
            {[
              { label: 'Home', to: '/' },
              { label: 'About Us', to: '/about' },
              { label: 'Services', to: '/services' },
              { label: 'Blog', to: '/blog' },
              { label: 'Academy', to: '/academy' },
              { label: 'Contact', to: '/contact' },
              { label: 'Industries', to: '/industries' },
              { label: 'Careers', to: '/careers' },
            ].map(({ label, to }) => (
              <Link key={label} to={to} className="text-white/70 hover:text-gold transition-colors">{label}</Link>
            ))}
          </div>
        </div>

        {/* Column 3: Services */}
        <div>
          <h4 className="text-gold font-semibold text-[16px] mb-6">Our Services</h4>
          <ul className="space-y-3 text-[14px]">
            {[
              'Software Development', 'Cybersecurity Consulting', 'Tech Academy',
              'IT Solutions', 'AI & Automation', 'Cloud Solutions', 'DevOps', 'UI/UX Design',
            ].map((s) => (
              <li key={s}><Link to="/services" className="text-white/70 hover:text-gold transition-colors">{s}</Link></li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact + Newsletter */}
        <div>
          <h4 className="text-gold font-semibold text-[16px] mb-6">Get in Touch</h4>
          <ul className="space-y-3 text-[14px] text-white/70 mb-8">
            <li className="flex items-start gap-3"><FaMapMarkerAlt className="text-gold mt-0.5 shrink-0" /> Nairobi, Kenya</li>
            <li className="flex items-start gap-3"><FaPhoneAlt className="text-gold mt-0.5 shrink-0" /> <a href="tel:+254750168458" className="hover:text-gold transition-colors">+254 750 168 458</a></li>
            <li className="flex items-start gap-3"><FaEnvelope className="text-gold mt-0.5 shrink-0" /> <a href="mailto:alimahrez744@gmail.com" className="hover:text-gold transition-colors">alimahrez744@gmail.com</a></li>
            <li className="flex items-start gap-3"><FaClock className="text-gold mt-0.5 shrink-0" /> Mon-Fri: 8:00 AM – 6:00 PM EAT</li>
          </ul>
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-navy-light border border-gold/20 rounded-md px-4 py-2.5 text-white placeholder-white/40 text-[14px] focus:outline-none focus:border-gold transition-colors"
            />
            <button
              type="submit"
              className="bg-gold-gradient text-white font-semibold text-[14px] py-2.5 rounded-md hover:brightness-110 transition-all text-center"
            >
              Subscribe →
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-6 lg:px-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/50 text-[14px]">© 2026 Salinova Tech LTD. All rights reserved.</p>
        <div className="flex gap-4 text-[14px]">
          <Link to="/privacy" className="text-white/50 hover:text-gold transition-colors">Privacy Policy</Link>
          <span className="text-white/20">|</span>
          <Link to="/terms" className="text-white/50 hover:text-gold transition-colors">Terms of Service</Link>
          <span className="text-white/20">|</span>
          <Link to="/cookies" className="text-white/50 hover:text-gold transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};
