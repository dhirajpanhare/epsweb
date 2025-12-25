import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Admin.module.css';
// Importing icons for a modern look
import { MessageSquare, LayoutDashboard, UsersRound, Bot, Mail, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';

// Email Modal Component
const EmailModal = ({ emails, onClose, loading }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const emailsPerPage = 15;

    // Calculate pagination
    const indexOfLastEmail = currentPage * emailsPerPage;
    const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
    const currentEmails = emails ? emails.slice(indexOfFirstEmail, indexOfLastEmail) : [];
    const totalPages = emails ? Math.ceil(emails.length / emailsPerPage) : 0;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setSelectedEmail(null);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setSelectedEmail(null);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            setSelectedEmail(null);
        }
    };

    const handleViewEmail = async (email) => {
        // If email already has body content, just show it
        if (email.text || email.html) {
            setSelectedEmail(email);
            return;
        }

        // Otherwise, fetch full content
        setLoadingDetail(true);
        try {
            const response = await fetch(`http://localhost:3002/email/email/${email.id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.success) {
                setSelectedEmail(data.email);
            } else {
                alert(`Failed to load email: ${data.message}`);
            }
        } catch (err) {
            console.error('Error fetching email detail:', err);
            alert('Failed to load email content');
        } finally {
            setLoadingDetail(false);
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>
                        <Mail size={24} />
                        {loading ? 'Fetching Emails...' : `Fetched Emails (${emails?.length || 0})`}
                    </h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className={styles.modalBody}>
                    {loading ? (
                        <div className={styles.loadingContainer}>
                            <div className={styles.spinner}></div>
                            <p>Loading emails from server...</p>
                        </div>
                    ) : !selectedEmail ? (
                        <>
                            {emails && emails.length > 0 ? (
                                <>
                                    <div className={styles.tableContainer}>
                                        <table className={styles.emailTable}>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>From</th>
                                                    <th>Subject</th>
                                                    <th>Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentEmails.map((email, index) => (
                                                    <tr key={email.id || index}>
                                                        <td>{indexOfFirstEmail + index + 1}</td>
                                                        <td className={styles.emailFromCell}>
                                                            {email.from}
                                                        </td>
                                                        <td className={styles.emailSubjectCell}>
                                                            {email.subject || 'No Subject'}
                                                        </td>
                                                        <td className={styles.emailDateCell}>
                                                            {new Date(email.date).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </td>
                                                        <td>
                                                            <button
                                                                className={styles.viewButton}
                                                                onClick={() => handleViewEmail(email)}
                                                                disabled={loadingDetail}
                                                            >
                                                                {loadingDetail ? 'Loading...' : 'View'}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    <div className={styles.pagination}>
                                        <button
                                            className={styles.paginationButton}
                                            onClick={handlePrevPage}
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeft size={18} />
                                            Previous
                                        </button>

                                        <div className={styles.pageNumbers}>
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                <button
                                                    key={page}
                                                    className={`${styles.pageNumber} ${
                                                        currentPage === page ? styles.activePage : ''
                                                    }`}
                                                    onClick={() => handlePageChange(page)}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            className={styles.paginationButton}
                                            onClick={handleNextPage}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>

                                    <div className={styles.paginationInfo}>
                                        Showing {indexOfFirstEmail + 1} to {Math.min(indexOfLastEmail, emails.length)} of {emails.length} emails
                                    </div>
                                </>
                            ) : (
                                <div className={styles.noEmailsMessage}>
                                    <p>No emails found.</p>
                                </div>
                            )}
                        </>
                    ) : loadingDetail ? (
                        <div className={styles.loadingContainer}>
                            <div className={styles.spinner}></div>
                            <p>Loading email content...</p>
                        </div>
                    ) : (
                        <div className={styles.emailDetailView}>
                            <button
                                className={styles.backButton}
                                onClick={() => setSelectedEmail(null)}
                            >
                                ← Back to List
                            </button>
                            
                            <div className={styles.emailDetail}>
                                <div className={styles.emailDetailHeader}>
                                    <h3>{selectedEmail.subject || 'No Subject'}</h3>
                                    <p className={styles.emailMeta}>
                                        <strong>From:</strong> {selectedEmail.from}
                                    </p>
                                    <p className={styles.emailMeta}>
                                        <strong>To:</strong> {selectedEmail.to}
                                    </p>
                                    <p className={styles.emailMeta}>
                                        <strong>Date:</strong> {new Date(selectedEmail.date).toLocaleString()}
                                    </p>
                                </div>
                                
                                <div className={styles.emailBody}>
                                    <h4>Email Body:</h4>
                                    {selectedEmail.html ? (
                                        <div
                                            className={styles.emailHtml}
                                            dangerouslySetInnerHTML={{ __html: selectedEmail.html }}
                                        />
                                    ) : (
                                        <pre className={styles.emailText}>{selectedEmail.text}</pre>
                                    )}
                                </div>

                                {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                                    <div className={styles.attachments}>
                                        <h4>Attachments ({selectedEmail.attachments.length}):</h4>
                                        <ul>
                                            {selectedEmail.attachments.map((att, idx) => (
                                                <li key={idx}>
                                                    📎 {att.filename} ({(att.size / 1024).toFixed(2)} KB)
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
const DashboardCard = ({ title, link, icon: Icon, colorClass }) => (
    <Link to={link} className={styles.cardLink}>
        <div className={`${styles.dashboardCard} ${styles[colorClass]}`}>
            <div className={styles.iconContainer}>
                {/* Icon component dynamically passed via props */}
                <Icon size={36} className={styles.cardIcon} /> 
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <span className={styles.actionText}>View Details →</span>
        </div>
    </Link>
);

const AdminHome = () => {
    const [loading, setLoading] = useState(false);
    const [emailData, setEmailData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [fetchTime, setFetchTime] = useState(null);

    const handleFetchEmails = async () => {
        // Open modal immediately
        setShowModal(true);
        setLoading(true);
        setEmailData(null);
        setFetchTime(null);
        
        const startTime = performance.now();
        
        try {
            console.log('📧 Fetching emails from:', 'http://localhost:3002/email/fetch?limit=30');
            
            const response = await fetch('http://localhost:3002/email/fetch?limit=30');
            
            console.log('📡 Response status:', response.status, response.statusText);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            const endTime = performance.now();
            const duration = ((endTime - startTime) / 1000).toFixed(2);
            
            console.log('📦 Response data:', data);
            
            if (data.success) {
                setEmailData(data);
                setFetchTime(duration);
                console.log(`✅ Successfully fetched ${data.count} emails in ${duration}s`);
            } else {
                console.error('❌ API returned success: false');
                console.error('Error message:', data.message);
                alert(`❌ Error: ${data.message || 'Failed to fetch emails'}`);
                setShowModal(false);
            }
        } catch (err) {
            console.error('❌ Fetch error:', err);
            console.error('Error details:', {
                message: err.message,
                name: err.name,
                stack: err.stack
            });
            
            let errorMessage = 'Failed to fetch emails. ';
            if (err.message.includes('Failed to fetch')) {
                errorMessage += 'Backend server might not be running. Check if backend is running on port 3002.';
            } else if (err.message.includes('NetworkError')) {
                errorMessage += 'Network error. Check your connection.';
            } else {
                errorMessage += err.message;
            }
            
            alert(`❌ ${errorMessage}`);
            setShowModal(false);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEmailData(null);
        setFetchTime(null);
    };

    return (
        <div className={styles.adminDashboard}>
            <Navbar/>
            <br />
            <br />
            <header className={styles.dashboardHeader}>
                <LayoutDashboard size={32} className={styles.headerIcon} />
                <h1 className={styles.headerTitle}>Admin Dashboard</h1>
            </header>
            
            {/* Fetch Emails Button */}
            <div className={styles.actionButtonContainer}>
                <button 
                    onClick={handleFetchEmails} 
                    className={styles.fetchEmailButton}
                    disabled={loading}
                >
                    <Mail size={20} />
                    Fetch Emails
                </button>
            </div>

            {showModal && (
                <EmailModal
                    emails={emailData?.emails}
                    loading={loading}
                    onClose={handleCloseModal}
                />
            )}
            
            <div className={styles.dashboardGrid}>
                
                {/* 1. Messages Box (Primary Action) */}
                <DashboardCard 
                    title="Client Messages"
                    link="/admin/messages"
                    icon={MessageSquare}
                    colorClass="primary"
                />

                {/* 2. AI Agent Proposal Box (Secondary Action) */}
                <DashboardCard 
                    title="AI Agent Proposals"
                    link="/admin/ai-agent-proposals"
                    icon={Bot}
                    colorClass="secondary"
                />

                {/* You can add more cards here */}
                <DashboardCard 
                    title="Manage Admins"
                    link="/admin/manageadmin"
                    icon={UsersRound}
                    colorClass="secondary"
                />
            </div>
        </div>
    );
}

export default AdminHome;