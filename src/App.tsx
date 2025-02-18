import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Dribbble, BookText as TikTok, Sun, Moon, Mail, Phone, MapPin, Menu, X, Github, ExternalLink } from 'lucide-react';
import ParticlesBackground from './components/ParticlesBackground';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { motion } from 'framer-motion';
import AnimatedLogo from './components/AnimatedLogo';
import TypewriterText from './components/TypewriterText';
import PreLoader from './components/PreLoader';

const menuItems = ['Home', 'About', 'Portfolio', 'Service', 'News', 'Contact'];

function MainLayout() {
  const [activeItem, setActiveItem] = useState('Home');
  const [hideParticles, setHideParticles] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [currentSection, setCurrentSection] = useState('');
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<null | {
    title: string;
    image: string;
    category: string;
    description: string;
    technologies: string[];
    github: string;
    preview: string;
  }>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
    // Add smooth scroll behavior to html element
    document.documentElement.style.scrollBehavior = 'smooth';
  }, [isDarkTheme]);

  useEffect(() => {
    setHideParticles(false);
  }, [activeItem]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Find the scrollable container and reset its scroll position
    const scrollableContainer = document.querySelector('.scroll-smooth');
    if (scrollableContainer) {
      scrollableContainer.scrollTop = 0;
    }
    // Reset current section
    setCurrentSection('');
    setIsScrolled(false);
  }, [activeItem]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const sections = e.currentTarget.querySelectorAll('section[data-section]');
    
    setIsScrolled(scrollTop > 100);

    // Find current section
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        setCurrentSection(section.getAttribute('data-section') || '');
      }
    });
  };

  const handlePageChange = (newPage: string) => {
    setIsPageLoading(true);
    setActiveItem(newPage);
    // Simulate page load time
    setTimeout(() => {
      setIsPageLoading(false);
    }, 800);
  };

  const contentComponents: { [key: string]: React.ReactNode } = {
    Home: (
      <div className="space-y-16 md:space-y-32">
        {/* Hero Section */}
        <section data-section="Home" className="min-h-[40vh] md:h-[calc(100vh-16rem)] flex flex-col justify-center">
          <div className="max-w-xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4 dark:text-white"
            >
              AJAY SINGH
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 italic mb-8"
            >
              I'm a <TypewriterText 
                texts={[
                  "Creative Freelancer",
                  "Software Engineer",
                  "Full Stack Developer",
                  "UI/UX Designer",
                  "Problem Solver"
                ]}
                typingSpeed={80}
                deletingSpeed={40}
                pauseDuration={2000}
              />
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 sm:space-x-4"
            >
              <button className="w-full sm:w-auto bg-black dark:bg-white text-white dark:text-black px-8 py-4 text-lg font-medium rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Get in Touch
              </button>
              <button className="w-full sm:w-auto border-2 border-black dark:border-white text-black dark:text-white px-8 py-4 text-lg font-medium rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
                Download CV
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    ),
    About: (
      <div className="space-y-6">
        {/* About Section */}
        <section data-section="About Me" className="space-y-8">
          <h2 className="text-4xl font-bold mb-6 dark:text-white">About Me</h2>
          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
            I'm a passionate cybersecurity enthusiast, ethical hacker, and web developer with a strong background in AI and machine learning. As the founder of CyberXShield, I focus on securing users from cyber threats while developing innovative web solutions.
            <br /><br />
            With a deep interest in programming, ethical hacking, and future technologies, I strive to create meaningful and impactful digital experiences. My work blends cutting-edge security practices with modern web development to deliver exceptional results, ensuring both functionality and protection in the ever-evolving digital landscape.
          </p>
        </section>

        {/* Skills Section - Updated Layout */}
        <section data-section="My Skills" className="space-y-12 mt-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center dark:text-white mb-6">
              My Skills
          </h2>

          {/* Programming Languages - Bar Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'JavaScript', level: 90 },
                { name: 'TypeScript', level: 85 },
                { name: 'Python', level: 80 },
                { name: 'Java', level: 75 },
                { name: 'HTML/CSS', level: 95 },
                { name: 'SQL', level: 85 }
              ].map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-black dark:bg-white h-2 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

          {/* Frameworks & Tools - Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {[
                { name: 'React', level: 95 },
                { name: 'Node.js', level: 88 },
                { name: 'Next.js', level: 85 },
                { name: 'Docker', level: 78 },
                { name: 'AWS', level: 82 },
                { name: 'MongoDB', level: 85 },
                { name: 'Git', level: 90 },
                { name: 'Tailwind', level: 92 }
              ].map((skill) => (
                <div key={skill.name} className="flex flex-col items-center">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90">
                      <circle
                        className="text-gray-200 dark:text-gray-600"
                      strokeWidth="6"
                        stroke="currentColor"
                        fill="transparent"
                      r="26"
                      cx="32"
                      cy="32"
                      />
                      <motion.circle
                        className="text-black dark:text-white"
                      strokeWidth="6"
                        stroke="currentColor"
                        fill="transparent"
                      r="26"
                      cx="32"
                      cy="32"
                        initial={{ strokeDasharray: "0 100" }}
                        animate={{ strokeDasharray: `${skill.level} 100` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-semibold dark:text-white">{skill.level}%</span>
                    </div>
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                </div>
              ))}
            </div>

          {/* Soft Skills - Updated with cyber theme */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { skill: 'Problem Solving & Analytical Thinking', color: 'from-emerald-500/5 to-emerald-500/10' },
              { skill: 'Team Leadership & Management', color: 'from-cyan-500/5 to-cyan-500/10' },
              { skill: 'Effective Communication', color: 'from-violet-500/5 to-violet-500/10' },
              { skill: 'Project Management', color: 'from-rose-500/5 to-rose-500/10' },
              { skill: 'Agile Methodology', color: 'from-amber-500/5 to-amber-500/10' },
              { skill: 'UI/UX Design Principles', color: 'from-indigo-500/5 to-indigo-500/10' },
              { skill: 'Performance Optimization', color: 'from-orange-500/5 to-orange-500/10' },
              { skill: 'System Architecture', color: 'from-teal-500/5 to-teal-500/10' }
            ].map((item, index) => (
                <motion.div
                key={item.skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group p-4 rounded-lg bg-gradient-to-r ${item.color} backdrop-blur-sm border border-gray-200/10 dark:border-gray-700/30 hover:scale-[1.02] transition-all duration-200 hover:border-gray-300/30 dark:hover:border-gray-600/50`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-200 font-medium">{item.skill}</span>
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-400/50 dark:bg-gray-500/50 group-hover:bg-gray-600 dark:group-hover:bg-gray-400 transition-colors"></div>
                </div>
                </motion.div>
              ))}
            </div>
        </section>

        {/* Featured Projects Section */}
        <section data-section="Featured Projects" className="space-y-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center dark:text-white"
            >
              Featured Projects
            </motion.h2>

            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  title: 'E-commerce Platform',
                  image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=300&h=200',
                  category: 'Web Development',
                  description: 'A full-featured e-commerce platform built with React and Node.js. Features include user authentication, product management, shopping cart, and payment integration.',
                  technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'Redux'],
                  github: 'https://github.com/yourusername/ecommerce',
                  preview: 'https://ecommerce-demo.com'
                },
                {
                  title: 'Mobile Banking App',
                  image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=300&h=200',
                  category: 'UI/UX Design',
                  description: 'A modern mobile banking application with focus on user experience and security. Includes features like biometric authentication, real-time transactions, and expense tracking.',
                  technologies: ['React Native', 'Firebase', 'Redux', 'Node.js', 'MongoDB', 'JWT'],
                  github: 'https://github.com/yourusername/banking-app',
                  preview: 'https://banking-app-demo.com'
                },
                {
                  title: 'Social Media Dashboard',
                  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300&h=200',
                  category: 'Web Development',
                  description: 'A comprehensive social media management dashboard that allows users to monitor and analyze their social media presence across multiple platforms.',
                  technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'PostgreSQL', 'AWS'],
                  github: 'https://github.com/yourusername/social-dashboard',
                  preview: 'https://social-dashboard-demo.com'
                },
                {
                  title: 'Fitness Tracking App',
                  image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=300&h=200',
                  category: 'Mobile Development',
                  description: 'An AI-powered fitness tracking application that provides personalized workout plans, nutrition advice, and progress tracking with advanced analytics.',
                  technologies: ['Flutter', 'TensorFlow', 'Python', 'Firebase', 'Google Fit API', 'Cloud Functions'],
                  github: 'https://github.com/yourusername/fitness-app',
                  preview: 'https://fitness-app-demo.com'
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="group bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="relative h-48">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="px-4 py-2 bg-white text-black rounded-lg transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Project
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-2 dark:text-white">{project.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    ),
    Portfolio: (
      <section data-section="My Work" className="space-y-8">
        {selectedProject ? (
          // Detailed Project View
          <div className="relative pt-2">
            {/* Close Button - Moved outside and adjusted positioning */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute -top-8 right-0 z-10 p-1.5 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 rounded-full text-white transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Project Hero */}
            <div className="relative h-[300px] rounded-lg overflow-hidden mt-1">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30">
                <div className="absolute bottom-0 p-8">
                  <h2 className="text-4xl font-bold text-white mb-2">{selectedProject.title}</h2>
                  <p className="text-gray-200">{selectedProject.category}</p>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="mt-8 space-y-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  {selectedProject.description}
                </p>
              </div>

              {/* Technologies */}
      <div>
                <h3 className="text-xl font-semibold dark:text-white mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  View Source
                </a>
                <a
                  href={selectedProject.preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Preview
                </a>
              </div>
            </div>
          </div>
        ) : (
          // Project Grid View
          <>
        <h2 className="text-4xl font-bold dark:text-white">My Work</h2>
        <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'E-commerce Platform',
              image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=300&h=200',
                  category: 'Web Development',
                  description: 'A full-featured e-commerce platform built with React and Node.js. Features include user authentication, product management, shopping cart, and payment integration.',
                  technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'Redux'],
                  github: 'https://github.com/yourusername/ecommerce',
                  preview: 'https://ecommerce-demo.com'
            },
            {
              title: 'Mobile Banking App',
              image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=300&h=200',
                  category: 'UI/UX Design',
                  description: 'A modern mobile banking application with focus on user experience and security. Includes features like biometric authentication, real-time transactions, and expense tracking.',
                  technologies: ['React Native', 'Firebase', 'Redux', 'Node.js', 'MongoDB', 'JWT'],
                  github: 'https://github.com/yourusername/banking-app',
                  preview: 'https://banking-app-demo.com'
            },
            {
              title: 'Social Media Dashboard',
              image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300&h=200',
                  category: 'Web Development',
                  description: 'A comprehensive social media management dashboard that allows users to monitor and analyze their social media presence across multiple platforms.',
                  technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'PostgreSQL', 'AWS'],
                  github: 'https://github.com/yourusername/social-dashboard',
                  preview: 'https://social-dashboard-demo.com'
            },
            {
              title: 'Fitness Tracking App',
              image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=300&h=200',
                  category: 'Mobile Development',
                  description: 'An AI-powered fitness tracking application that provides personalized workout plans, nutrition advice, and progress tracking with advanced analytics.',
                  technologies: ['Flutter', 'TensorFlow', 'Python', 'Firebase', 'Google Fit API', 'Cloud Functions'],
                  github: 'https://github.com/yourusername/fitness-app',
                  preview: 'https://fitness-app-demo.com'
            }
          ].map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg shadow-lg"
            >
                  <div className="relative h-48">
              <img
                src={project.image}
                alt={project.title}
                      className="w-full h-full object-cover grayscale transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 mix-blend-multiply"></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 opacity-100 flex flex-col justify-end p-4 transition-opacity duration-300">
                    <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                    <p className="text-gray-300 text-sm mt-1">{project.category}</p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <button 
                        onClick={() => setSelectedProject(project)}
                        className="text-sm text-white border border-white/30 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-colors"
                      >
                        View Project
                      </button>
                    </div>
              </div>
            </motion.div>
          ))}
        </div>
          </>
        )}
      </section>
    ),
    Service: (
      <section data-section="Services" className="space-y-8">
        <h2 className="text-4xl font-bold mb-6 dark:text-white">Services</h2>
        <div className="grid gap-6">
          {[
            {
              title: 'Web Development',
              description: 'Custom websites and web applications built with modern technologies.',
              price: 'Starting from $2,000'
            },
            {
              title: 'UI/UX Design',
              description: 'User-centered design solutions that enhance user experience.',
              price: 'Starting from $1,500'
            },
            {
              title: 'Mobile Development',
              description: 'Native and cross-platform mobile applications.',
              price: 'Starting from $3,000'
            },
            {
              title: 'Consulting',
              description: 'Technical consulting and project management services.',
              price: 'Starting from $100/hour'
            }
          ].map((service, index) => (
            <div key={index} className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
              <p className="text-gray-800 dark:text-gray-200 font-medium">{service.price}</p>
            </div>
          ))}
        </div>
      </section>
    ),
    News: (
      <section data-section="Latest News" className="space-y-8">
        <h2 className="text-4xl font-bold mb-6 dark:text-white">Latest News</h2>
        <div className="space-y-6">
          {[
            {
              title: 'Launched New E-commerce Platform',
              date: 'March 15, 2024',
              excerpt: 'Successfully delivered a cutting-edge e-commerce solution for a major retail client.'
            },
            {
              title: 'Speaking at Tech Conference',
              date: 'March 10, 2024',
              excerpt: 'Invited as a keynote speaker at the upcoming Web Development Summit 2024.'
            },
            {
              title: 'New Mobile App Release',
              date: 'March 5, 2024',
              excerpt: 'Released a revolutionary fitness tracking app with AI-powered features.'
            }
          ].map((post, index) => (
            <div key={index} className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{post.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{post.date}</p>
              <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
              <button className="mt-4 text-black dark:text-white font-medium hover:underline">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </section>
    ),
    Contact: (
      <section data-section="Get in Touch" className="space-y-8">
        <h2 className="text-4xl font-bold mb-6 dark:text-white">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form and Info */}
          <div className="space-y-6">
          <div className="space-y-3">
            {[
              { icon: Mail, text: 'coderxajay@gmail.com' },
                { icon: Phone, text: '+91 (895) 474 6865' },
                { icon: MapPin, text: 'Maharana Pratap Engineering College, Mandhana, Kanpur - 212108, India' }
            ].map((contact, index) => (
              <div key={index} className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <contact.icon className="w-5 h-5" />
                <span>{contact.text}</span>
              </div>
            ))}
          </div>
          
            <form className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows={3}
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              ></textarea>
            </div>
            <button className="w-full bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors">
              Send Message
            </button>
          </form>
        </div>

          {/* Map Section */}
          <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.5669012536164!2d80.22501547497392!3d26.547900583697416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c38a8bfffffff%3A0x5252eebd6d44f183!2sMaharana%20Pratap%20Engineering%20College!5e0!3m2!1sen!2sin!4v1709636961753!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-300"
            ></iframe>
          </div>
      </div>
      </section>
    )
  };

  if (isLoading) {
    return <PreLoader />;
  }

  if (location.pathname === '/matron') {
    return <AdminLogin />;
  }

  if (location.pathname === '/admin/dashboard') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Header - Updated for mobile */}
      <header className="bg-white dark:bg-gray-900 z-50 px-3 sm:px-4 md:px-8 py-3 border-b dark:border-gray-800 transition-colors duration-200 sticky top-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo - Made smaller on mobile */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => handlePageChange('Home')} 
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10">
                <AnimatedLogo isDarkMode={isDarkTheme} />
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold tracking-wider dark:text-white">
                MATRON
              </div>
            </button>
          </div>
          
          {/* Adjusted header buttons spacing */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <nav className="hidden md:flex space-x-4 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handlePageChange(item)}
                  className={`nav-item ${
                    activeItem === item 
                      ? 'active' 
                      : 'text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            <button
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDarkTheme ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5 text-black" />
              )}
            </button>

            <button
              className="md:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={toggleMobileMenu}
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Improved spacing */}
        <motion.div
          initial={false}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden"
        >
          <nav className="py-2 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  handlePageChange(item);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                  activeItem === item
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row flex-1">
        {/* Mobile Container - Single column layout */}
        <div className="md:hidden flex flex-col w-full">
          {/* Mobile Hero/Photo Section - Only show on Home page */}
          {activeItem === 'Home' && (
            <div className="w-full h-[40vh] relative">
              <div className="absolute inset-0">
                <div className="relative w-full h-full">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                    alt="Portrait"
                    className="w-full h-full object-cover grayscale"
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 mix-blend-multiply">
                    {!hideParticles && <ParticlesBackground />}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Content Section */}
          <div className={`flex-1 bg-gray-50 dark:bg-gray-800 p-4 ${activeItem !== 'Home' ? 'pt-16' : ''}`}>
            {/* Content with adjusted padding */}
            <div className="space-y-4">
              {isPageLoading ? (
                <div className="flex items-center justify-center h-[50vh]">
                  <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-black dark:border-t-white rounded-full animate-spin"></div>
                </div>
              ) : (
                contentComponents[activeItem] || (
                  <div className="text-center text-gray-600 dark:text-gray-300">
                    Content coming soon...
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Desktop Layout - Remains unchanged */}
        <div className="hidden md:block w-1/2 fixed top-[4.5rem] bottom-[52px] left-0">
          <div className="h-full flex flex-col">
            {/* Image Container */}
            <div className="flex-1 relative">
              <div className="absolute inset-0 m-4 mb-1">
                <div className="relative w-full h-full rounded-[18px] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                    alt="Portrait"
                    className="w-full h-full object-cover grayscale"
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 mix-blend-multiply">
                    {!hideParticles && activeItem === 'Home' && (
                      <ParticlesBackground />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block w-full md:w-1/2 md:ml-[50%] bg-white dark:bg-gray-900 overflow-hidden p-4 fixed top-[4.5rem] right-0 bottom-[52px]">
          <div className="h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4.5rem)] bg-gray-50 dark:bg-gray-800 rounded-[12px] sm:rounded-[18px] transition-colors duration-200 overflow-hidden flex flex-col">
            {/* Sticky Header - Moved outside the scrollable container */}
            <div 
              className={`sticky top-0 z-20 transition-all duration-300 ${
                  isScrolled && activeItem !== 'Home'
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 -translate-y-full'
                }`}
              >
                <div className="bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currentSection || activeItem}
                  </h2>
                </div>
              </div>

            <div 
              className="flex-1 overflow-y-auto hide-scrollbar relative rounded-b-[18px] scroll-smooth"
              style={{ marginTop: '-50px' }}
              onScroll={handleScroll}
            >
              {/* Content with adjusted padding */}
              <div className="p-4 md:p-6 lg:p-8">
                {isPageLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                    <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-black dark:border-t-white rounded-full animate-spin"></div>
                  </div>
                ) : (
                  contentComponents[activeItem] || (
                  <div className="text-center text-gray-600 dark:text-gray-300">
                    Content coming soon...
                  </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Footer - Fixed at bottom */}
        <footer className="hidden md:block fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 px-8 py-4 transition-colors duration-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-300">Copyright © 2024</div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                <Dribbble size={20} />
              </a>
              <a href="#" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                <TikTok size={20} />
              </a>
            </div>
          </div>
        </footer>

        {/* Add mobile footer */}
        <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 px-4 py-3">
          <div className="flex justify-center space-x-6">
            {[Facebook, Twitter, Instagram, Dribbble, TikTok].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

export default App;