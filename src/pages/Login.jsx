import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../apiConfig";
import { message } from "antd";
const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateData = (data) => {
    if (data.username.trim() === "") {
      message.warning("Please enter username.");
      return false;
    } else if (data.password.trim() === "") {
      message.warning("Please enter password.");
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = (e) => {
    if (validateData(formData)) {
      axiosInstance
        .post("/login", formData)
        .then((res) => {
          sessionStorage.setItem(
            "user",
            JSON.stringify({ IsLoggedIn: true, token: res.data?.data?.token })
          );
          navigate("/home");
          message.success(res.data?.data?.message);
        })
        .catch((err) => {
          console.log(err);
          message.warning("Something went wrong");
        });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            className={styles.input}
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className={styles.submitButton} onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
