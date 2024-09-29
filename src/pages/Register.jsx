import React, { useState } from "react";
import styles from "../styles/Register.module.css";
import axiosInstance from "../apiConfig";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [loding, setLoding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const validateData = (data) => {
    if (data.name.trim() === "") {
      message.warning("Please enter name.");
      return false;
    } else if (data.username.trim() === "") {
      message.warning("Please enter username.");
      return false;
    } else if (data.password.trim() === "") {
      message.warning("Please enter password.");
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = async (e) => {
    if (validateData(formData)) {
      setLoding(true);
      axiosInstance
        .post("/register", formData)
        .then((res) => {
          message.success(res.data?.message);
          setLoding(false);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setLoding(false);
          message.warning(err.response?.data?.message);
        });
    }

    // Here you can handle form submission, such as sending data to a backend
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign Up</h2>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter your password"
            required
          />
        </div>
        <button onClick={handleSubmit} className={styles.submitButton}>
          {loding ? "Please wait" : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Register;
