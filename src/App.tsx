import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Instagram, Sun, Moon, Mail, Phone, MapPin, Menu, X, Github, ExternalLink, ChevronDown, Linkedin } from 'lucide-react';
import ParticlesBackground from './components/ParticlesBackground';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedLogo from './components/AnimatedLogo';
import TypewriterText from './components/TypewriterText';
import PreLoader from './components/PreLoader';
import { ProjectCardLoader, AboutLoader, SkillsLoader, ContactLoader } from './components/ContentLoaders';
import NotFound from './components/NotFound';
import CustomCursor from './components/CustomCursor';
import ScrollToTopButton from './components/ScrollToTopButton';

const menuItems = ['Home', 'About', 'Portfolio', 'Service', 'News', 'Contact'];

const NotificationPopup = ({ 
  isVisible, 
  message, 
  type = 'success',
  onClose 
}: { 
  isVisible: boolean; 
  message: string; 
  type?: 'success' | 'error';
  onClose: () => void;
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="relative">
            <div className={`px-6 py-4 rounded-lg shadow-lg ${
              type === 'success' 
                ? 'bg-black dark:bg-white text-white dark:text-black' 
                : 'bg-red-600 text-white'
            }`}>
              <div className="flex items-center space-x-3">
                {type === 'success' ? (
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                ) : (
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                )}
                <p className="font-medium">{message}</p>
              </div>
              
              {/* Progress bar */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className={`absolute bottom-0 left-0 h-1 ${
                  type === 'success' 
                    ? 'bg-white/20 dark:bg-black/20' 
                    : 'bg-red-400'
                }`}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function MainLayout() {
  const [activeItem, setActiveItem] = useState('Home');
  const [hideParticles, setHideParticles] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
    // Add smooth scroll behavior to html element
    document.documentElement.style.scrollBehavior = 'smooth';
  }, [isDarkTheme]);

  useEffect(() => {
    setHideParticles(false);
  }, [activeItem]);

  useEffect(() => {
    // Simulate preloader time
    const preloaderTimer = setTimeout(() => {
      setIsLoading(false);
      // After preloader, show content loaders for a longer duration
      setTimeout(() => {
        setIsInitialLoading(false);
      }, 2000); // Increased from 1000 to 2000ms
    }, 2000);

    return () => clearTimeout(preloaderTimer);
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
    const container = e.currentTarget;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    
    // Calculate scroll progress
    const progress = scrollTop / (scrollHeight - clientHeight);
    setScrollProgress(progress);
    
    // Show/hide scroll button - Changed threshold to 50px
    setShowScrollButton(scrollTop > 50); // Changed from clientHeight/2 to 50
    
    setIsScrolled(scrollTop > 100);

    // Find current section
    const sections = container.querySelectorAll('section[data-section]');
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
    setIsInitialLoading(true); // Reset initial loading state
    
    // First show the page transition loader
    setTimeout(() => {
      setIsPageLoading(false);
      // Then show content loader
      setTimeout(() => {
        setIsInitialLoading(false);
      }, 1500); // Show content loader for 1.5s
    }, 500);
  };

  const scrollToContact = () => {
    setIsPageLoading(true); // Show preloader
    setActiveItem('Contact');
    setIsInitialLoading(true); // Reset initial loading state
    
    // First show the page transition loader
    setTimeout(() => {
      setIsPageLoading(false);
      // Then show content loader
      setTimeout(() => {
        setIsInitialLoading(false);
        // After content is loaded, scroll to contact section
        const contactSection = document.querySelector('[data-section="Get in Touch"]');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1500); // Show content loader for 1.5s
    }, 500); // Show page transition loader for 0.5s
  };

  const scrollToTop = () => {
    const container = document.querySelector('.scroll-smooth');
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const contentComponents: { [key: string]: React.ReactNode } = {
    Home: (
      <div className="space-y-8 md:space-y-16">
        {/* Hero Section */}
        <section data-section="Home" className="min-h-[30vh] md:h-[calc(100vh-16rem)] flex flex-col justify-center">
          <div className="max-w-xl space-y-3">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[40px] md:text-5xl lg:text-7xl font-bold tracking-tight dark:text-white"
              style={{ 
                fontFamily: 'Researcher',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.1
              }}
            >
              AJAY SINGH
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300"
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
            </motion.div>

            <div className="pt-3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button 
                  onClick={scrollToContact}
                  className="w-full sm:w-auto bg-black dark:bg-white text-white dark:text-black px-8 py-3.5 text-base rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                  style={{ fontFamily: 'Researcher', fontWeight: 400 }}
                >
                  Get in Touch
                </button>
                <a 
                  href="https://drive.google.com/uc?export=download&id=1wvWKe7u7y9V8fw6PDJaoIm9WPjClYeD3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto border-2 border-black dark:border-white text-black dark:text-white px-8 py-3.5 text-base rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-center"
                  style={{ fontFamily: 'Researcher', fontWeight: 400 }}
                >
                  Download CV
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    ),
    About: (
      <div className="space-y-6">
        {/* About Section */}
        <section data-section="About Me" className="min-h-[100vh] space-y-8 relative">
          <h2 className="text-4xl font-bold mb-6 dark:text-white">About Me</h2>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <a 
              href="https://www.skybersupport.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-black/5 dark:bg-white/5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
            >
              <img src="/logo/sponser-skyber.svg" alt="SKYBER" className="h-6 w-6" />
              <span className="font-medium text-black dark:text-white">Founder of SKYBER</span>
            </a>
            <a 
              href="#"
              className="flex items-center space-x-2 px-4 py-2 bg-black/5 dark:bg-white/5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
            >
              <img src="/logo/sponser-skyber.svg" alt="Amritanam" className="h-6 w-6" />
              <span className="font-medium text-black dark:text-white">Co-founder of Amritanam</span>
            </a>
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
            I'm a passionate <span className="font-medium text-black dark:text-white bg-[#3D3D3D]/5 dark:bg-[#3D3D3D]/20 px-2 py-0.5 rounded">cybersecurity enthusiast</span>, <span className="font-medium text-black dark:text-white bg-[#3D3D3D]/5 dark:bg-[#3D3D3D]/20 px-2 py-0.5 rounded">ethical hacker</span>, and <span className="font-medium text-black dark:text-white bg-[#3D3D3D]/5 dark:bg-[#3D3D3D]/20 px-2 py-0.5 rounded">web developer</span> with a strong background in AI and machine learning. As a tech entrepreneur, I focus on securing users from cyber threats while developing innovative web solutions.
            <br /><br />
            With a deep interest in programming, ethical hacking, and future technologies, I strive to create meaningful and impactful digital experiences. My work blends cutting-edge security practices with modern web development to deliver exceptional results, ensuring both functionality and protection in the ever-evolving digital landscape.
          </p>

          {/* Circular Skills - Only show on desktop */}
          <div className="hidden md:grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
            {[
              { name: 'React', level: 95 },
              { name: 'Node.js', level: 88 },
              { name: 'Next.js', level: 85 },
              { name: 'Docker', level: 78 }
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

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 bottom-[165px] z-10"
            initial={{ opacity: 1 }}
            animate={{ opacity: isScrolled ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex flex-col items-center bg-white/80 dark:bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full"
            >
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Scroll for more</span>
              <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </motion.div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section data-section="My Skills" className="space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center dark:text-white mb-6">
              My Skills
          </h2>

          {/* Frameworks & Tools */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { name: 'React', level: 95 },
              { name: 'Node.js', level: 88 },
              { name: 'Next.js', level: 85 },
              { name: 'Docker', level: 78 }
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

            {/* Soft Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { skill: 'Problem Solving & Analytical Thinking', color: 'from-black/5 to-black/10 dark:from-white/5 dark:to-white/10' },
              { skill: 'Team Leadership & Management', color: 'from-black/10 to-black/5 dark:from-white/10 dark:to-white/5' },
              { skill: 'Effective Communication', color: 'from-black/5 to-black/10 dark:from-white/5 dark:to-white/10' },
              { skill: 'Project Management', color: 'from-black/10 to-black/5 dark:from-white/10 dark:to-white/5' },
              { skill: 'Agile Methodology', color: 'from-black/5 to-black/10 dark:from-white/5 dark:to-white/10' },
              { skill: 'UI/UX Design Principles', color: 'from-black/10 to-black/5 dark:from-white/10 dark:to-white/5' },
              { skill: 'Performance Optimization', color: 'from-black/5 to-black/10 dark:from-white/5 dark:to-white/10' },
              { skill: 'System Architecture', color: 'from-black/10 to-black/5 dark:from-white/10 dark:to-white/5' }
            ].map((item, index) => (
                <motion.div
                key={item.skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group p-4 rounded-lg bg-gradient-to-r ${item.color} backdrop-blur-sm border border-black/5 dark:border-white/5 hover:scale-[1.02] transition-all duration-200 hover:border-black/10 dark:hover:border-white/10`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{item.skill}</span>
                  <div className="h-1.5 w-1.5 rounded-full bg-black/20 dark:bg-white/20 group-hover:bg-black/40 dark:group-hover:bg-white/40 transition-colors"></div>
                </div>
                </motion.div>
              ))}
            </div>
        </section>

        {/* Certifications Section */}
        <section data-section="Certifications" className="space-y-8 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center dark:text-white mb-12">Certifications</h2>
          
          <div className="grid gap-8">
            {[
              {
                title: 'CISCO Ethical Hacker NETCAD',
                description: 'Advanced certification in ethical hacking and network security from Cisco Networking Academy.',
                image: '/certificates/placeholder.png',
                date: 'June 2025'
              },
              {
                title: 'Career Essentials in Cybersecurity',
                description: 'Comprehensive training in cybersecurity fundamentals and best practices.',
                image: '/certificates/placeholder.png',
                date: 'March 2024'
              },
              {
                title: 'Generative AI Fundamentals',
                description: 'In-depth study of generative AI technologies and applications.',
                image: '/certificates/placeholder.png',
                date: 'February 2024'
              },
              {
                title: 'GitHub Foundations',
                description: 'Core concepts of version control and collaborative development using GitHub.',
                image: '/certificates/placeholder.png',
                date: 'January 2024'
              },
              {
                title: 'Cybersecurity Foundations',
                description: 'Fundamental principles and practices of modern cybersecurity.',
                image: '/certificates/placeholder.png',
                date: 'December 2023'
              },
              {
                title: 'Introduction to Large Language Models',
                description: 'Comprehensive overview of LLM technologies and their applications.',
                image: '/certificates/placeholder.png',
                date: 'November 2023'
              },
              {
                title: 'Virtual Simulation in Cybersecurity',
                description: 'Hands-on experience with virtual cybersecurity environments and simulations.',
                image: '/certificates/placeholder.png',
                date: 'October 2023'
              },
              {
                title: 'NVIDIA Course Completion Certificate',
                description: 'Advanced training in GPU computing and parallel processing technologies.',
                image: '/certificates/placeholder.png',
                date: 'September 2023'
              }
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white dark:bg-black/40 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Certificate Image */}
                  <div className="w-full md:w-1/3 relative overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />
                  </div>

                  {/* Certificate Content */}
                  <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white group-hover:text-black/70 dark:group-hover:text-white/70">
                        {cert.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {cert.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Issued: {cert.date}
                      </p>
                    </div>
                    
                    <button 
                      className="mt-4 inline-flex items-center space-x-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <span>View Certificate</span>
                      <svg 
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M14 5l7 7m0 0l-7 7m7-7H3" 
                        />
                      </svg>
                    </button>
                  </div>
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
                  className="group bg-white dark:bg-black/40 rounded-xl overflow-hidden shadow-lg"
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
                        <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-black/40 text-gray-700 dark:text-gray-300 rounded-full text-sm">
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
            {/* Close Button - Adjusted size and position */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute -top-4 right-0 z-10 p-1 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 rounded-full text-white transition-colors shadow-lg"
            >
              <X className="w-4 h-4" />
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
          <>
        <h2 className="text-4xl font-bold dark:text-white">My Work</h2>
        <div className="mt-8 max-w-4xl mx-auto space-y-12">
          {/* Initial 4 Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <div className="relative w-full h-full">
              <img
                src={project.image}
                alt={project.title}
                      className="w-full h-full object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30" />
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

          {/* Additional 8 Projects - Revealed on Scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'AI Content Generator',
                  image: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&q=80&w=300&h=200',
                  category: 'AI/ML',
                  description: 'An advanced AI-powered content generation platform that creates high-quality articles, blog posts, and marketing copy using state-of-the-art language models.',
                  technologies: ['Python', 'TensorFlow', 'OpenAI API', 'FastAPI', 'React', 'PostgreSQL'],
                  github: 'https://github.com/yourusername/ai-content-gen',
                  preview: 'https://ai-content-gen-demo.com'
                },
                {
                  title: 'Crypto Trading Bot',
                  image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=300&h=200',
                  category: 'Blockchain',
                  description: 'An automated cryptocurrency trading bot that uses advanced algorithms and machine learning to analyze market trends and execute profitable trades.',
                  technologies: ['Python', 'TensorFlow', 'Binance API', 'MongoDB', 'Docker', 'AWS'],
                  github: 'https://github.com/yourusername/crypto-bot',
                  preview: 'https://crypto-bot-demo.com'
                },
                {
                  title: 'Real-time Chat Platform',
                  image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&q=80&w=300&h=200',
                  category: 'Web Development',
                  description: 'A scalable real-time chat platform with features like group messaging, file sharing, and end-to-end encryption.',
                  technologies: ['Socket.io', 'React', 'Node.js', 'Redis', 'MongoDB', 'WebRTC'],
                  github: 'https://github.com/yourusername/chat-platform',
                  preview: 'https://chat-platform-demo.com'
                },
                {
                  title: 'Smart Home Automation',
                  image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=300&h=200',
                  category: 'IoT',
                  description: 'A comprehensive IoT solution for home automation, featuring voice control, energy monitoring, and smart device integration.',
                  technologies: ['Raspberry Pi', 'Python', 'MQTT', 'Node.js', 'React Native', 'MongoDB'],
                  github: 'https://github.com/yourusername/smart-home',
                  preview: 'https://smart-home-demo.com'
                },
                {
                  title: 'Portfolio Website Builder',
                  image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=300&h=200',
                  category: 'Web Development',
                  description: 'A drag-and-drop portfolio website builder with customizable templates and real-time preview functionality.',
                  technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'AWS S3'],
                  github: 'https://github.com/yourusername/portfolio-builder',
                  preview: 'https://portfolio-builder-demo.com'
                },
                {
                  title: 'Task Management System',
                  image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=300&h=200',
                  category: 'Web Development',
                  description: 'A collaborative task management system with real-time updates, file sharing, and team communication features.',
                  technologies: ['Vue.js', 'Laravel', 'MySQL', 'Redis', 'Docker', 'AWS'],
                  github: 'https://github.com/yourusername/task-manager',
                  preview: 'https://task-manager-demo.com'
                },
                {
                  title: 'AR Navigation App',
                  image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300&h=200',
                  category: 'Mobile Development',
                  description: 'An augmented reality navigation app that provides real-time directions and points of interest through your camera view.',
                  technologies: ['ARKit', 'Swift', 'CoreML', 'MapKit', 'Firebase', 'Node.js'],
                  github: 'https://github.com/yourusername/ar-navigation',
                  preview: 'https://ar-navigation-demo.com'
                },
                {
                  title: 'Weather Forecast App',
                  image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80&w=300&h=200',
                  category: 'Mobile Development',
                  description: 'A beautiful weather forecast application with interactive maps, severe weather alerts, and detailed meteorological data.',
                  technologies: ['React Native', 'Redux', 'OpenWeather API', 'Node.js', 'MongoDB', 'AWS'],
                  github: 'https://github.com/yourusername/weather-app',
                  preview: 'https://weather-app-demo.com'
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-lg shadow-lg"
                >
                  <div className="relative w-full h-full">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30" />
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
          </motion.div>
        </div>
          </>
        )}
      </section>
    ),
    Service: (
      <section data-section="Services" className="space-y-8">
        <h2 className="text-4xl font-bold mb-6 dark:text-white">Services</h2>
        <div className="grid gap-8">
          {[
            {
              title: 'Web Development',
              description: 'Custom websites and web applications built with modern technologies. Specializing in responsive design, performance optimization, and scalable architecture.',
              price: 'Starting from $115',
              features: ['Custom Web Applications', 'Responsive Design', 'SEO Optimization', 'Performance Tuning']
            },
            {
              title: 'UI/UX Design',
              description: 'User-centered design solutions that enhance user experience. Creating intuitive interfaces with modern design principles and user research.',
              price: 'Starting from $180',
              features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
            },
            {
              title: 'APP Development',
              description: 'Native and cross-platform mobile applications. Building high-performance apps with seamless user experience across all devices.',
              price: 'Starting from $130',
              features: ['iOS & Android Apps', 'Cross-platform Development', 'App Store Optimization', 'Push Notifications']
            },
            {
              title: 'Cyber Security',
              description: 'Comprehensive security solutions to protect your digital assets. Implementing robust security measures and conducting thorough vulnerability assessments.',
              price: 'Starting from $200',
              features: ['Security Audits', 'Penetration Testing', 'Security Training', 'Incident Response']
            },
            {
              title: 'Tech Consulting',
              description: 'Expert guidance on technology strategy, architecture, and implementation. Helping businesses make informed decisions about their technology stack.',
              price: 'Starting from $80',
              features: ['Technical Strategy', 'Architecture Review', 'Team Training', 'Project Management']
            },
            {
              title: 'Tech Support',
              description: 'Reliable technical support services to keep your systems running smoothly. Quick resolution of technical issues and proactive maintenance.',
              price: 'Starting from $50',
              features: ['24/7 Support', 'System Maintenance', 'Issue Resolution', 'Performance Monitoring']
            }
          ].map((service, index) => (
            <div 
              key={index} 
              className="group flex flex-col md:flex-row gap-6 bg-white dark:bg-black/40 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Left side with gradient background */}
              <div className="w-full md:w-2/5 bg-gradient-to-br from-black/5 to-black/10 dark:from-white/5 dark:to-white/10 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-3 dark:text-white">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                </div>
                <div className="mt-4">
                  <p className="text-lg">
                    <span className="text-gray-600 dark:text-gray-400">Starting from </span>
                    <span className="font-semibold text-black dark:text-white bg-[#3D3D3D]/5 dark:bg-[#3D3D3D]/20 px-2 py-0.5 rounded">${service.price.split('$')[1]}</span>
                  </p>
                </div>
              </div>

              {/* Right side with features and button */}
              <div className="w-full md:w-3/5 p-6 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button 
                  className="mt-6 w-full bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors duration-300 font-medium"
                >
                  Request Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    ),
    News: (
      <section data-section="Latest News" className="space-y-8">
        <h2 className="text-4xl font-bold mb-6 dark:text-white">Latest News</h2>
        <div className="grid gap-8">
          {[
            {
              title: 'Launched New E-commerce Platform',
              date: 'March 15, 2024',
              excerpt: 'Successfully delivered a cutting-edge e-commerce solution for a major retail client, featuring advanced analytics, AI-powered recommendations, and seamless payment integration.',
              category: 'Project Launch',
              tags: ['E-commerce', 'AI', 'Analytics', 'Payment Gateway'],
              image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=300&h=200'
            },
            {
              title: 'Speaking at Tech Conference',
              date: 'March 10, 2024',
              excerpt: 'Invited as a keynote speaker at the upcoming Web Development Summit 2024. Will be sharing insights on modern web architecture and performance optimization techniques.',
              category: 'Event',
              tags: ['Conference', 'Web Development', 'Speaking', 'Architecture'],
              image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=300&h=200'
            },
            {
              title: 'New Mobile App Release',
              date: 'March 5, 2024',
              excerpt: 'Released a revolutionary fitness tracking app with AI-powered features, real-time health monitoring, and personalized workout recommendations.',
              category: 'Product Release',
              tags: ['Mobile App', 'Fitness', 'AI', 'Health Tech'],
              image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=300&h=200'
            }
          ].map((post, index) => (
            <div 
              key={index} 
              className="group flex flex-col md:flex-row gap-6 bg-white dark:bg-black/40 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Left side with image */}
              <div className="w-full md:w-2/5 relative overflow-hidden">
                <div className="absolute inset-0">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/20 group-hover:from-black/60 group-hover:to-black/30 transition-colors duration-300" />
                </div>
                <div className="relative p-6 h-full flex flex-col justify-between text-white">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                    {post.category}
                  </span>
                  <p className="text-sm font-medium">{post.date}</p>
                </div>
              </div>

              {/* Right side with content */}
              <div className="w-full md:w-3/5 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-3 dark:text-white group-hover:text-black/70 dark:group-hover:text-white/70 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-black/5 dark:bg-white/5 text-sm text-gray-600 dark:text-gray-400 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button 
                  className="mt-6 w-full bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors duration-300 font-medium flex items-center justify-center group"
                >
                  <span>Read Full Article</span>
                  <svg 
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
              </button>
              </div>
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
          
            <form className="space-y-3" onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              
              try {
                console.log('Sending email request...');
                const response = await fetch('/api/send-email', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    message: formData.get('message'),
                  }),
                });

                console.log('Response status:', response.status);
                const data = await response.json();
                console.log('Response data:', data);

                if (response.ok) {
                  setNotification({
                    show: true,
                    message: 'Message sent successfully! We will get back to you soon.',
                    type: 'success'
                  });
                  form.reset();
                } else {
                  throw new Error(data.error || 'Failed to send message');
                }
              } catch (error) {
                console.error('Error details:', error);
                setNotification({
                  show: true,
                  message: error instanceof Error ? error.message : 'Failed to send message. Please try again later.',
                  type: 'error'
                });
              }
            }}>
            <div>
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-black/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-black/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>
            <div>
              <textarea
                name="message"
                required
                placeholder="Your Message"
                rows={3}
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-black/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              style={{ fontFamily: 'Researcher', fontWeight: 400 }}
            >
              <span>Send Message</span>
              <svg 
                className="w-5 h-5 animate-bounce" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
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
    <div className="min-h-screen flex flex-col bg-white dark:bg-black transition-colors duration-200">
      {/* Add NotificationPopup */}
      <NotificationPopup
        isVisible={notification.show}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification(prev => ({ ...prev, show: false }))}
      />

      {/* Header - Updated for mobile */}
      <header className="bg-white dark:bg-black z-50 px-3 sm:px-4 md:px-8 py-3 border-b dark:border-gray-800 transition-colors duration-200 sticky top-0 rounded-b-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo - Adjusted alignment */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => handlePageChange('Home')} 
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            > 
              <div className="w-8 h-8 flex items-center">
                <AnimatedLogo isDarkMode={isDarkTheme} />
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-normal tracking-wider dark:text-white" style={{ fontFamily: 'Stardock' }}>
                MATRON
              </div>
            </button>
          </div>
          
          {/* Adjusted header buttons spacing */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Navigation Menu */}
            <nav className="hidden md:flex space-x-2 bg-gray-50 dark:bg-black/40 p-2 rounded-lg">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handlePageChange(item)}
                  className={`nav-item ${
                    activeItem === item 
                      ? 'active' 
                      : 'text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                  style={{ 
                    fontFamily: 'Researcher',
                    fontWeight: 400,
                    fontSize: '0.8rem'
                  }}
                >
                  {item}
                </button>
              ))}
            </nav>

            <button
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-black/40 transition-colors"
              style={{ fontFamily: 'Researcher', fontWeight: 400 }}
            >
              {isDarkTheme ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5 text-black" />
              )}
            </button>

            <button
              className="md:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-black/40"
              onClick={toggleMobileMenu}
              style={{ fontFamily: 'Researcher', fontWeight: 400 }}
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
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
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-black/40'
                }`}
                style={{ 
                  fontFamily: 'Researcher',
                  fontWeight: 400
                }}
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
            <div className="w-full h-[45vh] relative">
              <div className="absolute inset-0">
                <div className="relative w-full h-full">
                  <img
                    src="/profile-image.png"
                    alt="Portrait"
                    className="w-full h-full object-cover grayscale"
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30" />
                </div>
              </div>
            </div>
          )}

          {/* Mobile Content Section */}
          <div className={`flex-1 bg-gray-50 dark:bg-gray-800 p-4 pb-16 ${activeItem !== 'Home' ? 'pt-4' : 'pt-7'}`}>
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

        {/* Desktop Layout - Left Container */}
        <div className="hidden md:block w-1/2 fixed top-[4.5rem] bottom-[60px] left-0">
          <div className="h-full flex flex-col">
            {/* Image Container */}
            <div className="flex-1 relative">
              <div className="absolute inset-0 m-4 mb-1">
                <div className="relative w-full h-full rounded-[18px] overflow-hidden">
                  <img
                    src="/profile-image.png"
                    alt="Portrait"
                    className="w-full h-full object-cover grayscale"
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30" />
                  {!hideParticles && (
                    <div className="absolute inset-0 z-10">
                      <ParticlesBackground />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Right Container */}
        <div className="hidden md:block w-full md:w-1/2 md:ml-[50%] bg-white dark:bg-black overflow-hidden p-4 fixed top-[4.5rem] right-0 bottom-[50px]">
          <div className="h-full bg-gray-50 dark:bg-black rounded-[12px] sm:rounded-[18px] transition-colors duration-200 overflow-hidden flex flex-col">
            {/* Sticky Header - Moved outside the scrollable container */}    
            <div 
              className={`sticky top-0 z-20 transition-all duration-300 ${
                  isScrolled && activeItem !== 'Home'
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 -translate-y-full'
                }`}
              >
                <div className="bg-gray-50 dark:bg-black p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currentSection || activeItem}
                  </h2>
                </div>
              </div>

            <div 
              className="flex-1 overflow-y-auto hide-scrollbar relative rounded-b-[18px] scroll-smooth"
              style={{ marginTop: '-70px' }}
              onScroll={handleScroll}
            >
              {/* Content with adjusted padding */}
              <div className="p-4 md:p-6 lg:p-8">
                {isPageLoading ? (
                  // Page transition loader (circular)
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-black">
                    <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-black dark:border-t-white rounded-full animate-spin"></div>
                  </div>
                ) : isInitialLoading ? (
                  // Initial content loaders
                  <div className="w-full">
                    {activeItem === 'Portfolio' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[...Array(4)].map((_, i) => (
                          <ProjectCardLoader key={i} isDark={isDarkTheme} />
                        ))}
                      </div>
                    )}
                    {activeItem === 'About' && <AboutLoader isDark={isDarkTheme} />}
                    {activeItem === 'Contact' && <ContactLoader isDark={isDarkTheme} />}
                    {activeItem === 'Service' && (
                      <div className="space-y-6">
                        {[...Array(4)].map((_, i) => (
                          <SkillsLoader key={i} isDark={isDarkTheme} />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Actual content
                  <div className="w-full">
                    {contentComponents[activeItem] || (
                      <div className="text-center text-gray-600 dark:text-gray-300">
                        Content coming soon...
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add ScrollToTopButton */}
        {activeItem !== 'Home' && (
          <ScrollToTopButton 
            progress={scrollProgress}
            onClick={scrollToTop}
            isVisible={showScrollButton}
          />
        )}

        {/* Desktop Footer - Fixed at bottom */}
                  <footer className="hidden md:block fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t dark:border-gray-800 px-8 py-4 transition-colors duration-200 z-10 rounded-t-xl">
          <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="text-sm text-gray-600 dark:text-gray-300">Copyright © {new Date().getFullYear()}</div>
                <span className="text-gray-400">|</span>
                <a 
                  href="https://www.skybersupport.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <span>Powered by</span>
                  <img src="/logo/sponser-skyber.svg" alt="SKYBER" className="h-4 w-4" />
                  <span className="font-medium">SKYBER</span>
                </a>
              </div>
            <div className="flex space-x-6">
                <a 
                  href="https://github.com/mrajaysingh"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/ajaysinghzi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="https://www.instagram.com/_ajay_singh_._/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </footer>

        {/* Add mobile footer */}
        <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t dark:border-gray-800 px-4 py-3 rounded-t-xl">
          <div className="flex flex-col items-center space-y-2">
          <div className="flex justify-center space-x-6">
              <a
              href="https://github.com/mrajaysingh"
              target="_blank"
              rel="noopener noreferrer"
                className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
              >
              <Github size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/ajaysinghzi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="https://www.instagram.com/_ajay_singh_._/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            >
              <Instagram size={18} />
            </a>
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs">
              <span className="text-gray-600 dark:text-gray-300">Copyright © {new Date().getFullYear()}</span>
              <span className="text-gray-400">|</span>
              <a 
                href="https://www.skybersupport.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <span>Powered by</span>
                <img src="/logo/sponser-skyber.svg" alt="SKYBER" className="h-3 w-3" />
                <span className="font-medium">SKYBER</span>
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function App() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    // Set initial dark theme
    document.documentElement.classList.add('dark');
    
    // Check if it's a mobile device
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Router>
      {!isMobileDevice && <CustomCursor />} {/* Only show on non-mobile devices */}
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/matron" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;