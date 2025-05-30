const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/teamup", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: String,
  password: String,
  fullName: String,
  bio: String,
  skills: [String],
  interests: [String],
  appliedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  inProgressProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

const UserModel = mongoose.model("User", userSchema);

// Project Schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],
  status: {
    type: String,
    enum: ["Active", "Completed", "Archived"],
    default: "Active",
  },
  owner: { type: String, required: true },

  requirements: [String],
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  othersApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const ProjectModel = mongoose.model("Project", projectSchema);

/* ------------------- ROUTES ------------------- */

// Get all users
app.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Update user info
app.post("/userInfo", async (req, res) => {
  const { username, ...updateFields } = req.body;

  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { username },
      updateFields,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated!", user: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update user", error });
  }
});
app.post("/withdraw", async (req, res) => {
  const { username, projectId } = req.body;

  if (!username || !projectId) {
    return res.status(400).json({ message: "Missing username or projectId" });
  }

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the project from appliedProjects
    user.appliedProjects = user.appliedProjects.filter(
      (id) => id.toString() !== projectId
    );

    await user.save();

    res.status(200).json({ message: "Withdrawn successfully" });
  } catch (err) {
    console.error("Error withdrawing application:", err);
    res.status(500).json({ message: "Server error while withdrawing" });
  }
});


 

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Wrong Username or Password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Signup
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (await UserModel.findOne({ username })) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (await UserModel.findOne({ email })) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new UserModel({ username, email, password });
    await newUser.save();

    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
});

// Create a project
app.post("/CreateProject", async (req, res) => {
  const { title, description, category, tags, requirements,owner } = req.body;
console.log("Owner received:", owner);

  try {
    const newProject = new ProjectModel({
      title,
      description,
      category,
      tags,
      requirements,
      owner
      
    });
    await newProject.save();

    res.status(200).json({ message: "Project created", project: newProject });
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ message: "Error creating project", error });
  }
});

// Get all projects
app.get("/getProjects", async (req, res) => {
  try {
    const projects = await ProjectModel.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ message: "Error fetching projects" });
  }
});

// Get a specific project
app.get("/getProject/:id", async (req, res) => {
  try {
    const project = await ProjectModel.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Fetch project error:", error);
    res.status(500).json({ message: "Error fetching project", error });
  }
});

// Add a project to user's appliedProjects
app.put('/addProjectToUser/:projectId', async (req, res) => {
  const { projectId } = req.params;
  const { username } = req.body;
 


  try {
    console.log("Username:", username);
    console.log("Project ID:", projectId);
    const user = await UserModel.findOne({ username });
    const project = await ProjectModel.findById(projectId);
    

    if (!user || !project) {
      return res.status(404).json({ message: "User or project not found" });
    }

    // Prevent duplicate application
    if (user.appliedProjects.includes(projectId)) {
      return res.status(400).json({ message: "Already applied to this project" });
    }

    user.appliedProjects.push(projectId);
    await user.save();

    res.status(200).json({ message: "Project added to user's appliedProjects" });
  } catch (err) {
    console.error("Error in /addProjectToUser:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});





// Get applied projects of a user
app.get("/getAppliedProjects/:username", async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.params.username }).populate("appliedProjects");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.appliedProjects);
  } catch (error) {
    console.error("Applied projects fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get projects by user and status
app.get("/getUserProjectsByStatus/:username/:status", async (req, res) => {
  const { username, status } = req.params;
  const validStatuses = ["appliedProjects", "inProgressProjects", "completedProjects"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid project status" });
  }

  try {
    const user = await UserModel.findOne({ username }).populate(status);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user[status]);
  } catch (error) {
    console.error("Fetch projects by status error:", error);
    res.status(500).json({ message: "Error fetching projects" });
  }
});// Get applicants for projects created by the current user
app.get("/getApplicantsForMyProjects/:username", async (req, res) => {
  const { username } = req.params;

  try {
    // Βρες projects που ανήκουν στον χρήστη
    const projects = await ProjectModel.find({ owner: username }).populate("othersApplied", "fullName username");

    // Μορφοποίηση των αποτελεσμάτων για επιστροφή
    const result = projects.map(project => ({
      projectId: project._id,
      title: project.title,
      applicants: project.othersApplied.map(user => ({
        username: user.username,
        fullName: user.fullName
      }))
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ message: "Failed to fetch applicants", error });
  }
});


// Update project status (move project to a user’s applied/inProgress/completed)
app.put("/updateProjectStatus/:username", async (req, res) => {
  const { username } = req.params;
  const { projectId, status } = req.body;
  const validStatuses = ["appliedProjects", "inProgressProjects", "completedProjects"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status type" });
  }

  try {
    const update = { $addToSet: { [status]: projectId } };
    const user = await UserModel.findOneAndUpdate({ username }, update, { new: true }).populate(status);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: `Project added to ${status}`, user });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Error updating project status", error });
  }
});

// Start the server
app.listen(3001, () => {
  console.log("🚀 Server is running at http://localhost:3001");
});
