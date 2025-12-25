import React, { useState } from 'react';
import styles from './FAQModal.module.css';
import { ChevronDown, Plus, Minus } from 'lucide-react';

// Sample FAQ Data - Replace with your actual questions and answers
const faqData = [
    { 
        question: 'What is EMPROSYS and what services do you offer?', 
        answer: 'EMPROSYS is an IT startup specializing in custom software development, cloud infrastructure management, UI/UX design, and IT consulting services for established enterprises.' 
    },
    { 
        question: 'How does your pricing model work?', 
        answer: 'We offer flexible pricing based on project scope, team augmentation, or fixed-price contracts. We focus on straightforward pricing with no hidden fees—just solutions that fit your business needs and budget.' 
    },
    { 
        question: 'Is my data and intellectual property secure with EMPROSYS?', 
        answer: 'Security is a top priority. We adhere to strict security protocols and best practices in development and infrastructure management to ensure your data and IP are protected throughout the entire partnership.' 
    },
    { 
        question: 'Can you integrate your solutions with our existing accounting software/legacy systems?', 
        answer: 'Absolutely. We specialize in building custom APIs and integration layers to ensure seamless interoperability between our new solutions and your existing infrastructure.' 
    },
    { 
        question: 'What technologies do you primarily work with?', 
        answer: 'Our core stack includes modern frameworks like React, Next.js, and Node.js, and we leverage major cloud providers (AWS, Azure, GCP) for scalable infrastructure.' 
    },
];

// Sub-component for an individual Accordion Item
const FAQItem = ({ question, answer, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={styles.accordionItem}>
            <button 
                className={styles.questionHeader} 
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                aria-controls={`faq-content-${index}`}
            >
                <span className={styles.questionText}>{question}</span>
                {/* Icon changes based on expansion state, matching the reference image style */}
                <div className={styles.iconWrapper}>
                    {isExpanded ? (
                        <Minus size={20} className={styles.icon} />
                    ) : (
                        <Plus size={20} className={styles.icon} />
                    )}
                </div>
            </button>
            
            {/* The content area, conditionally rendered based on state */}
            {isExpanded && (
                <div 
                    id={`faq-content-${index}`} 
                    className={styles.answerContent}
                >
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
}

const FAQModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div 
                className={styles.modalContent} 
                onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                
                {/* Left Side: Title and Subtitle */}
                <div className={styles.leftPanel}>
                    <p className={styles.tag}>
                        <Plus size={14} className={styles.tagIcon} />
                        Frequently asked questions
                    </p>
                    <h2 id="modal-title" className={styles.mainTitle}>
                        Frequently asked <span className={styles.highlight}>questions</span>
                    </h2>
                    <p className={styles.subtext}>
                        Choose a plan that fits your business needs and budget. No hidden fees, no surprises—just straightforward pricing for powerful financial management.
                    </p>
                    
                    <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
                        ✕
                    </button>
                </div>

                {/* Right Side: Accordion Items */}
                <div className={styles.rightPanel}>
                    {faqData.map((item, index) => (
                        <FAQItem 
                            key={index} 
                            question={item.question} 
                            answer={item.answer} 
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQModal;