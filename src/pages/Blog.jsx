import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { FaClock, FaUser, FaArrowRight, FaTag } from 'react-icons/fa';
import { Button } from '../components/Button';

const posts = [
  {
    slug: 'python-backend-development',
    tag: 'Development',
    tagColor: 'text-gold bg-gold/10 border-gold/30',
    date: 'August 10, 2026',
    readTime: '8 min read',
    author: 'Salinova Engineering',
    title: 'Python for Backend Development: A Complete Guide for 2026',
    excerpt:
      'Python has become the go-to language for backend development across Africa and globally. In this guide, we explore Django, FastAPI, REST APIs, and how to build scalable server-side applications that power modern businesses.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    topics: ['Django', 'FastAPI', 'REST APIs', 'PostgreSQL', 'Deployment'],
  },
  {
    slug: 'cybersecurity-east-africa',
    tag: 'Cybersecurity',
    tagColor: 'text-red-600 bg-red-50 border-red-200',
    date: 'August 5, 2026',
    readTime: '6 min read',
    author: 'Cyber Defense Team',
    title: 'Cybersecurity Essentials for East African Businesses in 2026',
    excerpt:
      'Cyber threats are growing faster than ever across Kenya and East Africa. From ransomware attacks on hospitals to phishing campaigns targeting financial institutions — every business is a target. Here is how to protect yours.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    topics: ['Phishing', 'Ransomware', 'Penetration Testing', 'GDPR Compliance', 'Zero Trust'],
  },
  {
    slug: 'start-tech-career-kenya',
    tag: 'Career Advice',
    tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    date: 'July 28, 2026',
    readTime: '5 min read',
    author: 'Academy Mentors',
    title: 'How to Start a Tech Career in Kenya with Zero Experience',
    excerpt:
      'You do not need a computer science degree to break into tech. Thousands of Kenyans have launched successful careers in software development, cybersecurity, and AI — starting from scratch. Here is the exact roadmap.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    topics: ['Career Change', 'Self-Learning', 'Portfolio', 'Job Market', 'Mentorship'],
  },
];

export const Blog = () => {
  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="Blog & Technical Insights — Salinova Tech LTD"
        description="Expert articles on Python development, cybersecurity, tech careers, and digital transformation for businesses in Kenya and East Africa."
        path="/blog"
        schema={{
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
        }}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-navy text-white relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
          <span className="inline-block text-gold font-bold text-xs uppercase tracking-widest mb-4 bg-gold/10 px-4 py-1.5 rounded-full border border-gold/30">
            Insights & Engineering Knowledge
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Blog & <span className="text-gold">Tech Hub</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium">
            Practical guides on software engineering, cybersecurity, tech careers, and digital transformation in Africa.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.12 }}
                className="h-full"
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:border-gold/50 transition-all duration-300 flex flex-col h-full group hover:-translate-y-1.5">
                  {/* Real Image */}
                  <div className="w-full h-52 overflow-hidden relative bg-navy-dark">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95"
                    />
                    <span className={`absolute top-4 left-4 z-20 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${post.tagColor}`}>
                      {post.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500 mb-3">
                      <span className="flex items-center gap-1.5"><FaClock className="text-gold" /> {post.readTime}</span>
                      <span className="flex items-center gap-1.5"><FaUser className="text-gold" /> {post.author}</span>
                    </div>

                    <h2 className="text-xl font-bold text-navy mb-3 group-hover:text-gold-dark transition-colors leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 font-medium">
                      {post.excerpt}
                    </p>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-slate-100">
                      {post.topics.map(t => (
                        <span key={t} className="px-2.5 py-1 bg-slate-100 text-navy font-semibold rounded text-xs border border-slate-200">
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center justify-between p-3 rounded-xl bg-slate-50 text-navy font-bold text-xs hover:bg-gold hover:text-white transition-all uppercase tracking-wider mt-auto"
                    >
                      <span>Read Full Article</span>
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy text-white text-center">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to Build Your Tech Future?</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto text-base">
            Whether you are looking to upskill your team or develop secure enterprise software — we are here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button to="/contact" variant="primary" className="bg-gold-gradient text-white font-bold py-3.5 px-8 rounded-lg shadow-lg shadow-gold/20">
              Book a Free Consultation →
            </Button>
            <Button to="/academy" variant="secondary" className="border-2 border-white/40 text-white font-bold py-3.5 px-8 rounded-lg hover:bg-white/10">
              Browse Academy Courses →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
