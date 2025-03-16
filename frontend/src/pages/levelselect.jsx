import { Link } from "react-router-dom";
import React from "react";
import "../styles/App.css";

const GameLevels = () => {
    // Difficulty levels data
    const levels = [
      { name: "Easy", grid: "3x3", time: 60, buttonText: "Let's Go", path: "/game/easy" },
      { name: "Medium", grid: "4x4", time: 80, buttonText: "Bring it on", path: "/game/medium" },
      { name: "Hard", grid: "5x5", time: 125, buttonText: "Hell yeah", path: "/game/hard" }
    ];
  
    return (
      <div className="game-levels-container">
        <h2>Select Your Difficulty</h2>
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
  /*<Link to={`/game/${level.name.toLowerCase()}`}>
  <button className={`level-button ${level.name.toLowerCase()}`}>
    {level.buttonText}
  </button>
</Link>*/
  export default GameLevels;