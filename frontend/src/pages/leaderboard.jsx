import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/leaderaboard.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("http://localhost:5000/leaderboard");
        setLeaderboard(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

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
                <td>{index + 1}</td>
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
