import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Database, Github, Twitter, Linkedin, Mail, MapPin, Phone, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Data Science Agent', path: '/upload' },
        { name: 'Model Training', path: '/upload' },
        { name: 'Predictions', path: '/results' },
        { name: 'Analytics', path: '/results' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/#about' },
        { name: 'Features', path: '/#features' },
        { name: 'Pricing', path: '/#pricing' },
        { name: 'Contact', path: '/#contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', path: '#' },
        { name: 'API Reference', path: '#' },
        { name: 'Tutorials', path: '#' },
        { name: 'Blog', path: '#' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 group mb-6">
              <img src="https://i.postimg.cc/vHMxTDTB/Agentic-Science-ai-Logo-Green-Abstract-Design.png" alt="Agentic Science.ai Logo" className="w-40 h-auto" />
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              Revolutionizing data science with AI-powered agents. Upload your data, describe your needs, 
              and get intelligent predictions and insights in minutes.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-neon-green" />
                <span>contact@datadev.ai</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-neon-green" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-neon-green" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-neon-green transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <div className="flex items-center space-x-4 mb-2">
                <p>© {currentYear} Agentic Science.ai. All rights reserved.</p>
                <div className="bg-gradient-to-r from-orange-500 to-green-500 p-0.5 rounded-full">
                  <div className="bg-gray-950 rounded-full px-3 py-1 flex items-center space-x-2">
                    <Heart className="w-3 h-3 text-red-500 fill-current" />
                    <span className="text-white text-xs font-semibold">Made in India</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-6 mt-2">
                <Link to="#" className="hover:text-neon-green transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link to="#" className="hover:text-neon-green transition-colors duration-200">
                  Terms of Service
                </Link>
                <Link to="#" className="hover:text-neon-green transition-colors duration-200">
                  Cookie Policy
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-neon-green hover:bg-gray-700 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Branding */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Powered by advanced AI algorithms and machine learning models
            </p>
            <div className="flex justify-center space-x-6 mt-3 text-xs text-gray-500">
              <span>🚀 Fast Processing</span>
              <span>🔒 Secure & Private</span>
              <span>📊 Accurate Predictions</span>
              <span>🤖 AI-Powered</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
