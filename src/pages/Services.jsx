import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import { FaLaptopCode, FaShieldAlt, FaGraduationCap, FaRobot, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const ServiceSection = ({ id, title, desc, features, ctaText, ctaLink, icon, reverse, imgSrc }) => {
  return (
    <section id={id} className="py-20 border-b border-slate-200 last:border-b-0 relative z-10 bg-white">
      <div className={`container mx-auto px-6 lg:px-12 flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
        
        <motion.div 
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <div className="w-14 h-14 rounded-2xl bg-navy text-gold flex items-center justify-center text-2xl mb-6 shadow-md">
            {icon}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4 tracking-tight">{title}</h2>
          <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed font-medium">{desc}</p>
          <Button to={ctaLink} variant="primary" className="bg-gold-gradient text-white font-bold py-3 px-6 rounded-lg shadow-md shadow-gold/20 flex items-center gap-2">
            <span>{ctaText}</span>
            <FaArrowRight className="text-xs" />
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: reverse ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 w-full flex flex-col gap-6"
        >
          {imgSrc && (
            <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-slate-200 relative group shadow-xl">
              <img src={imgSrc} alt={title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter brightness-95" />
            </div>
          )}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-navy mb-4">Core Deliverables & Capabilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <FaCheckCircle className="text-gold mt-1 shrink-0" />
                  <span className="text-slate-800 text-sm font-semibold">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export const Services = () => {
  return (
    <div className="bg-white">
      <SEO
        title="Services — Custom Software, Cybersecurity & AI | Salinova Tech LTD"
        description="Salinova Tech LTD offers web & mobile app development, penetration testing, cybersecurity audits, AI automation, and cloud services in Kenya and East Africa."
        path="/services"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Technology Services',
          provider: {
            '@type': 'Organization',
            name: 'Salinova Tech LTD',
          },
          areaServed: 'East Africa',
        }}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-navy text-white relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
          <span className="inline-block text-gold font-bold text-xs uppercase tracking-widest mb-4 bg-gold/10 px-4 py-1.5 rounded-full border border-gold/30">
            Enterprise Solutions & Engineering
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Our <span className="text-gold">Services</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium">
            High-performance technology solutions engineered for growth, compliance, and resilience.
          </p>
        </div>
      </section>

      {/* Services List */}
      <ServiceSection 
        id="software"
        title="Software Development"
        desc="We build custom software that solves real problems. From responsive websites and mobile apps to complex enterprise ERPs and SaaS platforms, our engineering team delivers clean code, security, and scalability."
        features={["Web & Mobile App Development", "Enterprise Systems & ERP", "API Architecture & Integration", "Cloud SaaS Applications"]}
        ctaText="Book a Consultation"
        ctaLink="/contact"
        icon={<FaLaptopCode size={28} />}
        reverse={false}
        imgSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
      />
      
      <ServiceSection 
        id="cybersecurity"
        title="Cybersecurity Consulting"
        desc="In today's threat landscape, security is non-negotiable. Our cybersecurity team helps organizations identify vulnerabilities, protect critical infrastructure, and respond to incidents before they disrupt business operations."
        features={["Penetration Testing & Audits", "Vulnerability Assessments", "Security Awareness Training", "Incident Response & Forensics"]}
        ctaText="Request Security Audit"
        ctaLink="/contact"
        icon={<FaShieldAlt size={28} />}
        reverse={true}
        imgSrc="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
      />

      <ServiceSection 
        id="academy"
        title="Technology Academy"
        desc="Practical technology education for the modern workforce. Our courses are project-based, mentor-led, and designed to equip individuals and teams with high-income skills."
        features={["Full-Stack Web Dev (Python/React)", "Mobile App Development (React Native)", "Cybersecurity & Ethical Hacking", "AI & Machine Learning"]}
        ctaText="Explore Courses"
        ctaLink="/academy"
        icon={<FaGraduationCap size={28} />}
        reverse={false}
        imgSrc="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
      />

      <ServiceSection 
        id="ai"
        title="AI & Intelligent Automation"
        desc="We build custom AI-powered products that streamline operations. From specialized chatbots and predictive analytics to workflow automation, we unlock new efficiencies for your organization."
        features={["Custom AI Agents & Chatbots", "Predictive Analytics & Dashboards", "Workflow Automation", "Cloud Infrastructure Optimization"]}
        ctaText="Explore AI Solutions"
        ctaLink="/contact"
        icon={<FaRobot size={28} />}
        reverse={true}
        imgSrc="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
      />

      {/* Final CTA */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl border border-slate-200 shadow-xl">
            <h2 className="text-3xl font-extrabold text-navy mb-4">Not sure what you need?</h2>
            <p className="text-slate-600 mb-8 font-medium">Schedule a free 30-minute discovery call with our tech architects to assess your requirements and recommend the optimal solution.</p>
            <Button to="/contact" variant="primary" className="bg-gold-gradient text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-gold/25">
              Book Free Consultation →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
