const express = require("express");
const multer = require("multer");
const path = require("path");
const UserModel = require("../models/User");

const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

// File filter (optional): Only allow images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

// Initialize multer
const upload = multer({ storage, fileFilter });

// Upload endpoint
router.post("/profile-pic", upload.single("avatar"), async (req, res) => {
  const userId = req.body.userId; // Get user ID from request body

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const imagePath = `/uploads/${req.file.filename}`; // Store relative path

    // Update user profile picture in the database
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { avatar: imagePath },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile picture updated!", avatar: imagePath });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
