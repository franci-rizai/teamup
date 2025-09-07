<template>
  <div class="project-dashboard">
    <div class="dashboard-header">
      <h1>My Projects</h1>
      <router-link to="/CreateProject" class="create-btn">Create New Project</router-link>
    </div>
    
    <div class="projects-grid">
      <!-- Created Projects -->
      <div class="project-section">
        <h2>Projects I Created</h2>
        <div v-if="loadingCreated" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Loading projects...</p>
        </div>
        <div v-else-if="createdProjects.length === 0" class="empty-state">
          <p>You haven't created any projects yet</p>
          <router-link to="/CreateProject" class="create-link">Create your first project</router-link>
        </div>
        <div v-else class="project-cards">
          <div v-for="project in createdProjects" :key="project._id" class="project-card">
            <div class="project-header">
              <h3>{{ project.title }}</h3>
              <span class="project-category">{{ project.category }}</span>
            </div>
            <p class="project-description">{{ truncateDescription(project.description) }}</p>
            <div class="project-footer">
              <router-link :to="'/Project/' + project._id" class="view-btn">View Details</router-link>
              <button @click="deleteProject(project._id)" class="delete-btn">Delete Project</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Applied Projects -->
      <div class="project-section">
        <h2>Projects I Applied To</h2>
        <div v-if="loadingApplied" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Loading projects...</p>
        </div>
        <div v-else-if="appliedProjects.length === 0" class="empty-state">
          <p>You haven't applied to any projects yet</p>
          <router-link to="/Project" class="browse-link">Browse projects</router-link>
        </div>
        <div v-else class="project-cards">
          <div v-for="project in appliedProjects" :key="project._id" class="project-card">
            <div class="project-header">
              <h3>{{ project.title }}</h3>
              <span class="project-category">{{ project.category }}</span>
            </div>
            <p class="project-description">{{ truncateDescription(project.description) }}</p>
            <div class="project-footer">
              <router-link :to="'/Project/' + project._id" class="view-btn">View Details</router-link>
            </div>
          </div>
        </div>
      </div>
      
      <!-- In Progress Projects -->
      <div class="project-section">
        <h2>Projects In Progress</h2>
        <div v-if="loadingInProgress" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Loading projects...</p>
        </div>
        <div v-else-if="inProgressProjects.length === 0" class="empty-state">
          <p>You don't have any projects in progress</p>
        </div>
        <div v-else class="project-cards">
          <div v-for="project in inProgressProjects" :key="project._id" class="project-card">
            <div class="project-header">
              <h3>{{ project.title }}</h3>
              <span class="project-category">{{ project.category }}</span>
            </div>
            <p class="project-description">{{ truncateDescription(project.description) }}</p>
            <div class="project-footer">
              <router-link :to="'/Project/' + project._id" class="view-btn">View Details</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProjectDash',
  data() {
    return {
      username: localStorage.getItem("authToken"),
      createdProjects: [],
      appliedProjects: [],
      inProgressProjects: [],
      loadingCreated: true,
      loadingApplied: true,
      loadingInProgress: true,
      loadingCompleted: true,
      error: null
    };
  },
  methods: {
    async fetchProjects() {
      this.fetchCreatedProjects();
      this.fetchAppliedProjects();
      this.fetchInProgressProjects();
    },
    
    async fetchCreatedProjects() {
      try {
        const response = await axios.get('http://localhost:3001/getProjects');
        this.createdProjects = response.data.filter(project => project.owner === this.username);
      } catch (error) {
        console.error("Error fetching created projects:", error);
      } finally {
        this.loadingCreated = false;
      }
    },
    
    async fetchAppliedProjects() {
      try {
        // For now, we'll just show an empty list since we can't reliably get applied projects
        this.appliedProjects = [];
        
        // Try to get from localStorage if available
        const appliedProjectsStr = localStorage.getItem('appliedProjects');
        if (appliedProjectsStr) {
          try {
            this.appliedProjects = JSON.parse(appliedProjectsStr);
          } catch (e) {}
        }
      } catch (error) {
        console.error("Error fetching applied projects:", error);
        this.appliedProjects = [];
      } finally {
        this.loadingApplied = false;
      }
    },
    
    async fetchInProgressProjects() {
      try {
        // Get all projects
        const allProjectsResponse = await axios.get('http://localhost:3001/getProjects');
        const allProjects = allProjectsResponse.data || [];
        
        // Filter projects where user is owner or collaborator
        this.inProgressProjects = allProjects.filter(project => {
          // User is owner
          if (project.owner === this.username) return true;
          
          // User is collaborator
          if (project.collaborators && project.collaborators.some(c => {
            if (typeof c === 'string') return c === this.username;
            return c.username === this.username;
          })) return true;
          
          return false;
        });
      } catch (error) {
        console.error("Error fetching in-progress projects:", error);
        this.inProgressProjects = [];
      } finally {
        this.loadingInProgress = false;
      }
    },
    
    truncateDescription(description) {
      if (!description) return '';
      return description.length > 100 ? description.substring(0, 100) + '...' : description;
    },
    
    async deleteProject(projectId) {
      if (!confirm('Are you sure you want to delete this project? This will remove all collaborators and cannot be undone.')) {
        return;
      }
      
      try {
        await axios.delete(`http://localhost:3001/deleteProject/${projectId}`);
        
        // Remove from local array
        this.createdProjects = this.createdProjects.filter(p => p._id !== projectId);
        
        alert('Project deleted successfully!');
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      }
    }
  },
  mounted() {
    this.fetchProjects();
  },
  
  activated() {
    // Refresh projects when component is activated (user navigates back)
    this.fetchProjects();
  }
};
</script>

<style scoped>
.project-dashboard {
  padding: 20px;
  color: #ecf0f1;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.dashboard-header h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #ecf0f1;
}

.create-btn {
  background-color: #e74c3c;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
}

.create-btn:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.project-section {
  background-color: #2c3e50;
  border-radius: 8px;
  border: 1px solid #455a64;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.project-section h2 {
  margin: 0;
  padding: 15px 20px;
  background-color: #34495e;
  color: #ecf0f1;
  font-size: 1.3rem;
  border-bottom: 1px solid #455a64;
}

.project-cards {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.project-card {
  background-color: #34495e;
  border-radius: 6px;
  border: 1px solid #455a64;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.project-header {
  padding: 15px;
  background-color: #2c3e50;
  border-bottom: 1px solid #455a64;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #ecf0f1;
}

.project-category {
  background-color: #3498db;
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.project-description {
  padding: 15px;
  margin: 0;
  color: #bdc3c7;
  font-size: 0.95rem;
  line-height: 1.5;
  height: 100px;
  overflow: hidden;
}

.project-footer {
  padding: 15px;
  border-top: 1px solid #455a64;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.view-btn {
  background-color: #3498db;
  color: white;
  padding: 8px 15px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.view-btn:hover {
  background-color: #2980b9;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #2c3e50;
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  padding: 30px;
  text-align: center;
  color: #bdc3c7;
}

.create-link, .browse-link {
  display: inline-block;
  margin-top: 10px;
  color: #3498db;
  text-decoration: none;
}

.create-link:hover, .browse-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .project-cards {
    grid-template-columns: 1fr;
  }
  
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
}
</style>