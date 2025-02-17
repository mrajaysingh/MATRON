import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Users,
  Eye,
  MessageSquare,
  BarChart2,
  Settings,
  User,
  FileText,
  Image,
  Mail,
  Layout,
  Menu,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const menuItems = [
  { icon: Layout, label: 'Dashboard', active: true },
  { icon: FileText, label: 'Pages' },
  { icon: Image, label: 'Portfolio' },
  { icon: Mail, label: 'Messages' },
  { icon: Settings, label: 'Settings' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg fixed h-full transition-all duration-200">
        <div className="flex flex-col h-full">
          {/* Profile Section */}
          <div className="p-6 border-b dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Admin User</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Administrator</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      item.active
                        ? 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Navigation */}
        <nav className="bg-white dark:bg-gray-800 shadow-sm h-16 fixed w-[calc(100%-16rem)] z-10">
          <div className="h-full px-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
            </div>

            {/* Profile Menu */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=40&h=40"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-gray-700 dark:text-gray-200">Admin User</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <main className="p-6 pt-24">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Analytics Cards */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Total Visitors
                      </dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white">1,234</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Eye className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Page Views
                      </dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white">5,678</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Messages
                      </dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white">12</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BarChart2 className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Conversion Rate
                      </dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white">2.4%</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}