import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useSEO } from '../hooks/useSEO';
import { FaPython, FaReact, FaShieldAlt, FaMobileAlt, FaPaintBrush, FaBrain, FaVideo, FaProjectDiagram, FaUserTie, FaLaptop, FaCampground, FaBriefcase, FaChalkboardTeacher } from 'react-icons/fa';

const CourseCard = ({ icon, title, duration, level, desc, skills }) => (
  <Card className="flex flex-col h-full border-t-4 border-t-teal hover:border-t-teal-dark">
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center text-teal text-xl">
        {icon}
      </div>
      <div className="text-right">
        <span className="block text-text-muted text-sm">{duration}</span>
        <span className="block text-teal text-xs font-bold uppercase tracking-wider">{level}</span>
      </div>
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-text-muted text-sm mb-6 flex-grow">{desc}</p>
    <div className="mb-6">
      <h4 className="text-xs text-text-muted uppercase tracking-wider mb-2 font-semibold">Key Skills</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span key={skill} className="px-2 py-1 bg-navy rounded text-xs text-teal/80 border border-teal/10">
            {skill}
          </span>
        ))}
      </div>
    </div>
    <div className="flex gap-3 mt-auto">
      <Button to="/contact" variant="primary" className="flex-1 py-2 px-3 text-sm">Enroll Now</Button>
      <Button to="/pricing" variant="secondary" className="py-2 px-3 text-sm">Details</Button>
    </div>
  </Card>
);

export const Academy = () => {
  useSEO({
    title: 'Salinova Tech Academy — Courses in Coding, Cybersecurity & AI',
    description:
      'Learn Full-Stack Web Development, Cybersecurity, React, Mobile App Development, and AI at Salinova Tech Academy in Kenya. Over 10,000 students trained.',
    path: '/academy',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'Salinova Tech Academy',
      url: 'https://salinovatech.com/academy',
      description: 'Practical technology training for the digital economy in Kenya and East Africa.',
    },
  });

  const courses = [
    {
      icon: <FaPython />,
      title: "Full-Stack Web Development",
      duration: "12 weeks",
      level: "Beginner",
      desc: "Build complete web applications from scratch. Learn Python, Django, HTML, CSS, JavaScript, and database design.",
      skills: ["Python", "Django", "REST APIs", "PostgreSQL", "Git"]
    },
    {
      icon: <FaReact />,
      title: "React & Next.js Development",
      duration: "10 weeks",
      level: "Intermediate",
      desc: "Master modern frontend development with React and Next.js. Build responsive, high-performance web applications.",
      skills: ["React", "Next.js", "Tailwind CSS", "TypeScript"]
    },
    {
      icon: <FaShieldAlt />,
      title: "Cybersecurity & Ethical Hacking",
      duration: "12 weeks",
      level: "Intermediate",
      desc: "Protect organizations from digital threats. Learn penetration testing, vulnerability assessment, and security best practices.",
      skills: ["Kali Linux", "Nmap", "Burp Suite", "Python"]
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile App Development",
      duration: "10 weeks",
      level: "Intermediate",
      desc: "Build cross-platform mobile apps for iOS and Android using React Native. One codebase, two platforms.",
      skills: ["React Native", "Expo", "Mobile UI/UX", "APIs"]
    },
    {
      icon: <FaPaintBrush />,
      title: "UI/UX Design",
      duration: "8 weeks",
      level: "Beginner",
      desc: "Design beautiful, user-centered digital products. Learn wireframing, prototyping, and visual design principles.",
      skills: ["Figma", "Wireframing", "Prototyping", "Design Systems"]
    },
    {
      icon: <FaBrain />,
      title: "AI & Machine Learning",
      duration: "12 weeks",
      level: "Advanced",
      desc: "Build AI-powered applications. Learn machine learning algorithms, neural networks, and natural language processing.",
      skills: ["Python", "TensorFlow", "scikit-learn", "NLP"]
    }
  ];

  const learningModels = [
    { icon: <FaVideo />, label: "Live Classes" },
    { icon: <FaProjectDiagram />, label: "Project-Based Learning" },
    { icon: <FaUserTie />, label: "Mentorship" },
    { icon: <FaLaptop />, label: "Self-Paced Modules" },
    { icon: <FaCampground />, label: "Bootcamps" },
    { icon: <FaBriefcase />, label: "Internship Placement" },
    { icon: <FaChalkboardTeacher />, label: "Corporate Training" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden bg-navy-light/30 border-b border-teal/10">
        <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Salinova Tech <span className="text-teal">Academy</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10"
          >
            Practical training for the digital economy. 10,000+ students trained and counting.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-4"
          >
            <Button
              variant="primary"
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Courses →
            </Button>
            <Button to="/contact" variant="secondary">Apply Now →</Button>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section id="programs" className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Programs</h2>
            <p className="text-text-muted">Master the skills that employers are looking for.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <motion.div
                key={idx}
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

      {/* Learning Model */}
      <section className="py-20 bg-teal/5">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">How We Teach</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {learningModels.map((model, idx) => (
              <div key={idx} className="flex flex-col items-center max-w-[120px]">
                <div className="w-16 h-16 rounded-full bg-navy border border-teal/20 flex items-center justify-center text-teal text-2xl mb-4 shadow-[0_0_15px_rgba(100,255,218,0.1)]">
                  {model.icon}
                </div>
                <span className="text-text font-medium text-sm text-center">{model.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
