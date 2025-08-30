import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  BarChart3,
  Brain,
  Zap,
  ArrowRight,
  Star,
  Upload,
  Shield,
  Clock,
  Cpu,
} from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Upload,
      title: 'Easy Data Upload',
      description: 'Drag & drop your datasets in various formats (CSV, JSON, Excel) with intelligent preprocessing.',
    },
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms automatically analyze your data and suggest optimal models.',
    },
    {
      icon: BarChart3,
      title: 'Predictive Models',
      description: 'Generate accurate predictions with state-of-the-art models tailored to your specific use case.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get results in minutes, not hours. Our optimized infrastructure ensures rapid model training.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted end-to-end and never shared. Complete privacy and security guaranteed.',
    },
    {
      icon: Clock,
      title: '24/7 Processing',
      description: 'Our cloud infrastructure works around the clock to process your data science tasks.',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Models Trained' },
    { number: '500+', label: 'Happy Customers' },
    { number: '99.9%', label: 'Uptime' },
    { number: '5min', label: 'Avg Processing' },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Data Scientist at TechCorp',
      content: 'Agentic Science.ai transformed our workflow. What used to take weeks now takes minutes.',
      rating: 5,
    },
    {
      name: 'Michael Rodriguez',
      role: 'ML Engineer',
      content: 'The accuracy of predictions is incredible. This tool is a game-changer for our team.',
      rating: 5,
    },
    {
      name: 'Emily Johnson',
      role: 'Research Analyst',
      content: 'Simple, powerful, and reliable. Agentic Science.ai makes advanced analytics accessible to everyone.',
      rating: 5,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* 3D Animated Background */}
        <div className="absolute inset-0">
          {/* Floating geometric shapes */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: Math.random() * 20 + 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div 
                  className="bg-neon-green/10 rounded-full blur-sm"
                  style={{
                    width: `${Math.random() * 60 + 20}px`,
                    height: `${Math.random() * 60 + 20}px`,
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Modern Neural Network Pattern */}
          <div className="absolute inset-0 opacity-40">
            <svg className="w-full h-full" viewBox="0 0 1920 1080">
              {/* Grid-based connection pattern - Full screen coverage */}
              {/* Horizontal connections */}
              {Array.from({ length: 8 }).map((_, row) => 
                Array.from({ length: 7 }).map((_, col) => (
                  <motion.line
                    key={`h-${row}-${col}`}
                    x1={50 + col * 250}
                    y1={50 + row * 130}
                    x2={50 + (col + 1) * 250}
                    y2={50 + row * 130}
                    stroke="#22c55e"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: [0, 1, 0],
                      opacity: [0, 0.7, 0]
                    }}
                    transition={{
                      duration: 3 + row * 0.5,
                      repeat: Infinity,
                      delay: col * 0.3 + row * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))
              )}
              
              {/* Vertical connections */}
              {Array.from({ length: 7 }).map((_, row) => 
                Array.from({ length: 8 }).map((_, col) => (
                  <motion.line
                    key={`v-${row}-${col}`}
                    x1={50 + col * 250}
                    y1={50 + row * 130}
                    x2={50 + col * 250}
                    y2={50 + (row + 1) * 130}
                    stroke="#22c55e"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: [0, 1, 0],
                      opacity: [0, 0.6, 0]
                    }}
                    transition={{
                      duration: 2.5 + col * 0.3,
                      repeat: Infinity,
                      delay: row * 0.4 + col * 0.1,
                      ease: "easeInOut"
                    }}
                  />
                ))
              )}
              
              {/* Diagonal connections for modern touch */}
              {Array.from({ length: 7 }).map((_, row) => 
                Array.from({ length: 7 }).map((_, col) => (
                  <motion.line
                    key={`d-${row}-${col}`}
                    x1={50 + col * 250}
                    y1={50 + row * 130}
                    x2={50 + (col + 1) * 250}
                    y2={50 + (row + 1) * 130}
                    stroke="#22c55e"
                    strokeWidth="1"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: [0, 1, 0],
                      opacity: [0, 0.4, 0]
                    }}
                    transition={{
                      duration: 4 + (row + col) * 0.2,
                      repeat: Infinity,
                      delay: (row + col) * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))
              )}
              
              {/* Node points */}
              {Array.from({ length: 8 }).map((_, row) => 
                Array.from({ length: 8 }).map((_, col) => (
                  <motion.circle
                    key={`node-${row}-${col}`}
                    cx={50 + col * 250}
                    cy={50 + row * 130}
                    r="3"
                    fill="#22c55e"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1, 1.2, 1],
                      opacity: [0, 0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: row * 0.2 + col * 0.1,
                      ease: "easeInOut"
                    }}
                  />
                ))
              )}
            </svg>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            
            {/* Hero Text */}
            <div className="space-y-6">
              <motion.h1 
                className="text-5xl font-bold text-white leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="block"
                >
                  Every Dataset
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="block text-neon-green mt-2"
                >
                  Tells a Different Story
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 1.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="block text-gray-300 mt-3 text-2xl font-normal"
                >
                  We Help You Listen
                </motion.div>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Our AI agents act as your <span className="text-neon-green">Data Science Team</span>, automating tasks like data cleaning, feature engineering, analysis, model building and more. 
                Just upload your data and let our <span className="text-neon-green">AI agents</span> do the heavy lifting.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/try-agent">
                <motion.button
                  className="bg-neon-green text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-green-500 transition-all duration-300 flex items-center space-x-3 shadow-lg shadow-neon-green/25"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Zap className="w-5 h-5" />
                  <span>Start Building Now</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <motion.button
                className="border-2 border-neon-green/50 text-neon-green px-10 py-4 rounded-xl font-bold text-lg hover:bg-neon-green/10 hover:border-neon-green transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Stats Section - Better Aligned */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-24 pt-12 border-t border-gray-800/50"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-neon-green/10 rounded-lg blur-xl group-hover:bg-neon-green/20 transition-all duration-300" />
                    <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-neon-green/30 transition-all duration-300">
                      <div className="text-3xl lg:text-4xl font-bold text-neon-green mb-2">
                        {stat.number}
                      </div>
                      <div className="text-gray-400 text-sm lg:text-base font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to transform raw data into actionable insights with AI-powered automation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-neon-green/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-neon-green/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-neon-green/20 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-neon-green" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-neon-green bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Three simple steps to get AI-powered insights from your data
            </p>
          </motion.div>

          {/* Timeline Layout */}
          <div className="relative max-w-4xl mx-auto">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-neon-green via-primary-500 to-neon-green opacity-30"></div>
            
            {/* Animated Pulse on Timeline */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-neon-green rounded-full"
              animate={{
                y: [0, 400, 800],
                opacity: [1, 0.5, 1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="space-y-24">
              {[
                {
                  step: '01',
                  title: 'Upload Your Data',
                  description: 'Simply drag and drop your dataset or connect to your data sources. We support CSV, JSON, Excel, and database connections with intelligent preprocessing.',
                  icon: Upload,
                  side: 'left',
                  features: ['Multiple formats', 'Auto-preprocessing', 'Data validation', 'Secure upload'],
                },
                {
                  step: '02',
                  title: 'Describe Your Goals',
                  description: 'Tell us what you want to achieve in natural language. Our AI understands complex business objectives and translates them into actionable models.',
                  icon: Brain,
                  side: 'right',
                  features: ['Natural language', 'Smart interpretation', 'Goal optimization', 'Context awareness'],
                },
                {
                  step: '03',
                  title: 'Get AI Results',
                  description: 'Receive trained models, accurate predictions, and actionable insights tailored to your specific use case with detailed explanations.',
                  icon: TrendingUp,
                  side: 'left',
                  features: ['Trained models', 'Predictions', 'Insights', 'Explanations'],
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  className={`flex items-center ${item.side === 'right' ? 'flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, x: item.side === 'left' ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                >
                  {/* Content Card */}
                  <div className={`w-5/12 ${item.side === 'right' ? 'ml-8' : 'mr-8'}`}>
                    <motion.div
                      className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-neon-green/50 transition-all duration-500 group relative overflow-hidden"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      {/* Animated Background Gradient */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        initial={false}
                      />
                      
                      <div className="relative z-10">
                        <div className="flex items-center space-x-4 mb-6">
                          <motion.div
                            className="w-16 h-16 bg-gradient-to-r from-neon-green to-primary-500 rounded-xl flex items-center justify-center"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <item.icon className="w-8 h-8 text-black" />
                          </motion.div>
                          <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-neon-green transition-colors duration-300">
                              {item.title}
                            </h3>
                            <p className="text-neon-green font-semibold">Step {item.step}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-400 leading-relaxed mb-6">
                          {item.description}
                        </p>
                        
                        {/* Feature Tags */}
                        <div className="flex flex-wrap gap-2">
                          {item.features.map((feature, featureIndex) => (
                            <motion.span
                              key={feature}
                              className="px-3 py-1 bg-gray-800 text-neon-green text-sm rounded-full border border-gray-700 hover:border-neon-green/50 transition-colors duration-200"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: index * 0.3 + featureIndex * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {feature}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative z-20">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-neon-green to-primary-500 rounded-full flex items-center justify-center border-4 border-black shadow-lg"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.3 + 0.2 }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <span className="text-black font-bold text-lg">{item.step}</span>
                    </motion.div>
                    
                    {/* Connecting Line to Card */}
                    <motion.div
                      className={`absolute top-1/2 ${item.side === 'left' ? '-right-8' : '-left-8'} w-8 h-0.5 bg-gradient-to-${item.side === 'left' ? 'r' : 'l'} from-neon-green to-transparent`}
                      initial={{ width: 0 }}
                      whileInView={{ width: 32 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.3 + 0.4 }}
                    />
                  </div>

                  {/* Empty Space for Opposite Side */}
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>

            {/* Final CTA */}
            <motion.div
              className="text-center mt-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-primary-500/20 rounded-2xl blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md mx-auto">
                  <Cpu className="w-12 h-12 text-neon-green mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">Ready to Start?</h3>
                  <p className="text-gray-400 mb-6">Transform your data into actionable insights in minutes</p>
                  <Link to="/upload">
                    <motion.button
                      className="w-full bg-gradient-to-r from-primary-600 to-neon-green text-black py-3 px-6 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-neon-green/25 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Try Data Science Agent
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join thousands of data scientists and analysts who trust Agentic Science.ai
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-neon-green/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="border-t border-gray-800 pt-4">
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Data?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Join thousands of professionals who are already using Agentic Science.ai to unlock the power of their data
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/upload">
                <motion.button
                  className="bg-gradient-to-r from-primary-600 to-neon-green text-black px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-neon-green/25 transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
            
            <p className="text-gray-500 text-sm mt-6">
              No credit card required • Get started in under 2 minutes
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
