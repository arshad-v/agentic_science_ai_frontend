import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, Send, Bot, User, FileText, ArrowRight, ArrowLeft, Paperclip, MoreHorizontal, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

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
        content: `Hello! I'm **Data_Agent.ai**, your AI data science assistant. I've received your file "${file.name}".

I can help you with:
• **Data cleaning and preprocessing**
• **Exploratory data analysis**
• **Creating visualizations**
• **Building predictive models**
• **Generating insights and recommendations**

What would you like me to do with your data?`,
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
      content: 'I understand! Let me process your request step by step...',
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

I've generated detailed results including visualizations and insights. Click below to view the complete analysis.`,
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
      setProcessSteps([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/•/g, '•')
      .split('\n')
      .map((line, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: line || '<br>' }} />
      ));
  };

  return (
    <div className="min-h-screen bg-white">
    <div className="min-h-screen bg-gray-900">
      <AnimatePresence mode="wait">
        {currentStep === 'upload' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex items-center justify-center py-12"
          >
            <div className="max-w-2xl mx-auto px-4">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-neon-green rounded-full flex items-center justify-center">
                    <Bot className="w-7 h-7 text-black" />
                  </div>
                  <h1 className="text-4xl font-bold text-white">
                    Data_Agent.ai
                  </h1>
                </div>
                <p className="text-gray-400 text-lg">
                  Upload your CSV file to start analyzing your data with AI
                </p>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-sm">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Choose your CSV file
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
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-neon-green hover:bg-neon-green/5 transition-all duration-200"
                    >
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-300">
                          {file ? file.name : 'Click to upload CSV file'}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          Supports CSV files up to 100MB
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {file && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-neon-green/10 border border-neon-green/30 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-neon-green" />
                      <div>
                        <p className="text-white font-medium">{file.name}</p>
                        <p className="text-gray-400 text-sm">
                          {(file.size / 1024).toFixed(1)} KB • Ready to analyze
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <button
                  onClick={handleNext}
                  disabled={!file}
                  className="w-full flex items-center justify-center space-x-2 bg-neon-green text-black py-3 px-6 rounded-xl font-medium hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neon-green"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-screen flex flex-col"
          >
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
              <div className="max-w-4xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setCurrentStep('upload')}
                    className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-neon-green rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h1 className="text-lg font-semibold text-white">Data_Agent.ai</h1>
                      <p className="text-sm text-gray-400">AI Data Science Assistant</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto bg-gray-900">
              <div className="max-w-4xl mx-auto">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`group ${
                      message.type === 'user' ? 'bg-white' : 'bg-gray-50'
                      message.type === 'user' ? 'bg-gray-800' : 'bg-gray-900'
                    } border-b border-gray-700 hover:bg-gray-800/50 transition-colors`}
                  >
                    <div className="px-4 py-6">
                      <div className="flex items-start space-x-4">
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === 'user' 
                            ? 'bg-gray-600 text-white' 
                            : message.type === 'system'
                            ? 'bg-blue-600 text-white'
                            : 'bg-neon-green text-black'
                        }`}>
                          {message.type === 'user' ? (
                            <User className="w-4 h-4" />
                          ) : message.type === 'system' ? (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                        </div>

                        {/* Message Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-white">
                              {message.type === 'user' ? 'You' : message.type === 'system' ? 'System' : 'Data_Agent.ai'}
                            </span>
                            <span className="text-xs text-gray-400">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="text-gray-200 leading-relaxed">
                            {message.type === 'system' ? (
                              <span className="text-sm text-gray-400">{message.content}</span>
                            ) : (
                              <div className="prose prose-sm max-w-none">
                                {formatMessage(message.content)}
                              </div>
                            )}
                          </div>

                          {/* Message Actions */}
                          {message.type === 'bot' && (
                            <div className="flex items-center space-x-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => copyMessage(message.content)}
                                className="p-1.5 text-gray-500 hover:text-gray-300 hover:bg-gray-700 rounded transition-colors"
                                title="Copy message"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                              <button
                                className="p-1.5 text-gray-500 hover:text-gray-300 hover:bg-gray-700 rounded transition-colors"
                                title="Good response"
                              >
                                <ThumbsUp className="w-4 h-4" />
                              </button>
                              <button
                                className="p-1.5 text-gray-500 hover:text-gray-300 hover:bg-gray-700 rounded transition-colors"
                                title="Bad response"
                              >
                                <ThumbsDown className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Process Steps */}
                {processSteps.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900 border-b border-gray-700"
                  >
                    <div className="px-4 py-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-neon-green rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-black" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="font-semibold text-white">Data_Agent.ai</span>
                            <span className="text-xs text-gray-400">Processing...</span>
                          </div>
                          <div className="bg-gray-800 border border-gray-600 rounded-xl p-4">
                            <div className="space-y-3">
                              {processSteps.map((step) => (
                                <div key={step.id} className="flex items-center space-x-3">
                                  <div className={`w-2 h-2 rounded-full ${
                                    step.status === 'completed' ? 'bg-neon-green' :
                                    step.status === 'running' ? 'bg-blue-500 animate-pulse' :
                                    step.status === 'error' ? 'bg-red-500' :
                                    'bg-gray-600'
                                  }`} />
                                  <span className={`text-sm ${
                                    step.status === 'completed' ? 'text-neon-green' :
                                    step.status === 'running' ? 'text-blue-400' :
                                    step.status === 'error' ? 'text-red-400' :
                                    'text-gray-400'
                                  }`}>
                                    {step.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Typing Indicator */}
                {isProcessing && processSteps.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900 border-b border-gray-700"
                  >
                    <div className="px-4 py-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-neon-green rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-black" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-semibold text-white">Data_Agent.ai</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                            <span className="text-sm text-gray-400 ml-2">Thinking...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-gray-800 border-t border-gray-700">
              <div className="max-w-4xl mx-auto px-4 py-4">
                <div className="relative">
                  <div className="flex items-end space-x-3 bg-gray-700 border border-gray-600 rounded-2xl p-3 shadow-sm focus-within:border-neon-green focus-within:ring-1 focus-within:ring-neon-green">
                    <button className="p-2 text-gray-500 hover:text-gray-300 transition-colors">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <textarea
                      ref={textareaRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Message Data_Agent.ai..."
                      className="flex-1 resize-none border-0 outline-none bg-transparent text-white placeholder-gray-400 max-h-32 min-h-[24px]"
                      disabled={isProcessing}
                      rows={1}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isProcessing}
                      className="p-2 bg-neon-green text-black rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neon-green"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    Data_Agent.ai can make mistakes. Consider checking important information.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TryAgentPage;