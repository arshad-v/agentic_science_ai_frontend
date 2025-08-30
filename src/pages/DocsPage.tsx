import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Code, BookOpen, LifeBuoy } from 'lucide-react';

const documentationSections = {
  'Getting Started': {
    icon: BookOpen,
    content: (
      <>
        <h2 className="text-3xl font-bold text-white mb-4">Introduction</h2>
        <p className="text-gray-300 mb-6">Welcome to the documentation for Agentic Science.ai. This guide will walk you through the essential features and help you get started with our intelligent data science platform.</p>
        <h3 className="text-2xl font-semibold text-neon-green mb-3">Installation</h3>
        <p className="text-gray-300 mb-4">To begin, clone our repository from GitHub and install the necessary dependencies.</p>
        <pre className="bg-gray-800 rounded-lg p-4 text-sm text-gray-200 overflow-x-auto"><code>git clone https://github.com/arshad-v/agentic_science_ai.git\ncd agentic_science_ai\nnpm install</code></pre>
      </>
    ),
  },
  'API Reference': {
    icon: Code,
    content: (
      <>
        <h2 className="text-3xl font-bold text-white mb-4">API Endpoints</h2>
        <p className="text-gray-300 mb-6">Our API provides programmatic access to the core features of the platform. All endpoints are secured and require an API key for authentication.</p>
        <h3 className="text-2xl font-semibold text-neon-green mb-3">Example: Uploading Data</h3>
        <p className="text-gray-300 mb-4">To upload a dataset, make a POST request to the `/api/upload` endpoint.</p>
        <pre className="bg-gray-800 rounded-lg p-4 text-sm text-gray-200 overflow-x-auto"><code>{`{
  "method": "POST",
  "url": "https://api.agenticscience.ai/v1/upload",
  "headers": {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "multipart/form-data"
  },
  "body": {
    "file": "path/to/your/dataset.csv"
  }
}`}</code></pre>
      </>
    ),
  },
  'Guides': {
    icon: LifeBuoy,
    content: (
      <>
        <h2 className="text-3xl font-bold text-white mb-4">User Guides</h2>
        <p className="text-gray-300 mb-6">Explore our guides to learn how to make the most of Agentic Science.ai.</p>
        <h3 className="text-2xl font-semibold text-neon-green mb-3">Creating a Machine Learning Model</h3>
        <p className="text-gray-300">This guide explains the step-by-step process of building, training, and deploying a machine learning model using our platform. From data preprocessing to model evaluation, we cover all the essential stages.</p>
      </>
    ),
  },
};

type SectionName = keyof typeof documentationSections;

const DocsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionName>('Getting Started');

  const renderContent = () => {
    return documentationSections[activeSection].content;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-white sm:text-6xl md:text-7xl">
            Developer <span className="text-neon-green">Documentation</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400">
            Everything you need to integrate and build with our platform.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4">
            <div className="sticky top-24 bg-gray-800/50 border border-gray-700 rounded-2xl p-4">
              <h2 className="text-lg font-semibold text-white mb-4">Navigation</h2>
              <ul className="space-y-2">
                {Object.keys(documentationSections).map((section) => {
                  const Icon = documentationSections[section as SectionName].icon;
                  return (
                    <li key={section}>
                      <button 
                        onClick={() => setActiveSection(section as SectionName)}
                        className={`w-full text-left flex items-center justify-between px-4 py-2 rounded-lg transition-colors duration-200 ${activeSection === section ? 'bg-neon-green text-black' : 'text-gray-300 hover:bg-gray-700'}`}>
                        <div className="flex items-center">
                          <Icon className="w-5 h-5 mr-3" />
                          <span>{section}</span>
                        </div>
                        {activeSection === section && <ChevronRight className="w-5 h-5" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full md:w-3/4">
            <motion.div 
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-800/30 border border-gray-700 rounded-2xl p-8"
            >
              {renderContent()}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
