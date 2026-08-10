import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useSEO } from '../hooks/useSEO';
import { FaCheck, FaGraduationCap, FaCode, FaShieldAlt, FaBrain, FaStar } from 'react-icons/fa';

const AcademyPlan = ({ icon, title, duration, price, priceNote, features, highlight, level }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-col"
  >
    <Card className={`flex flex-col h-full relative ${highlight ? 'border-teal/50 shadow-[0_0_30px_rgba(100,255,218,0.15)]' : ''}`}>
      {highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal text-navy text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
          Most Popular
        </div>
      )}
      <div className="text-teal text-2xl mb-4">{icon}</div>
      <span className="text-xs font-bold uppercase tracking-widest text-text-muted mb-1">{level}</span>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-text-muted text-sm mb-6">{duration}</p>
      <div className="mb-6">
        <span className="text-4xl font-bold text-teal">{price}</span>
        <span className="text-text-muted text-sm ml-2">{priceNote}</span>
      </div>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
            <FaCheck className="text-teal mt-0.5 shrink-0" /> {f}
          </li>
        ))}
      </ul>
      <Button to="/contact" variant={highlight ? 'primary' : 'secondary'} className="w-full text-center">
        Book Free Consultation →
      </Button>
    </Card>
  </motion.div>
);

const BusinessPlan = ({ name, subtitle, price, priceNote, features, highlight }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-col"
  >
    <Card className={`flex flex-col h-full relative ${highlight ? 'border-teal/50 shadow-[0_0_30px_rgba(100,255,218,0.15)]' : ''}`}>
      {highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal text-navy text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
          Recommended
        </div>
      )}
      <div className="flex items-center gap-2 mb-2">
        {highlight && <FaStar className="text-teal" />}
        <h3 className="text-xl font-bold text-white">{name}</h3>
      </div>
      <p className="text-text-muted text-sm mb-4">{subtitle}</p>
      <div className="mb-6 pb-6 border-b border-teal/10">
        <span className="text-3xl font-bold text-teal">{price}</span>
        <span className="text-text-muted text-sm ml-2">{priceNote}</span>
      </div>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
            <FaCheck className="text-teal mt-0.5 shrink-0" /> {f}
          </li>
        ))}
      </ul>
      <Button to="/contact" variant={highlight ? 'primary' : 'secondary'} className="w-full text-center">
        Get a Custom Quote →
      </Button>
    </Card>
  </motion.div>
);

export const Pricing = () => {
  const [activeTab, setActiveTab] = useState('academy');

  useSEO({
    title: 'Pricing — Salinova Tech LTD Academy & Business Services',
    description:
      'Transparent pricing for Salinova Tech LTD courses and cybersecurity / software development services in Kenya and East Africa.',
    path: '/pricing',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Pricing',
      url: 'https://salinovatech.com/pricing',
      description: 'Pricing for Salinova Tech LTD courses and business services.',
    },
  });

  const academyCourses = [
    {
      icon: <FaCode />,
      title: 'Full-Stack Web Development',
      duration: '12 Weeks · 3 hrs/day',
      price: 'KSh 25,000',
      priceNote: 'per student',
      level: 'Beginner',
      highlight: false,
      features: [
        'Python, Django & REST APIs',
        'HTML, CSS & JavaScript',
        'PostgreSQL database design',
        'Git & version control',
        'Deploy to cloud platforms',
        'Project-based curriculum',
        'Certificate of completion',
      ],
    },
    {
      icon: <FaShieldAlt />,
      title: 'Cybersecurity & Ethical Hacking',
      duration: '12 Weeks · 3 hrs/day',
      price: 'KSh 30,000',
      priceNote: 'per student',
      level: 'Intermediate',
      highlight: true,
      features: [
        'Penetration testing fundamentals',
        'Kali Linux & Burp Suite',
        'Network security & protocols',
        'Web application security',
        'CTF challenges & labs',
        '1-on-1 mentor sessions',
        'Industry certification prep',
        'Job placement support',
      ],
    },
    {
      icon: <FaBrain />,
      title: 'AI & Machine Learning',
      duration: '12 Weeks · 3 hrs/day',
      price: 'KSh 35,000',
      priceNote: 'per student',
      level: 'Advanced',
      highlight: false,
      features: [
        'Python for data science',
        'Machine learning algorithms',
        'Neural networks & deep learning',
        'Natural language processing',
        'Real-world AI projects',
        'TensorFlow & scikit-learn',
        'Certificate of completion',
      ],
    },
  ];

  const businessPlans = [
    {
      name: 'Starter',
      subtitle: 'For small businesses and startups',
      price: 'KSh 50,000',
      priceNote: '/ project (estimate)',
      highlight: false,
      features: [
        'Landing page or simple web app',
        'Up to 5 pages / screens',
        'Mobile responsive design',
        'Basic SEO setup',
        'Contact form integration',
        '30-day post-launch support',
      ],
    },
    {
      name: 'Professional',
      subtitle: 'For growing businesses with complex needs',
      price: 'Custom Quote',
      priceNote: 'starting from KSh 150,000',
      highlight: true,
      features: [
        'Full custom software development',
        'Web & mobile applications',
        'Database design & API development',
        'User authentication & roles',
        'Third-party integrations',
        'Cybersecurity assessment included',
        '90-day post-launch support',
        'Monthly maintenance retainer',
      ],
    },
    {
      name: 'Enterprise',
      subtitle: 'For large organizations & government',
      price: 'Contact Us',
      priceNote: 'tailored SLA',
      highlight: false,
      features: [
        'Enterprise-scale system development',
        'Dedicated development team',
        'Penetration testing & compliance',
        'Cloud infrastructure setup',
        'Staff training & handover',
        '24/7 support & monitoring',
        'Annual security audit',
        'Priority SLA agreement',
      ],
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block text-teal text-sm font-bold uppercase tracking-widest mb-4">
            Transparent Pricing
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Simple, Fair <span className="text-teal">Pricing</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-text-muted max-w-2xl mx-auto mb-10">
            All prices are in Kenyan Shillings. Business service pricing is based on project scope — book a free consultation and we'll provide a custom quote within 24 hours.
          </motion.p>

          {/* Tab Switch */}
          <div className="inline-flex bg-navy-light rounded-xl p-1 border border-teal/10">
            <button
              onClick={() => setActiveTab('academy')}
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${activeTab === 'academy' ? 'bg-teal text-navy' : 'text-text-muted hover:text-white'}`}
            >
              <FaGraduationCap className="inline mr-2" /> Academy Courses
            </button>
            <button
              onClick={() => setActiveTab('business')}
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${activeTab === 'business' ? 'bg-teal text-navy' : 'text-text-muted hover:text-white'}`}
            >
              <FaCode className="inline mr-2" /> Business Services
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          {activeTab === 'academy' ? (
            <>
              <h2 className="text-2xl font-bold text-white text-center mb-4">Academy Course Pricing</h2>
              <p className="text-text-muted text-center mb-12 max-w-xl mx-auto">All courses include live sessions, mentorship, project reviews, and a certificate. Group discounts available for 5+ students.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mt-8">
                {academyCourses.map((c, i) => <AcademyPlan key={i} {...c} />)}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-white text-center mb-4">Business Service Pricing</h2>
              <p className="text-text-muted text-center mb-12 max-w-xl mx-auto">Every business is unique. These are starting points — book a free call and we'll scope your exact project within 24 hours.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mt-8">
                {businessPlans.map((p, i) => <BusinessPlan key={i} {...p} />)}
              </div>
            </>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-navy-light/30 border-t border-teal/10">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          {[
            { q: 'Do you offer payment plans?', a: 'Yes! We offer flexible installment plans for academy courses. Pay 50% upfront and the rest over the course duration.' },
            { q: 'Are there group discounts?', a: 'We offer 15% discount for groups of 5 or more from the same organization. Corporate packages are also available.' },
            { q: 'How long does a software project take?', a: 'Simple websites take 2–4 weeks. Full custom applications typically take 2–4 months depending on complexity.' },
            { q: 'Do you provide ongoing support after delivery?', a: 'All projects include a post-launch support period. We also offer monthly maintenance retainers for long-term clients.' },
          ].map(({ q, a }, i) => (
            <div key={i} className="mb-6 pb-6 border-b border-teal/10 last:border-0">
              <h3 className="text-white font-semibold mb-2">{q}</h3>
              <p className="text-text-muted">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Not sure which option is right for you?</h2>
          <p className="text-text-muted mb-8 max-w-xl mx-auto">Book a free 30-minute consultation. We'll understand your goals and recommend the best path forward.</p>
          <Button to="/contact" variant="primary" className="text-lg px-8 py-4">Book a Free Consultation →</Button>
        </div>
      </section>
    </div>
  );
};
