import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  // Get current route
  const location = useLocation();

  // Debug: check current path
  useEffect(() => {
    console.log("Current path:", location.pathname);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  //for logout
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'AI Agents', href: '#ai-agents' },
  ];

  //=============================
  // ADMIN NAVBAR CHECK
  //=============================
  const isAdminPage =
    location.pathname === "/admin" ||
    location.pathname === "/admin/messages" ||
    location.pathname === "/admin/ai-agent-proposals" ||
    location.pathname === "/admin/register" ||
    location.pathname === "/login" ||
    location.pathname === "/admin/manageadmin"

  //=============================
  // ADMIN NAVBAR UI
  //=============================
  if (isAdminPage) {
    return (
      <header className={styles.header}>
        <div className={styles.container}>

          <div className={styles.logo}>
            <Link to="/admin">
              <img src="/logo.webp" alt="EnProSys" loading="lazy" />
            </Link>
          </div>

          <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
            <ul className={styles.navList}>
              <li className={styles.mobileContact}>
                <Link to="/register" onClick={toggleMenu}>
                  <button className={styles.contactButton}>Add Admin</button>
                </Link>

                <Link to="/logout" onClick={toggleMenu}>
                  <button className={styles.contactButton}>Logout</button>
                </Link>
              </li>
            </ul>

            <Link to="/admin/register">
              <button className={`${styles.contactButton} ${styles.desktopButton}`}>
                Add Admin
              </button>
            </Link>


            <button
              className={`${styles.contactButton} ${styles.desktopButton}`}
              style={{ backgroundColor: "red" }} onClick={logout}
            >
              Logout
            </button>

          </nav>

          <button className={styles.menuToggle} onClick={toggleMenu}>
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>
    );
  }

  //=============================
  // WEBSITE NAVBAR UI
  //=============================
  return (
    <header className={styles.header}>
      <div className={styles.container}>

        <div className={styles.logo}>
          <Link to="/">
            <img src="/logo.webp" alt="EnProSys" loading="lazy" />
          </Link>
        </div>

        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className={styles.navLink} onClick={toggleMenu}>
                  {link.name}
                </a>
              </li>
            ))}

            <li className={styles.mobileContact}>
              <a href="#contact" onClick={toggleMenu}>
                <button className={styles.contactButton}>Contact Us</button>
              </a>
            </li>
          </ul>

          <a href="#contact">
            <button className={`${styles.contactButton} ${styles.desktopButton}`}>
              Contact Us
            </button>
          </a>
        </nav>

        <button className={styles.menuToggle} onClick={toggleMenu}>
          {isOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
