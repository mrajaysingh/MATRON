import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Dribbble, BookText as TikTok, Sun, Moon, Mail, Phone, MapPin } from 'lucide-react';
import ParticlesBackground from './components/ParticlesBackground';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { motion } from 'framer-motion';
import AnimatedLogo from './components/AnimatedLogo';
import TypewriterText from './components/TypewriterText';

const menuItems = ['Home', 'About', 'Portfolio', 'Service', 'News', 'Contact'];

function MainLayout() {
  const [activeItem, setActiveItem] = useState('Home');
  const [hideParticles, setHideParticles] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  useEffect(() => {
    setHideParticles(false);
  }, [activeItem]);

  const contentComponents: { [key: string]: React.ReactNode } = {
    Home: (
      <div className="space-y-32">
        {/* Hero Section - Full Height */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-[calc(100vh-16rem)] flex flex-col justify-center"
        >
          <div className="max-w-xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-4 dark:text-white"
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
              className="flex space-x-4"
            >
              <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 text-lg font-medium rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Get in Touch
              </button>
              <button className="border-2 border-black dark:border-white text-black dark:text-white px-8 py-4 text-lg font-medium rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
                Download CV
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Resume Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="space-y-16"
        >
          {/* Resume Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-4">Resume</h2>
            <div className="w-20 h-1 bg-black dark:bg-white mx-auto rounded-full"></div>
          </motion.div>

          {/* Skills Section - Now in single column */}
          <div className="space-y-16">
            {/* Programming Languages */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-6 dark:text-white">Programming Languages</h3>
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
            </motion.div>

            {/* Frameworks & Tools */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-6 dark:text-white">Frameworks & Tools</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                    <div className="relative w-20 h-20">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle
                          className="text-gray-200 dark:text-gray-600"
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r="32"
                          cx="40"
                          cy="40"
                        />
                        <motion.circle
                          className="text-black dark:text-white"
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r="32"
                          cx="40"
                          cy="40"
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
            </motion.div>

            {/* Soft Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-6 dark:text-white">Soft Skills & Expertise</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Problem Solving & Analytical Thinking',
                  'Team Leadership & Management',
                  'Effective Communication',
                  'Project Management',
                  'Agile Methodology',
                  'UI/UX Design Principles',
                  'Performance Optimization',
                  'System Architecture'
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-600 p-3 rounded-lg"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-2 h-2 bg-black dark:bg-white rounded-full"
                    />
                    <span className="text-gray-700 dark:text-gray-200">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Featured Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-black dark:bg-white mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'E-commerce Platform',
                description: 'A full-stack e-commerce solution with React and Node.js',
                image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=300&h=200',
                technologies: ['React', 'Node.js', 'MongoDB']
              },
              {
                title: 'Portfolio Website',
                description: 'Modern portfolio website with Next.js and Tailwind CSS',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300&h=200',
                technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion']
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
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
      </div>
    ),
    About: (
      <div className="max-w-xl">
        <h2 className="text-4xl font-bold mb-6 dark:text-white">About Me</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          I'm a passionate creative freelancer with over 5 years of experience in
          digital design and development. My work focuses on creating meaningful
          and impactful digital experiences.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          I believe in the power of clean, minimalist design combined with
          cutting-edge technology to deliver exceptional results for my clients.
        </p>
      </div>
    ),
    Portfolio: (
      <div className="max-w-xl">
        <h2 className="text-4xl font-bold mb-6 dark:text-white">My Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'E-commerce Platform',
              image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=300&h=200',
              category: 'Web Development'
            },
            {
              title: 'Mobile Banking App',
              image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=300&h=200',
              category: 'UI/UX Design'
            },
            {
              title: 'Social Media Dashboard',
              image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300&h=200',
              category: 'Web Development'
            },
            {
              title: 'Fitness Tracking App',
              image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=300&h=200',
              category: 'Mobile Development'
            }
          ].map((project, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-semibold">{project.title}</h3>
                <p className="text-gray-200 text-sm">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    Service: (
      <div className="max-w-xl">
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
      </div>
    ),
    News: (
      <div className="max-w-xl">
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
      </div>
    ),
    Contact: (
      <div className="h-full flex flex-col justify-center">
        <div className="max-w-xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-6 dark:text-white">Get in Touch</h2>
          <div className="space-y-6 w-full">
            <div className="space-y-3">
              {[
                { icon: Mail, text: 'coderxajay@gmail.com' },
                { icon: Phone, text: '+1 (555) 123-4567' },
                { icon: MapPin, text: 'New York, NY, United States' }
              ].map((contact, index) => (
                <div key={index} className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                  <contact.icon className="w-5 h-5" />
                  <span>{contact.text}</span>
                </div>
              ))}
            </div>
            
            <form className="space-y-3 w-full">
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
        </div>
      </div>
    )
  };

  if (location.pathname === '/matron') {
    return <AdminLogin />;
  }

  if (location.pathname === '/admin/dashboard') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 z-50 px-8 py-4 border-b dark:border-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <AnimatedLogo isDarkMode={isDarkTheme} />
            <div className="text-2xl font-bold tracking-wider dark:text-white">MATRON</div>
          </div>
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex space-x-4 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveItem(item)}
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
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkTheme ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5 text-black" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row flex-1">
        {/* Left Side - Fixed Image */}
        <div className="w-full md:w-1/2 h-[calc(100vh-8.5rem)]">
          <div className="h-full relative">
            <div 
              className="absolute inset-0 m-4"
              onMouseEnter={() => setHideParticles(true)}
              onMouseLeave={() => {
                setTimeout(() => {
                  setHideParticles(false);
                }, 100);
              }}
            >
              <div className="relative w-full h-full rounded-[18px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                  alt="Portrait"
                  className="w-full h-full object-cover grayscale"
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

        {/* Right Side - Scrollable Content */}
        <div className="w-full md:w-1/2 bg-gray-50 dark:bg-gray-800 transition-colors duration-200 h-[calc(100vh-8.5rem)] overflow-y-auto hide-scrollbar">
          <div className="h-full p-8 md:p-16">
            {contentComponents[activeItem] || (
              <div className="text-center text-gray-600 dark:text-gray-300">
                Content coming soon...
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 px-8 py-4 transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
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