import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useSEO } from '../hooks/useSEO';
import { FaUniversity, FaLandmark, FaHospital, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const industries = [
  {
    id: 'education',
    icon: <FaUniversity size={36} />,
    tag: 'Education',
    title: 'Technology Solutions for Schools & Universities',
    description:
      'Educational institutions face growing pressure to digitise administration, enhance remote learning, and protect student data. Salinova Tech LTD delivers purpose-built platforms for Kenya\'s education sector.',
    painPoints: [
      'Manual student records and paper-based administration',
      'No digital platform for online classes or assignments',
      'Cybersecurity threats targeting student and staff data',
      'Disconnected systems between finance, academics, and HR',
    ],
    solutions: [
      'Student Management Systems (SMS) — enrolment, grades, attendance',
      'Learning Management Systems (LMS) — online classes and assignments',
      'School finance and fee management portals',
      'Cybersecurity training for staff and students',
      'Data protection and GDPR/Kenya Data Protection Act compliance',
    ],
    caseStudy: 'A secondary school in Kilifi County reduced admin time by 70% after deploying our Student Management System.',
    image: '/assets/academy.png',
  },
  {
    id: 'banking',
    icon: <FaLandmark size={36} />,
    tag: 'Banking & Finance',
    title: 'Secure Digital Solutions for Financial Institutions',
    description:
      'Banks, SACCOs, microfinance institutions, and fintech startups require software that is both powerful and airtight from a security perspective. We specialise in financial technology with built-in compliance.',
    painPoints: [
      'Increasing cybersecurity threats targeting financial data',
      'Legacy core banking systems that cannot scale',
      'Manual loan processing and KYC workflows',
      'Regulatory compliance pressure (CBK, AML, KYC)',
    ],
    solutions: [
      'Core banking integration and API development',
      'Penetration testing and vulnerability assessments for banking systems',
      'Loan management and digital KYC workflows',
      'Mobile banking and USSD application development',
      'Anti-Money Laundering (AML) compliance tooling',
      'Incident response and security audit services',
    ],
    caseStudy: 'A regional SACCO reduced loan processing time from 5 days to 4 hours with our custom loan management system.',
    image: '/assets/dashboard.png',
  },
  {
    id: 'healthcare',
    icon: <FaHospital size={36} />,
    tag: 'Healthcare',
    title: 'Digital Health Platforms for Clinics & Hospitals',
    description:
      'Healthcare providers in Kenya and East Africa are moving towards digital patient records and telemedicine. We build HIPAA-aware systems that protect patient data while improving care delivery.',
    painPoints: [
      'Paper-based patient records and appointment books',
      'No system for tracking medications or lab results',
      'Patient data vulnerable to breaches and loss',
      'Disconnected communication between departments',
    ],
    solutions: [
      'Electronic Medical Records (EMR) systems',
      'Hospital Management Information Systems (HMIS)',
      'Patient appointment and telemedicine portals',
      'Laboratory information management systems',
      'Pharmacy and inventory management',
      'Healthcare cybersecurity audits and staff training',
    ],
    caseStudy: 'A clinic in Mombasa improved patient care efficiency by 80% after implementing our EMR and appointment system.',
    image: '/assets/services.png',
  },
];

const IndustrySection = ({ industry, reverse, index }) => (
  <section id={industry.id} className="py-20 border-b border-teal/10 last:border-0 relative z-10">
    <div className={`container mx-auto px-6 lg:px-12 flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-start gap-12`}>
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="flex-1"
      >
        <span className="inline-block text-teal text-xs font-bold uppercase tracking-widest bg-teal/10 px-3 py-1 rounded-full mb-4">{industry.tag}</span>
        <div className="text-teal mb-4">{industry.icon}</div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">{industry.title}</h2>
        <p className="text-text-muted text-lg mb-8 leading-relaxed">{industry.description}</p>

        {/* Pain Points */}
        <div className="mb-8">
          <h3 className="text-white font-semibold mb-4">Common Challenges</h3>
          <ul className="space-y-2">
            {industry.painPoints.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-text-muted text-sm">
                <span className="text-orange mt-1">✗</span> {p}
              </li>
            ))}
          </ul>
        </div>

        <Button to="/contact" variant="primary">Book a Free Consultation <FaArrowRight className="inline ml-2" /></Button>
      </motion.div>

      {/* Solutions Card */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="flex-1 w-full"
      >
        {industry.image && (
          <div className="w-full h-52 rounded-2xl overflow-hidden mb-6 border border-teal/15 relative group">
            <img src={industry.image} alt={industry.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/20 transition-colors duration-500" />
          </div>
        )}
        <Card>
          <h3 className="text-white font-bold text-lg mb-5">Our Solutions</h3>
          <ul className="space-y-3">
            {industry.solutions.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                <FaCheckCircle className="text-teal mt-0.5 shrink-0" /> {s}
              </li>
            ))}
          </ul>
          {/* Case study callout */}
          <div className="mt-6 pt-6 border-t border-teal/10">
            <p className="text-teal text-sm font-semibold mb-1">📊 Real Result</p>
            <p className="text-text-muted text-sm italic">{industry.caseStudy}</p>
          </div>
        </Card>
      </motion.div>
    </div>
  </section>
);

export const Industries = () => {
  useSEO({
    title: 'Industry Solutions — Education, Banking & Healthcare | Salinova Tech LTD',
    description:
      'Salinova Tech LTD delivers custom software and cybersecurity solutions for education, banking, and healthcare organisations across Kenya and East Africa.',
    path: '/industries',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Industry Solutions',
      url: 'https://salinovatech.com/industries',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://salinovatech.com' },
          { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://salinovatech.com/industries' },
        ],
      },
    },
  });

  return (
    <div>
      {/* Hero */}
      <section className="py-24 text-center relative overflow-hidden border-b border-teal/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange/5 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block text-teal text-sm font-bold uppercase tracking-widest mb-4">
            Industry Solutions
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Technology Built for <span className="text-teal">Your Industry</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-text-muted max-w-2xl mx-auto">
            We understand that every sector has unique challenges. Our solutions are tailored specifically
            for Education, Banking & Finance, and Healthcare organisations across East Africa.
          </motion.p>
          {/* Industry jump links */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-4 mt-8">
            {industries.map(ind => (
              <a key={ind.id} href={`#${ind.id}`} className="flex items-center gap-2 px-5 py-2 bg-navy-light border border-teal/20 rounded-full text-teal text-sm font-medium hover:border-teal/60 transition-colors">
                {ind.icon && React.cloneElement(ind.icon, { size: 14 })} {ind.tag}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industry Sections */}
      {industries.map((industry, i) => (
        <IndustrySection key={industry.id} industry={industry} reverse={i % 2 !== 0} index={i} />
      ))}

      {/* CTA */}
      <section className="py-20 bg-teal/5">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Don't see your industry?</h2>
          <p className="text-text-muted mb-8 max-w-xl mx-auto">
            We work with businesses across all sectors. Tell us your challenge and we'll design a solution that fits.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button to="/contact" variant="primary">Book a Free Consultation →</Button>
            <Button to="/case-studies" variant="secondary">View Case Studies →</Button>
          </div>
        </div>
      </section>
    </div>
  );
};
