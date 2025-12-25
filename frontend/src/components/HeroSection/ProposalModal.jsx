import axios from "axios";
import { useState, useEffect } from "react";


export default function ProposalModal({ isOpen, onClose }) {
    
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    
    const [formData, setFormData] = useState({
      companyName: "",
      email: "",
      industry: "",
      primaryUseCase: "",
      expectedUsers: "",
      preferredTimeline: "",
      description: "",
    });
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const features = [
    "Real-time Analytics",
    "Custom Integration",
    "Priority Support",
    "Advanced Security",
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };
const apiurl = "http://localhost:3002/aiAgentProposal/"
  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
        method:"post",
        url:apiurl +"save",
        data:formData
    }).then((response)=>{
      alert("Sent successfully!");
      setFormData({
        companyName:"",
        email:"",
        industry:"",
        preferredTimeline:"",
        primaryUseCase:"",
        selectedFeatures:"",
        description:"",
      });
      console.log(response);
    }).catch((error)=>{
     console.log(error);
      alert("There was an error. Please try again later.");
    })
  };

  if (!isOpen) return null;

  // Function to apply focus styles
  const getFocusStyle = (name) => 
    focusedInput === name 
      ? { 
          borderColor: COLORS.primary, 
          boxShadow: `0 0 0 2px ${COLORS.primary}40`, 
          outline: "none" 
        } 
      : {};


  return (
    <div style={modernStyles.overlay}>
      <div style={modernStyles.backdrop} onClick={onClose}></div>
      <div style={modernStyles.modal}>
        
        {/* Header */}
        <div style={modernStyles.header}>
          <h2 style={{ margin: 0, fontWeight: 600 }}>🤖 Build Your AI Agent</h2>
          <button onClick={onClose} style={modernStyles.closeButton}>
            ✕
          </button>
        </div>

        {/* --- Content --- */}
        <div style={modernStyles.content}>
          <form  style={modernStyles.form}>
            
            {/* Grid for two-column layout */}
            <div style={modernStyles.formGrid}>
                 
              {/* Company Name */}
              <label style={modernStyles.label}>
                Company Name<span style={{color: COLORS.primary}}>*</span>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  style={{ ...modernStyles.input, ...getFocusStyle('companyName') }}
                  onFocus={() => setFocusedInput('companyName')}
                  onBlur={() => setFocusedInput(null)}
                />
              </label>

              {/* Email */}
              <label style={modernStyles.label}>
                Email<span style={{color: COLORS.primary}}>*</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{ ...modernStyles.input, ...getFocusStyle('email') }}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                />
              </label>

              {/* Industry */}
              <label style={modernStyles.label}>
                Industry
                <select
                  value={formData.industry}
                  onChange={(e) => handleSelectChange("industry", e.target.value)}
                  style={modernStyles.select}
                  >
                  <option value="">Select industry</option>
                  <option value="tech">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="other">Other</option>
                </select>
              </label>

              {/* Primary Use Case */}
              <label style={modernStyles.label}>
                Primary Use Case
                <select
                  value={formData.primaryUseCase}
                  onChange={(e) => handleSelectChange("primaryUseCase", e.target.value)}
                  style={modernStyles.select}
                  >
                  <option value="">Select use case</option>
                  <option value="automation">Automation</option>
                  <option value="analytics">Analytics</option>
                  <option value="integration">Integration</option>
                  <option value="customApp">Custom App</option>
                  <option value="other">Other</option>
                </select>
              </label>

              {/* Expected Users */}
              <label style={modernStyles.label}>
                Expected Users
                <select
                  value={formData.expectedUsers}
                  onChange={(e) => handleSelectChange("expectedUsers", e.target.value)}
                  style={modernStyles.select}
                >
                  <option value="">Select range</option>
                  <option value="1-10">1-10 Users</option>
                  <option value="11-50">11-50 Users</option>
                  <option value="51-100">51-100 Users</option>
                  <option value="100+">100+ Users</option>
                </select>
              </label>

              {/* Preferred Timeline */}
              <label style={modernStyles.label}>
                Preferred Timeline
                <select
                  value={formData.preferredTimeline}
                  onChange={(e) => handleSelectChange("preferredTimeline", e.target.value)}
                  style={modernStyles.select}
                >
                  <option value="">Select timeline</option>
                  <option value="asap">ASAP (1-2 weeks)</option>
                  <option value="month">Within a Month</option>
                  <option value="quarter">Within a Quarter</option>
                  <option value="flexible">Flexible</option>
                </select>
              </label>
            </div>
            
            {/* Additional Features (Full Width) */}
            <fieldset style={modernStyles.fieldset}>
              <legend style={modernStyles.legend}>Additional Features</legend>
              <div style={modernStyles.checkboxGroup}>
                {features.map((feature) => (
                  <label key={feature} style={modernStyles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      style={modernStyles.checkbox}
                    />
                    {feature}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Project Description (Full Width) */}
            <label style={modernStyles.label}>
              Project Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                style={{ ...modernStyles.textarea, ...getFocusStyle('description') }}
                onFocus={() => setFocusedInput('description')}
                onBlur={() => setFocusedInput(null)}
              />
            </label>

            {/* Buttons */}
            <div style={modernStyles.buttons}>
              <button type="button" onClick={onClose} style={modernStyles.cancelButton}>
                Cancel
              </button>
              <button onClick={handleSubmit} style={modernStyles.submitButton}>
                Get Detailed Proposal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
// --- MODERN COLOR PALETTE ---
const COLORS = {
  primary: "#007AFF", // Modern Blue
  background: "#F8F8F8", // Off-white screen background
  modalBg: "#FFFFFF",
  textDark: "#333333",
  borderLight: "#CCCCCC",
  success: "#4CAF50",
  cancel: "#E0E0E0",
};

// --- BASE REUSABLE STYLES (Fixed to be standalone variables) ---

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

// --- MODERN INLINE STYLES (Corrected) ---
const modernStyles = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  backdrop: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modal: {
    backgroundColor: COLORS.modalBg,
    padding: "30px",
    borderRadius: "12px",
    maxWidth: "700px",
    width: "90%",
    zIndex: 1001,
    maxHeight: "95vh",
    overflowY: "auto",
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
  content: {
    display: "flex",
    flexDirection: "column",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  label: {
    display: "block",
    fontWeight: 500,
    fontSize: "0.95rem",
    color: COLORS.textDark,
  },
  
  // Input: Uses spread syntax of the defined variable
  input: {
    ...inputBaseStyle,
  },
  
  // Select: Uses spread syntax of the defined variable
  select: {
    ...inputBaseStyle,
    appearance: "none",
    // Base64 SVG for custom dropdown arrow 
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23${COLORS.textDark.substring(1)}' d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px top 50%",
    backgroundSize: "16px",
  },
  
  // Textarea: Uses spread syntax of the defined variable
  textarea: {
    ...inputBaseStyle,
    minHeight: "100px",
    resize: "vertical",
  },
  fieldset: {
    border: `1px solid ${COLORS.borderLight}`,
    padding: "15px",
    borderRadius: "8px",
  },
  legend: {
    fontWeight: 600,
    padding: "0 10px",
    color: COLORS.textDark,
  },
  checkboxGroup: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "10px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    fontWeight: 400,
    fontSize: "0.9rem",
    color: COLORS.textDark,
  },
  checkbox: {
    marginRight: "8px",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px",
    marginTop: "10px",
  },
  // buttonBase is now defined globally as buttonBaseStyle
  
  cancelButton: {
    ...buttonBaseStyle, // FIXED: Used defined variable instead of this.buttonBase
    backgroundColor: COLORS.cancel,
    color: COLORS.textDark,
  },
  submitButton: {
    ...buttonBaseStyle, // FIXED: Used defined variable instead of this.buttonBase
    backgroundColor: COLORS.primary,
    color: COLORS.modalBg,
  },
};