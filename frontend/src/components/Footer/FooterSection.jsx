import React from 'react';
import styles from './FooterSection.module.css';
import { Mail, MapPin, Phone, Linkedin, Twitter, Facebook } from 'lucide-react';
import FAQModal from '../FAQModal/FAQModal';
import { useState } from 'react';
const Footer = () => {
 

    // You can replace 'Startup Name' with your actual logo component
    const CompanyName = "ENPROSYS"; 

    return (
        <footer className={styles.footerSection}>
            <div className={styles.container}>
                
                {/* --- 1. Top Section: Logo and Brief Info --- */}
                <div className={styles.footerTop}>
                    <div className={styles.logoInfo}>
                        <h3 className={styles.companyName}>
                            {/* Using the text-dark color for the main name */}
                            {CompanyName}
                        </h3>
                     
                    </div>
                    {/* Optional: Newsletter form can go here */}
                </div>
                
                <hr className={styles.divider} />

                {/* --- 2. Main Navigation Grid --- */}
                <div className={styles.footerGrid}>
                    
                    {/* Column 1: Quick Links */}
                    <div className={styles.footerColumn}>
                        <h4 className={styles.columnTitle}>Quick Links</h4>
                        <a href="#about" className={styles.footerLink}>About Us</a>
                        <a href="#services" className={styles.footerLink}>Our Services</a>
                        <a href="#ai-agents" className={styles.footerLink}>AI Agents</a>
                        <a href="#contact" className={styles.footerLink}>contact</a>
                    </div>
                    
                    {/* Column 2: Legal & Resources */}
                    <div className={styles.footerColumn}>
                        <h4 className={styles.columnTitle}>Resources</h4>
                        <a href="/contact" className={styles.footerLink}>Contact</a>
                        <a href="/privacy" className={styles.footerLink}>Privacy Policy</a>
                        <a href="/terms" className={styles.footerLink}>Terms of Service</a>
                        <a href="" className={styles.footerLink} >FAQ</a>
                    </div>
                    
                    {/* Column 3: Contact Info & Socials */}
                    <div className={styles.footerColumn}>
                        <h4 className={styles.columnTitle}>Get In Touch</h4>
                        
                        <div className={styles.contactItem}>
                            <MapPin size={16} className={styles.contactIcon} />
                            <span>17A Electronic Complex, Indore</span>
                        </div>
                        
                        <div className={styles.contactItem}>
                            <Mail size={16} className={styles.contactIcon} />
                            <span>contact@emprosys.com</span>
                        </div>
                        
                        <div className={styles.contactItem}>
                            <Phone size={16} className={styles.contactIcon} />
                            <span>+91 98765 43210</span>
                        </div>

                        {/* Social Icons */}
                        <div className={styles.socialIcons}>
                            <a href="https://www.linkedin.com/company/enprosysinfotech/" aria-label="LinkedIn" className={styles.socialLink}><Linkedin size={20} /></a>
                            {/* <a href="#" aria-label="Twitter" className={styles.socialLink}><Twitter size={20} /></a> */}
                            {/* <a href="#" aria-label="Facebook" className={styles.socialLink}><Facebook size={20} /></a> */}
                        </div>
                    </div>

                </div>

                {/* --- 3. Bottom Bar: Copyright --- */}
                <div className={styles.copyrightBar}>
                    
                    <p>
                        &copy; {new Date().getFullYear()} {CompanyName}. All rights reserved.
                    </p>
                </div>
            </div>
            {/* <FAQModal isOpen={isModalOpen} onClose={() =>  setIsModalOpen(false)}  /> */}
        </footer>
    );
};

export default Footer;