const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],
  owner: { type: String, required: true },
  requirements: [String],
  roles: [{
    title: { type: String, required: true },
    description: { type: String },
    skills: [String],
    filled: { type: Boolean, default: false },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    roleType: { 
      type: String, 
      enum: [
        "Frontend Developer", 
        "Backend Developer", 
        "UI/UX Designer", 
        "Project Manager", 
        "DevOps Engineer", 
        "QA Tester", 
        "Data Scientist", 
        "Mobile Developer", 
        "Content Writer", 
        "Graphic Designer", 
        "Marketing Specialist", 
        "SEO Expert", 
        "Database Administrator", 
        "Security Specialist", 
        "Business Analyst", 
        "Product Manager", 
        "Other"
      ],
      default: "Other"
    }
  }],
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  othersApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  forumMessages: [messageSchema]
});

module.exports = mongoose.model("Project", projectSchema);