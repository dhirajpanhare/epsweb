import React, { useState } from 'react';
import styles from './AiAgentSection.module.css';

// Lucide Icons
import { Braces, Plane, Briefcase, Hospital, Car, Truck, MessageSquare, Brain, User, BarChart3 } from 'lucide-react';

// Define the initial conversation history
const DEFAULT_CHAT = [
  { type: 'ai', text: 'Hello! I am your Enterprise AI Assistant. How can I help you future-proof your business today?' },
  { type: 'user', text: 'What are the core capabilities of your IT consulting service?' },
  { type: 'ai', text: 'Our consulting service specializes in strategic technology roadmaps, system architecture design, and comprehensive cloud migration planning, tailored to maximize your ROI.' }
];

const agentData = [
  {
    id: 1,
    name: 'AI IT Support',
    icon: Braces,
    prompt: 'Help me troubleshoot a network connectivity issue and recommend security best practices for our infrastructure.',
    description: 'Technical support and IT infrastructure guidance',
    color: '#8CA9FF',
  },
  {
    id: 2,
    name: 'AI Travel Booker',
    icon: Plane,
    prompt: 'Find me the best flight and hotel options for a business trip to New York next month with flexible dates.',
    description: 'Smart travel planning and booking assistance',
    color: '#8CA9FF',
  },
  {
    id: 3,
    name: 'AI HR Assistant',
    icon: Briefcase,
    prompt: 'Help me draft a job description for a Senior Software Engineer position and suggest interview questions.',
    description: 'Recruitment, onboarding, and HR management',
    color: '#8CA9FF',
  },
  {
    id: 4,
    name: 'AI Health Support',
    icon: Hospital,
    prompt: 'Provide general wellness tips and help me understand my recent health metrics and fitness goals.',
    description: 'Health information and wellness guidance',
    color: '#8CA9FF',
  },
  {
    id: 5,
    name: 'AI Auto Advisor',
    icon: Car,
    prompt: 'Compare electric vehicles in the $40k-$50k range and recommend the best option for city driving.',
    description: 'Vehicle recommendations and automotive advice',
    color: '#8CA9FF',
  },
  {
    id: 6,
    name: 'AI Logistics Manager',
    icon: Truck,
    prompt: 'Optimize our delivery routes for 50 packages across the city and calculate estimated delivery times.',
    description: 'Supply chain optimization and logistics planning',
    color: '#8CA9FF',
  },
];

const AIAgentSection = () => {
  // State for the ongoing conversation history (starts with default conversation)
  const [chatHistory, setChatHistory] = useState(DEFAULT_CHAT);

  // State for the current prompt in the input box
  const [currentPrompt, setCurrentPrompt] = useState('');

  // State to track which card is currently active/selected
  const [activeAgentId, setActiveAgentId] = useState(null);

  // State for uploaded files
  const [uploadedFile, setUploadedFile] = useState(null);

  // State to show data visualization
  const [showDataViz, setShowDataViz] = useState(false);
  const [chartData, setChartData] = useState(null);

  const handleSend = (textToSend) => {
    if (textToSend.trim() === '') return;

    // Simulate User sending the prompt
    const newUserMessage = { type: 'user', text: textToSend };

    // Simulate AI response based on the prompt's origin (Agent vs. Manual)
    const agentName = activeAgentId ? agentData.find(a => a.id === activeAgentId)?.name : 'Custom Query';

    // Check if Data Analyst agent is active and file is uploaded
    if (activeAgentId === 7 && uploadedFile) {
      const newAiResponse = {
        type: 'ai',
        text: `Analyzing ${uploadedFile.name}... Data processed successfully! Generating visualizations...`,
        hasChart: true
      };
      setChatHistory(prevHistory => [...prevHistory, newUserMessage, newAiResponse]);

      // Simulate data visualization
      setTimeout(() => {
        generateSampleChart(uploadedFile.type);
        setShowDataViz(true);
      }, 1000);
    } else {
      const newAiResponse = { type: 'ai', text: `Query received by ${agentName}. Simulating results for: "${textToSend.substring(0, 30)}..."` };
      setChatHistory(prevHistory => [...prevHistory, newUserMessage, newAiResponse]);
    }

    // Update history and clear input
    setCurrentPrompt('');
    setUploadedFile(null);
  };

  const generateSampleChart = (fileType) => {
    // Generate sample data based on file type
    const sampleData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [65, 59, 80, 81, 56, 55],
      type: fileType.includes('excel') || fileType.includes('spreadsheet') ? 'bar' : 'line'
    };
    setChartData(sampleData);
  };
// handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      const fileMessage = {
        type: 'user',
        text: `📎 Uploaded: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`
      };
      setChatHistory(prevHistory => [...prevHistory, fileMessage]);

      const aiResponse = {
        type: 'ai',
        text: `File received! I can analyze this ${file.type.includes('pdf') ? 'PDF' : file.type.includes('sheet') || file.type.includes('excel') ? 'Excel' : 'CSV'} file. What insights would you like me to extract?`
      };
      setChatHistory(prevHistory => [...prevHistory, aiResponse]);
    }
  };

  const handleCardClick = (agentPrompt, agentId) => {
    // 1. Set the input box value to the agent's prompt
    setCurrentPrompt(agentPrompt);
    setActiveAgentId(agentId);

    // 2. Immediately send the prompt to simulate conversation flow
    //    We use a small delay here to visually demonstrate the prompt appearing then being sent.
    setTimeout(() => {
      handleSend(agentPrompt);
    }, 50);
  };

  const handlePromptChange = (e) => {
    setCurrentPrompt(e.target.value);
    setActiveAgentId(null); // Deactivate the agent card if the user starts typing manually
  };

  // Function to handle manual send button click
  const handleManualSend = () => {
    handleSend(currentPrompt);
  };


  return (
    <section className={styles.agentSection} id='ai-agents'>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Specialized AI Agents for Every Business Need</h2>
        <p className={styles.sectionSubtitle}>
          Choose an AI agent tailored to your industry and start experiencing intelligent automation today.
        </p>

        <div className={styles.agentLayout}>

          {/* === LEFT SECTION: AI Agent Cards === */}
          <div className={styles.agentCardsContainer}>
            {agentData.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <div
                  key={agent.id}
                  className={`${styles.agentCard} ${activeAgentId === agent.id ? styles.agentCardActive : ''}`}
                  onClick={() => handleCardClick(agent.prompt, agent.id)}
                  data-color={agent.color}
                >
                  <div className={styles.iconWrapper} style={{ backgroundColor: agent.color, }}>
                    <IconComponent size={28} style={{ color: "#fff" }} />
                  </div>
                  <h3 className={styles.agentName}>{agent.name}</h3>
                  <p className={styles.agentDescription}>
                    {agent.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* === RIGHT SECTION: AI Chat Box (MODIFIED) === */}
          <div className={styles.chatBoxContainer}>
            <div className={styles.chatHeader}>
              <MessageSquare size={20} className={styles.chatIcon} />
              <span className={styles.chatTitle}>AI Agent</span>
            </div>

            <div className={styles.chatWindow}>
              {/* Display Chat History */}
              {chatHistory.map((message, index) => (
                <div key={index} className={`${styles.chatMessage} ${styles[message.type]}`}>
                  <span className={styles.avatar}>
                    {message.type === 'ai' ? <Brain size={16} /> : <User size={16} />}
                  </span>
                  <div className={styles.messageText}>{message.text}</div>
                </div>
              ))}
            </div>

            {/* Data Visualization Area */}
            {showDataViz && chartData && (
              <div className={styles.dataVizContainer}>
                <h4 className={styles.vizTitle}>📊 Data Analysis Results</h4>
                <div className={styles.chartContainer}>
                  <div className={styles.simpleChart}>
                    {chartData.values.map((value, idx) => (
                      <div key={idx} className={styles.chartBar}>
                        <div
                          className={styles.barFill}
                          style={{ height: `${value}%`, backgroundColor: '#8CA9FF' }}
                        ></div>
                        <span className={styles.barLabel}>{chartData.labels[idx]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.dataStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Average:</span>
                    <span className={styles.statValue}>{(chartData.values.reduce((a, b) => a + b, 0) / chartData.values.length).toFixed(2)}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Max:</span>
                    <span className={styles.statValue}>{Math.max(...chartData.values)}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Min:</span>
                    <span className={styles.statValue}>{Math.min(...chartData.values)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className={styles.chatInputArea}>
              {activeAgentId === 7 && (
                <div className={styles.fileUploadSection}>
                  <label htmlFor="fileUpload" className={styles.fileUploadLabel}>
                    📁 Upload Data (PDF, Excel, CSV, Cloud)
                  </label>
                  <input
                    id="fileUpload"
                    type="file"
                    accept=".pdf,.xlsx,.xls,.csv,.json"
                    onChange={handleFileUpload}
                    className={styles.fileInput}
                  />
                  {uploadedFile && (
                    <span className={styles.fileName}>✓ {uploadedFile.name}</span>
                  )}
                </div>
              )}
              <textarea
                className={styles.chatInput}
                placeholder={activeAgentId === 7 ? "Upload data and ask for analysis..." : "Type your query and press Send..."}
                value={currentPrompt}
                onChange={handlePromptChange}
              />

              <button className={styles.sendButton} onClick={handleManualSend}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAgentSection;