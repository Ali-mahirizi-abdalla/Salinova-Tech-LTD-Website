import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import { FaClock, FaUser, FaArrowLeft, FaWhatsapp } from 'react-icons/fa';

const posts = {
  'python-backend-development': {
    tag: 'Development',
    date: 'August 10, 2026',
    readTime: '8 min read',
    author: 'Salinova Tech Team',
    title: 'Python for Backend Development: A Complete Guide for 2026',
    description: 'Learn how to build scalable backend systems with Python, Django, and FastAPI for businesses in Kenya and East Africa.',
    image: '/assets/software.png',
    body: `
## Why Python for Backend Development?

Python has grown to become the most popular programming language in the world — and for good reason. Its clean syntax, massive ecosystem, and strong community make it the ideal choice for building everything from simple APIs to complex enterprise systems.

For businesses in East Africa, Python is particularly powerful because:
- **Fast to develop** — reduces time-to-market for your product
- **Cost-effective** — large talent pool of Python developers
- **Scalable** — powers companies like Instagram, Spotify, and Dropbox

## The Python Backend Stack

### 1. Django — The Full-Stack Framework
Django is the most popular Python web framework. It follows the "batteries included" philosophy — authentication, database ORM, admin panel, and REST API tools are all built in.

**Best for:** Business management systems, e-commerce platforms, government portals.

### 2. FastAPI — The Modern API Framework
FastAPI is newer, faster, and ideal for microservices and AI-powered APIs. It automatically generates interactive API documentation and handles asynchronous requests efficiently.

**Best for:** Mobile app backends, AI integrations, high-performance APIs.

### 3. Database Layer
Python works seamlessly with:
- **PostgreSQL** — for complex relational data
- **MongoDB** — for flexible document storage
- **Redis** — for caching and session management

## Building Your First REST API

A basic Django REST API endpoint looks like this:

\`\`\`python
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def get_services(request):
    services = [
        {"id": 1, "name": "Software Development"},
        {"id": 2, "name": "Cybersecurity"},
        {"id": 3, "name": "AI Solutions"},
    ]
    return Response(services)
\`\`\`

## Deployment in Kenya

For East African businesses, we recommend:
- **DigitalOcean** or **Render** for hosting
- **Cloudflare** for CDN and DDoS protection
- **GitHub Actions** for CI/CD automation

## Conclusion

Python is the right choice for backend development in 2026. Whether you are building a hospital management system, a fintech app, or an e-commerce platform — Python and its frameworks will help you ship faster, scale confidently, and maintain easily.

**Interested in learning Python?** Join our Full-Stack Web Development course at Salinova Tech Academy.
    `,
  },
  'cybersecurity-east-africa': {
    tag: 'Cybersecurity',
    date: 'August 5, 2026',
    readTime: '6 min read',
    author: 'Security Team',
    title: 'Cybersecurity Essentials for East African Businesses in 2026',
    description: 'Protect your business from ransomware, phishing, and data breaches with proven cybersecurity strategies tailored for East Africa.',
    image: '/assets/services.png',
    body: `
## The Cyber Threat Landscape in East Africa

East African businesses are increasingly targeted by sophisticated cyber attacks. According to recent reports, Kenya alone experienced over 860 million cyber threats in 2025. The attackers are not just targeting large corporations — SMEs, hospitals, schools, and government agencies are all at risk.

## The 5 Biggest Threats Right Now

### 1. Phishing Attacks
Employees receive fake emails impersonating banks, government agencies, or even their own IT department. One click can compromise an entire network.

**How to protect yourself:**
- Train all staff on phishing recognition
- Enable multi-factor authentication (MFA) on all accounts
- Use email filtering software

### 2. Ransomware
Ransomware encrypts all your business files and demands payment for the decryption key. Several Kenyan hospitals and financial institutions have been hit in recent years.

**How to protect yourself:**
- Maintain offline, encrypted backups
- Keep all software updated and patched
- Segment your network to limit spread

### 3. Insider Threats
Not all threats come from outside. Disgruntled employees, contractors with excessive access, or simple human error can cause significant damage.

**How to protect yourself:**
- Apply the principle of least privilege
- Monitor user activity on sensitive systems
- Conduct regular access reviews

### 4. Weak Passwords & Credential Stuffing
Attackers use lists of leaked passwords to try to access your systems automatically. If your employees reuse passwords, you are at risk.

**How to protect yourself:**
- Enforce strong password policies
- Deploy a company-wide password manager
- Enable MFA everywhere

### 5. Unpatched Software
Outdated operating systems and applications contain known vulnerabilities that attackers exploit within hours of discovery.

**How to protect yourself:**
- Automate software updates
- Conduct quarterly vulnerability assessments
- Retire legacy systems that no longer receive security patches

## Building a Security Culture

Technology alone is not enough. The most effective cybersecurity strategy combines:
- **Technical controls** (firewalls, antivirus, encryption)
- **Human training** (security awareness programs)
- **Processes** (incident response plans, access policies)

## Getting a Professional Security Assessment

At Salinova Tech LTD, we offer comprehensive penetration testing and vulnerability assessments designed specifically for East African businesses. Our certified ethical hackers will identify your weaknesses before attackers do.

**Ready to secure your business?** Contact us today for a free security consultation.
    `,
  },
  'start-tech-career-kenya': {
    tag: 'Career',
    date: 'July 28, 2026',
    readTime: '5 min read',
    author: 'Academy Team',
    title: 'How to Start a Tech Career in Kenya with Zero Experience',
    description: 'A step-by-step roadmap for Kenyans who want to break into software development, cybersecurity, or AI without a computer science degree.',
    image: '/assets/academy.png',
    body: `
## You Do Not Need a CS Degree

This is the most important thing to understand: the tech industry hires on skill, not paper qualifications. Thousands of Kenyans have launched successful careers in software development, cybersecurity, and data science — starting from zero.

## The 6-Month Roadmap

### Month 1–2: Choose Your Path
There are three main entry points into tech:
- **Software Development** — Building websites and apps
- **Cybersecurity** — Protecting systems and data
- **Data / AI** — Analysing data and building intelligent systems

Pick one. Do not try to learn everything at once.

### Month 2–4: Learn the Fundamentals
**For Software Development:**
Start with HTML/CSS, then JavaScript, then pick one backend language (Python is our recommendation). Complete at least 3 small projects.

**For Cybersecurity:**
Start with CompTIA Security+ curriculum (free on YouTube). Learn networking basics (TCP/IP, DNS, firewalls). Set up a home lab using free tools.

**For Data / AI:**
Start with Python basics, then learn pandas and matplotlib for data analysis. Complete 2 Kaggle competitions.

### Month 4–5: Build Your Portfolio
Employers hire based on what you can build, not what you know in theory.

Your portfolio should include:
- A GitHub profile with 5+ repositories
- 2–3 projects solving real problems (not just tutorials)
- A personal website showcasing your work

### Month 5–6: Apply and Network
- Apply for junior roles and internships
- Attend local tech meetups (Nairobi, Mombasa, Kisumu)
- Join online communities (Twitter/X tech community, LinkedIn)
- Connect with mentors who are 2–3 years ahead of you

## The Salinova Tech Academy Advantage

Our courses are specifically designed for this journey:
- **Project-based** — you build real things from week one
- **Mentor-led** — guidance from working professionals
- **Job-ready** — curriculum aligned with employer needs
- **Community** — network of over 10,000 alumni

## Success Stories

Graduates of our academy have gone on to work at local startups, banks, NGOs, and international remote companies earning 3–10× more than their previous incomes.

**Ready to start your journey?** Explore our academy courses and apply for the next cohort.
    `,
  },
};

export const BlogPost = () => {
  const { slug } = useParams();
  const post = posts[slug];

  

  if (!post) {
    return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <SEO {...{
    title: post ? `${post.title} — Salinova Tech LTD` : 'Article Not Found',
    description: post?.description || '',
    path: `/blog/${slug}`,
  }} />
        <h1 className="text-4xl font-bold text-text mb-4">Article Not Found</h1>
        <p className="text-text-muted mb-8">This article doesn't exist or may have been moved.</p>
        <Button to="/blog" variant="primary">← Back to Blog</Button>
      </div>
    );
  }

  // Render simple markdown-like content
  const renderBody = (body) => {
    return body.trim().split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-text mt-10 mb-4">{line.slice(3)}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-semibold text-teal mt-8 mb-3">{line.slice(4)}</h3>;
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-bold text-text mb-2">{line.slice(2, -2)}</p>;
      if (line.startsWith('- ')) return <li key={i} className="text-text-muted ml-4 list-disc mb-1">{line.slice(2)}</li>;
      if (line.startsWith('```')) return null;
      if (line.trim() === '') return <div key={i} className="mb-2" />;
      return <p key={i} className="text-text-muted leading-relaxed mb-3">{line}</p>;
    });
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        {/* Back */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-teal text-sm mb-8 hover:text-teal-light transition-colors">
          <FaArrowLeft /> Back to Blog
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block text-teal text-xs font-bold uppercase tracking-widest bg-teal/10 px-3 py-1 rounded-full mb-4">
            {post.tag}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-text mb-6 leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-8 pb-8 border-b border-teal/10">
            <span className="flex items-center gap-1"><FaUser className="text-teal" /> {post.author}</span>
            <span className="flex items-center gap-1"><FaClock className="text-teal" /> {post.readTime}</span>
            <span>{post.date}</span>
          </div>
        </motion.div>

        {/* Hero Image */}
        {post.image && (
          <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-12 border border-teal/10">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Body */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          {renderBody(post.body)}
        </motion.article>

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-teal/5 border border-teal/20 text-center">
          <h3 className="text-2xl font-bold text-text mb-3">Ready to take action?</h3>
          <p className="text-text-muted mb-6">Book a free consultation with our team or join the academy today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button to="/contact" variant="primary">Book Free Consultation →</Button>
            <a
              href="https://wa.me/254000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-text font-semibold rounded-lg transition-colors"
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
