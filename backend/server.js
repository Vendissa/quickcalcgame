const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");


const app = express();
const PORT = 5000;

// Enable CORS for your frontend
app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); //to allow frontend requests to send authentication tokens
app.use(express.json()); // For parsing JSON requests

mongoose.connect("mongodb://localhost:27017/Users");

// Routes
app.use("/auth", authRoutes); // Auth routes are now prefixed with /auth
app.use("/game", gameRoutes); // Game routes are now prefixed with /game

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
