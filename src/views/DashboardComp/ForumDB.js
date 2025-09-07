// Simple direct database access for forum messages
const mongoose = require('mongoose');

// Connect to MongoDB if not already connected
if (!mongoose.connection.readyState) {
  mongoose.connect("mongodb://127.0.0.1:27017/teamup", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Define the Project schema
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
  forumMessages: [{
    author: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }]
});

// Create the model
const ProjectModel = mongoose.model("Project", projectSchema);

// Export functions for direct database access
module.exports = {
  // Add a message to a project
  async addMessage(projectId, author, text) {
    try {
      // Use direct MongoDB update
      await ProjectModel.updateOne(
        { _id: projectId },
        { 
          $push: { 
            forumMessages: {
              author,
              text,
              timestamp: new Date()
            }
          }
        }
      );
      
      // Return the updated project
      return await ProjectModel.findById(projectId);
    } catch (error) {
      console.error("Error adding message to database:", error);
      throw error;
    }
  },
  
  // Get messages for a project
  async getMessages(projectId) {
    try {
      const project = await ProjectModel.findById(projectId);
      return project ? project.forumMessages || [] : [];
    } catch (error) {
      console.error("Error getting messages from database:", error);
      return [];
    }
  }
};