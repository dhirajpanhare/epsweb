import React, { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  // 1. State to manage the menu open/close status
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the menu state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'AI Agents', href: '#ai-agents' },

  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Left Side: Company Logo/Name */}
        <div className={styles.logo}>
          <a href="/">
           <img src="/logo.png" alt="" />
          </a>
        </div>

        {/* Right Side: Navigation Links and Button */}
        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
          
          {/* Nav List is toggled by 'navOpen' class */}
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className={styles.navLink} onClick={toggleMenu}>
                  {link.name}
                </a>
              </li>
            ))}
            {/* Mobile-only Contact Button inside the menu */}
            <li className={styles.mobileContact}>
              <a href="#contact"  onClick={toggleMenu}>
                <button className={styles.contactButton}>
                    Contact Us
                </button>
                </a>
            </li>
          </ul>

          {/* Desktop Contact Button (Hidden on mobile) */}
          <a href="#contact">
          <button className={`${styles.contactButton} ${styles.desktopButton}`}>
            Contact Us
          </button>
          </a>
        </nav>
        
        {/* Hamburger/Close Icon (Mobile Only) */}
        <button className={styles.menuToggle} onClick={toggleMenu} aria-expanded={isOpen}>
            {isOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
};

export default Navbar;