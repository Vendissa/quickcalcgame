import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if user is already logged in and redirect them

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/game-levels"); // Redirect to game levels page
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form reload

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        // Save token in localStorage (for authentication)
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("token", response.data.token);
        const userData = response.data.user;
        localStorage.setItem("user", JSON.stringify(userData));
        
        window.dispatchEvent(new Event("storage"));

        alert("Login successful!");
        navigate("/game-levels"); // Redirect to game levels page
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
      <p className="register-link">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
