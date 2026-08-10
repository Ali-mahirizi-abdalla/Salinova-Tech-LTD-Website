import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useSEO } from '../hooks/useSEO';
import { FaPython, FaShieldAlt, FaGraduationCap, FaClock, FaUser, FaTag, FaArrowRight } from 'react-icons/fa';

const posts = [
  {
    slug: 'python-backend-development',
    icon: <FaPython />,
    tag: 'Development',
    tagColor: 'text-teal',
    date: 'August 10, 2026',
    readTime: '8 min read',
    author: 'Salinova Tech Team',
    title: 'Python for Backend Development: A Complete Guide for 2026',
    excerpt:
      'Python has become the go-to language for backend development across Africa and globally. In this guide, we explore Django, FastAPI, REST APIs, and how to build scalable server-side applications that power modern businesses.',
    image: '/assets/software.png',
    topics: ['Django', 'FastAPI', 'REST APIs', 'PostgreSQL', 'Deployment'],
  },
  {
    slug: 'cybersecurity-east-africa',
    icon: <FaShieldAlt />,
    tag: 'Cybersecurity',
    tagColor: 'text-orange',
    date: 'August 5, 2026',
    readTime: '6 min read',
    author: 'Security Team',
    title: 'Cybersecurity Essentials for East African Businesses in 2026',
    excerpt:
      'Cyber threats are growing faster than ever across Kenya and East Africa. From ransomware attacks on hospitals to phishing campaigns targeting financial institutions — every business is a target. Here is how to protect yours.',
    image: '/assets/services.png',
    topics: ['Phishing', 'Ransomware', 'Penetration Testing', 'GDPR Compliance', 'Zero Trust'],
  },
  {
    slug: 'start-tech-career-kenya',
    icon: <FaGraduationCap />,
    tag: 'Career',
    tagColor: 'text-teal-light',
    date: 'July 28, 2026',
    readTime: '5 min read',
    author: 'Academy Team',
    title: 'How to Start a Tech Career in Kenya with Zero Experience',
    excerpt:
      'You do not need a computer science degree to break into tech. Thousands of Kenyans have launched successful careers in software development, cybersecurity, and AI — starting from nothing. Here is the exact roadmap.',
    image: '/assets/academy.png',
    topics: ['Career Change', 'Self-Learning', 'Portfolio', 'Job Market', 'Mentorship'],
  },
];

const PostCard = ({ post, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ delay: index * 0.12 }}
    className="h-full"
  >
    <Card className="flex flex-col h-full group overflow-hidden !p-0">
      {/* Image */}
      {post.image && (
        <div className="w-full h-52 overflow-hidden relative">
          <div className="absolute inset-0 bg-navy/50 group-hover:bg-navy/20 transition-colors duration-500 z-10" />
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <span className={`absolute top-4 left-4 z-20 text-xs font-bold uppercase tracking-widest bg-navy/80 px-3 py-1 rounded-full border border-teal/20 ${post.tagColor}`}>
            {post.tag}
          </span>
        </div>
      )}
      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-4 text-xs text-text-muted mb-4">
          <span className="flex items-center gap-1"><FaClock className="text-teal" /> {post.readTime}</span>
          <span className="flex items-center gap-1"><FaUser className="text-teal" /> {post.author}</span>
          <span>{post.date}</span>
        </div>
        <h2 className="text-lg font-bold text-text mb-3 group-hover:text-teal transition-colors leading-snug">
          {post.title}
        </h2>
        <p className="text-text-muted text-sm leading-relaxed mb-5 flex-grow">{post.excerpt}</p>
        {/* Topics */}
        <div className="flex flex-wrap gap-2 mb-5">
          {post.topics.map(t => (
            <span key={t} className="px-2 py-1 bg-navy rounded text-xs text-teal/80 border border-teal/10">
              {t}
            </span>
          ))}
        </div>
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-teal font-semibold text-sm hover:gap-3 transition-all"
        >
          Read Full Article <FaArrowRight />
        </Link>
      </div>
    </Card>
  </motion.div>
);

export const Blog = () => {
  useSEO({
    title: 'Blog & Resources — Salinova Tech LTD',
    description:
      'Expert articles on Python development, cybersecurity, tech careers, and digital transformation for businesses in Kenya and East Africa.',
    path: '/blog',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Salinova Tech LTD Blog',
      description: 'Tech insights, cybersecurity guides, and career resources for East Africa.',
      url: 'https://salinovatech.com/blog',
      publisher: {
        '@type': 'Organization',
        name: 'Salinova Tech LTD',
        url: 'https://salinovatech.com',
      },
    },
  });

  return (
    <div>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-teal text-sm font-bold uppercase tracking-widest mb-4"
          >
            Insights & Resources
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-text mb-6 tracking-tight"
          >
            Blog & <span className="text-teal">Knowledge Hub</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto"
          >
            Practical guides on Python, cybersecurity, tech careers, and digital transformation
            — written for businesses and learners across East Africa.
          </motion.p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <PostCard key={post.slug} post={post} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-teal/5 border-t border-teal/10">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-bold text-text mb-4">Ready to Build Your Tech Future?</h2>
          <p className="text-text-muted mb-8 max-w-xl mx-auto">
            Whether you are looking to upskill your team or secure your business — we are here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button to="/contact" variant="primary">Book a Free Consultation →</Button>
            <Button to="/academy" variant="secondary">Browse Courses →</Button>
          </div>
        </div>
      </section>
    </div>
  );
};
