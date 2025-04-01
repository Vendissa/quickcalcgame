import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../styles/navbar.css";
import axios from "axios";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("userId"));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [showProfileCard, setShowProfileCard] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Close profile card when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showProfileCard && !e.target.closest(".profile-container")) {
        setShowProfileCard(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showProfileCard]);

  // Sync login state across tabs
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("userId"));
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("userId"));
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [location]);

  // Handle logout
  const handleLogout = async () => {
    try {
      if (user) {
        await axios.post("http://localhost:5000/auth/logout", { 
          userId: user._id 
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Handle profile picture upload
  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", user._id);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload/profile-pic", 
        formData, 
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const updatedUser = { ...user, avatar: response.data.avatar };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logotext">
        <h4>Quick Calc Challenge</h4>
      </Link>

      <div className="nav-links">
        <Link to="/howToPlay">How to Play</Link>
        <Link to="/leaderboard">Leader Board</Link>

        {isLoggedIn && (
          <div className="profile-container">

            <div 
              className="profile-trigger"
              onClick={() => setShowProfileCard(!showProfileCard)}
            >
              <FaUser /> 
            </div>

            
            {showProfileCard && (
              <div className="profile-card">
                <img
                  src={user?.avatar 
                    ? `http://localhost:5000${user.avatar}`
                    : "/default-profile.png"
                  }
                  alt="Profile"
                  className="profile-picture"
                />
                <p><strong>{user?.name}</strong></p>
                <p>High Score: {user?.highScore || 0}</p>
                
                <label className="upload-btn">
                  Change Photo
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    hidden
                  />
                </label>

                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;