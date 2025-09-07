<template>
  <div class="inbox-container">
    <h1 class="section-title">Collaborator Inbox</h1>
    
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading inbox...</p>
    </div>
    
    <div v-else-if="error" class="error-message">{{ error }}</div>
    
    <div v-else>
      <!-- Project Selection -->
      <div class="project-selection">
        <h2>Your Projects</h2>
        <div class="project-tags">
          <div 
            v-for="project in userProjects" 
            :key="project._id"
            :class="['project-tag', { active: selectedProject && selectedProject._id === project._id }]"
            @click="selectProject(project)"
          >
            {{ project.title }}
          </div>
        </div>
      </div>
      
      <!-- Inbox Content -->
      <div class="inbox-content">
        <div v-if="selectedProject" class="project-inbox">
          <div class="inbox-header">
            <h2>{{ selectedProject.title }} - Team Chat</h2>
            <p class="project-members">
              <span v-if="projectMembers.length > 0">
                Team Members: {{ projectMembers.join(', ') }}
              </span>
              <span v-else>No team members yet</span>
            </p>
          </div>
          
          <!-- Message List -->
          <div class="messages-container">
            <div v-if="messages.length === 0" class="empty-state">
              <p>No messages yet. Start the conversation!</p>
            </div>
            
            <div v-else class="message-list">
              <div v-for="(message, index) in messages" :key="index" class="message-card">
                <div class="message-avatar">
                  <span class="avatar-text">{{ getInitials(message.author) }}</span>
                </div>
                <div class="message-content">
                  <div class="message-header">
                    <span class="message-author">{{ message.author }}</span>
                    <span class="message-time">{{ formatTime(message.timestamp) }}</span>
                  </div>
                  <p class="message-text">{{ message.text }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Message Input -->
          <div class="message-input">
            <textarea 
              v-model="newMessage" 
              placeholder="Write your message here..." 
              rows="3"
              @keydown.ctrl.enter="sendMessage"
            ></textarea>
            <button @click="sendMessage" class="send-button">
              <i class="fas fa-paper-plane"></i> Send
            </button>
          </div>
        </div>
        
        <div v-else class="no-project-selected">
          <p>Select a project to view the team inbox</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CollaboratorInbox',
  data() {
    return {
      username: localStorage.getItem("authToken"),
      userProjects: [],
      selectedProject: null,
      projectMembers: [],
      messages: [],
      newMessage: '',
      loading: true,
      error: null,
      messagePollingInterval: null,
      projectRefreshInterval: null
    };
  },
  methods: {
    async fetchUserProjects() {
      this.loading = true;
      this.error = null;
      
      try {
        // Get all projects and filter for this user
        const allProjectsResponse = await axios.get('http://localhost:3001/getProjects');
        const allProjects = allProjectsResponse.data || [];
        
        // Filter projects where user is owner or collaborator
        this.userProjects = allProjects.filter(project => {
          // User is owner
          if (project.owner === this.username) return true;
          
          // User is collaborator
          if (project.collaborators && project.collaborators.some(c => {
            if (typeof c === 'string') return c === this.username;
            return c.username === this.username;
          })) return true;
          
          return false;
        });
        
        // Check if there's a previously selected project
        const savedProjectId = localStorage.getItem('selected_project_id');
        if (savedProjectId) {
          const savedProject = this.userProjects.find(p => p._id === savedProjectId);
          if (savedProject) {
            setTimeout(() => this.selectProject(savedProject), 100);
          }
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        this.error = "Failed to load your projects.";
      } finally {
        this.loading = false;
      }
    },
    
    async selectProject(project) {
      // Clear existing polling when switching projects
      if (this.messagePollingInterval) {
        clearInterval(this.messagePollingInterval);
      }
      
      // Use the project as is without API call
      this.selectedProject = project;
      
      // Store selected project ID in localStorage
      localStorage.setItem('selected_project_id', project._id);
      
      // Clear messages when switching projects
      this.messages = [];
      
      // Get project members
      await this.fetchProjectMembers();
      
      // Get messages
      await this.fetchMessages();
      
      // Start polling for new messages
      this.startMessagePolling();
    },
    
    async fetchProjectMembers() {
      if (!this.selectedProject) return;
      
      try {
        // Get detailed project info with populated collaborators
        const response = await axios.get(`http://localhost:3001/getProject/${this.selectedProject._id}`);
        const project = response.data;
        
        // Build members list
        const members = [project.owner];
        
        if (project.collaborators && project.collaborators.length > 0) {
          project.collaborators.forEach(collaborator => {
            if (typeof collaborator === 'string') {
              members.push(collaborator);
            } else if (collaborator.username) {
              members.push(collaborator.username);
            }
          });
        }
        
        // Remove duplicates
        this.projectMembers = [...new Set(members)];
      } catch (error) {
        // Fallback to basic info
        this.projectMembers = [this.selectedProject.owner || this.username];
      }
    },
    
    async fetchMessages() {
      if (!this.selectedProject) return;
      
      try {
        // Get messages from server
        const response = await axios.get(`http://localhost:3001/getProject/${this.selectedProject._id}`);
        const project = response.data;
        
        if (project.forumMessages && project.forumMessages.length > 0) {
          this.messages = project.forumMessages;
        } else {
          this.messages = [];
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        this.messages = [];
      }
    },
    
    startMessagePolling() {
      if (this.messagePollingInterval) {
        clearInterval(this.messagePollingInterval);
      }
      
      // Poll for new messages every 2 seconds
      this.messagePollingInterval = setInterval(() => {
        if (this.selectedProject) {
          this.fetchMessages();
        }
      }, 2000);
    },
    
    async sendMessage() {
      const messageText = this.newMessage.trim();
      
      if (!messageText || !this.selectedProject) return;
      
      // Clear input immediately for better UX
      this.newMessage = '';
      
      try {
        // Send message to server
        const response = await axios.post('http://localhost:3001/addForumMessage', {
          projectId: this.selectedProject._id,
          author: this.username,
          text: messageText
        });
        
        // Update messages from server response
        if (response.data && response.data.forumMessages) {
          this.messages = response.data.forumMessages;
        }
        
        // Trigger immediate refresh for other users
        setTimeout(() => this.fetchMessages(), 500);
      } catch (error) {
        console.error("Error sending message:", error);
        
        // Fallback: add message locally
        const newMessage = {
          author: this.username,
          text: messageText,
          timestamp: new Date()
        };
        
        this.messages.push(newMessage);
      }
    },
    
    formatTime(timestamp) {
      if (!timestamp) return '';
      
      const date = new Date(timestamp);
      return date.toLocaleString();
    },
    
    getInitials(name) {
      if (!name) return '?';
      
      return name.split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .substring(0, 2);
    }
  },
  mounted() {
    this.fetchUserProjects();
    
    // Manual refresh button instead of auto-refresh
    this.projectRefreshInterval = null;
  },
  
  beforeUnmount() {
    // Clean up polling
    if (this.messagePollingInterval) {
      clearInterval(this.messagePollingInterval);
    }
  }
};
</script>

<style scoped>
.inbox-container {
  padding: 20px;
  color: #ecf0f1;
}

.section-title {
  margin-bottom: 25px;
  font-size: 1.8rem;
  color: #ecf0f1;
  border-bottom: 1px solid #455a64;
  padding-bottom: 10px;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #3498db;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #34495e;
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message {
  background-color: #2c3e50;
  color: #e74c3c;
  padding: 15px;
  border: 1px solid #c0392b;
  border-radius: 4px;
  text-align: center;
}

.project-selection {
  margin-bottom: 20px;
}

.project-selection h2 {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #ecf0f1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.project-tag {
  background-color: #34495e;
  color: #bdc3c7;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #455a64;
}

.project-tag:hover {
  border-color: #3498db;
  color: #ecf0f1;
}

.project-tag.active {
  background-color: #3498db;
  color: white;
  border-color: #2980b9;
}

.inbox-content {
  background-color: #2c3e50;
  border-radius: 8px;
  border: 1px solid #455a64;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.inbox-header {
  background-color: #34495e;
  padding: 15px 20px;
  border-bottom: 1px solid #455a64;
}

.inbox-header h2 {
  margin: 0 0 5px 0;
  font-size: 1.4rem;
  color: #ecf0f1;
}

.project-members {
  margin: 0;
  font-size: 0.9rem;
  color: #bdc3c7;
}

.messages-container {
  padding: 20px;
  max-height: 500px;
  overflow-y: auto;
}

.empty-state {
  text-align: center;
  padding: 30px;
  color: #bdc3c7;
  font-style: italic;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.message-card {
  display: flex;
  gap: 15px;
}

.message-avatar {
  width: 40px;
  height: 40px;
  background-color: #3498db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  flex-shrink: 0;
}

.message-content {
  flex: 1;
  background-color: #34495e;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid #455a64;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.message-author {
  font-weight: 600;
  color: #ecf0f1;
}

.message-time {
  font-size: 0.8rem;
  color: #bdc3c7;
}

.message-text {
  margin: 0;
  color: #bdc3c7;
  line-height: 1.5;
  white-space: pre-line;
}

.message-input {
  padding: 15px 20px;
  background-color: #34495e;
  border-top: 1px solid #455a64;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message-input textarea {
  width: 100%;
  padding: 12px;
  background-color: #2c3e50;
  border: 1px solid #455a64;
  border-radius: 4px;
  color: #ecf0f1;
  font-size: 1rem;
  resize: vertical;
}

.message-input textarea:focus {
  outline: none;
  border-color: #3498db;
}

.send-button {
  align-self: flex-end;
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.send-button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.send-button i {
  margin-right: 5px;
}

.no-project-selected {
  padding: 30px;
  text-align: center;
  color: #bdc3c7;
}

@media (max-width: 768px) {
  .inbox-container {
    padding: 15px;
  }
  
  .messages-container {
    max-height: 400px;
  }
}

@media (max-width: 480px) {
  .inbox-container {
    padding: 10px;
  }
  
  .project-tags {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 10px;
  }
  
  .project-tag {
    white-space: nowrap;
  }
  
  .messages-container {
    padding: 15px;
    max-height: 350px;
  }
}
</style>