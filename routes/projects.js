const express = require("express");
const Project = require("../models/Project");
const User = require("../models/User");

const router = express.Router();

// Create a project
router.post("/CreateProject", async (req, res) => {
  const { title, description, category, tags, requirements, owner, roles } = req.body;

  try {
    const newProject = new Project({
      title,
      description,
      category,
      tags,
      requirements,
      owner,
      roles: roles || []
    });
    await newProject.save();
    
    const ownerUser = await User.findOne({ username: owner });
    if (ownerUser) {
      ownerUser.inProgressProjects.push(newProject._id);
      await ownerUser.save();
    }

    res.status(200).json({ message: "Project created", project: newProject });
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ message: "Error creating project", error });
  }
});

// Get all projects
router.get("/getProjects", async (req, res) => {
  try {
    const projects = await Project.find().populate('collaborators', 'username');
    
    const projectsWithMessages = projects.map(project => {
      if (!project.forumMessages || project.forumMessages.length === 0) {
        project.forumMessages = [
          { author: project.owner, text: "Project started! Let's collaborate effectively.", timestamp: new Date() }
        ];
      }
      return project;
    });
    
    res.status(200).json(projectsWithMessages);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ message: "Error fetching projects", error: error.message });
  }
});

// Get a specific project
router.get("/getProject/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("collaborators", "username fullName");
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    if (!project.forumMessages) {
      project.forumMessages = [];
      await project.save();
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Fetch project error:", error);
    res.status(500).json({ message: "Error fetching project", error });
  }
});

// Get user's in-progress projects
router.get("/getInProgressProjects/:username", async (req, res) => {
  const { username } = req.params;
  
  try {
    const userRaw = await User.findOne({ username });
    if (!userRaw) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const existingProjects = [];
    
    for (const projectId of userRaw.inProgressProjects) {
      try {
        const project = await Project.findById(projectId).populate('collaborators', 'username');
        if (project) {
          existingProjects.push(project);
        }
      } catch (err) {}
    }
    
    const ownedProjects = await Project.find({ owner: username }).populate('collaborators', 'username');
    
    for (const project of ownedProjects) {
      if (!existingProjects.some(p => p._id.toString() === project._id.toString())) {
        existingProjects.push(project);
        
        if (!userRaw.inProgressProjects.some(id => id.toString() === project._id.toString())) {
          userRaw.inProgressProjects.push(project._id);
        }
      }
    }
    
    await userRaw.save();
    
    res.status(200).json(existingProjects);
  } catch (error) {
    console.error("Error fetching in-progress projects:", error);
    res.status(500).json({ message: "Error fetching in-progress projects", error: error.message });
  }
});

// Save/Unsave project endpoints
router.post("/saveProject", async (req, res) => {
  const { username, projectId } = req.body;
  
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (!user.savedProjects.includes(projectId)) {
      user.savedProjects.push(projectId);
      await user.save();
    }
    
    res.status(200).json({ message: "Project saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving project", error });
  }
});

router.post("/unsaveProject", async (req, res) => {
  const { username, projectId } = req.body;
  
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    user.savedProjects = user.savedProjects.filter(id => id.toString() !== projectId);
    await user.save();
    
    res.status(200).json({ message: "Project unsaved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error unsaving project", error });
  }
});

router.get("/getSavedProjects/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate("savedProjects");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.savedProjects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching saved projects", error });
  }
});

// Apply to project
router.put('/addProjectToUser/:projectId', async (req, res) => {
  const { projectId } = req.params;
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    const project = await Project.findById(projectId);
    
    if (!user || !project) {
      return res.status(404).json({ message: "User or project not found" });
    }

    // Prevent duplicate application
    if (user.appliedProjects.includes(projectId)) {
      return res.status(400).json({ message: "Already applied to this project" });
    }

    // Add project to user's appliedProjects
    user.appliedProjects.push(projectId);
    await user.save();
    
    // Add user to project's othersApplied array
    if (!project.othersApplied.includes(user._id)) {
      project.othersApplied.push(user._id);
      await project.save();
    }

    res.status(200).json({ message: "Successfully applied to project" });
  } catch (err) {
    console.error("Error in /addProjectToUser:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Accept applicant
router.post('/acceptApplicant', async (req, res) => {
  const { projectId, applicantUsername } = req.body;

  try {
    const user = await User.findOne({ username: applicantUsername });
    const project = await Project.findById(projectId);
    
    if (!user || !project) {
      return res.status(404).json({ message: "User or project not found" });
    }

    // Add user to project collaborators
    if (!project.collaborators.includes(user._id)) {
      project.collaborators.push(user._id);
    }
    
    // Remove from othersApplied
    project.othersApplied = project.othersApplied.filter(id => !id.equals(user._id));
    await project.save();
    
    // Add project to user's inProgressProjects
    if (!user.inProgressProjects.includes(projectId)) {
      user.inProgressProjects.push(projectId);
    }
    
    // Remove from appliedProjects
    user.appliedProjects = user.appliedProjects.filter(id => id.toString() !== projectId);
    await user.save();

    res.status(200).json({ message: "Applicant accepted successfully" });
  } catch (err) {
    console.error("Error accepting applicant:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Reject applicant
router.post('/rejectApplicant', async (req, res) => {
  const { projectId, applicantUsername } = req.body;

  try {
    const user = await User.findOne({ username: applicantUsername });
    const project = await Project.findById(projectId);
    
    if (!user || !project) {
      return res.status(404).json({ message: "User or project not found" });
    }

    // Remove from othersApplied
    project.othersApplied = project.othersApplied.filter(id => !id.equals(user._id));
    await project.save();
    
    // Remove from user's appliedProjects
    user.appliedProjects = user.appliedProjects.filter(id => id.toString() !== projectId);
    await user.save();

    res.status(200).json({ message: "Applicant rejected successfully" });
  } catch (err) {
    console.error("Error rejecting applicant:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Add forum message
router.post('/addForumMessage', async (req, res) => {
  const { projectId, author, text } = req.body;

  try {
    const project = await Project.findById(projectId);
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Add new message
    const newMessage = {
      author,
      text,
      timestamp: new Date()
    };
    
    project.forumMessages.push(newMessage);
    await project.save();

    res.status(200).json({ 
      message: "Message added successfully", 
      forumMessages: project.forumMessages 
    });
  } catch (err) {
    console.error("Error adding forum message:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;