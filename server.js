const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

// Import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const projectRoutes = require("./routes/projects");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Connect to database
connectDB();

// Routes
app.use(authRoutes);
app.use(userRoutes);
app.use(projectRoutes);

// Direct updateUser route
app.post('/updateUser', async (req, res) => {
  const { username, ...updateFields } = req.body;

  try {
    const User = require('./models/User');
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

// Direct userInfo GET route
app.get('/userInfo/:username', async (req, res) => {
  try {
    const User = require('./models/User');
    const user = await User.findOne({ username: req.params.username });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Failed to fetch user info", error });
  }
});

// Direct getApplicantsForMyProjects route
app.get('/getApplicantsForMyProjects/:username', async (req, res) => {
  try {
    const Project = require('./models/Project');
    const projects = await Project.find({ owner: req.params.username }).populate('othersApplied');
    
    const result = projects.map(project => ({
      projectId: project._id,
      title: project.title,
      applicants: project.othersApplied || []
    }));
    
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ message: "Failed to fetch applicants", error });
  }
});

// Direct getForumMessages route
app.get('/getForumMessages/:projectId', async (req, res) => {
  try {
    const Project = require('./models/Project');
    const project = await Project.findById(req.params.projectId);
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    res.status(200).json(project.forumMessages || []);
  } catch (error) {
    console.error("Error fetching forum messages:", error);
    res.status(500).json({ message: "Failed to fetch messages", error });
  }
});



// Fix for getInProgressProjects endpoint
app.get("/getInProgressProjects/:username", async (req, res) => {
  const { username } = req.params;
  
  try {
    const User = require('./models/User');
    const Project = require('./models/Project');
    
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

// Fix for getUser endpoint
app.get("/getUser/:username", async (req, res) => {
  try {
    const User = require('./models/User');
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

// Fix for getUserProfile endpoint
app.get("/getUserProfile/:username", async (req, res) => {
  try {
    const User = require('./models/User');
    const Project = require('./models/Project');
    
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
        completed: user.completedProjects?.length || 0
      }
    };
    
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error fetching user profile", error });
  }
});



// Add forum message endpoint
app.post('/addForumMessage', async (req, res) => {
  const { projectId, author, text } = req.body;

  try {
    const Project = require('./models/Project');
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

// Start the server
app.listen(3001, () => {
  console.log("🚀 Server running on port 3001");
});