// InboxService.js - Service for managing inbox messages between collaborators
import axios from 'axios';

const InboxService = {
  // Store messages by project ID
  messages: {},
  
  // Add a message to a project
  async addMessage(projectId, message) {
    try {
      // Send message to server
      const response = await axios.post('http://localhost:3001/addForumMessage', {
        projectId,
        author: message.author,
        text: message.text
      });
      
      // Update local cache
      if (!this.messages[projectId]) {
        this.messages[projectId] = [];
      }
      
      this.messages[projectId] = response.data.forumMessages || [];
      return this.messages[projectId];
    } catch (error) {
      console.error("Error adding message:", error);
      
      // Fallback to local storage if server fails
      if (!this.messages[projectId]) {
        this.messages[projectId] = [];
      }
      
      const newMessage = {
        author: message.author,
        text: message.text,
        timestamp: new Date()
      };
      
      this.messages[projectId].push(newMessage);
      
      // Save to localStorage for persistence
      localStorage.setItem(`inbox_messages_${projectId}`, JSON.stringify(this.messages[projectId]));
      
      return this.messages[projectId];
    }
  },
  
  // Get messages for a project
  async getMessages(projectId) {
    try {
      // Get project from server
      const response = await axios.get(`http://localhost:3001/getProject/${projectId}`);
      const project = response.data;
      
      // Update local cache
      if (project.forumMessages && project.forumMessages.length > 0) {
        this.messages[projectId] = project.forumMessages;
      } else {
        // Try to load from localStorage if no messages on server
        const savedMessages = localStorage.getItem(`inbox_messages_${projectId}`);
        if (savedMessages) {
          this.messages[projectId] = JSON.parse(savedMessages);
        } else {
          this.messages[projectId] = [];
        }
      }
      
      return this.messages[projectId];
    } catch (error) {
      console.error("Error getting messages:", error);
      
      // Fallback to localStorage
      const savedMessages = localStorage.getItem(`inbox_messages_${projectId}`);
      if (savedMessages) {
        this.messages[projectId] = JSON.parse(savedMessages);
      } else if (!this.messages[projectId]) {
        this.messages[projectId] = [];
      }
      
      return this.messages[projectId];
    }
  },
  
  // Get all messages for all projects a user is part of
  async getAllMessages(username) {
    try {
      // Get all projects
      const response = await axios.get(`http://localhost:3001/getProjects`);
      const allProjects = response.data;
      
      // Filter projects where user is owner or collaborator
      const userProjects = allProjects.filter(project => {
        if (project.owner === username) return true;
        
        if (!project.collaborators) return false;
        
        return project.collaborators.some(collaborator => {
          return collaborator.username === username;
        });
      });
      
      // Get messages for each project
      const projectMessages = [];
      
      for (const project of userProjects) {
        if (project.forumMessages && project.forumMessages.length > 0) {
          projectMessages.push({
            projectId: project._id,
            title: project.title,
            messages: project.forumMessages
          });
        }
      }
      
      return projectMessages;
    } catch (error) {
      console.error("Error getting all messages:", error);
      return [];
    }
  }
};

export default InboxService;