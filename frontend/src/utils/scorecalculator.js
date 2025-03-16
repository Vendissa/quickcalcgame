// src/utils/ScoreCalculator.js
const calculateScore = (userAnswers, correctAnswers, gridSize, timeLeft, timeLimit) => {
    let correctCount = 0;
    let blankCount = 0;
    const totalCells = gridSize * gridSize;

    let hasEmptyCells = false;
  
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (userAnswers[i][j] === "") {
          blankCount++;
          hasEmptyCells = true;
        } else if (parseInt(userAnswers[i][j]) === correctAnswers[i][j]) {
          correctCount++;
        }
      }
    }
  
    // Accuracy Score (50%)
    let accuracyScore = (correctCount / totalCells) * 50;
  
    // Blank Penalty
    let blankPenalty = (50 / totalCells) * blankCount;
    accuracyScore -= blankPenalty;
  
    // Time Score (50%)
    let timeScore = 0;
    if (!hasEmptyCells) {
      timeScore = (timeLeft / timeLimit) * 50;
    }
  
    // Ensure scores don't go negative
    accuracyScore = Math.max(0, accuracyScore);
    timeScore = Math.max(0, timeScore);
  
    // Final Score
    let finalScore = accuracyScore + timeScore;
  
    return {
        finalScore: finalScore.toFixed(2), // formatted final score
        accuracyScore: accuracyScore.toFixed(2), // formatted accuracy score
        timeScore: timeScore.toFixed(2), // formatted time score
    };
  };
  
  export default calculateScore;
  