const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const router = express.Router();
const SECRET_KEY = "your_secret_key"; 

// Register Route
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already in use" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        if (user.token) {
            return res.status(403).json({ message: "User already logged in. Please log out first." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid email or password" });

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });
        user.token = token;
        await user.save();
        
        res.json({ 
            message: "Login successful", 
            token, 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                highScore: user.highScore,
                avatar: user.avatar,
            } 
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Logout Route
router.post("/logout", async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.token = null;
        await user.save();

        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
