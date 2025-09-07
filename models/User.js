const mongoose = require("mongoose");

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
  savedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  about: String,
  address: String,
  dob: String,
  education: String,
  experience: String,
  gender: String,
  phone: String,
  portfolio: String,
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }]
});

module.exports = mongoose.model("User", userSchema);