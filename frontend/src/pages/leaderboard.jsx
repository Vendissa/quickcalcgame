import React, { useState, useEffect } from "react";
import axios from "axios";
import confetti from "canvas-confetti";
import "../styles/leaderaboard.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("http://localhost:5000/game/leaderboard");
        setLeaderboard(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
    triggerConfetti();  // Trigger confetti when the leaderboard is loaded
  }, []);

  const triggerConfetti = () => {
    const interval = setInterval(() => {
      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random(),
        },
        colors: ["#ff0000", "#00ff00", "#0000ff"],
      });
    }, 500);

    // Stop the confetti after 5 seconds
    setTimeout(() => {
      clearInterval(interval);
    }, 5000);
  };

  const getMedal = (rank) => {
    switch (rank) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return "";
    }
  };

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.length === 0 ? (
            <tr>
              <td colSpan="3">No scores available</td>
            </tr>
          ) : (
            leaderboard.map((player, index) => (
              <tr key={index}>
                <td>
                  {getMedal(index)} {index + 1}
                </td>
                <td>{player.name}</td>
                <td>{player.highScore}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
