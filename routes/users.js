const express = require("express");
const User = require("../models/User");
const Project = require("../models/Project");

const router = express.Router();

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get single user
router.get("/users/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user", error });
  }
});

// Get user profile with aggregated data
router.get("/users/:username/profile", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const ownedProjects = await Project.find({ owner: user.username });
    
    let inProgressCount = user.inProgressProjects?.length || 0;
    
    for (const project of ownedProjects) {
      if (!user.inProgressProjects.some(id => id.toString() === project._id.toString())) {
        inProgressCount++;
      }
    }
    
    const userData = {
      username: user.username,
      fullName: user.fullName || "-",
      email: user.email,
      skills: user.skills || [],
      role: user.role || "Team Member",
      projectsCount: {
        created: ownedProjects.length,
        inProgress: inProgressCount,
       
      }
    };
    
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error fetching user profile", error });
  }
});

// Update user
router.put("/users/:username", async (req, res) => {
  const { username } = req.params;
  const updateFields = req.body;

  try {
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    Object.keys(updateFields).forEach(key => {
      user[key] = updateFields[key];
    });
    
    const savedUser = await user.save();
    res.status(200).json({ message: "Profile updated!", user: savedUser });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update user", error: error.toString() });
  }
});

module.exports = router;