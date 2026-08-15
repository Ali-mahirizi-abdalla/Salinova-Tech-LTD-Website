import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock, FaWhatsapp, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const FORMSPREE_ID = 'xyegeopl';

export const Contact = () => {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const contactItems = [
    { icon: <FaMapMarkerAlt />, title: 'Our Location', value: 'Nairobi & Kilifi County, Kenya' },
    { icon: <FaEnvelope />, title: 'Email Us', value: 'alimahrez744@gmail.com', href: 'mailto:alimahrez744@gmail.com' },
    { icon: <FaPhone />, title: 'Call Us', value: '+254 750 168 458', href: 'tel:+254750168458' },
    { icon: <FaClock />, title: 'Business Hours', value: 'Mon–Fri: 8:00 AM – 6:00 PM EAT' },
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="Contact Salinova Tech LTD — Book a Free Consultation"
        description="Get in touch with Salinova Tech LTD to discuss software development, cybersecurity, or training needs for your business in Kenya and East Africa."
        path="/contact"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Salinova Tech LTD',
          url: 'https://salinovatech.com/contact',
        }}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-navy text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <span className="inline-block text-gold font-bold text-xs uppercase tracking-widest mb-4 bg-gold/10 px-4 py-1.5 rounded-full border border-gold/30">
            Let's Build Together
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Book a Free Consultation
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium">
            Tell us about your project or training requirements. We'll respond within 24 hours with a clear roadmap and quotation.
          </p>
        </div>
      </section>

      <div className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Info (5 columns) */}
            <div className="lg:col-span-5">
              <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">DIRECT CHANNELS</span>
              <h2 className="text-3xl font-extrabold text-navy mb-6">Get in Touch</h2>
              
              <div className="space-y-4 mb-8">
                {contactItems.map(({ icon, title, value, href }) => (
                  <div key={title} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-navy text-gold flex items-center justify-center text-lg shrink-0 shadow-md">
                      {icon}
                    </div>
                    <div>
                      <h4 className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-0.5">{title}</h4>
                      {href ? (
                        <a href={href} className="text-navy font-bold text-base hover:text-gold transition-colors">{value}</a>
                      ) : (
                        <p className="text-navy font-bold text-base">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp Quick Chat */}
              <a
                href="https://wa.me/254750168458?text=Hello!%20I%20would%20like%20to%20book%20a%20free%20consultation%20with%20Salinova%20Tech%20LTD."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 transition-all mb-8 group"
              >
                <div className="flex items-center gap-3">
                  <FaWhatsapp size={24} />
                  <span>Chat With Us On WhatsApp</span>
                </div>
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Location Box */}
              <div className="w-full p-6 bg-white border border-slate-200 rounded-2xl flex items-center gap-4 text-slate-700 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center text-gold-dark shrink-0">
                  <FaMapMarkerAlt size={22} />
                </div>
                <div>
                  <h4 className="text-navy font-bold text-sm">Headquartered in Kenya</h4>
                  <p className="text-slate-500 text-xs mt-0.5">Serving clients across Nairobi, Kilifi, and the entire East African region.</p>
                </div>
              </div>
            </div>

            {/* Contact Form (7 columns) */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
                <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">SEND AN INQUIRY</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-6">How Can We Help You?</h2>

                {status === 'success' ? (
                  <div className="p-8 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-center flex flex-col items-center gap-3">
                    <FaCheckCircle size={48} className="text-emerald-600" />
                    <h3 className="text-2xl font-extrabold">Message Sent Successfully!</h3>
                    <p className="text-sm font-medium max-w-md">Thank you for reaching out to Salinova Tech LTD. Our engineering lead will review your request and get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-navy font-semibold placeholder-slate-400 focus:outline-none focus:border-gold focus:bg-white transition-all text-sm"
                          placeholder="e.g. Ali Abdalla"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-navy font-semibold placeholder-slate-400 focus:outline-none focus:border-gold focus:bg-white transition-all text-sm"
                          placeholder="e.g. alimahrez744@gmail.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-navy font-semibold placeholder-slate-400 focus:outline-none focus:border-gold focus:bg-white transition-all text-sm"
                          placeholder="+254 750 168 458"
                        />
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Area of Interest</label>
                        <select
                          id="service"
                          name="service"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-navy font-semibold focus:outline-none focus:border-gold focus:bg-white transition-all text-sm"
                        >
                          <option value="Software Development">Software Development</option>
                          <option value="Cybersecurity">Cybersecurity & Penetration Testing</option>
                          <option value="Academy Courses">Academy Courses & Training</option>
                          <option value="AI & Automation">AI & Intelligent Automation</option>
                          <option value="IT Consulting">General Enterprise IT Consulting</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Project Details or Inquiry *</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-navy font-medium placeholder-slate-400 focus:outline-none focus:border-gold focus:bg-white transition-all text-sm resize-none"
                        placeholder="Tell us about your project requirements, scope, or learning goals..."
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-red-600 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-200">
                        Something went wrong while submitting. Please message us directly via WhatsApp or email alimahrez744@gmail.com.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full bg-gold-gradient text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-gold/25 hover:brightness-110 transition-all text-base flex items-center justify-center gap-2"
                    >
                      <span>{status === 'sending' ? 'Sending Message...' : 'Send Message →'}</span>
                    </button>
                    
                    <p className="text-xs text-slate-500 text-center font-medium">
                      🔒 Your privacy is guaranteed. We never share your contact details.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
