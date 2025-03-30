import React, { useState } from "react";
import axios from "axios";

const ProfileCard = ({ user, onLogout }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar || "");
  const [selectedFile, setSelectedFile] = useState(null);

  const toggleProfile = () => setShowProfile(!showProfile);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select an image!");
    
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    formData.append("userId", user._id);

    try {
      const response = await axios.post("http://localhost:5000/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAvatar(response.data.avatar);
      alert("Avatar updated successfully!");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Failed to upload avatar");
    }
  };

  return (
    <div className="profile-container">
      <img 
        src={avatar || "/default-avatar.png"} 
        alt="Profile" 
        className="profile-icon" 
        onClick={toggleProfile}
      />
      {showProfile && (
        <div className="profile-card">
          <h3>{user.name}</h3>
          <p>High Score: {user.highScore}</p>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload Avatar</button>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
