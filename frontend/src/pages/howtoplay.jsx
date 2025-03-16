import React from "react";
import "../styles/howToPlay.css";

const HowToPlay = () => {
  return (
    <div className="how-to-play-container">
      <h2>How to Play</h2>
      <p>
        Welcome to <strong>Quick Calc Challenge!</strong> Here's how to play:
      </p>
      <div className="instructions">
        <h3>Objective</h3>
        <p>
          The goal is to fill the grid with the correct answers to multiplication
          questions. Each cell of the grid requires you to multiply a number from
          the top row with a number from the leftmost column. For example, the cell
          at row 1, column 1 will require you to multiply the top row value at
          column 1 with the leftmost column value at row 1.
        </p>
      </div>

      <div className="instructions">
        <h3>Game Setup</h3>
        <p>
          Once you start the game, a grid will appear with random numbers along
          the top and left side. Your task is to calculate the correct product of
          each row and column combination.
        </p>
      </div>

      <div className="instructions">
        <h3>Timer</h3>
        <p>
          The game will be timed, and your goal is to complete the grid before
          the timer runs out. Different difficulty levels give you different
          amounts of time.
        </p>
      </div>

      <div className="instructions">
        <h3>Score Calculation</h3>
        <p>
          Your score is based on how many answers are correct and the time you
          have left. You can also lose points for any empty cells left in the
          grid. Once the timer reaches zero or you click "Done," your score will
          be displayed.
        </p>
      </div>

      <div className="instructions">
        <h3>Game Modes</h3>
        <ul>
          <li><strong>Easy:</strong> 3x3 grid, 60 seconds.</li>
          <li><strong>Medium:</strong> 4x4 grid, 80 seconds.</li>
          <li><strong>Hard:</strong> 5x5 grid, 125 seconds.</li>
        </ul>
      </div>

      <p>Good luck and enjoy the challenge!</p>
    </div>
  );
};

export default HowToPlay;
