import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, Send, Bot, User, FileText, ArrowRight, ArrowLeft } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot' | 'system';
  content: string;
  timestamp: Date;
}

interface ProcessStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  message?: string;
}

const TryAgentPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'upload' | 'chat'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const handleNext = () => {
    if (file) {
      setCurrentStep('chat');
      // Add initial bot message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: `Great! I've received your file "${file.name}". Now, please describe what you'd like me to do with your data. For example, you could ask me to:

• Clean and analyze the data
• Create visualizations
• Build predictive models
• Generate insights and recommendations

What's your goal?`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);

    // Initialize process steps
    const steps: ProcessStep[] = [
      { id: '1', name: 'Understanding your request', status: 'running' },
      { id: '2', name: 'Loading and analyzing data', status: 'pending' },
      { id: '3', name: 'Processing with AI agents', status: 'pending' },
      { id: '4', name: 'Generating results', status: 'pending' }
    ];
    setProcessSteps(steps);

    // Add processing message
    const processingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: 'I understand! Let me process your request. I\'ll work through this step by step...',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, processingMessage]);

    try {
      // Simulate processing steps
      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setProcessSteps(prev => prev.map((step, index) => {
          if (index === i) return { ...step, status: 'completed' };
          if (index === i + 1) return { ...step, status: 'running' };
          return step;
        }));

        // Add step completion message
        const stepMessage: Message = {
          id: (Date.now() + i + 2).toString(),
          type: 'system',
          content: `✅ ${steps[i].name} - Complete`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, stepMessage]);
      }

      // Send actual request to backend
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
        formData.append('prompt', userMessage.content);
      }

      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        
        const successMessage: Message = {
          id: (Date.now() + 10).toString(),
          type: 'bot',
          content: `Perfect! I've completed your analysis. Here's what I found:

${result.workflow_summary || 'Analysis completed successfully!'}

You can view the detailed results, visualizations, and download any models that were created. Would you like me to explain any specific part of the results?`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, successMessage]);

        // Navigate to results page with data
        setTimeout(() => {
          navigate('/results', { 
            state: { 
              fileName: file?.name || 'uploaded_file.csv',
              prompt: userMessage.content,
              processed: true,
              result: result
            }
          });
        }, 2000);
        
      } else {
        throw new Error('Analysis failed');
      }

    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 20).toString(),
        type: 'bot',
        content: 'I encountered an issue while processing your request. Please try again or contact support if the problem persists.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);

      setProcessSteps(prev => prev.map(step => 
        step.status === 'running' ? { ...step, status: 'error' } : step
      ));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          {currentStep === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Try Our AI Data Science Team
                </h1>
                <p className="text-gray-400 text-lg">
                  Upload your CSV file to get started with AI-powered data analysis
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload CSV File
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-neon-green transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-500">
                          {file ? file.name : 'Click to upload CSV file'}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {file && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-neon-green" />
                      <div>
                        <p className="text-white font-medium">{file.name}</p>
                        <p className="text-gray-400 text-sm">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <button
                  onClick={handleNext}
                  disabled={!file}
                  className="w-full flex items-center justify-center space-x-2 bg-neon-green text-black py-3 px-6 rounded-lg font-semibold hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-white">
                  AI Data Science Assistant
                </h1>
                <button
                  onClick={() => setCurrentStep('upload')}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl h-[600px] flex flex-col">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-3 max-w-[80%] ${
                        message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === 'user' 
                            ? 'bg-neon-green text-black' 
                            : message.type === 'system'
                            ? 'bg-gray-700'
                            : 'bg-blue-600'
                        }`}>
                          {message.type === 'user' ? (
                            <User className="w-4 h-4" />
                          ) : message.type === 'system' ? (
                            <div className="w-2 h-2 bg-neon-green rounded-full" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                        </div>
                        <div className={`rounded-lg p-3 ${
                          message.type === 'user'
                            ? 'bg-neon-green text-black'
                            : message.type === 'system'
                            ? 'bg-gray-800 text-gray-300'
                            : 'bg-gray-800 text-white'
                        }`}>
                          <p className="whitespace-pre-wrap">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.type === 'user' ? 'text-gray-700' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Process Steps */}
                  {processSteps.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-800 rounded-lg p-4"
                    >
                      <h4 className="text-white font-medium mb-3">Processing Steps:</h4>
                      <div className="space-y-2">
                        {processSteps.map((step) => (
                          <div key={step.id} className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              step.status === 'completed' ? 'bg-green-500' :
                              step.status === 'running' ? 'bg-yellow-500 animate-pulse' :
                              step.status === 'error' ? 'bg-red-500' :
                              'bg-gray-600'
                            }`} />
                            <span className={`text-sm ${
                              step.status === 'completed' ? 'text-green-400' :
                              step.status === 'running' ? 'text-yellow-400' :
                              step.status === 'error' ? 'text-red-400' :
                              'text-gray-500'
                            }`}>
                              {step.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-gray-800 p-4">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Describe what you'd like me to do with your data..."
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-neon-green"
                      disabled={isProcessing}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isProcessing}
                      className="bg-neon-green text-black px-4 py-2 rounded-lg hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TryAgentPage;
