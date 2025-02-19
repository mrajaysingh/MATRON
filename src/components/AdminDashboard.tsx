import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Users,
  Eye,
  MessageSquare,
  BarChart2,
  Settings,
  FileText,
  Image,
  Mail,
  Layout,
  Menu,
  Sun,
  Moon,
  Users2,
  UserPlus,
  Clock,
  Calendar,
  Bell,
  Inbox,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  MoreVertical,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import AnimatedLogo from '../components/AnimatedLogo';

const menuItems = [
  { id: 'dashboard', icon: Layout, label: 'Dashboard' },
  { id: 'pages', icon: FileText, label: 'Pages' },
  { id: 'portfolio', icon: Image, label: 'Portfolio' },
  { id: 'messages', icon: Mail, label: 'Messages' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobile && isSidebarOpen) {
        const sidebar = document.getElementById('sidebar');
        const hamburger = document.getElementById('hamburger-button');
        if (sidebar && !sidebar.contains(e.target as Node) && 
            hamburger && !hamburger.contains(e.target as Node)) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkTheme(isDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {[
                { 
                  icon: Users, 
                  label: 'Total Visitors', 
                  value: '1,234',
                  trend: '+12.5%',
                  trendUp: true 
                },
                { 
                  icon: Eye, 
                  label: 'Page Views', 
                  value: '5,678',
                  trend: '+8.2%',
                  trendUp: true 
                },
                { 
                  icon: MessageSquare, 
                  label: 'Messages', 
                  value: '12',
                  trend: '-2.4%',
                  trendUp: false 
                },
                { 
                  icon: BarChart2, 
                  label: 'Conversion Rate', 
                  value: '2.4%',
                  trend: '+5.1%',
                  trendUp: true 
                }
              ].map((card, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4 md:p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <card.icon className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            {card.label}
                          </dt>
                          <dd className="text-lg font-medium text-gray-900 dark:text-white">
                            {card.value}
                          </dd>
                        </div>
                      </div>
                      <div className={`flex items-center ${
                        card.trendUp ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {card.trendUp ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                        <span className="text-sm ml-1">{card.trend}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: UserPlus, label: 'New User' },
                    { icon: FileText, label: 'New Post' },
                    { icon: Image, label: 'Upload' },
                    { icon: Mail, label: 'Send Email' }
                  ].map((action, index) => (
                    <button
                      key={index}
                      className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <action.icon className="h-6 w-6 text-gray-500 dark:text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: Users2, text: 'New user registration', time: '2 min ago' },
                    { icon: FileText, text: 'Content updated', time: '1 hour ago' },
                    { icon: AlertCircle, text: 'System alert', time: '3 hours ago' },
                    { icon: Inbox, text: 'New message received', time: '5 hours ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <activity.icon className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{activity.text}</p>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Events</h3>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Calendar className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    { title: 'Team Meeting', time: 'Today, 2:00 PM', type: 'meeting' },
                    { title: 'Project Deadline', time: 'Tomorrow, 11:59 PM', type: 'deadline' },
                    { title: 'Client Call', time: 'Wed, 10:00 AM', type: 'call' }
                  ].map((event, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <div className="flex-shrink-0">
                        <Clock className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Notifications</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">4 unread</span>
                  <Bell className="h-5 w-5 text-gray-500" />
                </div>
              </div>
              <div className="divide-y dark:divide-gray-700">
                {[
                  { title: 'New comment on your post', time: '2 min ago', unread: true },
                  { title: 'System update completed', time: '1 hour ago', unread: true },
                  { title: 'New user registration', time: '3 hours ago', unread: false }
                ].map((notification, index) => (
                  <div key={index} className={`py-3 ${notification.unread ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}>
                    <div className="flex items-center justify-between">
                      <p className={`text-sm ${notification.unread ? 'font-medium' : ''} text-gray-700 dark:text-gray-300`}>
                        {notification.title}
                      </p>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'pages':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Pages</h2>
                <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                  Add New Page
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Home', status: 'Published', lastModified: '2 hours ago' },
                  { title: 'About', status: 'Draft', lastModified: '1 day ago' },
                  { title: 'Contact', status: 'Published', lastModified: '1 week ago' },
                ].map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{page.title}</h3>
                      <p className="text-sm text-gray-500">{page.lastModified}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        page.status === 'Published' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {page.status}
                      </span>
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg">
                        <FileText className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'portfolio':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Portfolio Projects</h2>
                <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                  Add Project
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'E-commerce Platform', category: 'Web Development', image: 'https://picsum.photos/200' },
                  { title: 'Mobile App', category: 'App Development', image: 'https://picsum.photos/201' },
                  { title: 'Brand Design', category: 'Design', image: 'https://picsum.photos/202' },
                ].map((project, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-lg">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                      <h3 className="text-white font-medium">{project.title}</h3>
                      <p className="text-gray-300 text-sm">{project.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Messages</h2>
              <div className="space-y-4">
                {[
                  { sender: 'John Doe', subject: 'Project Inquiry', time: '10:30 AM', unread: true },
                  { sender: 'Jane Smith', subject: 'Collaboration Request', time: 'Yesterday', unread: false },
                  { sender: 'Mike Johnson', subject: 'Website Feedback', time: '2 days ago', unread: false },
                ].map((message, index) => (
                  <div key={index} className={`p-4 rounded-lg ${
                    message.unread 
                      ? 'bg-blue-50 dark:bg-blue-900/20' 
                      : 'bg-gray-50 dark:bg-gray-700/50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-medium ${
                        message.unread ? 'text-blue-900 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                      }`}>
                        {message.sender}
                      </h3>
                      <span className="text-sm text-gray-500">{message.time}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{message.subject}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                    <p className="text-sm text-gray-500">Toggle dark/light theme</p>
                  </div>
                  <button
                    onClick={() => setIsDarkTheme(!isDarkTheme)}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {isDarkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                </div>
                {/* Add more settings options as needed */}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {isMobile && (
        <div 
          className={`fixed inset-0 bg-black transition-opacity duration-300 z-20 ${
            isSidebarOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside 
        id="sidebar"
        className={`
          fixed top-0 left-0 h-full z-30 
          bg-white dark:bg-gray-800 shadow-lg
          transition-all duration-300 ease-in-out
          ${isMobile 
            ? isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            : isSidebarOpen ? 'translate-x-0 w-64' : 'w-16 translate-x-0'
          }
          ${isMobile ? 'w-[280px]' : ''}
        `}
      >
        <div className={`flex flex-col h-full ${!isMobile && !isSidebarOpen && 'md:items-center'}`}>
          <div className={`p-6 border-b dark:border-gray-700 ${!isMobile && !isSidebarOpen && 'md:p-4'}`}>
            <div className={`flex items-center space-x-4 ${!isMobile && !isSidebarOpen && 'md:justify-center'}`}>
              <div className="relative flex items-center">
                <div className="w-12 h-12 flex items-center justify-center">
                  <AnimatedLogo isDarkMode={false} />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
              <div className={`transition-opacity duration-200 ${!isMobile && !isSidebarOpen ? 'opacity-0 md:hidden' : 'opacity-100'}`}>
                <h3 className="font-medium text-gray-800 dark:text-white">Admin User</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Administrator</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center ${
                      !isMobile && !isSidebarOpen ? 'md:justify-center' : 'space-x-3'
                    } px-4 py-3 rounded-lg transition-colors ${
                      activeMenu === item.id
                        ? 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className={`transition-opacity duration-200 ${
                      !isMobile && !isSidebarOpen ? 'opacity-0 md:hidden' : 'opacity-100'
                    }`}>
                      {item.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className={`p-4 border-t dark:border-gray-700 ${!isMobile && !isSidebarOpen && 'md:flex md:justify-center'}`}>
            <button
              onClick={handleLogout}
              className={`flex items-center ${
                !isMobile && !isSidebarOpen ? 'md:justify-center' : 'space-x-3'
              } px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors w-full`}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className={`transition-opacity duration-200 ${
                !isMobile && !isSidebarOpen ? 'opacity-0 md:hidden' : 'opacity-100'
              }`}>
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      <div 
        className={`
          transition-all duration-300 ease-in-out
          ${isMobile ? '' : (isSidebarOpen ? 'md:ml-64' : 'md:ml-16')}
        `}
      >
        <nav className="bg-white dark:bg-gray-800 shadow-sm h-16 sticky top-0 z-10">
          <div className="h-full px-4 md:px-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                id="hamburger-button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative z-50"
                aria-label="Toggle menu"
              >
                <Menu className={`w-6 h-6 text-gray-600 dark:text-gray-300 transition-transform duration-300 ${
                  isSidebarOpen && isMobile ? 'rotate-90' : 'rotate-0'
                }`} />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <AnimatedLogo isDarkMode={false} />
                </div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkTheme ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-white" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              <button className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=40&h=40"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>
              
              <div className="hidden md:flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=40&h=40"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-gray-700 dark:text-gray-200">Admin User</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="p-4 md:p-6 pt-4 md:pt-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}