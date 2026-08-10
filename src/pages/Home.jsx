import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Link } from 'react-router-dom';
import { FaLaptopCode, FaShieldAlt, FaGraduationCap, FaRobot, FaMicroscope } from 'react-icons/fa';
import { InteractiveGlobe } from '../components/InteractiveGlobe';
import { useSEO } from '../hooks/useSEO';

// --- Helper Components ---

const TypingEffect = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (index >= words.length) return;

    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 1500);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-teal font-semibold">
      {words[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Counter = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{count}</span>;
};

const StatCard = ({ number, suffix, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="text-center p-8 bg-navy-light/40 backdrop-blur-sm rounded-2xl border border-teal/10 hover:border-teal/30 transition-colors">
      <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
        {isInView ? <Counter end={number} /> : "0"}<span className="text-teal">{suffix}</span>
      </h3>
      <p className="text-text-muted font-medium">{label}</p>
    </div>
  );
};

// --- Main Page ---

export const Home = () => {
  const typingWords = ["Software Development", "Cybersecurity", "AI Solutions", "Tech Training"];

  useSEO({
    title: 'Salinova Tech LTD — Software Development & Cybersecurity | Kenya',
    description:
      'Salinova Tech LTD is custom software development and cybersecurity consulting for businesses in Kenya and East Africa, combining practical technology education with enterprise-grade security solutions.',
    path: '/',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Salinova Tech LTD',
      url: 'https://salinovatech.com',
      logo: 'https://salinovatech.com/assets/logo.png',
      description: 'Custom software development and cybersecurity consulting for businesses in Kenya and East Africa.',
      address: { '@type': 'PostalAddress', addressLocality: 'Kilifi', addressCountry: 'KE' },
      contactPoint: { '@type': 'ContactPoint', email: 'info@salinovatech.com', contactType: 'customer service' },
    },
  });

  const services = [
    {
      icon: <FaLaptopCode size={32} className="text-teal mb-4" />,
      title: "Software Development",
      desc: "Websites, mobile apps, enterprise systems, and SaaS platforms",
      link: "/services#software"
    },
    {
      icon: <FaShieldAlt size={32} className="text-teal mb-4" />,
      title: "Cybersecurity",
      desc: "Penetration testing, vulnerability assessments, and security training",
      link: "/services#cybersecurity"
    },
    {
      icon: <FaGraduationCap size={32} className="text-teal mb-4" />,
      title: "Technology Academy",
      desc: "Practical courses in Python, React, Cybersecurity, AI, and more",
      link: "/academy"
    },
    {
      icon: <FaRobot size={32} className="text-teal mb-4" />,
      title: "Artificial Intelligence",
      desc: "AI assistants, chatbots, predictive analytics, and automation",
      link: "/services#ai"
    },
    {
      icon: <FaMicroscope size={32} className="text-teal mb-4" />,
      title: "Research & Innovation",
      desc: "Blockchain, IoT, smart cities, and digital identity solutions",
      link: "/services#research"
    }
  ];

  const testimonials = [
    {
      quote: "Salinova Tech transformed our hospital operations with a custom management system. Efficiency improved by 80%.",
      author: "Dr. Kamau",
      role: "Hospital Director"
    },
    {
      quote: "Their cybersecurity team uncovered vulnerabilities we didn't know existed. We're now fully compliant and secure.",
      author: "Sarah O.",
      role: "CEO, Regional Bank"
    },
    {
      quote: "The practical training at Salinova Academy changed my career. I went from beginner to employed developer in six months.",
      author: "Mary W.",
      role: "Graduate"
    }
  ];

  return (
    <div>
      {/* Split Hero Section */}
      <section className="min-h-[92vh] flex items-center relative overflow-hidden pt-24 pb-12">
        {/* Globe Background */}
        <div className="absolute inset-0 z-0">
          <InteractiveGlobe />
        </div>
        
        {/* Hero Grid Container */}
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Futuristic Sci-Fi Command HUD Panel */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 text-left relative z-10"
            >
              {/* Sci-Fi Futuristic Glass Container */}
              <div className="relative p-6 sm:p-10 rounded-3xl bg-[#0A192F]/85 backdrop-blur-xl border border-teal/30 shadow-[0_0_60px_rgba(0,255,220,0.18)] hover:border-teal/50 transition-all duration-500 overflow-hidden">
                
                {/* Cyber Corner Bracket Markers */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-teal" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-teal" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-teal" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-teal" />

                {/* Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-teal/80 mb-6 pb-4 border-b border-teal/15">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/10 border border-teal/30 text-teal font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
                    NEXT-GEN TECH PARTNER • v2.4
                  </span>
                  <span className="text-text-muted hidden sm:inline">LOC: KILIFI / NAIROBI, KE</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal via-teal-light to-white drop-shadow-[0_0_25px_rgba(100,255,218,0.4)]">
                    Building Skills.
                  </span>
                  <br />
                  Creating Solutions.
                </h1>
                
                <p className="text-base sm:text-lg text-text-muted mb-8 leading-relaxed font-normal max-w-2xl">
                  Salinova Tech LTD delivers custom enterprise software development and cybersecurity consulting in Kenya & East Africa, uniting hands-on technology education with battle-tested security engineering.
                </p>
                
                <div className="text-sm sm:text-base mb-8 font-mono bg-navy-light/70 p-3.5 rounded-xl border border-teal/20 flex flex-wrap items-center gap-2.5">
                  <span className="text-teal font-bold">➜</span>
                  <span className="text-white font-medium">Expertise in:</span>
                  <span className="text-teal font-bold"><TypingEffect words={typingWords} /></span>
                </div>

                {/* Futuristic Live Metrics Bar */}
                <div className="grid grid-cols-3 gap-3 mb-8 pt-1">
                  <div className="p-3 rounded-xl bg-navy/80 border border-teal/20 text-center">
                    <div className="text-teal font-bold text-base sm:text-lg">99.9%</div>
                    <div className="text-[10px] sm:text-[11px] text-text-muted font-mono">SYSTEM UPTIME</div>
                  </div>
                  <div className="p-3 rounded-xl bg-navy/80 border border-teal/20 text-center">
                    <div className="text-teal font-bold text-base sm:text-lg">ZERO</div>
                    <div className="text-[10px] sm:text-[11px] text-text-muted font-mono">TRUST SEC</div>
                  </div>
                  <div className="p-3 rounded-xl bg-navy/80 border border-teal/20 text-center">
                    <div className="text-orange font-bold text-base sm:text-lg">HUB</div>
                    <div className="text-[10px] sm:text-[11px] text-text-muted font-mono">EAST AFRICA</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button to="/contact" variant="primary" className="text-sm sm:text-base py-3 px-5">
                    Book Free Consultation →
                  </Button>
                  <Button to="/services" variant="secondary" className="text-sm sm:text-base py-3 px-5">
                    Explore Services →
                  </Button>
                  <Button to="/academy" variant="ghost" className="text-sm sm:text-base py-3 px-5">
                    Join Academy →
                  </Button>
                </div>

              </div>
            </motion.div>

            {/* Right Column: Space allocation for 3D Globe motion viewing */}
            <div className="lg:col-span-5 block h-[360px] sm:h-[420px] lg:h-[500px] pointer-events-none" />

          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-20 pointer-events-none"
        >
          <div className="w-[28px] h-[46px] rounded-full border-2 border-teal/40 flex justify-center p-2">
            <div className="w-1 h-2.5 bg-teal rounded-full animate-slide-up" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard number={150} suffix="+" label="Projects Completed" />
            <StatCard number={50} suffix="+" label="Clients Served" />
            <StatCard number={25} suffix="+" label="Team Members" />
            <StatCard number={10} suffix="K+" label="Students Trained" />
          </div>
        </div>
      </section>

      {/* Client Logos / Trusted By */}
      <section className="py-16 border-t border-b border-teal/10 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <p className="text-center text-text-muted text-sm uppercase tracking-widest mb-10">Trusted By Organisations Across East Africa</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-60 hover:opacity-100 transition-opacity duration-500">
            {[
              { initials: 'KH', name: 'Kilifi Hospital', color: 'text-teal' },
              { initials: 'SB', name: 'Savannah Bank', color: 'text-orange' },
              { initials: 'EK', name: 'EduKenya', color: 'text-teal' },
              { initials: 'TZ', name: 'TechStar Tz', color: 'text-orange' },
              { initials: 'CM', name: 'CareMax', color: 'text-teal' },
              { initials: 'FX', name: 'FinTech X', color: 'text-orange' },
            ].map(({ initials, name, color }) => (
              <div key={name} title={name} className="flex items-center gap-2 group cursor-default">
                <div className={`w-10 h-10 rounded-lg bg-navy-light border border-teal/15 flex items-center justify-center font-bold text-sm ${color}`}>{initials}</div>
                <span className="text-text-muted text-sm font-medium hidden md:block group-hover:text-white transition-colors">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-navy-light/30 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">End-to-End Technology Solutions</h2>
            <p className="text-text-muted text-lg">
              From custom software to enterprise security and tech education—we deliver results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className={idx === 3 ? "md:col-span-2 lg:col-span-1" : idx === 4 ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : ""}>
                {service.icon}
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-text-muted mb-6">{service.desc}</p>
                <Link to={service.link} className="text-teal font-medium hover:text-teal-light inline-flex items-center transition-colors">
                  Learn More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button to="/contact" variant="primary">Book a Free Consultation →</Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 text-center">What People Say</h2>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="min-w-[300px] md:min-w-[400px] snap-center shrink-0">
                <Card className="h-full flex flex-col justify-between border-t-4 border-t-teal">
                  <p className="text-text italic mb-8 text-lg">"{test.quote}"</p>
                  <div>
                    <h4 className="font-bold text-white">{test.author}</h4>
                    <span className="text-teal text-sm">{test.role}</span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-teal/20 to-navy-light/50 skew-y-3 transform origin-bottom-left -z-10"></div>
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Ready to build something great?</h2>
          <p className="text-text-muted text-lg mb-10 max-w-xl mx-auto">Book a free 30-minute consultation. No commitment — just a conversation about your goals.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button to="/contact" variant="primary" className="text-lg px-8 py-4">Book a Free Consultation →</Button>
            <Button to="/case-studies" variant="secondary">View Our Work →</Button>
          </div>
        </div>
      </section>
    </div>
  );
};
