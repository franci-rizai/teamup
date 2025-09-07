<template>
  <div class="projects-page">
    <div class="projects-header">
      <h1>Discover Projects</h1>
      <p>Find the perfect project to collaborate on or create your own</p>
      <router-link to="/CreateProject" class="create-project-btn">Create Project</router-link>
    </div>
    
    <!-- Filters at the top -->
    <ProjectFilters @filter-changed="applyFilters" />
    
    <div class="projects-content">
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading projects...</p>
      </div>
      
      <div v-else-if="error" class="error-message">{{ error }}</div>
      
      <div v-else-if="filteredProjects.length === 0" class="no-projects">
        <p>No projects found matching your filters.</p>
        <button @click="resetFilters" class="reset-filters-btn">Reset Filters</button>
      </div>
      
      <div v-else class="projects-grid">
        <div v-for="project in filteredProjects" :key="project._id" class="project-card">
          <div class="project-header">
            <h2>{{ project.title }}</h2>
            <span class="project-category">{{ project.category }}</span>
          </div>
          
          <p class="project-description">{{ truncateDescription(project.description) }}</p>
          
          <div class="project-tags">
            <span v-for="(tag, index) in project.tags" :key="index" class="project-tag">
              #{{ tag }}
            </span>
          </div>
          
          <div class="project-meta">
            <div class="meta-item">
              <i class="fas fa-user"></i>
              <span>{{ project.owner }}</span>
            </div>
            
            <div class="meta-item" v-if="project.collaborators && project.collaborators.length > 0">
              <i class="fas fa-users"></i>
              <span>{{ project.collaborators.length }} collaborators</span>
            </div>
            
            <div class="meta-item">
              <i class="fas fa-users"></i>
              <span>{{ getTeamSizeLabel(project.teamSize) }}</span>
            </div>
            
            <div class="meta-item">
              <i class="fas fa-clock"></i>
              <span>{{ getDurationLabel(project.duration) }}</span>
            </div>
          </div>
          
          <div class="project-footer">
            <router-link :to="'/Project/' + project._id" class="view-details-btn">
              View Details
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProjectFilters from '@/components/ProjectFilters.vue';

export default {
  name: 'Project',
  components: {
    ProjectFilters
  },
  data() {
    return {
      projects: [],
      loading: true,
      error: null,
      filters: {
        keyword: '',
        domain: [],
        tech: [],
        createdWithin: '',
        duration: [],
        teamSize: [],
        roles: [],
        creatorReputation: ''
      }
    };
  },
  computed: {
    filteredProjects() {
      let result = [...this.projects];
      
      // Apply keyword filter
      if (this.filters.keyword) {
        const keyword = this.filters.keyword.toLowerCase();
        result = result.filter(project => 
          project.title.toLowerCase().includes(keyword) || 
          project.description.toLowerCase().includes(keyword)
        );
      }
      

      
      // Apply domain filter (category)
      if (this.filters.domain.length > 0) {
        result = result.filter(project => {
          return this.filters.domain.includes(project.category);
        });
      }
      
      // Apply tech filter (tags)
      if (this.filters.tech.length > 0) {
        result = result.filter(project => {
          if (!project.tags) return false;
          // Check if any project tag matches any tech filter
          return project.tags.some(tag => 
            this.filters.tech.some(tech => 
              tag.toLowerCase().includes(tech.toLowerCase())
            )
          );
        });
      }
      
      // Apply time filter
      if (this.filters.createdWithin) {
        const now = new Date();
        let cutoffDate;
        
        switch (this.filters.createdWithin) {
          case '24h':
            cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            break;
          case 'week':
            cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
          case 'month':
            cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            break;
          default:
            cutoffDate = null;
        }
        
        if (cutoffDate) {
          result = result.filter(project => {
            if (!project.createdAt) return true; // Include if no date
            return new Date(project.createdAt) >= cutoffDate;
          });
        }
      }
      
      // Apply duration filter
      if (this.filters.duration.length > 0) {
        result = result.filter(project => {
          if (!project.duration) return false;
          return this.filters.duration.includes(project.duration);
        });
      }
      
      // Apply team size filter
      if (this.filters.teamSize.length > 0) {
        result = result.filter(project => {
          if (!project.teamSize) return false;
          return this.filters.teamSize.includes(project.teamSize);
        });
      }
      
      // Apply roles filter
      if (this.filters.roles.length > 0) {
        result = result.filter(project => {
          if (!project.roles) return false;
          return project.roles.some(role => 
            this.filters.roles.includes(role.title || role.roleType || role)
          );
        });
      }
      

      
      return result;
    }
  },
  methods: {
    async fetchProjects() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.get('http://localhost:3001/getProjects');
        
        // Add default values for filtering
        this.projects = response.data.map(project => ({
          ...project,
          status: project.status || 'open',
          teamSize: project.teamSize || 'small',
          duration: project.duration || 'medium',
          roles: project.roles || [],
          tags: project.tags || []
        }));
        
        console.log('All projects loaded:', this.projects.length);
        console.log('Projects with collaborators:', this.projects.filter(p => p.collaborators && p.collaborators.length > 0));
      } catch (error) {
        console.error('Error fetching projects:', error);
        this.error = 'Failed to load projects. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    
    applyFilters(filters) {
      this.filters = { ...filters };
    },
    
    resetFilters() {
      this.filters = {
        keyword: '',
        domain: [],
        tech: [],
        createdWithin: '',
        duration: [],
        teamSize: [],
        roles: [],
        creatorReputation: ''
      };
    },
    
    truncateDescription(description) {
      if (!description) return '';
      return description.length > 150 
        ? description.substring(0, 150) + '...' 
        : description;
    },
    
    formatDate(dateString) {
      if (!dateString) return 'Recently';
      
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
    

    
    getTeamSizeLabel(size) {
      const sizeMap = {
        'solo': 'Solo',
        'small': '2-3 People',
        'medium': '4-6 People',
        'large': '7+ People'
      };
      
      return sizeMap[size] || 'Team Size Not Specified';
    },
    
    getDurationLabel(duration) {
      const durationMap = {
        'short': 'Short-term',
        'medium': 'Medium-term',
        'long': 'Long-term'
      };
      
      return durationMap[duration] || 'Duration Not Specified';
    }
  },
  mounted() {
    this.fetchProjects();
  }
};
</script>

<style scoped>
.projects-page {
  min-height: 100vh;
  background-color: #1a2530;
  padding: 20px;
}

.projects-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 0;
}

.projects-header h1 {
  color: #ecf0f1;
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.projects-header p {
  color: #bdc3c7;
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.create-project-btn {
  background: linear-gradient(to right, #e74c3c, #c0392b);
  color: white;
  padding: 12px 25px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  transition: all 0.3s ease;
}

.create-project-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.projects-content {
  max-width: 1400px;
  margin: 0 auto;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
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

.error-message {
  background-color: #34495e;
  color: #e74c3c;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #c0392b;
}

.no-projects {
  background-color: #34495e;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #455a64;
}

.no-projects p {
  color: #bdc3c7;
  margin-bottom: 15px;
}

.reset-filters-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.reset-filters-btn:hover {
  background-color: #2980b9;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.project-card {
  background-color: #2c3e50;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #455a64;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.project-header {
  padding: 20px;
  background-color: #34495e;
  border-bottom: 1px solid #455a64;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-header h2 {
  color: #ecf0f1;
  font-size: 1.3rem;
  margin: 0;
  flex: 1;
}

.project-category {
  background-color: #e74c3c;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.project-description {
  padding: 20px;
  color: #bdc3c7;
  font-size: 0.95rem;
  line-height: 1.5;
  flex-grow: 1;
}

.project-tags {
  padding: 0 20px 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.project-tag {
  background-color: #3498db;
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.project-meta {
  padding: 15px 20px;
  border-top: 1px solid #455a64;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #bdc3c7;
  font-size: 0.9rem;
}

.meta-item i {
  color: #3498db;
}

.project-footer {
  padding: 15px 20px;
  background-color: #34495e;
  border-top: 1px solid #455a64;
  text-align: center;
}

.view-details-btn {
  background-color: #3498db;
  color: white;
  padding: 8px 15px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  transition: all 0.2s ease;
  width: 100%;
}

.view-details-btn:hover {
  background-color: #2980b9;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  .projects-header h1 {
    font-size: 2rem;
  }
  
  .projects-header p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .projects-page {
    padding: 10px;
  }
  
  .projects-header {
    padding: 20px 0;
  }
  
  .projects-header h1 {
    font-size: 1.8rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>