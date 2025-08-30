import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Plot from 'react-plotly.js';
import {
  CheckCircle,
  Download,
  Brain,
  BarChart3,
  TrendingUp,
  FileText,
  Zap,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Target
} from 'lucide-react';

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [plotlyLoaded, setPlotlyLoaded] = useState(false);

  // Get data from location.state or localStorage as fallback
  const locationData = location.state as { 
    fileName?: string; 
    prompt?: string; 
    processed?: boolean; 
    result?: any; 
    error?: string; 
  };

  const [data, setData] = useState(locationData);

  useEffect(() => {
    // If no data from navigation, check localStorage
    if (!data || !data.result) {
      const storedResults = localStorage.getItem('analysisResults');
      if (storedResults) {
        try {
          const parsedResults = JSON.parse(storedResults);
          setData({
            fileName: 'uploaded_file.csv',
            prompt: 'Analysis completed',
            processed: true,
            result: parsedResults
          });
        } catch (error) {
          console.error('Error parsing stored results:', error);
        }
      }
    }
  }, [data]);

  // Function to handle model download
  const handleDownloadModel = async () => {
    const backendResult = data?.result;
    if (!backendResult?.data?.model_download_path) {
      alert('No model available for download');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/download_model/${backendResult.data.model_download_path}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = backendResult.data.model_download_path;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Failed to download model');
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Error downloading model');
    }
  };

  // Function to render visualizations
  const renderVisualization = () => {
    const backendResult = data?.result;
    if (!backendResult) return null;

    if (backendResult.result_type === 'plot' && backendResult.data) {
      try {
        const plotData = JSON.parse(backendResult.data);
        return (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-neon-green" />
              <span>Data Visualization</span>
            </h2>
            <div className="w-full h-96">
              <Plot
                data={plotData.data || []}
                layout={{
                  ...plotData.layout,
                  paper_bgcolor: 'rgba(0,0,0,0)',
                  plot_bgcolor: 'rgba(0,0,0,0)',
                  font: { color: '#ffffff' }
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        );
      } catch (error) {
        console.error('Error parsing plot data:', error);
      }
    }

    return null;
  };

  // Function to render data tables
  const renderDataTable = () => {
    const backendResult = data?.result;
    if (!backendResult || backendResult.result_type !== 'table') return null;

    try {
      const tableData = JSON.parse(backendResult.data);
      const columns = tableData.length > 0 ? Object.keys(tableData[0]) : [];
      
      return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
            <Target className="w-6 h-6 text-neon-green" />
            <span>Data Results</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  {columns.map((col) => (
                    <th key={col} className="text-left py-3 px-4 text-gray-400 font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.slice(0, 10).map((row: any, index: number) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                    {columns.map((col) => (
                      <td key={col} className="py-3 px-4 text-gray-300">
                        {typeof row[col] === 'number' ? row[col].toFixed(2) : String(row[col])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {tableData.length > 10 && (
              <p className="text-gray-400 text-sm mt-2">
                Showing first 10 rows of {tableData.length} total rows
              </p>
            )}
          </div>
        </div>
      );
    } catch (error) {
      console.error('Error parsing table data:', error);
      return null;
    }
  };

  useEffect(() => {
    if (!data?.processed && !data?.error) {
      navigate('/try-agent');
      return;
    }
    
    // Simulate loading time
    setTimeout(() => setIsLoaded(true), 1000);
  }, [data, navigate]);

  // Initialize plotly as loaded since we're using react-plotly.js
  useEffect(() => {
    setPlotlyLoaded(true);
  }, []);

  // Show loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-neon-green border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-xl text-neon-green">Processing your data...</p>
        </motion.div>
      </div>
    );
  }

  // Show error state if there's an error
  if (data?.error) {
    return (
      <div className="min-h-screen bg-black py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">Processing Error</h1>
            <p className="text-xl text-gray-400 mb-8">{data.error}</p>
            <Link to="/upload">
              <button className="bg-gradient-to-r from-primary-600 to-neon-green text-black py-3 px-6 rounded-lg font-bold hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-200">
                Try Again
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // Use real backend data if available, otherwise fall back to mock data
  const backendResult = data?.result;
  const isRealData = backendResult && backendResult.result_type;

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <CheckCircle className="w-8 h-8 text-neon-green" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-neon-green bg-clip-text text-transparent">
              Analysis Complete
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {isRealData ? 'Your data has been processed by our AI agents' : 'Your AI model has been successfully trained and is ready to provide predictions'}
          </p>
        </motion.div>

        {/* Real Results Section */}
        <div className="space-y-8">
          {/* Render Visualization if available */}
          {plotlyLoaded && renderVisualization()}
          
          {/* Render Data Table if available */}
          {renderDataTable()}
          
          {/* Workflow Results for Planner Agent */}
          {isRealData && backendResult.result_type === 'workflow' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <Brain className="w-6 h-6 text-neon-green" />
                <span>Workflow Summary</span>
              </h2>
              <p className="text-gray-300 mb-4">{backendResult.data.workflow_summary}</p>
              
              {backendResult.data.model_results && (
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Model Results</h3>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    {JSON.stringify(backendResult.data.model_results, null, 2)}
                  </pre>
                </div>
              )}
            </motion.div>
          )}

          {/* Text Results */}
          {isRealData && backendResult.result_type === 'text' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <FileText className="w-6 h-6 text-neon-green" />
                <span>Analysis Results</span>
              </h2>
              <div className="bg-gray-800 rounded-lg p-4">
                <pre className="text-gray-300 whitespace-pre-wrap">{backendResult.data}</pre>
              </div>
            </motion.div>
          )}

          {/* Visualization Results */}
          {isRealData && backendResult.data.visualization && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <BarChart3 className="w-6 h-6 text-neon-green" />
                <span>Data Visualization</span>
              </h2>
              <div className="bg-gray-800 rounded-lg p-4">
                {(() => {
                  try {
                    const vizData = backendResult.data.visualization;
                    
                    // Handle different visualization formats
                    if (typeof vizData === 'string') {
                      // Check if it's a file path/URL
                      if (vizData.includes('.png') || vizData.includes('.jpg') || vizData.includes('.jpeg') || vizData.includes('.svg')) {
                        const imageUrl = vizData.startsWith('http') ? vizData : `http://localhost:5000/visualizations/${vizData.split('/').pop()}`;
                        return (
                          <img 
                            src={imageUrl} 
                            alt="Data Visualization" 
                            className="w-full h-auto rounded-lg"
                            onError={(e) => {
                              console.error('Image load error:', e);
                              const target = e.currentTarget as HTMLImageElement;
                              const nextElement = target.nextElementSibling as HTMLElement;
                              target.style.display = 'none';
                              if (nextElement) nextElement.style.display = 'block';
                            }}
                          />
                        );
                      }
                      
                      // Check if it's HTML content
                      if (vizData.includes('<html>') || vizData.includes('<div>')) {
                        return (
                          <iframe
                            srcDoc={vizData}
                            className="w-full h-96 rounded-lg border-0"
                            title="Data Visualization"
                          />
                        );
                      }
                      
                      // Try to parse as JSON for Plotly
                      try {
                        const plotData = JSON.parse(vizData);
                        return (
                          <Plot
                            data={plotData.data || []}
                            layout={{
                              ...plotData.layout,
                              paper_bgcolor: 'rgba(0,0,0,0)',
                              plot_bgcolor: 'rgba(0,0,0,0)',
                              font: { color: '#ffffff' },
                              xaxis: { ...plotData.layout?.xaxis, gridcolor: '#374151' },
                              yaxis: { ...plotData.layout?.yaxis, gridcolor: '#374151' }
                            }}
                            config={{ displayModeBar: false }}
                            style={{ width: '100%', height: '400px' }}
                          />
                        );
                      } catch {
                        // If not JSON, display as text
                        return <pre className="text-gray-300 whitespace-pre-wrap">{vizData}</pre>;
                      }
                    }
                    
                    // Handle object format (direct Plotly data)
                    if (typeof vizData === 'object' && vizData.data) {
                      return (
                        <Plot
                          data={vizData.data || []}
                          layout={{
                            ...vizData.layout,
                            paper_bgcolor: 'rgba(0,0,0,0)',
                            plot_bgcolor: 'rgba(0,0,0,0)',
                            font: { color: '#ffffff' },
                            xaxis: { ...vizData.layout?.xaxis, gridcolor: '#374151' },
                            yaxis: { ...vizData.layout?.yaxis, gridcolor: '#374151' }
                          }}
                          config={{ displayModeBar: false }}
                          style={{ width: '100%', height: '400px' }}
                        />
                      );
                    }
                    
                    // Fallback: display raw data
                    return (
                      <pre className="text-gray-300 whitespace-pre-wrap">
                        {JSON.stringify(vizData, null, 2)}
                      </pre>
                    );
                    
                  } catch (error) {
                    return (
                      <div className="text-red-400">
                        Error rendering visualization: {error instanceof Error ? error.message : 'Unknown error'}
                        <div className="mt-2 text-xs text-gray-500">
                          Raw data: {JSON.stringify(backendResult.data.visualization)}
                        </div>
                      </div>
                    );
                  }
                })()}
                <div className="hidden text-red-400 mt-2">
                  Failed to load visualization image. Please check if the backend visualization service is running.
                </div>
              </div>
            </motion.div>
          )}

          {/* Model Leaderboard */}
          {isRealData && backendResult.result_type === 'leaderboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-neon-green" />
                <span>Model Leaderboard</span>
              </h2>
              <div className="overflow-x-auto">
                {(() => {
                  try {
                    const leaderboardData = JSON.parse(backendResult.data);
                    const columns = leaderboardData.length > 0 ? Object.keys(leaderboardData[0]) : [];
                    
                    return (
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-800">
                            {columns.map((col) => (
                              <th key={col} className="text-left py-3 px-4 text-gray-400 font-semibold">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {leaderboardData.map((row: any, index: number) => (
                            <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                              {columns.map((col) => (
                                <td key={col} className="py-3 px-4 text-gray-300">
                                  {typeof row[col] === 'number' ? row[col].toFixed(4) : String(row[col])}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    );
                  } catch (error) {
                    return <p className="text-red-400">Error parsing leaderboard data</p>;
                  }
                })()}
              </div>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-neon-green" />
                <span>Quick Actions</span>
              </h2>
              <div className="space-y-3">
                <button 
                  onClick={handleDownloadModel}
                  className="w-full bg-neon-green text-black font-semibold py-3 px-4 rounded-lg hover:bg-neon-green/90 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Model</span>
                </button>
                <button className="w-full bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>Retrain Model</span>
                </button>
                <button className="w-full bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Deploy Model</span>
                </button>
              </div>
            </motion.div>

            {/* Your Query */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">Your Query</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                "{data?.prompt || 'Predict customer churn based on usage patterns and demographics'}"
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
