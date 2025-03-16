import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../styles/App.css";
import axios from "axios";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("userId"));
  const navigate = useNavigate();
  const location = useLocation();

  const user = localStorage.getItem("userId");

  // Check login status on route change
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("userId"));

    // Listen for local storage changes (in case login/logout happens in another tab)
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("userId"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);

  }, [location]);

  const handleLogout = async () => {
    await senduser(); // Ensure logout request is sent
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const senduser = async () => {
    if (user) {
      try {
        const response = await axios.post("http://localhost:5000/logout", {
          userId: user, 
        });
        console.log(response.data.message);
      } catch (error) {
        console.error("Error logging out user:", error);
      }
    }
  };

  /*if (userId) {
    try {
        const response = await axios.post("http://localhost:5000/update-highscore", {
            userId,
            newScore,
        });

        console.log(response.data.message);
    } catch (error) {
        console.error("Error updating high score:", error);
    }
}*/

  return (
    <nav className="navbar">
      <Link to="/" className="logotext">
        <h4>Quick Calc Challenge</h4>
      </Link>
      <div className="nav-links">
        <Link to="/howToPlay">How to Play</Link>
        <Link to="/leaderboard">Leader Board</Link>
        
        {/* Only show logout button when logged in */}
        {isLoggedIn && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;