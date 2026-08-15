import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import {
  FaPython, FaReact, FaShieldAlt, FaMobileAlt, FaPaintBrush, FaBrain,
  FaVideo, FaProjectDiagram, FaUserTie, FaLaptop, FaCampground, FaBriefcase,
  FaChalkboardTeacher, FaClock, FaSignal, FaStar, FaCheckCircle, FaArrowRight
} from 'react-icons/fa';

const CourseCard = ({ image, icon, category, title, duration, level, rating, students, desc, skills }) => (
  <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:border-gold/50 transition-all duration-300 flex flex-col h-full group hover:-translate-y-1.5">
    {/* Real Course Image Header */}
    <div className="h-52 w-full relative overflow-hidden bg-navy-dark">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent pointer-events-none" />
      
      {/* Category Badge */}
      <span className="absolute top-4 left-4 bg-navy/90 backdrop-blur-md text-gold font-bold text-xs px-3 py-1.5 rounded-full border border-gold/30 shadow-md">
        {category}
      </span>

      {/* Level Badge */}
      <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-navy font-bold text-xs px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
        <FaSignal className="text-gold text-[10px]" />
        {level}
      </span>

      {/* Stats pill at bottom of image */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-medium">
        <span className="flex items-center gap-1.5 bg-navy-dark/70 backdrop-blur-sm px-2.5 py-1 rounded-md">
          <FaClock className="text-gold" /> {duration}
        </span>
        <span className="flex items-center gap-1.5 bg-navy-dark/70 backdrop-blur-sm px-2.5 py-1 rounded-md text-gold font-bold">
          <FaStar className="text-gold" /> {rating} <span className="text-white/80 font-normal">({students})</span>
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-1">
      <div className="flex items-center gap-2 text-gold text-sm font-semibold mb-2">
        <span className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
          {icon}
        </span>
        <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Comprehensive Curriculum</span>
      </div>

      <h3 className="text-[20px] font-bold text-navy mb-3 group-hover:text-gold-dark transition-colors leading-snug">
        {title}
      </h3>

      <p className="text-slate-600 text-[14px] leading-relaxed mb-6 flex-1">
        {desc}
      </p>

      {/* Key Skills */}
      <div className="mb-6 pt-4 border-t border-slate-100">
        <h4 className="text-[11px] text-slate-500 uppercase tracking-wider mb-2.5 font-bold">Core Skills You'll Master</h4>
        <div className="flex flex-wrap gap-1.5">
          {skills.map(skill => (
            <span key={skill} className="px-2.5 py-1 bg-slate-100 text-navy font-semibold rounded-md text-[12px] border border-slate-200/80">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 mt-auto pt-2">
        <Button to="/contact" variant="primary" className="flex-1 py-3 px-4 text-[14px] bg-gold-gradient text-white font-bold hover:brightness-110 shadow-md shadow-gold/20 flex items-center justify-center gap-2">
          <span>Enroll Now</span>
          <FaArrowRight className="text-xs" />
        </Button>
        <Button to="/contact" variant="secondary" className="py-3 px-4 text-[14px] border border-slate-300 text-navy hover:bg-slate-50 font-semibold">
          Details
        </Button>
      </div>
    </div>
  </div>
);

export const Academy = () => {
  const [filter, setFilter] = useState('All');

  const courses = [
    {
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      icon: <FaPython size={16} />,
      category: "Web Development",
      title: "Full-Stack Web Development",
      duration: "12 Weeks",
      level: "Beginner to Pro",
      rating: "4.9",
      students: "2,400+ graduates",
      desc: "Build full-scale responsive web applications from scratch. Master Python, Django, HTML5, modern JavaScript, PostgreSQL database design, and cloud deployment.",
      skills: ["Python", "Django", "REST APIs", "PostgreSQL", "JavaScript", "Git & GitHub"]
    },
    {
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
      icon: <FaReact size={16} />,
      category: "Frontend Engineering",
      title: "React & Next.js Development",
      duration: "10 Weeks",
      level: "Intermediate",
      rating: "4.9",
      students: "1,850+ graduates",
      desc: "Master modern enterprise frontend architectures. Learn component-driven design, server-side rendering, Tailwind CSS, TypeScript, and state management at scale.",
      skills: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Vite"]
    },
    {
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      icon: <FaShieldAlt size={16} />,
      category: "Cybersecurity",
      title: "Cybersecurity & Ethical Hacking",
      duration: "12 Weeks",
      level: "All Levels",
      rating: "5.0",
      students: "1,200+ graduates",
      desc: "Learn to defend business infrastructure and conduct offensive vulnerability assessments. Covers penetration testing, network sniffing, cryptography, and ISO compliance.",
      skills: ["Kali Linux", "Wireshark", "Burp Suite", "Ethical Hacking", "Network Defense"]
    },
    {
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
      icon: <FaMobileAlt size={16} />,
      category: "Mobile Apps",
      title: "Cross-Platform Mobile App Dev",
      duration: "10 Weeks",
      level: "Intermediate",
      rating: "4.8",
      students: "980+ graduates",
      desc: "Develop native iOS and Android apps with a single React Native codebase. Learn offline storage, push notifications, mobile payments (M-Pesa integration), and app store deployment.",
      skills: ["React Native", "Expo", "Mobile UI/UX", "M-Pesa API", "App Publishing"]
    },
    {
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
      icon: <FaPaintBrush size={16} />,
      category: "Design",
      title: "UI/UX Design & Product Strategy",
      duration: "8 Weeks",
      level: "Beginner Friendly",
      rating: "4.9",
      students: "1,450+ graduates",
      desc: "Create intuitive, high-converting digital product interfaces. Master user research, wireframing, high-fidelity Figma prototyping, design systems, and usability testing.",
      skills: ["Figma", "Design Systems", "User Research", "Wireframing", "Interactive Prototypes"]
    },
    {
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
      icon: <FaBrain size={16} />,
      category: "AI & Data",
      title: "AI, Machine Learning & LLMs",
      duration: "12 Weeks",
      level: "Advanced",
      rating: "5.0",
      students: "850+ graduates",
      desc: "Build AI-powered business solutions. Learn Python for Data Science, supervised/unsupervised machine learning, neural networks, OpenAI API integration, and LangChain agents.",
      skills: ["Python", "TensorFlow", "scikit-learn", "NLP", "LLM APIs", "LangChain"]
    }
  ];

  const categories = ['All', 'Web Development', 'Frontend Engineering', 'Cybersecurity', 'Mobile Apps', 'Design', 'AI & Data'];

  const filteredCourses = filter === 'All'
    ? courses
    : courses.filter(c => c.category === filter);

  const learningModels = [
    { icon: <FaVideo />, label: "Live Interactive Classes", desc: "Real-time mentorship & Q&A sessions" },
    { icon: <FaProjectDiagram />, label: "Project-Based Portfolio", desc: "Build real apps for real clients" },
    { icon: <FaUserTie />, label: "1-on-1 Industry Mentorship", desc: "Guidance from senior engineers" },
    { icon: <FaLaptop />, label: "Practical Hands-on Labs", desc: "24/7 access to cloud dev environments" },
    { icon: <FaCampground />, label: "Intensive Bootcamps", desc: "Fast-track career transformation" },
    { icon: <FaBriefcase />, label: "Job & Internship Placement", desc: "Hiring partner network across Africa" },
    { icon: <FaChalkboardTeacher />, label: "Corporate Training", desc: "Custom upskilling for organizations" },
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="Salinova Tech Academy — Practical Tech Courses in Coding, Cybersecurity & AI"
        description="Learn Full-Stack Web Development, Cybersecurity, React, Mobile Apps, and AI at Salinova Tech Academy in Kenya. Over 10,000 students trained."
        path="/academy"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          name: 'Salinova Tech Academy',
          url: 'https://salinovatech.com/academy',
          description: 'Practical technology training for the digital economy in Kenya and East Africa.',
        }}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/5 pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-6"
          >
            Empowering the Next Generation of African Tech Leaders
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight"
          >
            Salinova Tech <span className="text-gold">Academy</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
          >
            Practical, project-based technology training designed for the modern economy. Learn high-income skills in software engineering, cybersecurity, and artificial intelligence with dedicated mentorship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto"
          >
            <Button
              variant="primary"
              className="bg-gold-gradient text-white font-bold py-3.5 px-8 rounded-lg shadow-lg shadow-gold/25 hover:brightness-110"
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Courses ↓
            </Button>
            <Button to="/contact" variant="secondary" className="border-2 border-white/40 text-white hover:bg-white/10 font-bold py-3.5 px-8 rounded-lg">
              Apply for Scholarship →
            </Button>
          </motion.div>

          {/* Quick Academy Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto pt-10 border-t border-white/10 text-left sm:text-center">
            {[
              { val: '10,000+', label: 'Students Trained' },
              { val: '94%', label: 'Employment Rate' },
              { val: '50+', label: 'Hiring Partners' },
              { val: '4.9 / 5', label: 'Student Rating' },
            ].map((s, i) => (
              <div key={i}>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-gold">{s.val}</h4>
                <p className="text-slate-300 text-xs sm:text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="programs" className="py-24 bg-slate-50/70 border-b border-slate-200">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">INDUSTRY-ALIGNED CURRICULUM</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4 tracking-tight">Our Flagship Programs</h2>
            <p className="text-slate-600 text-base max-w-2xl mx-auto">
              Every course is built in partnership with leading tech employers to guarantee you graduate with portfolio-ready skills.
            </p>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    filter === cat
                      ? 'bg-navy text-gold shadow-md scale-105'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-gold/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
              >
                <CourseCard {...course} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Teach */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">THE SALINOVA METHOD</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">How We Guarantee Student Success</h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto mb-16">
            We don't just teach theory. We simulate actual engineering workplaces so you step into your first job with complete confidence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningModels.slice(0, 4).map((model, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center hover:border-gold/40 hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-2xl bg-navy text-gold flex items-center justify-center text-2xl mx-auto mb-4 shadow-md">
                  {model.icon}
                </div>
                <h3 className="text-navy font-bold text-base mb-2">{model.label}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{model.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            {learningModels.slice(4).map((model, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center hover:border-gold/40 hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-2xl bg-navy text-gold flex items-center justify-center text-2xl mx-auto mb-4 shadow-md">
                  {model.icon}
                </div>
                <h3 className="text-navy font-bold text-base mb-2">{model.label}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{model.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to Start Your Tech Journey?</h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8 text-base">
            Enroll today or talk to our career admissions advisor to pick the perfect course for your goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button to="/contact" variant="primary" className="bg-gold-gradient text-white font-bold py-3.5 px-8 rounded-lg shadow-lg shadow-gold/20">
              Apply For Next Cohort →
            </Button>
            <Button to="/contact" variant="secondary" className="border-2 border-white/40 text-white font-bold py-3.5 px-8 rounded-lg hover:bg-white/10">
              Schedule Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
