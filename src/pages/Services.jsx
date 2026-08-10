import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useSEO } from '../hooks/useSEO';
import { FaLaptopCode, FaShieldAlt, FaGraduationCap, FaRobot, FaCheckCircle } from 'react-icons/fa';

const ServiceSection = ({ id, title, desc, features, ctaText, ctaLink, icon, reverse, imgSrc }) => {
  return (
    <section id={id} className="py-20 border-b border-teal/10 last:border-b-0 relative z-10">
      <div className={`container mx-auto px-6 lg:px-12 flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
        
        <motion.div 
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center text-teal mb-6">
            {icon}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
          <p className="text-text-muted text-lg mb-8 leading-relaxed">{desc}</p>
          <Button to={ctaLink} variant="primary">{ctaText}</Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: reverse ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 w-full flex flex-col gap-6"
        >
          {imgSrc && (
            <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-teal/20 relative group shadow-[0_0_20px_rgba(100,255,218,0.1)]">
              <div className="absolute inset-0 bg-navy/40 group-hover:bg-transparent transition-colors z-10 duration-500 pointer-events-none"></div>
              <img src={imgSrc} alt={title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
          )}
          <Card className="bg-navy-light shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Key Capabilities</h3>
            <ul className="space-y-4">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <FaCheckCircle className="text-teal mt-1 shrink-0" />
                  <span className="text-text-muted">{feature}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
        
      </div>
    </section>
  );
};

export const Services = () => {
  useSEO({
    title: 'Services — Custom Software, Cybersecurity & AI | Salinova Tech LTD',
    description:
      'Salinova Tech LTD offers web & mobile app development, penetration testing, cybersecurity audits, AI automation, and cloud services in Kenya and East Africa.',
    path: '/services',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Technology Services',
      provider: {
        '@type': 'Organization',
        name: 'Salinova Tech LTD',
      },
      areaServed: 'East Africa',
    },
  });

  return (
    <div>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[100px]"></div>
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Our <span className="text-teal">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto"
          >
            Comprehensive technology solutions designed for modern businesses.
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <ServiceSection 
        id="software"
        title="Software Development"
        desc="We build custom software that solves real problems. From responsive websites and mobile apps to complex enterprise systems and SaaS platforms, our development team delivers quality, security, and scalability."
        features={["Web & Mobile Development", "Enterprise Systems & ERP", "API Development & Integration", "Cloud Applications & SaaS"]}
        ctaText="Book a Consultation →"
        ctaLink="/contact"
        icon={<FaLaptopCode size={32} />}
        reverse={false}
      />
      
      <ServiceSection 
        id="cybersecurity"
        title="Cybersecurity"
        desc="In today's threat landscape, security is non-negotiable. Our cybersecurity team helps organizations identify vulnerabilities, protect sensitive data, and respond to incidents before they become crises."
        features={["Penetration Testing & Audits", "Vulnerability Assessments", "Security Awareness Training", "Incident Response & Forensics"]}
        ctaText="Request Security Audit →"
        ctaLink="/contact"
        icon={<FaShieldAlt size={32} />}
        reverse={true}
        imgSrc="/assets/services.png"
      />

      <ServiceSection 
        id="academy"
        title="Technology Academy"
        desc="Practical training for the digital economy. Our courses are project-based, mentor-led, and designed to get you job-ready. Whether you're a beginner or upskilling, we have a path for you."
        features={["Full-Stack Web Development (Python/Django)", "Mobile App Development (React Native)", "Cybersecurity & Ethical Hacking", "AI & Cloud Computing"]}
        ctaText="View Courses →"
        ctaLink="/academy"
        icon={<FaGraduationCap size={32} />}
        reverse={false}
      />

      <ServiceSection 
        id="ai"
        title="AI & Innovation"
        desc="We build AI-powered products and conduct research that solves African challenges. From smart assistants to predictive analytics, we're shaping the future of technology in Africa."
        features={["AI Assistants & Chatbots", "Predictive Analytics", "Blockchain Research", "IoT Solutions"]}
        ctaText="Explore AI Solutions →"
        ctaLink="/contact"
        icon={<FaRobot size={32} />}
        reverse={true}
      />

      {/* Final CTA */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <Card className="text-center p-12 bg-teal/5 border-teal/20 shadow-none">
            <h2 className="text-3xl font-bold text-white mb-4">Not sure what you need?</h2>
            <p className="text-text-muted mb-8 max-w-xl mx-auto">Schedule a free consultation with our technology experts to discuss your business challenges and potential solutions.</p>
            <Button to="/contact" variant="primary">Book Free Consultation →</Button>
          </Card>
        </div>
      </section>
    </div>
  );
};
