import React from "react";
import styles from "../styles/Header.module.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>MyApp</h1>
      </div>
      <nav>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/home" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className={styles.navLink}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className={styles.navLink}>
              Sign Up
            </Link>
          </li>
          <li>
            <Link to="/notes" className={styles.navLink}>
              All Notes
            </Link>
          </li>
          <li>
            <Link to="/contact" className={styles.navLink}>
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
