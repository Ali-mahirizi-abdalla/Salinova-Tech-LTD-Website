import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaYoutube, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-navy-light pt-16 pb-8 border-t border-teal/10 mt-auto">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

        {/* Brand */}
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-3 mb-4 group">
            <img
              src="/assets/logo-white.png"
              alt="Salinova Tech LTD Logo"
              className="h-9 w-auto object-contain"
            />
            <span className="text-lg font-bold text-text tracking-tight leading-none">
              SALINOVA<span className="text-teal ml-1">TECH LTD</span>
            </span>
          </Link>
          <p className="text-text-muted text-sm leading-relaxed mb-6">
            Building Skills. Creating Solutions. Custom software development and cybersecurity for businesses across Kenya and East Africa.
          </p>
          <div className="flex gap-3">
            {[
              { icon: <FaLinkedin size={16} />, href: 'https://www.linkedin.com/in/ali-mahirizi-abdalla-39869a349/', label: 'LinkedIn' },
              { icon: <FaTwitter size={16} />, href: 'https://x.com/MahrezAli', label: 'Twitter / X' },
              { icon: <FaYoutube size={16} />, href: '#', label: 'YouTube' },
              { icon: <FaInstagram size={16} />, href: 'https://www.instagram.com/salinovatech?igsh=NXkxNGxwcTk2dDNs', label: 'Instagram' },
              { icon: <FaWhatsapp size={16} />, href: 'https://wa.me/254750168458', label: 'WhatsApp' },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-navy border border-teal/15 flex items-center justify-center text-text-muted hover:text-teal hover:border-teal/50 transition-all"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-text font-semibold mb-5 uppercase text-xs tracking-widest">Services</h4>
          <ul className="space-y-3 text-sm">
            {[
              { label: 'Software Development', to: '/services#software' },
              { label: 'Cybersecurity', to: '/services#cybersecurity' },
              { label: 'AI & Innovation', to: '/services#ai' },
              { label: 'Industries', to: '/industries' },
              { label: 'Pricing', to: '/pricing' },
            ].map(({ label, to }) => (
              <li key={label}><Link to={to} className="text-text-muted hover:text-teal transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-text font-semibold mb-5 uppercase text-xs tracking-widest">Company</h4>
          <ul className="space-y-3 text-sm">
            {[
              { label: 'Academy', to: '/academy' },
              { label: 'Blog & Resources', to: '/blog' },
              { label: 'Case Studies', to: '/case-studies' },
              { label: 'About Us', to: '/about' },
              { label: 'Contact', to: '/contact' },
            ].map(({ label, to }) => (
              <li key={label}><Link to={to} className="text-text-muted hover:text-teal transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-text font-semibold mb-5 uppercase text-xs tracking-widest">Contact</h4>
          <ul className="space-y-3 text-text-muted text-sm">
            <li>📍 Kilifi County, Kenya</li>
            <li><a href="mailto:info@salinovatech.com" className="hover:text-teal transition-colors">📧 info@salinovatech.com</a></li>
            <li><a href="tel:+254750168458" className="hover:text-teal transition-colors">📞 +254 750 168 458</a></li>
            <li>🕐 Mon–Fri: 8:00 AM – 6:00 PM EAT</li>
          </ul>
          <div className="mt-6">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center w-full px-4 py-3 bg-teal/10 border border-teal/30 rounded-lg text-teal text-sm font-semibold hover:bg-teal/20 transition-colors text-center"
            >
              Book a Free Consultation →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container mx-auto px-6 lg:px-12 border-t border-teal/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-text-muted text-sm">
        <p>© 2026 Salinova Tech LTD. All rights reserved.</p>
        <div className="flex gap-6">

          <Link to="/contact" className="hover:text-teal transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};
