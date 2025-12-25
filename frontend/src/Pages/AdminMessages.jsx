import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState({
    subject: '',
    body: '',
    replyingToId: null,
    replyingToEmail: null
  });

  const apiurl = "http://localhost:3002/contact/";

  // Fetch messages
  const fetchMessage = () => {
    axios.get(apiurl + "fetch")
      .then((response) => {
        setMessages(response.data);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  const [activeMessageId, setActiveMessageId] = useState(null);

  // Toggle full message
  const toggleFullMessage = (id) => {
    setActiveMessageId(activeMessageId === id ? null : id);
  };

  // Delete message
  const handleDelete = (_id) => {
    axios.delete(apiurl + "delete/" + _id)
      .then(() => {
        setMessages(messages.filter(msg => msg._id !== _id));
        toast.success("Message Deleted Successfully");
      })
      .catch(err => console.error(err));
  };

  // Open modal
  const openReplyModal = (_id, email) => {
    setReplyMessage({
      subject: "",
      body: "",
      replyingToId: _id,
      replyingToEmail: email
    });
    setIsModalOpen(true);
  };

  // Correct input handling (fix for 1 character issue)
  const handleModalChange = useCallback((e) => {
    const { name, value } = e.target;
    setReplyMessage((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Submit reply
  const handleReplySubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      await axios.post(apiurl + "reply", {
        email: replyMessage.replyingToEmail,
        subject: replyMessage.subject,
        body: replyMessage.body
      });

      toast.success(`Reply sent to ${replyMessage.replyingToEmail}`);
      setIsModalOpen(false);

      setReplyMessage({
        subject: "",
        body: "",
        replyingToId: null,
        replyingToEmail: null
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to Send Message");
    }
  }, [replyMessage, apiurl]);



  return (
    <>
      <div style={containerStyle}>
        <Navbar />

        <h2>📩 Admin Messages</h2>

        {messages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          <div style={cardGridStyle}>
            {messages.map((msg) => {
              const isExpanded = activeMessageId === msg._id;
              const truncatedMessage =
                msg.message.length > 150
                  ? msg.message.substring(0, 150) + "..."
                  : msg.message;

              return (
                <div key={msg._id} style={cardStyle}>
                  <div style={cardHeaderStyle}>
                    <h4>{msg.subject}</h4>
                    <span style={idStyle}>ID: {msg._id}</span>
                  </div>

                  <p style={detailStyle}>
                    <strong>From:</strong> {msg.name} ({msg.email})
                  </p>

                  <div style={messageContentStyle}>
                    <p>{isExpanded ? msg.message : truncatedMessage}</p>

                    <button
                      onClick={() => toggleFullMessage(msg._id)}
                      style={toggleButtonStyle}
                    >
                      {isExpanded ? "Show Less" : "Read Full Message"}
                    </button>
                  </div>

                  <div style={actionsStyle}>
                    <button
                      onClick={() => openReplyModal(msg._id, msg.email)}
                      style={buttonReplyStyle}
                    >
                      Reply
                    </button>

                    <button
                      onClick={() => handleDelete(msg._id)}
                      style={buttonDeleteStyle}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FIX: Modal only renders when true */}
        {isModalOpen && (
          <div style={modalBackdropStyle}>
            <div style={modalContentStyle}>
              <h3>Reply to: {replyMessage.replyingToEmail}</h3>

              <form onSubmit={handleReplySubmit}>
                <label>Subject:</label>
                <input
                  type="text"
                  name="subject"
                  value={replyMessage.subject}
                  onChange={handleModalChange}
                  required
                  style={inputStyle}
                />

                <label>Message:</label>
                <textarea
                  name="body"
                  value={replyMessage.body}
                  onChange={handleModalChange}
                  rows="5"
                  required
                  style={inputStyle}
                ></textarea>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={buttonCancelStyle}>
                    Cancel
                  </button>
                  <button type="submit" style={buttonReplyStyle}>
                    Send Reply
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <ToastContainer autoClose={3000} hideProgressBar={false} />
    </>
  );
};

export default AdminMessages;

/* ---------------- STYLES ---------------- */

const containerStyle = { padding: "20px", background: "#f9f9f9" };

const cardGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  border: "1px solid #ddd",
};

const cardHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
  borderBottom: "1px solid #eee",
  paddingBottom: "10px",
};

const idStyle = { fontSize: "0.8em", color: "#666" };

const detailStyle = { color: "#333", marginBottom: "10px" };

const messageContentStyle = { marginBottom: "15px" };

const toggleButtonStyle = {
  border: "none",
  background: "none",
  color: "#007bff",
  cursor: "pointer",
  padding: 0,
  textDecoration: "underline"
};

const actionsStyle = {
  borderTop: "1px solid #eee",
  paddingTop: "10px",
  display: "flex",
  gap: "10px",
};

const buttonReplyStyle = {
  background: "#4CAF50",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "4px",
  cursor: "pointer",
};

const buttonDeleteStyle = {
  background: "#E53935",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "4px",
  cursor: "pointer",
};

const buttonCancelStyle = {
  background: "#999",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "4px",
  cursor: "pointer",
};

const modalBackdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "8px",
  minWidth: "400px",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "4px",
};
