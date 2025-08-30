import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Clock className="w-24 h-24 text-neon-green mx-auto mb-8" />
          <h1 className="text-5xl font-extrabold text-white sm:text-6xl md:text-7xl">
            Pricing Page <span className="text-neon-green">Coming Soon</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400">
            We are working hard to bring you our pricing plans. Stay tuned!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;
