const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path")
const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");
const uploadRoutes = require("./routes/uploadroutes");

const app = express();
const PORT = 5000;

// Enable CORS for your frontend
app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // For parsing JSON requests

mongoose.connect("mongodb://localhost:27017/Users");

// Routes
app.use("/auth", authRoutes); // Auth routes are now prefixed with /auth
app.use("/game", gameRoutes); // Game routes are now prefixed with /game
app.use("/upload", uploadRoutes); //upload routes are now prefixed with /upload

app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res) => {
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    }
  }));


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
