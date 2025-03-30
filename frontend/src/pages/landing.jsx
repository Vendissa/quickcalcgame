import React from "react";
import { Link } from "react-router-dom";
import '../styles/landing.css';

const landing = () =>{
return(
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Quick Calc Challenge</h1>
        <p className="landing-description">
          Sharpen your multiplication skills with this fun and interactive game!
          Solve the grid as fast as you can and improve your math skills.
        </p>
        <Link to="/login">
          <button className="get-started-btn">Get Started</button>
        </Link>
      </div>
    </div>
    );
};
export default landing;