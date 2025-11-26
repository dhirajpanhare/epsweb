import React, { useState } from 'react';
import styles from './AIAgentSection.module.css';

// Lucide Icons
import { Braces, Plane, Briefcase, Hospital, Car ,Truck , MessageSquare ,Brain ,User} from 'lucide-react';

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
    // prompt: 'Analyze current market trends, identify competitive threats, and recommend a 5-year digital strategy roadmap.',
    color: '#8CA9FF',
  },
  {
    id: 2,
    name: 'AI Travel Booker',
    icon: Plane,
    // prompt: 'Review the latest commit for performance bottlenecks and security vulnerabilities, suggesting refactored code snippets.',
    color: '#8CA9FF',
  },
  {
    id: 3,
    name: 'AI Hr Assistant',
    icon: Briefcase,
    // prompt: 'Generate a comprehensive report on Q3 customer churn drivers using predictive modeling and key data visualizations.',
    color: '#8CA9FF',
  },
  {
    id: 4,
    name: 'AI Health Support',
    icon: Hospital,
    // prompt: 'Draft a clear, friendly response to a customer support ticket regarding API integration failure and expected resolution time.',
    color: '#8CA9FF',
  },
    {
    id: 5,
    name: 'AI Auto Advisor',
    icon: Car,
    // prompt: 'Draft a clear, friendly response to a customer support ticket regarding API integration failure and expected resolution time.',
    color: '#8CA9FF',
  },
    {
    id: 6,
    name: 'Ai Logistics manager',
    icon: Truck,
    // prompt: 'Draft a clear, friendly response to a customer support ticket regarding API integration failure and expected resolution time.',
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

  const handleSend = (textToSend) => {
    if (textToSend.trim() === '') return;
    
    // Simulate User sending the prompt
    const newUserMessage = { type: 'user', text: textToSend };
    
    // Simulate AI response based on the prompt's origin (Agent vs. Manual)
    const agentName = activeAgentId ? agentData.find(a => a.id === activeAgentId)?.name : 'Custom Query';
    const newAiResponse = { type: 'ai', text: `Query received by ${agentName}. Simulating results for: "${textToSend.substring(0, 30)}..."` };
    
    // Update history and clear input
    setChatHistory(prevHistory => [...prevHistory, newUserMessage, newAiResponse]);
    setCurrentPrompt('');
    setActiveAgentId(null);
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
        <h2 className={styles.sectionTitle}>Meet Our Specialized AI Agents</h2>
        <p className={styles.sectionSubtitle}>
          Click an agent to set a predefined query, or start chatting directly.
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
                  {/* <p className={styles.agentPromptHint}>
                    {agent.prompt.substring(0, 50)}...
                  </p> */}
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

            <div className={styles.chatInputArea}>
              <textarea
                className={styles.chatInput}
                placeholder="Type your query and press Send..."
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