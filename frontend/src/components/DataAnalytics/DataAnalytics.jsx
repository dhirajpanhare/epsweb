import React, { useState } from 'react';
import styles from './DataAnalytics.module.css';
import { 
  Upload, 
  FileText, 
  FileSpreadsheet, 
  File, 
  BarChart3, 
  PieChart, 
  TrendingUp,
  Download,
  X,
  CheckCircle
} from 'lucide-react';

const DataAnalytics = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [activeChart, setActiveChart] = useState('bar');
  const [dragActive, setDragActive] = useState(false);

  const supportedFormats = [
    { name: 'PDF', icon: FileText, ext: '.pdf', color: '#FF6B6B' },
    { name: 'Excel', icon: FileSpreadsheet, ext: '.xlsx, .xls', color: '#4CAF50' },
    { name: 'CSV', icon: File, ext: '.csv', color: '#2196F3' },
    { name: 'Word', icon: FileText, ext: '.docx, .doc', color: '#2B579A' },
    { name: 'JSON', icon: File, ext: '.json', color: '#FFC107' },
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setIsAnalyzing(true);
    setAnalysisComplete(false);

    // Simulate file processing
    setTimeout(() => {
      generateAnalysis(file);
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2000);
  };

  const generateAnalysis = (file) => {
    // Generate sample data based on file type
    const fileType = file.name.split('.').pop().toLowerCase();
    
    let data;
    if (fileType === 'csv' || fileType === 'xlsx' || fileType === 'xls') {
      data = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          { label: 'Revenue', values: [45000, 52000, 61000, 58000], color: '#8CA9FF' },
          { label: 'Expenses', values: [32000, 38000, 42000, 40000], color: '#FF6B6B' },
        ],
        insights: [
          'Revenue increased by 28.9% from Q1 to Q4',
          'Q3 showed the highest revenue at $61,000',
          'Average quarterly revenue: $54,000',
          'Profit margin improved by 15% over the period'
        ]
      };
    } else if (fileType === 'pdf' || fileType === 'docx' || fileType === 'doc') {
      data = {
        labels: ['Introduction', 'Analysis', 'Results', 'Conclusion'],
        datasets: [
          { label: 'Word Count', values: [1200, 3400, 2800, 900], color: '#8CA9FF' },
        ],
        insights: [
          'Total document length: 8,300 words',
          'Analysis section is the most detailed (41%)',
          'Average paragraph length: 85 words',
          'Readability score: 68/100 (Good)'
        ]
      };
    } else {
      data = {
        labels: ['Category A', 'Category B', 'Category C', 'Category D'],
        datasets: [
          { label: 'Data Points', values: [65, 78, 45, 92], color: '#8CA9FF' },
        ],
        insights: [
          'Total data points analyzed: 280',
          'Category D has the highest value (92)',
          'Average value across categories: 70',
          'Data quality score: 94/100'
        ]
      };
    }

    setChartData(data);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setAnalysisComplete(false);
    setChartData(null);
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    const format = supportedFormats.find(f => f.ext.includes(ext));
    return format ? format.icon : File;
  };

  const getFileColor = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    const format = supportedFormats.find(f => f.ext.includes(ext));
    return format ? format.color : '#666';
  };

  return (
    <section className={styles.analyticsSection} id="data-analytics">
      <div className={styles.container}>
        
        <h2 className={styles.sectionTitle} data-aos="fade-up">
          AI-Powered Data Analytics
        </h2>
        <p className={styles.sectionSubtitle} data-aos="fade-up" data-aos-delay="100">
          Upload your data files and let AI generate instant insights and visualizations
        </p>

        <div className={styles.mainLayout}>
          
          {/* Left Side - Upload Area */}
          <div className={styles.uploadSection} data-aos="fade-right" data-aos-delay="200">
            
            {!uploadedFile ? (
              <>
                <div 
                  className={`${styles.dropZone} ${dragActive ? styles.dragActive : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload size={48} className={styles.uploadIcon} />
                  <h3 className={styles.dropTitle}>Drag & Drop Your File</h3>
                  <p className={styles.dropText}>or click to browse</p>
                  
                  <input
                    type="file"
                    id="fileInput"
                    className={styles.fileInput}
                    accept=".pdf,.xlsx,.xls,.csv,.docx,.doc,.json"
                    onChange={handleFileInput}
                  />
                  <label htmlFor="fileInput" className={styles.browseButton}>
                    Choose File
                  </label>
                </div>

                <div className={styles.supportedFormats}>
                  <p className={styles.formatsTitle}>Supported Formats:</p>
                  <div className={styles.formatsList}>
                    {supportedFormats.map((format, index) => {
                      const IconComponent = format.icon;
                      return (
                        <div key={index} className={styles.formatItem}>
                          <IconComponent size={20} style={{ color: format.color }} />
                          <span>{format.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.filePreview}>
                <div className={styles.fileHeader}>
                  <h3 className={styles.fileTitle}>Uploaded File</h3>
                  <button className={styles.removeButton} onClick={removeFile}>
                    <X size={20} />
                  </button>
                </div>
                
                <div className={styles.fileInfo}>
                  {React.createElement(getFileIcon(uploadedFile.name), {
                    size: 48,
                    style: { color: getFileColor(uploadedFile.name) }
                  })}
                  <div className={styles.fileDetails}>
                    <p className={styles.fileName}>{uploadedFile.name}</p>
                    <p className={styles.fileSize}>
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>

                {isAnalyzing && (
                  <div className={styles.analyzingState}>
                    <div className={styles.loader}></div>
                    <p>Analyzing your data...</p>
                  </div>
                )}

                {analysisComplete && (
                  <div className={styles.completeState}>
                    <CheckCircle size={24} className={styles.checkIcon} />
                    <p>Analysis Complete!</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Side - Visualization Area */}
          <div className={styles.visualizationSection} data-aos="fade-left" data-aos-delay="300">
            
            {!chartData ? (
              <div className={styles.emptyState}>
                <BarChart3 size={64} className={styles.emptyIcon} />
                <h3>No Data Yet</h3>
                <p>Upload a file to see AI-generated visualizations and insights</p>
              </div>
            ) : (
              <>
                <div className={styles.chartControls}>
                  <button 
                    className={`${styles.chartButton} ${activeChart === 'bar' ? styles.active : ''}`}
                    onClick={() => setActiveChart('bar')}
                  >
                    <BarChart3 size={18} />
                    Bar Chart
                  </button>
                  <button 
                    className={`${styles.chartButton} ${activeChart === 'line' ? styles.active : ''}`}
                    onClick={() => setActiveChart('line')}
                  >
                    <TrendingUp size={18} />
                    Line Chart
                  </button>
                  <button 
                    className={`${styles.chartButton} ${activeChart === 'pie' ? styles.active : ''}`}
                    onClick={() => setActiveChart('pie')}
                  >
                    <PieChart size={18} />
                    Pie Chart
                  </button>
                </div>

                <div className={styles.chartContainer}>
                  {activeChart === 'bar' && (
                    <div className={styles.barChart}>
                      {chartData.datasets.map((dataset, datasetIndex) => (
                        <div key={datasetIndex} className={styles.datasetGroup}>
                          <p className={styles.datasetLabel}>{dataset.label}</p>
                          <div className={styles.barsContainer}>
                            {dataset.values.map((value, index) => (
                              <div key={index} className={styles.barWrapper}>
                                <div 
                                  className={styles.bar}
                                  style={{ 
                                    height: `${(value / Math.max(...dataset.values)) * 100}%`,
                                    backgroundColor: dataset.color 
                                  }}
                                >
                                  <span className={styles.barValue}>{value.toLocaleString()}</span>
                                </div>
                                <span className={styles.barLabel}>{chartData.labels[index]}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeChart === 'line' && (
                    <div className={styles.lineChart}>
                      <svg viewBox="0 0 400 200" className={styles.lineSvg}>
                        {chartData.datasets.map((dataset, datasetIndex) => {
                          const points = dataset.values.map((value, index) => {
                            const x = (index / (dataset.values.length - 1)) * 380 + 10;
                            const y = 180 - ((value / Math.max(...dataset.values)) * 160);
                            return `${x},${y}`;
                          }).join(' ');
                          
                          return (
                            <g key={datasetIndex}>
                              <polyline
                                points={points}
                                fill="none"
                                stroke={dataset.color}
                                strokeWidth="3"
                              />
                              {dataset.values.map((value, index) => {
                                const x = (index / (dataset.values.length - 1)) * 380 + 10;
                                const y = 180 - ((value / Math.max(...dataset.values)) * 160);
                                return (
                                  <circle
                                    key={index}
                                    cx={x}
                                    cy={y}
                                    r="5"
                                    fill={dataset.color}
                                  />
                                );
                              })}
                            </g>
                          );
                        })}
                      </svg>
                      <div className={styles.lineLabels}>
                        {chartData.labels.map((label, index) => (
                          <span key={index}>{label}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeChart === 'pie' && (
                    <div className={styles.pieChart}>
                      <svg viewBox="0 0 200 200" className={styles.pieSvg}>
                        {(() => {
                          const values = chartData.datasets[0].values;
                          const total = values.reduce((a, b) => a + b, 0);
                          let currentAngle = -90;
                          const colors = ['#8CA9FF', '#FF6B6B', '#4CAF50', '#FFC107'];
                          
                          return values.map((value, index) => {
                            const percentage = (value / total) * 100;
                            const angle = (percentage / 100) * 360;
                            const startAngle = currentAngle;
                            const endAngle = currentAngle + angle;
                            currentAngle = endAngle;
                            
                            const startRad = (startAngle * Math.PI) / 180;
                            const endRad = (endAngle * Math.PI) / 180;
                            
                            const x1 = 100 + 80 * Math.cos(startRad);
                            const y1 = 100 + 80 * Math.sin(startRad);
                            const x2 = 100 + 80 * Math.cos(endRad);
                            const y2 = 100 + 80 * Math.sin(endRad);
                            
                            const largeArc = angle > 180 ? 1 : 0;
                            
                            return (
                              <path
                                key={index}
                                d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                                fill={colors[index % colors.length]}
                                stroke="#fff"
                                strokeWidth="2"
                              />
                            );
                          });
                        })()}
                      </svg>
                      <div className={styles.pieLegend}>
                        {chartData.labels.map((label, index) => (
                          <div key={index} className={styles.legendItem}>
                            <span 
                              className={styles.legendColor}
                              style={{ backgroundColor: ['#8CA9FF', '#FF6B6B', '#4CAF50', '#FFC107'][index % 4] }}
                            ></span>
                            <span>{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.insightsSection}>
                  <h3 className={styles.insightsTitle}>
                    <Brain size={20} />
                    AI-Generated Insights
                  </h3>
                  <ul className={styles.insightsList}>
                    {chartData.insights.map((insight, index) => (
                      <li key={index} className={styles.insightItem}>
                        <CheckCircle size={16} />
                        {insight}
                      </li>
                    ))}
                  </ul>
                  <button className={styles.downloadButton}>
                    <Download size={18} />
                    Download Report
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Import Brain icon
import { Brain } from 'lucide-react';

export default DataAnalytics;
