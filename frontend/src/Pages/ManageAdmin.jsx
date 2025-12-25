import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';

// --- MODERN COLOR PALETTE ---
const COLORS = {
  primary: "#007AFF",
  success: "#4CAF50",
  danger: "#E53935",
  background: "#F8F8F8",
  modalBg: "#FFFFFF",
  textDark: "#333333",
  textLight: "#666666",
  borderLight: "#CCCCCC",
  accentYellow: "#FFC107",
};

// --- BASE REUSABLE STYLES ---
const statusBaseStyle = {
  padding: '4px 8px',
  borderRadius: '4px',
  fontWeight: 600,
  fontSize: '0.8rem',
};

const buttonBaseStyle = {
  padding: '6px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
  border: 'none',
  fontWeight: 500,
  transition: 'background-color 0.2s',
  fontSize: '0.85rem',
};

const ManageAdmin = () => {
  const [admins, setAdmins] = useState([]);

  const apiurl = "http://localhost:3002/users/";

  // Fetch admins from backend
  const fetchAdmins = () => {
    axios.get(apiurl + "fetch")
      .then((response) => {
        // Map status 1/0 to isActive true/false
        const data = response.data.map(admin => ({
          ...admin,
          isActive: admin.status === 1
        }));
        setAdmins(data);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Toggle status
  const toggleAdminStatus = (id, currentStatus) => {
    const newStatus = currentStatus ? 0 : 1; // invert
    axios.put(apiurl + "update", {
      condition_obj: { _id: id },
      content_obj: { status: newStatus }
    })
    .then(() => {
      setAdmins(admins.map(admin =>
        admin._id === id ? { ...admin, isActive: !admin.isActive, status: newStatus } : admin
      ));
    })
    .catch(err => console.error(err));
  };

  // Delete admin
  const deleteAdmin = (id) => {
    if (!window.confirm(`Are you sure you want to delete Admin ID ${id}?`)) return;

    axios.delete(apiurl + "delete", { data: { _id: id } })
      .then(() => {
        setAdmins(admins.filter(admin => admin._id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <>
    <Navbar/>
    <div style={styles.container}>
      <h2 style={styles.header}>👥 Manage Admin Users</h2>

      <div style={styles.gridContainer}>
        <div style={{ ...styles.gridRow, ...styles.gridHeader }}>
          <div style={{ ...styles.gridCell, ...styles.centerText }}>S.No</div>
          <div style={styles.gridCell}>Name</div>
          <div style={styles.gridCell}>Email</div>
          <div style={styles.gridCell}>Number</div>
          <div style={styles.gridCell}>Status</div>
          <div style={{ ...styles.gridCell, ...styles.centerText }}>Actions</div>
        </div>

        {admins.length === 0 ? (
          <div style={styles.emptyMessage}>No admin accounts found.</div>
        ) : (
          admins.map((admin, index) => (
            <div key={admin._id} style={styles.gridRow}>
              <div style={{ ...styles.gridCell, ...styles.centerText, color: COLORS.textLight }}>{index + 1}</div>
              <div style={styles.gridCell}>{admin.name}</div>
              <div style={styles.gridCell}>{admin.email}</div>
              <div style={styles.gridCell}>{admin.number}</div>

              <div style={styles.gridCell}>
                <span style={admin.isActive ? styles.statusActive : styles.statusInactive}>
                  {admin.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div style={{ ...styles.gridCell, ...styles.actionsCell }}>
                <button
                  onClick={() => toggleAdminStatus(admin._id, admin.isActive)}
                  style={admin.isActive ? styles.buttonToggleOff : styles.buttonToggleOn}
                >
                  {admin.isActive ? 'Deactivate' : 'Activate'}
                </button>

                <button
                  onClick={() => deleteAdmin(admin._id)}
                  style={styles.buttonDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default ManageAdmin;

// --- STYLES ---
const styles = {
  container: { padding: "30px", background: COLORS.background, minHeight: '100vh', fontFamily: 'Arial, sans-serif' },
  header: { color: COLORS.textDark, marginBottom: "25px", fontWeight: 700, borderBottom: `2px solid ${COLORS.borderLight}`, paddingBottom: '10px' },
  gridContainer: { background: COLORS.modalBg, borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', overflow: 'hidden' },
  gridRow: { display: 'grid', gridTemplateColumns: '50px 1.5fr 2fr 1.2fr 1fr 1.5fr', borderBottom: `1px solid ${COLORS.borderLight}`, alignItems: 'center', padding: '12px 0' },
  gridHeader: { backgroundColor: COLORS.background, fontWeight: 600, color: COLORS.textDark, borderBottom: `2px solid ${COLORS.borderLight}`, padding: '15px 0' },
  gridCell: { padding: '0 15px', color: COLORS.textDark, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  centerText: { textAlign: 'center' },
  actionsCell: { display: 'flex', gap: '8px', justifyContent: 'center' },
  statusActive: { ...statusBaseStyle, backgroundColor: COLORS.success + '20', color: COLORS.success },
  statusInactive: { ...statusBaseStyle, backgroundColor: COLORS.accentYellow + '20', color: COLORS.accentYellow },
  buttonToggleOn: { ...buttonBaseStyle, backgroundColor: COLORS.success, color: COLORS.modalBg },
  buttonToggleOff: { ...buttonBaseStyle, backgroundColor: COLORS.textLight, color: COLORS.modalBg },
  buttonDelete: { ...buttonBaseStyle, backgroundColor: COLORS.danger, color: COLORS.modalBg },
  emptyMessage: { padding: '30px', textAlign: 'center', color: COLORS.textLight, fontSize: '1.1rem' }
};
