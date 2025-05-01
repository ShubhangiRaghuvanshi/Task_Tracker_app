import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import './Register.css';

function Register() {
  const navigate = useNavigate(); // Initialize navigate

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",  // Keep the country field
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:4000/api/user/register", formData);
      console.log(response.data);
      alert("Registration successful!");
      navigate("/login"); // Redirect to login page after registration
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-title">Create an Account</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            placeholder="Minimum 6 characters"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="country" className="form-label">Country</label>
          <input
            id="country"
            name="country"
            type="text"
            value={formData.country}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your country"
            required
          />
        </div>

        <button type="submit" className="register-button">
          Register
        </button>

        <p className="login-redirect">
          Already have an account?{" "}
          <Link to="/login" className="login-link">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
