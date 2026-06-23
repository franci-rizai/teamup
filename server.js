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



// Start the server
app.listen(3001, () => {
  console.log(" Server running on port 3001");
});