<template>
  <div class="project-details-container">
    <div class="project-details" v-if="project">
      <div class="header">
        <h1>{{ project.title }}</h1>
        <span class="category">{{ project.category }}</span>
      </div>

      <div class="content-grid">
        <div class="main-content">
          <div class="description-section">
            <h2>Description</h2>
            <p class="description">{{ project.description }}</p>
          </div>

          <div class="tags-section">
            <h2>Tags</h2>
            <div class="tags">
              <span v-for="tag in project.tags" :key="tag" class="tag">#{{ tag }}</span>
            </div>
          </div>
          
          <div class="requirements-section">
            <h2>Skills Required</h2>
            <ul class="requirements-list">
              <li v-for="req in project.requirements" :key="req">{{ req }}</li>
            </ul>
          </div>
        </div>
        
        <div class="side-content">

          
          <div class="owner-section">
            <h2>Project Owner</h2>
            <div class="owner-info">
              <span class="owner-name">{{ project.owner || 'N/A' }}</span>
              <button class="view-profile-btn" @click="viewOwnerProfile">View Profile</button>
            </div>
          </div>
          
          <div class="roles-section" v-if="project.roles && project.roles.length > 0">
            <h2>Roles Needed</h2>
            <div class="roles-list">
              <div v-for="(role, index) in project.roles" :key="index" class="role-card">
                <h3 class="role-title">{{ role.title || getRoleLabel(role) }}</h3>
                <p v-if="role.description" class="role-description">{{ role.description }}</p>
                <div v-if="role.skills && role.skills.length > 0" class="role-skills">
                  <h4>Required Skills:</h4>
                  <div class="skills-list">
                    <span v-for="(skill, i) in role.skills" :key="i" class="skill-tag">{{ skill }}</span>
                  </div>
                </div>
                <div class="role-status" :class="{ 'filled': role.filled }">
                  {{ role.filled ? 'Filled' : 'Open' }}
                </div>
              </div>
            </div>
          </div>
          
          <div class="action-section">
            <button
              @click="applyButton"
              class="apply-btn"
              type="submit"
              :disabled="hasApplied"
            >
              {{ getButtonText() }}
            </button>

            <p v-if="showSuccessMessage" class="success-msg">
              ✅ You have successfully applied to this project!
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading project details...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProjectDetails',
  data() {
    return {
      project: null,
      error: null,
      username: localStorage.getItem("authToken"), // Adjust as needed
      hasApplied: false,
      isOwner: false,
      isCollaborator: false,
      showSuccessMessage: false,
    };
  },
  methods: {
    async fetchProject() {
      const projectId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:3001/getProject/${projectId}`);
        this.project = response.data;
        console.log("Fetched project:", this.project);
        this.checkIfApplied();
      } catch (err) {
        this.error = "Failed to load project.";
        console.error("Error fetching project:", err);
      }
    },

    async checkIfApplied() {
      try {
        // Skip the API call and just check if user is owner or collaborator
        // since those are the only statuses we can reliably determine
        const hasAppliedToProject = false; // We can't reliably determine this without the API
        
        // Check if user is already a collaborator
        const isCollaborator = this.project.collaborators && this.project.collaborators.some(collaborator => {
          if (typeof collaborator === 'string') {
            return collaborator === this.username;
          } else if (collaborator.username) {
            return collaborator.username === this.username;
          }
          return false;
        });
        
        // Check if user is the owner
        const isOwner = this.project.owner === this.username;
        
        // User has applied if they've applied, are already a collaborator, or are the owner
        this.hasApplied = hasAppliedToProject || isCollaborator || isOwner;
        
        console.log(`User ${this.username} status for project ${this.project.title}:`, {
          hasApplied: hasAppliedToProject,
          isCollaborator,
          isOwner,
          finalStatus: this.hasApplied
        });
      } catch (err) {
        console.error("Error checking applied projects:", err);
      }
    },

    async applyButton() {
      console.log("=== APPLY BUTTON CLICKED ===");
      console.log("Username:", this.username);
      console.log("Project ID:", this.project._id);
      console.log("Project Title:", this.project.title);
      console.log("Has Applied:", this.hasApplied);
      
      if (this.hasApplied) {
        console.log("User has already applied, button should be disabled");
        return;
      }
      
      try {
        console.log("Sending application request...");
        
        const projectId = this.project._id;
        const response = await axios.put(`http://localhost:3001/addProjectToUser/${projectId}`, {
          username: this.username,
        });
        
        console.log("Application response:", response.data);
        console.log("Application successful!");
        
        this.hasApplied = true;
        this.showSuccessMessage = true;
        
        // Store in localStorage for persistence
        const appliedProjects = JSON.parse(localStorage.getItem('appliedProjects') || '[]');
        if (!appliedProjects.includes(projectId)) {
          appliedProjects.push(projectId);
          localStorage.setItem('appliedProjects', JSON.stringify(appliedProjects));
          console.log("Stored in localStorage:", appliedProjects);
        }
        
        console.log("=== APPLICATION COMPLETE ===");
      } catch (err) {
        console.error("=== APPLICATION ERROR ===");
        console.error("Error details:", err);
        console.error("Error response:", err.response?.data);
        console.error("Error status:", err.response?.status);
        alert("Failed to apply to project. Please try again.");
      }
    },
    
    viewOwnerProfile() {
      // Navigate to the profile page of the project owner
      this.$router.push({ name: 'UserProfile', params: { username: this.project.owner } });
    },
    

    
    getRoleLabel(role) {
      const roleMap = {
        'frontend': 'Frontend Developer',
        'backend': 'Backend Developer',
        'uiux': 'UI/UX Designer',
        'pm': 'Project Manager',
        'mobile': 'Mobile Developer',
        'devops': 'DevOps Engineer',
        'qa': 'QA Engineer'
      };
      
      return roleMap[role] || role;
    },
    
    getButtonText() {
      if (this.project.owner === this.username) {
        this.hasApplied = true;
        return "YOUR PROJECT";
      }
      
      const isCollaborator = this.project.collaborators && this.project.collaborators.some(collaborator => {
        if (typeof collaborator === 'string') {
          return collaborator === this.username;
        } else if (collaborator.username) {
          return collaborator.username === this.username;
        }
        return false;
      });
      
      if (isCollaborator) {
        this.hasApplied = true;
        return "COLLABORATOR";
      }
      
      // Check localStorage for applied status
      const appliedProjects = JSON.parse(localStorage.getItem('appliedProjects') || '[]');
      if (appliedProjects.includes(this.project._id)) {
        this.hasApplied = true;
        return "APPLIED";
      }
      
      return this.hasApplied ? "APPLIED" : "APPLY NOW";
    }
  },
  mounted() {
    this.fetchProject();
  },
};
</script>

<style scoped>
.project-details-container {
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 20px;
  color: #ecf0f1;
}

.project-details {
  background-color: #2c3e50;
  border-radius: 8px;
  border: 1px solid #455a64;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #34495e;
  padding: 25px 30px;
  border-bottom: 1px solid #455a64;
}

h1 {
  font-size: 2.2rem;
  color: #ecf0f1;
  margin: 0;
}

.category {
  background-color: #e74c3c;
  color: white;
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  border: 1px solid #c0392b;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 25px;
  padding: 30px;
}

.main-content, .side-content {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.description-section, .tags-section, .requirements-section,
.status-section, .team-section, .duration-section, .owner-section, .roles-section, .action-section {
  background-color: #34495e;
  border-radius: 6px;
  border: 1px solid #455a64;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

h2 {
  font-size: 1.3rem;
  color: #3498db;
  margin-top: 0;
  margin-bottom: 15px;
  font-weight: 600;
}

.description {
  font-size: 1rem;
  color: #bdc3c7;
  line-height: 1.6;
  margin: 0;
  white-space: pre-line;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  background-color: #3498db;
  color: white;
  padding: 5px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid #2980b9;
}

.requirements-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.requirements-list li {
  background-color: #2c3e50;
  padding: 12px 15px;
  border-radius: 4px;
  border: 1px solid #455a64;
  color: #bdc3c7;
}

.status-badge {
  background-color: #27ae60;
  color: white;
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  display: inline-block;
  border: 1px solid #219653;
}

.team-size, .duration {
  background-color: #3498db;
  color: white;
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  display: inline-block;
  border: 1px solid #2980b9;
}

.owner-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.owner-name {
  font-size: 1.1rem;
  color: #ecf0f1;
  font-weight: 500;
}

.view-profile-btn {
  background-color: #3498db;
  color: white;
  border: 1px solid #2980b9;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-profile-btn:hover {
  filter: brightness(110%);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.roles-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.role-card {
  background-color: #2c3e50;
  border: 1px solid #455a64;
  border-radius: 6px;
  padding: 15px;
  position: relative;
}

.role-title {
  color: #3498db;
  margin: 0 0 10px 0;
  font-size: 1.1rem;
}

.role-description {
  color: #bdc3c7;
  margin: 0 0 15px 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

.role-skills {
  margin-bottom: 15px;
}

.role-skills h4 {
  color: #ecf0f1;
  margin: 0 0 8px 0;
  font-size: 0.9rem;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background-color: #3498db;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.role-status {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #27ae60;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.role-status.filled {
  background-color: #e74c3c;
}

.action-section {
  text-align: center;
}

.apply-btn {
  background: linear-gradient(to right, #e74c3c, #c0392b);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.apply-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  filter: brightness(110%);
}

.apply-btn:active {
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.apply-btn:disabled {
  background: linear-gradient(to right, #7f8c8d, #95a5a6);
  cursor: not-allowed;
}

.success-msg {
  color: #2ecc71;
  font-weight: 500;
  margin: 15px 0 0 0;
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
  width: 40px;
  height: 40px;
  border: 3px solid #34495e;
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 992px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .project-details-container {
    padding: 0 15px;
    margin: 20px auto;
  }
  
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 20px;
  }
  
  .category {
    align-self: flex-start;
  }
  
  .content-grid {
    padding: 20px;
    gap: 20px;
  }
  
  h1 {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .project-details-container {
    padding: 0 10px;
    margin: 15px auto;
  }
  
  .header {
    padding: 15px;
  }
  
  .content-grid {
    padding: 15px;
    gap: 15px;
  }
  
  h1 {
    font-size: 1.6rem;
  }
  
  .description-section, .tags-section, .requirements-section,
  .status-section, .team-section, .duration-section, .owner-section, .roles-section, .action-section {
    padding: 15px;
  }
}
</style>