// Shared forum service using server-side storage
import axios from 'axios';

// Use a shared storage mechanism
const SharedForumService = {
  // Add a message to a project
  async addMessage(projectId, message) {
    try {
      // First, get the current project
      const response = await axios.get(`http://localhost:3001/getProject/${projectId}`);
      const project = response.data;
      
      // Initialize forumMessages if it doesn't exist
      if (!project.forumMessages) {
        project.forumMessages = [];
      }
      
      // Add the new message
      project.forumMessages.push(message);
      
      // Update the project in the database
      await axios.post(`http://localhost:3001/CreateProject`, {
        ...project,
        _id: projectId
      });
      
      return project.forumMessages;
    } catch (error) {
      console.error("Error adding message:", error);
      // Fallback to localStorage
      const storageKey = `forum_messages_${projectId}`;
      let messages = JSON.parse(localStorage.getItem(storageKey) || '[]');
      messages.push(message);
      localStorage.setItem(storageKey, JSON.stringify(messages));
      return messages;
    }
  },
  
  // Get messages for a project
  async getMessages(projectId) {
    try {
      // Get project from server
      const response = await axios.get(`http://localhost:3001/getProject/${projectId}`);
      const project = response.data;
      
      // Return forum messages if they exist
      if (project.forumMessages && project.forumMessages.length > 0) {
        return project.forumMessages.map(msg => ({
          author: msg.author,
          text: msg.text,
          timestamp: new Date(msg.timestamp)
        }));
      }
      
      // Fallback to localStorage if no messages on server
      const storageKey = `forum_messages_${projectId}`;
      const savedMessages = localStorage.getItem(storageKey);
      if (savedMessages) {
        return JSON.parse(savedMessages);
      }
      
      return [];
    } catch (error) {
      console.error("Error getting messages:", error);
      // Fallback to localStorage
      const storageKey = `forum_messages_${projectId}`;
      const savedMessages = localStorage.getItem(storageKey);
      return savedMessages ? JSON.parse(savedMessages) : [];
    }
  }
};

export default SharedForumService;