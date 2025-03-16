import React, { useState, useEffect } from "react";
import calculateScore from "../utils/scorecalculator";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBonusQuestion } from "../utils/fetchBonusQuestion";
import "../styles/gameBoard.css";
import axios from "axios"; 

const GameBoard = () => {
    const { level } = useParams(); // Get difficulty from the URL
    const navigate = useNavigate();

    const levelSettings = {
        easy: { size: 3, time: 60, bonusTime: 20},
        medium: { size: 4, time: 80, bonusTime: 25},
        hard: { size: 5, time: 125, bonusTime: 30},
    };

    const { size, time } = levelSettings[level] || levelSettings.easy; // Default to easy

    // Function to generate unique random numbers between 3-19 excluding [1, 2, 10]
    const generateUniqueNumbers = (count) => {
        const excludedNumbers = new Set([1, 2, 10]);
        const availableNumbers = Array.from({ length: 17 }, (_, i) => i + 3).filter(num => !excludedNumbers.has(num));

        let uniqueNumbers = new Set();
        while (uniqueNumbers.size < count) {
            const randomNum = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
            uniqueNumbers.add(randomNum);
        }
        return Array.from(uniqueNumbers);
    };

    const [rowValues, setRowValues] = useState(generateUniqueNumbers(size));
    const [colValues, setColValues] = useState(generateUniqueNumbers(size));

    const [timer, setTimer] = useState(time);
    const [isRunning, setIsRunning] = useState(false);
    const [userGrid, setUserGrid] = useState(Array(size).fill(Array(size).fill("")));
    const [showBonusChallenge, setShowBonusChallenge] = useState(false);
    const [bonusQuestion, setBonusQuestion] = useState(null);
    const [bonusAnswer, setBonusAnswer] = useState("");
    const [isBonusChallengeActive, setIsBonusChallengeActive] = useState(false);
    const [hasClaimedBonus, setHasClaimedBonus] = useState(false);

    useEffect(() => {
        if (isRunning && timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        }
        
        if (timer === 0 && !hasClaimedBonus) {
            askForBonusTime();
        }
    }, [isRunning, timer, hasClaimedBonus]); 

    const handleInputChange = (row, col, value) => {
         // Allow only numbers (no letters or special characters)
        if (/^\d*$/.test(value)){
        const newGrid = userGrid.map((r, rIndex) =>
            r.map((c, cIndex) => (rIndex === row && cIndex === col ? value : c))
        );
    
        setUserGrid(newGrid);
    }
    };

    const askForBonusTime = () => {
        const userWantsBonus = window.confirm("You have run out of time! Do you want to attempt a bonus challenge for extra time?");
        if (userWantsBonus) {
            handleBonusChallenge();
        } else {
            alert("Game Over!");  
            navigate("/results");  
        }
    };

    const handleBonusChallenge = async () => {
        const questionData = await fetchBonusQuestion();
        if (questionData) {
            console.log("Fetched Bonus Challenge:", questionData);
            setBonusQuestion(questionData);
            setShowBonusChallenge(true);
            setIsBonusChallengeActive(true);
            setHasClaimedBonus(true);
        }
    };

    const submitBonusAnswer = () => {
        const { bonusTime } = levelSettings[level] || levelSettings.easy;

        if (bonusAnswer.trim() === String(bonusQuestion.solution).trim()) {
            alert(`Correct! You earned ${bonusTime} extra seconds.`);
            setTimer((prevTime) => prevTime + bonusTime);
            setShowBonusChallenge(false);
            setBonusQuestion(null);
            setBonusAnswer("");
            setIsBonusChallengeActive(false);
            setIsRunning(true);
        } else {
            alert("Incorrect answer! Game over.");
            navigate("/results"); 
        }
    };

    const resetGame = () => {
        setRowValues(generateUniqueNumbers(size));
        setColValues(generateUniqueNumbers(size));
        setUserGrid(Array(size).fill(Array(size).fill("")));
        setTimer(time);
        setIsRunning(false);
        setHasClaimedBonus(false);
    };

    const handleSubmit = async () => {
        const userId = localStorage.getItem("userId");

        const correctAnswers = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(colValues[i] * rowValues[j]);
            }
            correctAnswers.push(row);
        }

        const { finalScore } = calculateScore(userGrid, correctAnswers, size, timer, time);
        alert(`Your Score: ${finalScore}`);

        const newScore = parseFloat(finalScore);
    
        if (userId) {
            try {
                const response = await axios.post("http://localhost:5000/update-highscore", {
                    userId,
                    newScore,
                });

                console.log(response.data.message);
            } catch (error) {
                console.error("Error updating high score:", error);
            }
        }
    
        resetGame();
    };

    return (
        <div className="game-board-container">
            <h2>{level.charAt(0).toUpperCase() + level.slice(1)} Mode</h2>

            {isRunning ? (
                <p>Time left: {timer} seconds</p>
            ) : (
                <button className="start-btn" onClick={() => setIsRunning(true)}>
                    Start Game
                </button>
            )}

            <table className="game-grid">
                <tbody>
                    {Array(size + 1).fill().map((_, row) => (
                        <tr key={row}>
                            {Array(size + 1).fill().map((_, col) => {
                                if (row === 0 && col === 0) return <td key={`${row}-${col}`} className="symbol">✖</td>;
                                if (row === 0) return <td key={`${row}-${col}`} className="header">{rowValues[col - 1]}</td>;
                                if (col === 0) return <td key={`${row}-${col}`} className="header">{colValues[row - 1]}</td>;
                                return (
                                    <td key={`${row}-${col}`}>
                                        <input
                                            type="text"
                                            value={userGrid[row - 1][col - 1]}
                                            onChange={(e) => handleInputChange(row - 1, col - 1, e.target.value)}
                                            disabled={!isRunning || isBonusChallengeActive}
                                        />
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                className="submit-btn"
                onClick={handleSubmit || isBonusChallengeActive}
                disabled={!isRunning || isBonusChallengeActive}
            >
                Done
            </button>

            {showBonusChallenge && (
                <div className="bonus-time-container">
                    <h3>Solve this to earn more time:</h3>
                    <img src={bonusQuestion.question} alt="Bonus Challenge" className="bonus-image" />
                    <input
                        type="text"
                        placeholder="Enter your answer"
                        value={bonusAnswer}
                        onChange={(e) => setBonusAnswer(e.target.value)}
                    />
                    <button onClick={submitBonusAnswer} className="bonus-submit">
                        Submit Answer
                    </button>
                </div>
            )}
        </div>
    );
};

export default GameBoard;
