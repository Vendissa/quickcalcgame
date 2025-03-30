import { Link } from "react-router-dom";
import React from "react";
import "../styles/levelselect.css";

const GameLevels = () => {
    // Difficulty levels data
    const levels = [
      { name: "Easy", grid: "3x3", time: 60, buttonText: "Let's Go", path: "/game/easy" },
      { name: "Medium", grid: "4x4", time: 80, buttonText: "Bring it on", path: "/game/medium" },
      { name: "Hard", grid: "5x5", time: 125, buttonText: "Hell yeah", path: "/game/hard" }
    ];
  
    return (
      <div className="game-levels-container">
        <h1>Select Your Difficulty</h1>
        <br />
        <br />
        <div className="levels-grid">
          {levels.map((level, index) => (
            <div key={index} className="level-card">
              <h3>{level.name} Mode</h3>
              <p>Grid: {level.grid}</p>
              <p>Time: {level.time} seconds</p>
              <Link to={`/game/${level.name.toLowerCase()}`}>
                <button className={`level-button ${level.name.toLowerCase()}`}>
                  {level.buttonText}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };
  export default GameLevels;