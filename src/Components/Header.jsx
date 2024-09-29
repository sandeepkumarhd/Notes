import React from "react";
import styles from "../styles/Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
const Header = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Notes App</h1>
      </div>
      <nav>
        <ul className={styles.navLinks}>
          {user && (
            <li>
              <Link to="/home" className={styles.navLink}>
                Home
              </Link>
            </li>
          )}
          {!user && (
            <li>
              <Link to="/" className={styles.navLink}>
                Login
              </Link>
            </li>
          )}
          {!user && (
            <li>
              <Link to="/signup" className={styles.navLink}>
                Sign Up
              </Link>
            </li>
          )}
          {user && (
            <>
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
              <li>
                <Button
                  style={{ color: "black" }}
                  onClick={() => {
                    sessionStorage.clear();
                    navigate("/");
                  }}
                  className={styles.navLink}
                >
                  Logout
                </Button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
