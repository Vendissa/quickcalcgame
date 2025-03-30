const express = require("express");
const axios = require("axios");
const UserModel = require("../models/User");

const router = express.Router();

// Fetch bonus data from external API
router.get("/bonus", async (req, res) => {
    try {
        const response = await axios.get("http://marcconrad.com/uob/banana/api.php?out=json");
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching bonus data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// Update High Score
router.post("/update-highscore", async (req, res) => {
    const { userId, newScore } = req.body;

    try {
        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        if (newScore > user.highScore) {
            user.highScore = newScore;
            await user.save();
            return res.json({ success: true, message: "High score updated!" });
        } else {
            return res.json({ success: false, message: "New score is not higher than current high score." });
        }
    } catch (error) {
        console.error("Error updating high score:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Fetch leaderboard
router.get("/leaderboard", async (req, res) => {
    try {
        const leaderboard = await UserModel.find({ highScore: { $gt: 0 } }) 
            .sort({ highScore: -1 })
            .select("name highScore");

        res.json(leaderboard);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
