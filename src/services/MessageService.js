// MessageService.js - Centralized service for handling project messages
import axios from 'axios';

const MessageService = {
  // Get messages for a project
  async getMessages(projectId) {
    try {
      const response = await axios.get(`http://localhost:3001/getProject/${projectId}`);
      return response.data.forumMessages || [];
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  },
  
  // Send a message to a project
  async sendMessage(projectId, author, text) {
    try {
      const response = await axios.post('http://localhost:3001/addForumMessage', {
        projectId,
        author,
        text
      });
      
      return response.data.forumMessages || [];
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }
};

export default MessageService;