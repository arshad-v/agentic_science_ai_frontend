import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileSpreadsheet, 
  Database, 
  Brain, 
  CheckCircle, 
  AlertCircle,
  X,
  File,
  Loader2
} from 'lucide-react';

const UploadPage: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile || !prompt.trim()) return;

    setIsProcessing(true);
    
    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('prompt', prompt);

    try {
      // Connect to Flask backend
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
      }

      const data = await response.json();
      
      // Navigate to results with actual backend data
      navigate('/results', { 
        state: { 
          fileName: uploadedFile.name,
          prompt: prompt,
          result: data,
          processed: true 
        } 
      });
    } catch (error) {
      console.error('API Error:', error);
      // Navigate with error state
      navigate('/results', { 
        state: { 
          fileName: uploadedFile.name,
          prompt: prompt,
          error: error instanceof Error ? error.message : 'Unknown error occurred',
          processed: false 
        } 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const samplePrompts = [
    "Predict customer churn based on usage patterns and demographics",
    "Forecast sales for the next quarter using historical data",
    "Classify customer feedback sentiment and identify key themes",
    "Detect anomalies in transaction data for fraud prevention",
    "Segment customers based on purchasing behavior",
  ];

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-neon-green bg-clip-text text-transparent">
            Data Science Agent
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Upload your dataset and describe what you want to achieve. Our AI will handle the rest.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* File Upload */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <Upload className="w-6 h-6 text-neon-green" />
                <span>Upload Your Data</span>
              </h2>

              {!uploadedFile ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                    dragActive
                      ? 'border-neon-green bg-neon-green/5'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <FileSpreadsheet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 text-lg mb-2">
                    Drag and drop your file here, or{' '}
                    <label className="text-neon-green hover:text-primary-400 cursor-pointer underline">
                      browse
                      <input
                        type="file"
                        className="hidden"
                        accept=".csv,.json,.xlsx,.xls"
                        onChange={handleFileSelect}
                      />
                    </label>
                  </p>
                  <p className="text-gray-500 text-sm">
                    Supports CSV, JSON, Excel files up to 100MB
                  </p>
                </div>
              ) : (
                <motion.div
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex items-center justify-between"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="flex items-center space-x-3">
                    <File className="w-8 h-8 text-neon-green" />
                    <div>
                      <p className="text-white font-medium">{uploadedFile.name}</p>
                      <p className="text-gray-400 text-sm">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </div>

            {/* Prompt Input */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <Brain className="w-6 h-6 text-neon-green" />
                <span>Describe Your Goal</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to achieve with your data. For example: 'Predict customer churn based on usage patterns' or 'Forecast sales for the next quarter'..."
                    className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-transparent resize-none"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={!uploadedFile || !prompt.trim() || isProcessing}
                  className="w-full bg-gradient-to-r from-primary-600 to-neon-green text-black py-3 px-6 rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-200 flex items-center justify-center space-x-2"
                  whileHover={{ scale: uploadedFile && prompt.trim() && !isProcessing ? 1.02 : 1 }}
                  whileTap={{ scale: uploadedFile && prompt.trim() && !isProcessing ? 0.98 : 1 }}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Database className="w-5 h-5" />
                      <span>Generate AI Model</span>
                    </>
                  )}
                </motion.button>
              </form>

              {/* Sample Prompts */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Sample Prompts:</h3>
                <div className="space-y-2">
                  {samplePrompts.map((sample, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setPrompt(sample)}
                      className="w-full text-left text-sm text-gray-400 hover:text-neon-green bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded border border-gray-700 hover:border-neon-green/50 transition-all duration-200"
                      whileHover={{ scale: 1.01 }}
                    >
                      {sample}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Status Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Process Status</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  {uploadedFile ? (
                    <CheckCircle className="w-5 h-5 text-neon-green" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-600 rounded-full"></div>
                  )}
                  <span className={uploadedFile ? 'text-neon-green' : 'text-gray-400'}>
                    Data Uploaded
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {prompt.trim() ? (
                    <CheckCircle className="w-5 h-5 text-neon-green" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-600 rounded-full"></div>
                  )}
                  <span className={prompt.trim() ? 'text-neon-green' : 'text-gray-400'}>
                    Goal Defined
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {isProcessing ? (
                    <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-600 rounded-full"></div>
                  )}
                  <span className={isProcessing ? 'text-yellow-400' : 'text-gray-400'}>
                    AI Processing
                  </span>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-neon-green" />
                <span>Tips for Better Results</span>
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start space-x-2">
                  <span className="text-neon-green">•</span>
                  <span>Ensure your data has clear column headers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-neon-green">•</span>
                  <span>Remove or handle missing values beforehand</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-neon-green">•</span>
                  <span>Be specific about your prediction goals</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-neon-green">•</span>
                  <span>Include target variable in your description</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;