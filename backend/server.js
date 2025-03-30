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

/*
const SECRET_KEY = "your_secret_key"; 

// Register Route
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already in use" });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        if (user.token) {
            return res.status(403).json({ message: "User already logged in. Please log out first." });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid email or password" });

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });

         // Save the token in the database
         user.token = token;
         await user.save();

        res.json({ message: "Login successful", token, user });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// logout route
app.post("/logout", async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Clear the token from the database
        user.token = null;
        await user.save();

        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ error: "Server error" });
    }
});


// Route to fetch bonus data (proxy API request)
app.get("/api/bonus", async (req, res) => {
    try {
        const response = await axios.get("http://marcconrad.com/uob/banana/api.php?out=json");
        res.json(response.data); // Forward the API response to the frontend
    } catch (error) {
        console.error("Error fetching bonus data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

//highscore route
// Update high score if the new score is higher
app.post("/update-highscore", async (req, res) => {
    const { userId, newScore } = req.body;

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

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

app.get("/leaderboard", async (req, res) => {
    try {
        const leaderboard = await UserModel.find({ highScore: { $gt: 0 } }) // Exclude users with score 0
            .sort({ highScore: -1 }) // Sort in descending order
            .select("name highScore"); // Only fetch necessary fields

        res.json(leaderboard);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
*/