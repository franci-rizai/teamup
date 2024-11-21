const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json()); // Enables parsing JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/teamup')
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

  const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String },
    dob: { type: String },
    gender: { type: String },
    about: { type: String },
    phone: { type: String },
    address: { type: String },
    skills: { type: String },
    education: { type: String },
    experience: { type: String },
    portfolio: { type: String },
  });


const UserModel = mongoose.model('User', userSchema);


// Route to get all users
app.get("/getUsers", (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => {
      console.error("Error fetching users:", err);
      res.status(500).send("Server error");
    });
});

app.post("/userInfo", async (req, res) => {
  const {
    username, // Used to identify the user
    fullName,
    dob,
    gender,
    about,
    phone,
    address,
    skills,
    education,
    experience,
    portfolio
  } = req.body;

  try {
    // Update the user profile based on username
    const updatedUser = await UserModel.findOneAndUpdate(
      { username }, // Search by username
      {
        fullName,
        dob,
        gender,
        about,
        phone,
        address,
        skills,
        education,
        experience,
        portfolio
      }
     
    );

    res.status(200).json({
      message: "User profile updated successfully!",
      user: updatedUser
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Failed to update user profile", error });
  }
});


// Login route
// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await UserModel.findOne({ username });
      if (!user || password !== user.password) {
        return res.status(200).json({ message: "Wrong Username Or Password" });

      }
      
      
        return res.status(200).json(
          {
            message:"Login successful"

          }
        )
      
     
      
      
  } catch (error) {
      console.error("Error during login:", error); // Log full error
      res.status(500).json({ message: "Server error: " + error.message });
  }
});

// Route to fetch a single project by ID
app.get("/getProject/:id", async (req, res) => {
  const { id } = req.params; // Extract the project ID from the route parameters
  try {
    const project = await ProjectModel.findById(id).populate("owner", "username email"); // Populate owner details
    if (!project) {
      return res.status(404).json({ message: "Project not found" }); // Handle case where project doesn't exist
    }
    res.status(200).json(project); // Return the project details
  } catch (error) {
    console.error("Error fetching project:", error); // Log any errors
    res.status(500).json({ message: "Error fetching project" }); // Return a server error message
  }
});


// Signup route with duplicate error handling
// Signup route with duplicate error handling
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if the username or email already exists in the database
      const existingUserByUsername = await UserModel.findOne({ username });
      if (existingUserByUsername) {
        return res.status(200).json({ message: "Username already exists" });
      }
  
      const existingUserByEmail = await UserModel.findOne({ email });
      if (existingUserByEmail) {
        return res.status(200).json({ message: "Email already exists" });
      }
  
      // If no duplicates, create a new user
      const newUser = new UserModel({ username, email, password });
      await newUser.save();
      res.status(200).json({ message: "Signup successful" });
  
    } catch (error) {
      console.error("Error during signup:", error); // Log the error
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  });
  
  // For projects



 
  const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, // Example: "Web Development"
    tags: [{ type: String }], // Example: ["React", "Teamwork"]
    status: { 
      type: String, 
      enum: ["Active", "Completed", "Archived"], 
      default: "Active" 
    },
    owner: [{type: String}],
    requirements: [{ type: String }], // Example: ["JavaScript", "Teamwork"]
  
  });
  
  const ProjectModel = mongoose.model('projects', ProjectSchema);
  
// Route to create a project
app.post("/CreateProject", async (req, res) => {
  const { title, description, category, tags, requirements } = req.body;

  try {
    const newProject = new ProjectModel({
      title,
      description,
      category,
      tags,
      requirements,
    });
    await newProject.save();
    res.status(200).json({ message: "Project created successfully!", project: newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Error creating project" });
  }
});

// Route to fetch all projects
app.get("/getProjects", async (req, res) => {
  try {
    const projects = await ProjectModel.find().populate("owner", "username email");
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Error fetching projects" });
  }
});

// Route to fetch a single project by ID
app.get("/getProject/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await ProjectModel.findById(id).populate("owner", "username email");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Error fetching project" });
  }
});



// Start the server
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
