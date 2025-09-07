<template>
  <div class="forum-container">
    <h1 class="section-title">Team Forum</h1>
    
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading forum...</p>
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
      
      <!-- Forum Content -->
      <div v-if="selectedProject" class="forum-content">
        <div class="forum-header">
          <h2>{{ selectedProject.title }} - Team Discussion</h2>
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
        <p>Select a project to view the team forum</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Forum',
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
      messagePolling: null
    };
  },
  methods: {
    async fetchUserProjects() {
      this.loading = true;
      this.error = null;
      
      try {
        // Get all projects
        const createdResponse = await axios.get(`http://localhost:3001/getProjects`);
        
        if (createdResponse.data) {
          const allProjects = createdResponse.data;
          
          // Get projects where user is owner
          const ownedProjects = allProjects.filter(project => project.owner === this.username);
          
          // Get projects where user is a collaborator
          const collaboratingProjects = allProjects.filter(project => {
            if (!project.collaborators) return false;
            
            // Check if user is in collaborators
            return project.collaborators.some(collaborator => {
              return collaborator.username === this.username;
            });
          });
          
          // Combine both types of projects
          this.userProjects = [...ownedProjects, ...collaboratingProjects];
          
          // Remove duplicates
          this.userProjects = this.userProjects.filter((project, index, self) =>
            index === self.findIndex((p) => p._id === project._id)
          );
        } else {
          this.userProjects = [];
        }
      } catch (err) {
        console.error("Error fetching user projects:", err);
        this.error = "Failed to load your projects.";
      } finally {
        this.loading = false;
      }
    },
    
    async selectProject(project) {
      // Get fresh project data with all fields
      try {
        const response = await axios.get(`http://localhost:3001/getProject/${project._id}`);
        this.selectedProject = response.data;
        await this.fetchProjectMembers();
        await this.fetchMessages();
        
        // Set up polling to refresh messages every 3 seconds
        if (this.messagePolling) {
          clearInterval(this.messagePolling);
        }
        
        this.messagePolling = setInterval(async () => {
          if (this.selectedProject) {
            try {
              // Get fresh project data
              const refreshResponse = await axios.get(`http://localhost:3001/getProject/${this.selectedProject._id}`);
              const refreshedProject = refreshResponse.data;
              
              // Update the selected project with fresh data
              this.selectedProject = refreshedProject;
              
              // Update messages
              if (refreshedProject.forumMessages && refreshedProject.forumMessages.length > 0) {
                const newMessages = refreshedProject.forumMessages.map(msg => ({
                  author: msg.author,
                  text: msg.text,
                  timestamp: new Date(msg.timestamp)
                }));
                
                // Only update if there are new messages
                if (newMessages.length !== this.messages.length) {
                  console.log("New messages found:", newMessages.length - this.messages.length);
                  this.messages = newMessages;
                }
              }
            } catch (error) {
              console.error("Error in polling:", error);
            }
          }
        }, 3000);
      } catch (err) {
        console.error("Error fetching project details:", err);
        this.selectedProject = project;
        await this.fetchProjectMembers();
        await this.fetchMessages();
      }
    },
    
    async fetchProjectMembers() {
      if (!this.selectedProject) return;
      
      try {
        // Get fresh project data with populated collaborators
        const response = await axios.get(`http://localhost:3001/getProject/${this.selectedProject._id}`);
        const project = response.data;
        
        // Initialize with owner
        const members = [project.owner];
        
        // Add collaborators if available
        if (project.collaborators && project.collaborators.length > 0) {
          project.collaborators.forEach(collaborator => {
            if (collaborator.username) {
              members.push(collaborator.username);
            }
          });
        }
        
        // Remove duplicates
        this.projectMembers = [...new Set(members)];
        
        console.log("Team members:", this.projectMembers);
      } catch (err) {
        console.error("Error fetching project members:", err);
        // Fallback to just the owner
        this.projectMembers = [this.selectedProject.owner];
      }
    },
    
    async fetchMessages() {
      if (!this.selectedProject) return;
      
      try {
        // Get the project with its messages directly from the server
        const response = await axios.get(`http://localhost:3001/getProject/${this.selectedProject._id}`);
        const project = response.data;
        
        // Use messages from the project
        if (project.forumMessages && project.forumMessages.length > 0) {
          this.messages = project.forumMessages.map(msg => ({
            author: msg.author,
            text: msg.text,
            timestamp: new Date(msg.timestamp)
          }));
        } else {
          this.messages = [];
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
        this.messages = [];
      }
    },
    
    async sendMessage() {
      if (!this.newMessage.trim() || !this.selectedProject) return;
      
      // Create message object
      const newMessage = {
        author: this.username,
        text: this.newMessage.trim(),
        timestamp: new Date()
      };
      
      // Add message locally first for immediate feedback
      this.messages.push(newMessage);
      
      // Store message text before clearing
      const messageText = this.newMessage.trim();
      
      // Clear input immediately for better UX
      this.newMessage = '';
      
      try {
        // Add message to server
        await axios.post('http://localhost:3001/addForumMessage', {
          projectId: this.selectedProject._id,
          author: this.username,
          text: messageText
        });
        
        console.log("Message sent successfully");
      } catch (error) {
        console.error("Error sending message:", error);
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
  },
  
  beforeUnmount() {
    // Clear polling interval when component is destroyed
    if (this.messagePolling) {
      clearInterval(this.messagePolling);
    }
  }
};
</script>

<style scoped>
.forum-container {
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

.forum-content {
  background-color: #2c3e50;
  border-radius: 8px;
  border: 1px solid #455a64;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.forum-header {
  background-color: #34495e;
  padding: 15px 20px;
  border-bottom: 1px solid #455a64;
}

.forum-header h2 {
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
  background-color: #2c3e50;
  border-radius: 8px;
  border: 1px solid #455a64;
  padding: 30px;
  text-align: center;
  color: #bdc3c7;
}

@media (max-width: 768px) {
  .forum-container {
    padding: 15px;
  }
  
  .messages-container {
    max-height: 400px;
  }
}

@media (max-width: 480px) {
  .forum-container {
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