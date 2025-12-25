import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';
import { Mail, Zap, Trash2 } from 'lucide-react'; // Importing Lucide icons
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// --- MODERN COLOR PALETTE (From ProposalModal) ---
const COLORS = {
  primary: "#007AFF", // Modern Blue
  background: "#F8F8F8", // Off-white screen background
  modalBg: "#FFFFFF",
  textDark: "#333333",
  borderLight: "#CCCCCC",
  success: "#4CAF50",
  cancel: "#E0E0E0",
};

// --- BASE REUSABLE STYLES (From ProposalModal) ---

const inputBaseStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "6px",
  borderRadius: "6px",
  border: `1px solid ${COLORS.borderLight}`,
  boxSizing: "border-box",
  fontSize: "1rem",
  transition: "border-color 0.2s, box-shadow 0.2s",
  backgroundColor: COLORS.modalBg,
};

const buttonBaseStyle = {
  padding: "10px 20px",
  borderRadius: "6px",
  fontWeight: 600,
  cursor: "pointer",
  border: "none",
  fontSize: "1rem",
  transition: "background-color 0.2s, opacity 0.2s",
};


// 📌 COMPONENT RENAMED & MODIFIED
const AgentProposalMessages = () => {
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState({
   subject: '',
    body: '',
    replyingToId: null,
    replyingToEmail: null
  });

  // State to manage focus for manual focus styling in modal
  const [focusedInput, setFocusedInput] = useState(null);

  const apiurl = "http://localhost:3002/aiAgentProposal/";

  // Fetch messages (Assuming the fetched data has fields: name, email, subject, projectType, description, _id)
  const fetchMessage = () => {
    axios({
      method: "get",
      url: apiurl + "fetch"
    })
      .then((response) => {
        setMessages(response.data);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  const [activeMessageId, setActiveMessageId] = useState(null);

  // Toggle full message view (now full description/proposal)
  const toggleFullMessage = (id) => {
    setActiveMessageId(activeMessageId === id ? null : id);
  };

  // Delete message
  const handleDelete = (_id) => {
    // ... (Deletion logic remains the same) ...
    axios({
      method: "delete",
      url: apiurl + "delete/" + _id,
    })
      .then(() => {
        setMessages(messages.filter(msg => msg._id !== _id));
        toast.success("✅ Proposal Deleted Successfully")
      })
      .catch((error)=> {
        console.error(error);
        toast.error("✖️ Something Went Wrong")
      });

  };

  // Open reply modal
  const openReplyModal = (_id, email, subject) => { // Passed subject to modal for context
    setReplyMessage({
      subject: `RE: ${subject || 'AI Agent Proposal'}`, // Pre-fill subject
      body: '',
      replyingToId: _id,
      replyingToEmail: email
    });
    setIsModalOpen(true);
  };

  const handleModalChange = (e) => {
    setReplyMessage({
      ...replyMessage,
      [e.target.name]: e.target.value,
    });
  };

  const handleReplySubmit = async (e) => {
    // ... (Reply submission logic remains the same) ...
    e.preventDefault();

    try {
      await axios.post(apiurl + "reply", {
        email: replyMessage.replyingToEmail,
        subject: replyMessage.subject,
        body: replyMessage.body
      });

      alert(`Reply sent to ${replyMessage.replyingToEmail}`);

      setIsModalOpen(false);
      setReplyMessage({
        subject: "",
        body: "",
        replyingToId: null,
        replyingToEmail: null
      });
    } catch (err) {
      console.error(err);
      alert("Failed to send reply");
      toast.error("✖️ Failed to send message")
    }
  };

  // Function to apply focus styles
  const getFocusStyle = (name) =>
    focusedInput === name
      ? {
        borderColor: COLORS.primary,
        boxShadow: `0 0 0 2px ${COLORS.primary}40`,
        outline: "none"
      }
      : {};

  // Modal Component (No logic change, only text update in header)
  const MessageModal = () => {
    if (!isModalOpen) return null;

    return (
      <div style={modernModalStyles.overlay}>
        <div style={modernModalStyles.backdrop} onClick={() => setIsModalOpen(false)}></div>
        <div style={modernModalStyles.modal}>

          {/* Header */}
          <div style={modernModalStyles.header}>
            <h2 style={{ margin: 0, fontWeight: 600 }}>🤖 Reply to Proposal</h2> {/* 📌 Updated Text */}
            <button
              onClick={() => setIsModalOpen(false)}
              style={modernModalStyles.closeButton}
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleReplySubmit} style={modernModalStyles.form}>

            <p style={{ color: COLORS.textDark, marginBottom: '15px' }}>
              Replying to: <strong>{replyMessage.replyingToEmail}</strong>
            </p>

            {/* Subject Field */}
            <label style={modernModalStyles.label}>
              Subject:
              <input
                type="text"
                name="subject"
                value={replyMessage.subject}
                onChange={handleModalChange}
                required
                style={{ ...modernModalStyles.input, ...getFocusStyle('subject') }}
                onFocus={() => setFocusedInput('subject')}
                onBlur={() => setFocusedInput(null)}
              />
            </label>

            {/* Message Body Field */}
            <label style={modernModalStyles.label}>
              Reply Message: {/* 📌 Updated Label */}
              <textarea
                name="body"
                value={replyMessage.body} 
                onChange={handleModalChange}
                rows="5"
                required
                style={{ ...modernModalStyles.textarea, ...getFocusStyle('body') }}
                onFocus={() => setFocusedInput('body')}
                onBlur={() => setFocusedInput(null)}
              ></textarea>
            </label>

            {/* Buttons */}
            <div style={modernModalStyles.buttons}>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={modernModalStyles.cancelButton}
              >
                Cancel
              </button>
              <button type="submit" style={modernModalStyles.submitButton}>
                Send Reply
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // JSX
  return (
    <div style={containerStyle}>
      <Navbar />

      <h2 style={headerH2Style}><Zap size={30} style={{ marginRight: '10px' }} /> AI Agent Proposals</h2>

      {messages.length === 0 ? (
        <p>No proposals found.</p>
      ) : (
        <div style={cardGridStyle}>
          {messages.map((msg) => {
            const isExpanded = activeMessageId === msg._id;

            // 📌 ASSUMING 'message' field holds the long description/details
            const proposalDetail = msg.description || 'No description provided.';
            const truncatedMessage =
              proposalDetail.length > 150
                ? proposalDetail.substring(0, 150) + "..."
                : proposalDetail;

            return (
              <div key={msg._id} style={cardStyle}>
                <div style={cardHeaderStyle}>
                  <h4>{msg.subject || 'New Agent Proposal'}</h4> {/* 📌 Used subject for Project Name/Title */}
                  <span style={idStyle}>ID: {msg._id}</span>
                </div>

                <p style={detailStyle}>
                  <strong>Name:</strong> {msg.companyName}
                </p>
                <p style={detailStyle}>
                 <strong>Email:</strong> {msg.email}
                </p>
                {/* 📌 Display Placeholder for Project Type/Budget (If available in API) */}
                <p style={detailStyle}>
                  <strong>Type:</strong> {msg.industry || 'Unspecified'}
                </p>
                <p>
                  <strong>Expected Users:</strong> {msg.expectedUsers}
                </p>
                <p>
                  <strong>Preffered TimeLine
                    :</strong> {msg.preferredTimeline}
                </p>
                <div style={messageContentStyle}>
                  <p style={{ fontWeight: 600, color: COLORS.textDark }}>Proposal Details:</p>
                  <p>{isExpanded ? proposalDetail : truncatedMessage}</p>

                  {/* Only show toggle button if message is truncated */}
                  {proposalDetail.length > 150 && (
                    <button
                      onClick={() => toggleFullMessage(msg._id)}
                      style={toggleButtonStyle}
                    >
                      {isExpanded ? "Show Less" : "Read Full Proposal"} {/* 📌 Updated Text */}
                    </button>
                  )}
                </div>

                <div style={actionsStyle}>
                  <button
                    onClick={() => openReplyModal(msg._id, msg.email, msg.subject)} // Passed subject
                    style={buttonReplyStyle}
                  >
                    <Mail size={16} style={{ marginRight: '5px' }} /> Reply
                  </button>

                  <button
                    onClick={() => handleDelete(msg._id)}
                    style={buttonDeleteStyle}
                  >
                    <Trash2 size={16} style={{ marginRight: '5px' }} /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <MessageModal />
    </div>
  );
};

export default AgentProposalMessages;


/* ----------------------------------------------------------
   STYLES (Minor additions/changes)
----------------------------------------------------------- */

const headerH2Style = { display: 'flex', alignItems: 'center', color: COLORS.textDark };
const containerStyle = { padding: "20px", background: COLORS.background, minHeight: '100vh' };

const cardGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: COLORS.modalBg,
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  border: `1px solid ${COLORS.borderLight}`,
};

const cardHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: 'center',
  marginBottom: "10px",
  borderBottom: `1px solid ${COLORS.cancel}`,
  paddingBottom: "10px",
};

const idStyle = { fontSize: "0.8em", color: COLORS.borderLight };

const detailStyle = {
  color: COLORS.textDark,
  marginBottom: "5px",
  fontSize: "0.95rem" // Made details slightly smaller
};

const messageContentStyle = {
  marginBottom: "15px",
  color: COLORS.textDark,
  fontSize: "0.9rem"
};

const toggleButtonStyle = {
  border: "none",
  background: "none",
  color: COLORS.primary,
  cursor: "pointer",
  padding: 0,
  textDecoration: "underline",
  fontWeight: 500,
  marginTop: '5px',
  display: 'block'
};

const actionsStyle = {
  borderTop: `1px solid ${COLORS.cancel}`,
  paddingTop: "10px",
  display: "flex",
  gap: "10px",
  marginTop: '15px'
};

// Reusing base styles for main action buttons
const buttonReplyStyle = {
  ...buttonBaseStyle,
  background: COLORS.primary, // Changed to modern primary blue
  color: COLORS.modalBg,
  padding: "8px 15px",
  display: 'flex', // 📌 Added for icon alignment
  alignItems: 'center'
};

const buttonDeleteStyle = {
  ...buttonBaseStyle,
  background: "#E53935", // Red
  color: COLORS.modalBg,
  padding: "8px 15px",
  display: 'flex', // 📌 Added for icon alignment
  alignItems: 'center'
};

/* ----------------------------------------------------------
   STYLES FOR MODERN MODAL (REPLY) - Unchanged as they were clean
----------------------------------------------------------- */

const modernModalStyles = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background, // Use light background for screen
  },
  backdrop: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.4)", // Slightly lighter backdrop
  },
  modal: {
    backgroundColor: COLORS.modalBg,
    padding: "30px",
    borderRadius: "12px", // Rounded corners
    maxWidth: "500px", // Smaller modal for a reply
    width: "90%",
    zIndex: 1001,
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: `1px solid ${COLORS.cancel}`,
    color: COLORS.textDark,
  },
  closeButton: {
    border: "none",
    background: "transparent",
    fontSize: "24px",
    cursor: "pointer",
    color: COLORS.textDark,
    padding: "0 5px",
    transition: "color 0.2s",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px", // Reduced gap for dense form
  },
  label: {
    display: "block",
    fontWeight: 500,
    fontSize: "0.95rem",
    color: COLORS.textDark,
    marginTop: '10px'
  },
  input: {
    ...inputBaseStyle, // Reuses base style
  },
  textarea: {
    ...inputBaseStyle, // Reuses base style
    minHeight: "100px",
    resize: "vertical",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end", // Align buttons to the right
    gap: "15px",
    marginTop: "20px",
  },
  cancelButton: {
    ...buttonBaseStyle,
    backgroundColor: COLORS.cancel,
    color: COLORS.textDark,
  },
  submitButton: {
    ...buttonBaseStyle,
    backgroundColor: COLORS.primary,
    color: COLORS.modalBg,
  },
};