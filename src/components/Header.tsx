import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Home, FlaskConical, BarChart3, Github, DollarSign, BookText } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Try Agent', path: '/try-agent', icon: FlaskConical },
    { name: 'Results', path: '/results', icon: BarChart3 },
    { name: 'Pricing', path: '/pricing', icon: DollarSign },
    { name: 'Docs', path: '/docs', icon: BookText },
    { name: 'GitHub', path: 'https://github.com/arshad-v/agentic_science_ai.git', icon: Github, external: true },
  ];

  return (
    <header className="relative overflow-hidden bg-gray-900/95 backdrop-blur-md border-b border-gray-700 sticky top-4 mx-4 z-50 rounded-2xl">
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-green/80 shadow-[0_0_10px_#39FF14]" />
      <div className="w-full h-full px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img src="https://i.postimg.cc/vHMxTDTB/Agentic-Science-ai-Logo-Green-Abstract-Design.png" alt="Agentic Science.ai Logo" className="w-40 h-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 bg-gray-800/60 border border-gray-700 rounded-full p-1 backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path && !item.external;
              
              if (item.external) {
                return (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                  >
                    <motion.div
                      className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden flex items-center space-x-2 text-gray-300 hover:text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <item.icon className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">{item.name}</span>
                    </motion.div>
                  </a>
                );
              }
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative group"
                >
                  <motion.div
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden flex items-center space-x-2 ${
                      isActive
                        ? 'text-black bg-neon-green shadow-lg shadow-neon-green/25'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    
                    {/* Glow effect for active item */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-neon-green/20 blur-xl"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                    
                      <item.icon className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">{item.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Link to="/try-agent">
              <motion.button
                className="bg-neon-green text-black px-6 py-2 rounded-lg font-semibold text-sm hover:bg-green-500 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-800"
          >
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path && !item.external;
                
                if (item.external) {
                  return (
                    <a
                      key={item.name}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium py-2 px-4 rounded-full transition-colors duration-200 text-gray-300 hover:text-white hover:bg-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </span>
                    </a>
                  );
                }
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-sm font-medium py-2 px-4 rounded-full transition-colors duration-200 ${
                      isActive
                        ? 'text-neon-green bg-gray-800'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </span>
                  </Link>
                );
              })}
              <Link to="/try-agent" onClick={() => setIsMenuOpen(false)}>
                <motion.button
                  className="w-full bg-neon-green text-black px-6 py-2 rounded-lg font-semibold text-sm mt-4 hover:bg-green-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.button>
              </Link>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
