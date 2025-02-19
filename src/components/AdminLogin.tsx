import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Check, X, Lock, User, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';
import { motion as m } from 'framer-motion'; // Alias to avoid naming conflict
import PreLoader from './PreLoader';
import ContentLoader from 'react-content-loader';

// Add LoginFormLoader component
const LoginFormLoader = ({ isDark = false }) => (
  <ContentLoader
    speed={2}
    width={400}
    height={400}
    viewBox="0 0 400 400"
    backgroundColor={isDark ? "#374151" : "#f3f3f3"}
    foregroundColor={isDark ? "#4B5563" : "#ecebeb"}
  >
    {/* Logo and Title */}
    <circle cx="200" cy="50" r="30" />
    <rect x="100" y="100" rx="4" ry="4" width="200" height="20" />
    <rect x="150" y="130" rx="4" ry="4" width="100" height="15" />
    
    {/* Form Fields */}
    <rect x="50" y="180" rx="4" ry="4" width="300" height="45" />
    <rect x="50" y="240" rx="4" ry="4" width="300" height="45" />
    <rect x="50" y="300" rx="4" ry="4" width="300" height="45" />
  </ContentLoader>
);

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isValidKey, setIsValidKey] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState<boolean | null>(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  // Check username
  useEffect(() => {
    if (!username) {
      setIsValidUsername(null);
      return;
    }

    const checkUsername = async () => {
      setIsCheckingUsername(true);
      try {
        const { data, error } = await supabase
          .from('admin_users')
          .select('username')
          .eq('username', username)
          .maybeSingle();

        if (error) throw error;
        setIsValidUsername(!!data);
        
        if (!data) {
          setSecretKey('');
          setPassword('');
          setIsValidKey(null);
        }
      } catch (err) {
        console.error('Error checking username:', err);
        setIsValidUsername(false);
      } finally {
        setIsCheckingUsername(false);
      }
    };

    const timeoutId = setTimeout(checkUsername, 800);
    return () => clearTimeout(timeoutId);
  }, [username]);

  // Check secret key
  useEffect(() => {
    if (!secretKey || !isValidUsername) {
      setIsValidKey(null);
      return;
    }

    const checkSecretKey = async () => {
      setIsChecking(true);
      try {
        const { data, error } = await supabase
          .from('admin_users')
          .select('secret_key')
          .eq('username', username)
          .single();

        if (error) throw error;
        setIsValidKey(data.secret_key === secretKey);
        if (data.secret_key !== secretKey) {
          setPassword('');
        }
      } catch (err) {
        console.error('Error checking secret key:', err);
        setIsValidKey(false);
      } finally {
        setIsChecking(false);
      }
    };

    const timeoutId = setTimeout(checkSecretKey, 500);
    return () => clearTimeout(timeoutId);
  }, [secretKey, isValidUsername, username]);

  // Add loading effect
  useEffect(() => {
    // Simulate preloader time
    const preloaderTimer = setTimeout(() => {
      setIsLoading(false);
      // After preloader, show content loaders for a longer duration
      setTimeout(() => {
        setIsInitialLoading(false);
      }, 1500);
    }, 2000);

    return () => clearTimeout(preloaderTimer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidUsername || !isValidKey || !password) return;
    
    setIsSigningIn(true);
    
    try {
      // Get the admin email from Supabase
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('email')
        .eq('username', username)
        .single();

      if (adminError) throw adminError;

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: adminData.email,
        password,
      });

      if (signInError) throw signInError;
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsSigningIn(false);
    }
  };

  if (isLoading) {
    return <PreLoader />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <m.div
        className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        animate={{
          background: [
            "linear-gradient(to bottom right, rgb(249 250 251), rgb(255 255 255), rgb(243 244 246))",
            "linear-gradient(to bottom right, rgb(243 244 246), rgb(249 250 251), rgb(255 255 255))",
            "linear-gradient(to bottom right, rgb(255 255 255), rgb(243 244 246), rgb(249 250 251))"
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <m.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-100/30 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <m.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100/30 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <m.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-100/20 dark:bg-pink-900/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          {isInitialLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-8 border border-white/20 dark:border-gray-700/30"
            >
              <LoginFormLoader isDark={false} />
            </motion.div>
          ) : (
            <>
              {/* Logo Section */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  className="flex justify-center mb-4"
                >
                  <div className="w-16 h-16">
                    <AnimatedLogo isDarkMode={false} />
                  </div>
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                >
                  Admin Portal
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 dark:text-gray-300"
                >
                  Enter your credentials to access the dashboard
                </motion.p>
              </div>

              {/* Login Form - Update the background to be more translucent */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-8 border border-white/20 dark:border-gray-700/30"
              >
                <form onSubmit={handleLogin} className="space-y-6">
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 p-3 rounded-lg text-sm text-center"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Username Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <User size={16} />
                      Username
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border ${
                          username && isValidUsername !== null 
                            ? (isValidUsername ? 'border-green-500' : 'border-red-500') 
                            : 'border-gray-200 dark:border-gray-600'
                        } focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white transition-all duration-200`}
                        placeholder="Enter your username"
                      />
                      <ValidationIcon 
                        isChecking={isCheckingUsername} 
                        isValid={isValidUsername} 
                        show={!!username}
                      />
                    </div>
                  </div>

                  {/* Secret Key Field */}
                  <AnimatePresence>
                    {isValidUsername && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <Key size={16} />
                          Secret Key
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            value={secretKey}
                            onChange={(e) => setSecretKey(e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border ${
                              secretKey && isValidKey !== null 
                                ? (isValidKey ? 'border-green-500' : 'border-red-500') 
                                : 'border-gray-200 dark:border-gray-600'
                            } focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white transition-all duration-200`}
                            placeholder="Enter secret key"
                          />
                          <ValidationIcon 
                            isChecking={isChecking} 
                            isValid={isValidKey} 
                            show={!!secretKey}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Password Field */}
                  <AnimatePresence>
                    {isValidKey && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <Lock size={16} />
                          Password
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white transition-all duration-200"
                          placeholder="Enter your password"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Login Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <button
                      type="submit"
                      disabled={isSigningIn}
                      className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                    >
                      {isSigningIn ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <span>Sign in</span>
                      )}
                    </button>
                  </motion.div>
                </form>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// Validation Icon Component
const ValidationIcon = ({ isChecking, isValid, show }: { isChecking: boolean, isValid: boolean | null, show: boolean }) => {
  if (!show) return null;

  return (
    <div className="absolute right-3 top-1/2 -translate-y-1/2">
      {isChecking ? (
        <motion.div 
          className="w-5 h-5 border-2 border-gray-300 border-t-black dark:border-gray-600 dark:border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      ) : isValid !== null && (
        isValid ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-green-500"
          >
            <Check size={20} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-red-500"
          >
            <X size={20} />
          </motion.div>
        )
      )}
    </div>
  );
};