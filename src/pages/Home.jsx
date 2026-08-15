import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import {
  FaShieldAlt, FaGraduationCap, FaCalendarAlt, FaArrowRight, FaCode, FaLock,
  FaBriefcase, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaHeartbeat, FaUniversity,
  FaLandmark, FaHandshake, FaBuilding, FaStar, FaQuoteLeft, FaChevronUp, FaCheckCircle
} from 'react-icons/fa';
import { SEO } from '../components/SEO';

/* ─── Helpers ─── */

const FadeIn = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

const Counter = ({ end, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const inc = end / (duration / 16);
    const timer = setInterval(() => {
      start += inc;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const useTypingAnimation = (words, speed = 100, pause = 2000) => {
  const [text, setText] = useState('');
  const [wIdx, setWIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const w = words[wIdx];
    let t;
    if (!del && cIdx < w.length) {
      t = setTimeout(() => { setText(w.substring(0, cIdx + 1)); setCIdx(cIdx + 1); }, speed);
    } else if (!del && cIdx === w.length) {
      t = setTimeout(() => setDel(true), pause);
    } else if (del && cIdx > 0) {
      t = setTimeout(() => { setText(w.substring(0, cIdx - 1)); setCIdx(cIdx - 1); }, speed / 2);
    } else if (del && cIdx === 0) {
      setDel(false);
      setWIdx((p) => (p + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [cIdx, del, wIdx, words, speed, pause]);

  return text;
};

/* ─── Main Page ─── */

export const Home = () => {
  const typedText = useTypingAnimation(
    ['Software Development', 'Cybersecurity Consulting', 'Tech Academy', 'AI & Cloud Solutions'], 80, 1800
  );

  /* Testimonial carousel */
  const [activeTesti, setActiveTesti] = useState(0);
  const testimonials = [
    { quote: 'Salinova Tech transformed our hospital operations with a custom management system. Efficiency improved by 80% with zero downtime.', author: 'Dr. Kamau', role: 'Hospital Director, Kilifi' },
    { quote: "Their cybersecurity team uncovered vulnerabilities we didn't know existed. We are now fully compliant and secure against modern threats.", author: 'Sarah O.', role: 'Chief Risk Officer, Regional Bank' },
    { quote: 'The practical training at Salinova Academy changed my career. I went from a complete beginner to an employed full-stack developer in six months.', author: 'Mary W.', role: 'Graduate & Software Engineer' },
  ];
  useEffect(() => {
    const iv = setInterval(() => setActiveTesti((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(iv);
  }, [testimonials.length]);

  /* Back to top */
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  /* Data */
  const services = [
    {
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      icon: <FaCode size={24} />,
      title: 'Software Development',
      badge: 'Custom Engineering',
      desc: 'Custom web, mobile and enterprise solutions tailored to your organization. Built with clean architecture, high security, and extreme scalability.',
      features: ['Web & Mobile Apps', 'Enterprise Systems & ERP', 'API Integration', 'Cloud SaaS Solutions'],
      link: '/services#software'
    },
    {
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      icon: <FaShieldAlt size={24} />,
      title: 'Cybersecurity Consulting',
      badge: 'Defensive & Offensive',
      desc: 'Proactive security assessments, penetration testing and regulatory compliance for modern businesses to protect your sensitive financial and customer data.',
      features: ['Penetration Testing', 'Vulnerability Audits', 'Security Training', 'Incident Response'],
      link: '/services#cybersecurity'
    },
    {
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      icon: <FaGraduationCap size={24} />,
      title: 'Tech Academy',
      badge: 'Career Acceleration',
      desc: 'Hands-on practical training in modern software engineering, cybersecurity, and AI. Project-based curriculum led by senior industry engineers.',
      features: ['Full-Stack Web Dev', 'Ethical Hacking', 'Mobile Development', 'AI & Machine Learning'],
      link: '/academy'
    },
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      icon: <FaBuilding size={24} />,
      title: 'IT Solutions for Industries',
      badge: 'Digital Transformation',
      desc: 'Industry-specific digital infrastructure to streamline operations, automate legacy workflows, and drive measurable business efficiency.',
      features: ['Healthcare & Hospitals', 'Banking & FinTech', 'Education & Schools', 'Government & NGOs'],
      link: '/industries'
    },
  ];

  const industries = [
    { icon: <FaGraduationCap size={28} />, title: 'Education', subtitle: 'Schools, Universities & Training' },
    { icon: <FaHeartbeat size={28} />, title: 'Healthcare', subtitle: 'Hospitals & Specialized Clinics' },
    { icon: <FaUniversity size={28} />, title: 'Banking & Finance', subtitle: 'Banks & Micro-Finance Institutions' },
    { icon: <FaLandmark size={28} />, title: 'Government & Public', subtitle: 'Ministries & Regional Agencies' },
    { icon: <FaHandshake size={28} />, title: 'NGOs & Nonprofits', subtitle: 'Community & Sustainable Dev' },
    { icon: <FaBriefcase size={28} />, title: 'SMEs & Enterprises', subtitle: 'High-Growth Businesses' },
  ];

  const blogPosts = [
    {
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      category: 'Cybersecurity',
      title: '5 Common Security Vulnerabilities in Kenyan Businesses',
      excerpt: 'Learn how to protect your organization from phishing, ransomware, and the most prevalent cyber threats in 2026.',
      date: 'August 10, 2026'
    },
    {
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      category: 'Development',
      title: 'Why Python & React Dominate Modern Enterprise Apps',
      excerpt: 'Discover why top tech companies in East Africa are standardizing their backend on Python and frontend on React/Next.js.',
      date: 'August 8, 2026'
    },
    {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      category: 'Tech Careers',
      title: 'How to Transition from Beginner to Employable Developer',
      excerpt: 'Practical step-by-step guidance on portfolio construction, coding challenges, and landing your first tech role.',
      date: 'August 5, 2026'
    },
  ];

  return (
    <div className="font-inter bg-white text-navy selection:bg-gold/20 selection:text-navy overflow-x-hidden w-full">
      <SEO
        title="Salinova Tech LTD — Software Development & Cybersecurity | Kenya"
        description="Salinova Tech LTD delivers custom enterprise software development, cybersecurity consulting, and technology training in Kenya & East Africa."
        path="/"
        schema={{ '@context': 'https://schema.org', '@type': 'Organization', name: 'Salinova Tech LTD', url: 'https://salinovatech.com' }}
      />

      {/* ══════════════════════════════════
          HERO — Wide Desktop Full View
          ══════════════════════════════════ */}
      <section className="min-h-[92vh] flex items-center relative overflow-hidden pt-28 sm:pt-32 pb-14 sm:pb-20 bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">

            {/* Left: Hero Copy (7 Cols) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 xl:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold-dark font-bold text-xs uppercase tracking-widest mb-4 sm:mb-6 shadow-sm">
                Next-Gen Technology Partner
              </div>

              <h1 className="text-[36px] sm:text-[50px] md:text-[60px] lg:text-[64px] xl:text-[72px] font-extrabold text-navy leading-[1.06] tracking-tight">
                Building Skills.
              </h1>
              <h1 className="text-[36px] sm:text-[50px] md:text-[60px] lg:text-[64px] xl:text-[72px] font-extrabold text-gold leading-[1.06] tracking-tight mt-1">
                Creating Solutions.
              </h1>

              {/* Typing Animation */}
              <div className="mt-4 sm:mt-5 h-[34px] sm:h-[40px] flex items-center justify-center lg:justify-start">
                <span className="text-slate-800 text-[16px] sm:text-[20px] md:text-[22px] font-bold">
                  Specialists in <span className="text-gold-dark border-b-2 border-gold pb-0.5">{typedText}</span>
                  <span className="animate-pulse ml-1 text-gold font-extrabold">|</span>
                </span>
              </div>

              <p className="text-slate-700 text-[15px] sm:text-[17px] md:text-[18px] leading-relaxed mt-5 sm:mt-6 max-w-[680px] font-medium">
                Salinova Tech LTD delivers custom enterprise software development and cybersecurity consulting in Kenya & East Africa, combining practical technology education with battle-tested security engineering.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8 sm:mt-10 w-full sm:w-auto">
                <Link
                  to="/contact"
                  className="bg-gold-gradient text-white font-bold text-[15px] py-4 px-8 rounded-xl hover:brightness-110 transition-all shadow-lg shadow-gold/25 flex items-center justify-center gap-2.5"
                >
                  <FaCalendarAlt className="text-sm shrink-0" />
                  <span>Book Free Consultation</span>
                </Link>
                <Link
                  to="/services"
                  className="border-2 border-navy text-navy font-bold text-[15px] py-4 px-8 rounded-xl hover:bg-navy hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Services</span>
                  <FaArrowRight className="text-xs shrink-0" />
                </Link>
              </div>
            </motion.div>

            {/* Right: Hero Image Container (5 Cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 xl:col-span-5 relative h-[320px] sm:h-[420px] md:h-[480px] lg:h-[540px] xl:h-[580px] group w-full"
            >
              <div className="w-full h-full rounded-3xl sm:rounded-[2.5rem] overflow-hidden relative shadow-2xl shadow-navy/15 border-2 border-gold/25 group-hover:border-gold/50 transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
                  alt="Salinova Tech Engineers collaborating"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/20 to-transparent"></div>
                
                {/* Floating Impact Stats Card */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xl">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { val: '500+', label: 'Students Trained' },
                      { val: '100+', label: 'Projects Delivered' },
                      { val: '10+', label: 'Industries Served' },
                      { val: '99%', label: 'Client Satisfaction' },
                    ].map((s, i) => (
                      <div key={i} className="text-center p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="text-gold-dark font-extrabold text-[16px] sm:text-[18px] leading-none">{s.val}</p>
                        <p className="text-slate-600 text-[11px] sm:text-[12px] font-bold mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Brand Watermark */}
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-navy/90 backdrop-blur-md rounded-xl px-3.5 py-2 flex items-center gap-2 border border-gold/30 shadow-md">
                  <Logo size={20} />
                  <span className="text-[10px] font-bold text-white tracking-widest uppercase">Salinova Tech</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust Highlights Bar */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-14 sm:mt-20 bg-navy rounded-2xl py-6 px-6 sm:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shadow-2xl border border-navy-light"
          >
            {[
              { icon: <FaShieldAlt size={22} />, title: 'Trusted Partner', sub: 'Across East Africa' },
              { icon: <FaGraduationCap size={22} />, title: 'Industry-Focused', sub: 'Practical Tech Training' },
              { icon: <FaCode size={22} />, title: 'Custom Solutions', sub: 'Built for High Growth' },
              { icon: <FaLock size={22} />, title: 'Security First', sub: 'Battle-Tested Engineering' },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shrink-0 group-hover:bg-gold group-hover:text-navy transition-all duration-300 shadow-md">
                  {c.icon}
                </div>
                <div>
                  <h4 className="text-white text-[15px] font-bold">{c.title}</h4>
                  <p className="text-gold-light text-[12px] font-medium">{c.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ STATS SECTION ══════════ */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-b border-slate-200">
        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <FadeIn className="text-center mb-12 sm:mb-16">
            <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">PROVEN TRACK RECORD</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy">Our Impact in Numbers</h2>
            <div className="w-[60px] h-[3px] bg-gold mx-auto mt-4 rounded-full"></div>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { n: 500, s: '+', l: 'Students Trained & Mentored' },
              { n: 100, s: '+', l: 'Software Projects Delivered' },
              { n: 10, s: '+', l: 'Industries Actively Served' },
              { n: 99, s: '%', l: 'Client Satisfaction Rate' },
            ].map((st, i) => (
              <FadeIn key={i} delay={i * 0.1} className="text-center bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
                <p className="text-gold-dark text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold leading-none">
                  <Counter end={st.n} suffix={st.s} />
                </p>
                <div className="w-[32px] h-[2px] bg-gold mx-auto my-3"></div>
                <p className="text-navy text-[14px] sm:text-[16px] font-bold">{st.l}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CORE SERVICES SECTION ══════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <FadeIn className="text-center mb-14 sm:mb-20">
            <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">WHAT WE DO</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy">Our Core Services</h2>
            <p className="text-slate-600 text-base sm:text-lg mt-4 max-w-2xl mx-auto leading-relaxed font-medium">
              From enterprise software and defensive cybersecurity to career-changing education, we build technology that drives measurable results.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {services.map((svc, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-gold/40 transition-all duration-300 h-full flex flex-col group hover:-translate-y-1.5">
                  {/* Image Header */}
                  <div className="h-56 sm:h-64 w-full relative overflow-hidden bg-navy-dark">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent pointer-events-none" />
                    
                    <span className="absolute top-4 left-4 bg-navy/90 backdrop-blur-md text-gold font-bold text-xs px-3.5 py-1.5 rounded-full border border-gold/30 shadow-md">
                      {svc.badge}
                    </span>

                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-gold text-navy flex items-center justify-center font-bold shadow-lg">
                      {svc.icon}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold text-navy mb-3 group-hover:text-gold-dark transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 flex-1 font-medium">
                      {svc.desc}
                    </p>

                    {/* Features list */}
                    <div className="mb-6 pt-4 border-t border-slate-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {svc.features.map((f, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
                            <FaCheckCircle className="text-gold shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      to={svc.link}
                      className="text-navy font-bold text-sm flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-all mt-auto"
                    >
                      <span>Explore Service Details</span>
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="text-center mt-12 sm:mt-16">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-gold-dark font-extrabold text-base sm:text-lg hover:text-navy transition-colors underline underline-offset-8"
            >
              <span>View All Solutions & Technical Capabilities</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ INDUSTRIES SECTION ══════════ */}
      <section className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200">
        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <FadeIn className="text-center mb-14 sm:mb-20">
            <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">CROSS-SECTOR IMPACT</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy">We Serve Industries Across Africa</h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mt-4 font-medium">
              Our engineering solutions are custom-built to address the regulatory, security, and scalability needs of each sector.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {industries.map((ind, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white border border-slate-200 rounded-2xl p-7 sm:p-8 text-center hover:border-gold hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-default group">
                  <div className="w-16 h-16 rounded-2xl bg-navy text-gold flex items-center justify-center text-2xl mx-auto mb-5 shadow-md group-hover:bg-gold group-hover:text-navy transition-colors">
                    {ind.icon}
                  </div>
                  <h3 className="text-navy text-lg sm:text-xl font-bold mb-1.5">{ind.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-semibold">{ind.subtitle}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="text-center mt-12">
            <Link to="/industries" className="inline-flex items-center gap-2 bg-navy text-white font-bold text-sm sm:text-base py-3.5 px-8 rounded-xl hover:bg-gold transition-colors shadow-md">
              <span>Explore Industry Solutions</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS SECTION ══════════ */}
      <section className="py-20 sm:py-28 bg-navy text-white relative overflow-hidden">
        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
          <FadeIn className="text-center mb-14 sm:mb-20">
            <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">TESTIMONIALS</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">What Our Partners & Students Say</h2>
          </FadeIn>

          <FadeIn>
            <div className="max-w-4xl mx-auto relative min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTesti}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="bg-navy-light border border-gold/30 rounded-3xl p-8 sm:p-12 text-center shadow-2xl"
                >
                  <FaQuoteLeft className="text-gold text-4xl mx-auto mb-6 opacity-80" />
                  <p className="text-white text-lg sm:text-xl leading-relaxed italic mb-8 font-normal">
                    "{testimonials[activeTesti].quote}"
                  </p>
                  <div className="flex justify-center gap-1.5 mb-4">
                    {[...Array(5)].map((_, i) => <FaStar key={i} className="text-gold text-base" />)}
                  </div>
                  <h4 className="text-white text-lg font-bold">{testimonials[activeTesti].author}</h4>
                  <p className="text-gold font-medium text-sm mt-0.5">{testimonials[activeTesti].role}</p>
                </motion.div>
              </AnimatePresence>

              {/* Dots navigation */}
              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTesti(i)}
                    className={`h-3 rounded-full transition-all ${
                      i === activeTesti ? 'w-8 bg-gold' : 'w-3 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ BLOG SECTION ══════════ */}
      <section className="py-20 sm:py-28 bg-white border-t border-slate-200">
        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <FadeIn className="text-center mb-14 sm:mb-20">
            <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">INSIGHTS & RESOURCES</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy">Latest Tech Articles</h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto mt-4 font-medium">
              Expert commentary and practical guides on software engineering, cybersecurity, and digital careers in Africa.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-2xl hover:border-gold/40 transition-all duration-300 flex flex-col h-full group">
                  <div className="h-52 w-full relative overflow-hidden bg-navy-dark">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <span className="absolute top-4 left-4 text-white text-xs font-bold bg-navy/90 backdrop-blur-md px-3 py-1 rounded-full border border-gold/30">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-gold-dark text-xs font-bold mb-2">{post.date}</span>
                    <h3 className="text-navy text-lg font-bold mb-3 group-hover:text-gold-dark transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 font-medium">
                      {post.excerpt}
                    </p>
                    <Link to="/blog" className="text-navy font-bold text-xs flex items-center gap-1 hover:text-gold transition-colors mt-auto uppercase tracking-wider">
                      <span>Read Full Article</span>
                      <FaArrowRight className="text-[10px]" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="text-center mt-12">
            <Link to="/blog" className="inline-flex items-center gap-2 text-gold-dark font-extrabold text-sm sm:text-base hover:text-navy transition-colors">
              <span>Explore All Insights & Tech Guides</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ CTA SECTION ══════════ */}
      <section className="py-20 sm:py-28 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/10 pointer-events-none" />
        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 text-center relative z-10">
          <FadeIn>
            <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-3">READY TO GET STARTED</span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Ready to bring your ideas to life?
            </h2>
            <p className="text-gold font-medium text-xl sm:text-2xl mt-4">Let's build the future together.</p>
          </FadeIn>

          <FadeIn delay={0.2} className="flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-10 mt-10 text-sm sm:text-base font-semibold">
            <a href="tel:+254750168458" className="flex items-center gap-3 text-white hover:text-gold transition-colors">
              <span className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold"><FaPhoneAlt size={13} /></span>
              <span>+254 750 168 458</span>
            </a>
            <a href="mailto:alimahrez744@gmail.com" className="flex items-center gap-3 text-white hover:text-gold transition-colors">
              <span className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold"><FaEnvelope size={13} /></span>
              <span>alimahrez744@gmail.com</span>
            </a>
            <span className="flex items-center gap-3 text-white">
              <span className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold"><FaMapMarkerAlt size={13} /></span>
              <span>Nairobi & Kilifi, Kenya</span>
            </span>
          </FadeIn>

          <FadeIn delay={0.3} className="mt-10">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2.5 bg-gold-gradient text-white font-bold text-base sm:text-lg py-4 px-12 rounded-xl hover:brightness-110 transition-all shadow-xl shadow-gold/25 w-full sm:w-auto">
              <span>Get In Touch</span>
              <FaArrowRight className="text-sm" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Back to top button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 w-12 h-12 bg-gold-gradient text-white rounded-full flex items-center justify-center shadow-lg shadow-gold/25 hover:brightness-110 transition-all z-50 cursor-pointer"
            aria-label="Back to top"
          >
            <FaChevronUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
