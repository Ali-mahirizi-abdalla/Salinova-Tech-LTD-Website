import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';

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
    { icon: <FaMapMarkerAlt />, title: 'Our Location', value: 'Kilifi County, Kenya' },
    { icon: <FaEnvelope />, title: 'Email Us', value: 'info@salinovatech.com', href: 'mailto:info@salinovatech.com' },
    { icon: <FaPhone />, title: 'Call Us', value: '+254 750 168 458', href: 'tel:+254750168458' },
    { icon: <FaClock />, title: 'Business Hours', value: 'Mon–Fri: 8:00 AM – 6:00 PM EAT' },
  ];

  return (
    <div className="py-20">
      <SEO {...{
    title: 'Contact Salinova Tech LTD — Book a Free Consultation',
    description:
      'Get in touch with Salinova Tech LTD to discuss software development, cybersecurity, or training needs for your business in Kenya and East Africa.',
    path: '/contact',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Salinova Tech LTD',
      url: 'https://salinovatech.com/contact',
    },
  }} />
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block text-teal text-sm font-bold uppercase tracking-widest mb-4">Let's Talk</span>
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">Book a Free Consultation</h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Tell us about your project or training needs. We'll respond within 24 hours with a tailored plan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-text mb-6">Get in Touch</h2>
            <div className="space-y-5 mb-10">
              {contactItems.map(({ icon, title, value, href }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center text-teal shrink-0">{icon}</div>
                  <div>
                    <h4 className="text-text font-medium mb-1">{title}</h4>
                    {href ? (
                      <a href={href} className="text-text-muted hover:text-teal transition-colors">{value}</a>
                    ) : (
                      <p className="text-text-muted">{value}</p>
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
              className="flex items-center gap-3 w-full px-6 py-4 bg-green-600/10 border border-green-500/30 rounded-xl text-green-400 font-semibold hover:bg-green-600/20 transition-colors mb-8"
            >
              <FaWhatsapp size={22} />
              Chat with us on WhatsApp
            </a>

            {/* Map Placeholder */}
            <div className="w-full h-52 bg-navy-light border border-teal/10 rounded-2xl flex flex-col items-center justify-center text-text-muted overflow-hidden">
              <FaMapMarkerAlt size={32} className="text-teal/50 mb-2" />
              <p className="text-sm">Kilifi County, Kenya</p>
              <p className="text-xs text-text-muted/60 mt-1">Google Maps will appear here</p>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <h2 className="text-2xl font-bold text-text mb-6">Send a Message</h2>

            {status === 'success' ? (
              <div className="p-6 bg-teal/10 border border-teal rounded-lg text-teal text-center flex flex-col items-center gap-3">
                <FaCheckCircle size={40} />
                <p className="text-xl font-bold">Message Sent!</p>
                <p className="text-sm">Thank you for reaching out. We will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-2">Full Name *</label>
                    <input type="text" id="name" name="name" required className="w-full bg-navy border border-teal/20 rounded-lg px-4 py-3 text-text placeholder-text-muted/50 focus:outline-none focus:border-teal transition-colors" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-2">Email Address *</label>
                    <input type="email" id="email" name="email" required className="w-full bg-navy border border-teal/20 rounded-lg px-4 py-3 text-text placeholder-text-muted/50 focus:outline-none focus:border-teal transition-colors" placeholder="jane@company.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text-muted mb-2">Phone Number</label>
                  <input type="tel" id="phone" name="phone" className="w-full bg-navy border border-teal/20 rounded-lg px-4 py-3 text-text placeholder-text-muted/50 focus:outline-none focus:border-teal transition-colors" placeholder="+254 XXX XXX XXX" />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-text-muted mb-2">Service of Interest</label>
                  <select id="service" name="service" className="w-full bg-navy border border-teal/20 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-teal transition-colors">
                    <option value="">Select a service...</option>
                    <option>Software Development</option>
                    <option>Cybersecurity</option>
                    <option>Academy / Training</option>
                    <option>AI Solutions</option>
                    <option>General Consultation</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-2">Message *</label>
                  <textarea id="message" name="message" required rows={5} className="w-full bg-navy border border-teal/20 rounded-lg px-4 py-3 text-text placeholder-text-muted/50 focus:outline-none focus:border-teal transition-colors resize-none" placeholder="Tell us about your project or what you need help with..." />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm">Something went wrong. Please try again or contact us via WhatsApp.</p>
                )}

                <Button type="submit" variant="primary" className="w-full" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Message →'}
                </Button>
                <p className="text-xs text-text-muted text-center">We respond within 24 hours on business days.</p>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
