import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useSEO } from '../hooks/useSEO';
import { FaLightbulb, FaShieldAlt, FaStar, FaHandsHelping, FaBookOpen, FaGlobeAfrica } from 'react-icons/fa';

export const About = () => {
  useSEO({
    title: 'About Us — Salinova Tech LTD | Technology & Skills in East Africa',
    description:
      'Salinova Tech LTD is a technology company in Kilifi County, Kenya, combining custom software development, cybersecurity, and technology education across East Africa.',
    path: '/about',
  });

  const values = [
    { icon: <FaLightbulb />, title: "Innovation", desc: "We embrace creativity and continuously develop modern solutions." },
    { icon: <FaShieldAlt />, title: "Integrity", desc: "We conduct our business honestly and ethically." },
    { icon: <FaStar />, title: "Excellence", desc: "We strive for high-quality products and services." },
    { icon: <FaHandsHelping />, title: "Collaboration", desc: "Great solutions are built through teamwork." },
    { icon: <FaBookOpen />, title: "Continuous Learning", desc: "Technology changes daily, and so do we." },
    { icon: <FaGlobeAfrica />, title: "Community Impact", desc: "We believe technology should uplift communities." }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="py-20 text-center border-b border-teal/10">
        <div className="container mx-auto px-6 lg:px-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">About Salinova Tech LTD</h1>
          <p className="text-xl text-teal">From Kilifi to the world—building skills and creating solutions.</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-text mb-8">Our Story</h2>
          <div className="space-y-6 text-text-muted text-lg leading-relaxed">
            <p>Founded in Kilifi County, Kenya, Salinova Tech LTD was born from a simple belief: technology should solve real problems and create opportunities.</p>
            <p>We combine software development, cybersecurity, technology education, and innovation under one roof. Our team of 25+ professionals works with businesses, educational institutions, governments, and NGOs across East Africa.</p>
            <p className="text-text font-medium">Our long-term ambition: become one of Africa's leading technology companies—recognized for innovation, trust, and excellence.</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-navy-light/30">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold text-text mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <Card key={idx} className="text-center hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-teal/10 flex items-center justify-center text-teal text-2xl mb-6">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold text-text mb-3">{val.title}</h3>
                <p className="text-text-muted">{val.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CSR */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-teal mb-8">Corporate Social Responsibility</h2>
          <p className="text-text-muted text-lg mb-8">We are committed to giving back to our community through various initiatives:</p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["Free Coding Workshops", "Scholarships", "Mentorship Programs", "Digital Literacy Campaigns", "Environmental Sustainability"].map(item => (
              <span key={item} className="px-4 py-2 bg-navy-light rounded-full text-text border border-teal/20">{item}</span>
            ))}
          </div>
          <Button to="/contact" variant="primary">Work With Us →</Button>
        </div>
      </section>
    </div>
  );
};
