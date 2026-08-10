import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useSEO } from '../hooks/useSEO';
import { FaQuoteLeft } from 'react-icons/fa';

export const CaseStudies = () => {
  useSEO({
    title: 'Case Studies — Success Stories & Results | Salinova Tech LTD',
    description:
      'Explore how Salinova Tech LTD delivered real software and cybersecurity results for universities, regional banks, and government institutions in Kenya.',
    path: '/case-studies',
  });

  const cases = [
    {
      title: "Campus Care",
      client: "Pwani University",
      industry: "Education",
      challenge: "Pwani University was struggling with manual, paper-based processes for student registration, fee management, and academic record-keeping.",
      solution: "Salinova Tech developed Campus Care, a comprehensive campus management system with online registration, automated fee processing, and real-time analytics.",
      results: "80% faster processing, 95% student satisfaction, 60% reduction in administrative workload, 5,000+ students served.",
      quote: "Salinova Tech transformed our university operations. What used to take days now takes minutes.",
      author: "Dr. Kamau, Vice Chancellor"
    },
    {
      title: "Security Audit & Compliance",
      client: "Kilifi County Cooperative Bank",
      industry: "Banking/Finance",
      challenge: "A regional bank with 12 branches and 50,000+ customers needed to identify and fix security vulnerabilities before a regulatory compliance audit.",
      solution: "Comprehensive security audit including penetration testing, vulnerability assessment, and social engineering testing.",
      results: "12 critical vulnerabilities fixed, 100% security compliance, security awareness improved from 45% to 92%.",
      quote: "Salinova Tech's cybersecurity team was thorough, professional, and transparent.",
      author: "CEO, Kilifi County Cooperative Bank"
    },
    {
      title: "Unified School ERP",
      client: "Ministry of Education",
      industry: "Education",
      challenge: "The Ministry needed a unified platform to manage student records, teacher assignments, and academic performance across 50+ secondary schools.",
      solution: "Cloud-based educational management platform with student management, teacher management, parent portal, and reporting dashboard.",
      results: "70% reduction in administrative workload, 10,000+ students onboarded, 95% data accuracy.",
      quote: "This platform has revolutionized how we manage education in our region.",
      author: "Education Ministry Representative"
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Case Studies</h1>
          <p className="text-xl text-teal">Real solutions. Real results.</p>
        </div>

        <div className="space-y-12 mb-16">
          {cases.map((study, idx) => (
            <Card key={idx} className="p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-teal text-navy font-bold px-6 py-2 rounded-bl-2xl">
                {study.industry}
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 pr-24">{study.title}</h2>
              <p className="text-teal font-medium mb-8">Client: {study.client}</p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <h4 className="text-white font-semibold mb-2">The Challenge</h4>
                  <p className="text-text-muted text-sm">{study.challenge}</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Our Solution</h4>
                  <p className="text-text-muted text-sm">{study.solution}</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">The Results</h4>
                  <p className="text-teal text-sm font-medium">{study.results}</p>
                </div>
              </div>

              <div className="bg-navy-light/50 p-6 rounded-xl border-l-4 border-teal flex gap-4">
                <FaQuoteLeft className="text-teal shrink-0 text-xl opacity-50" />
                <div>
                  <p className="text-white italic mb-2">"{study.quote}"</p>
                  <p className="text-text-muted text-sm">— {study.author}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center bg-teal/5 p-12 rounded-2xl border border-teal/15">
          <h2 className="text-3xl font-bold text-white mb-4">Want to achieve similar results?</h2>
          <p className="text-text-muted mb-8 max-w-xl mx-auto">Book a free consultation to discuss how custom software or cybersecurity services can transform your business.</p>
          <Button to="/contact" variant="primary">Book a Free Consultation →</Button>
        </div>
      </div>
    </div>
  );
};
