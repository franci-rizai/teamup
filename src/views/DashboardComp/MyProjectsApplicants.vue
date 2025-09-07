<template>
  <div class="applicants-container">
    <h1 class="section-title">Applicants for My Projects</h1>
    
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading applicants data...</p>
    </div>
    
    <div v-else-if="error" class="error-message">{{ error }}</div>
    
    <div v-else-if="applicantsList.length > 0">
      <div v-for="project in applicantsList" :key="project.projectId" class="project-applicants">
        <h2 class="project-title">{{ project.title }}</h2>
        <div v-if="project.applicants && project.applicants.length > 0">
          <ul class="applicants-list">
            <li v-for="applicant in project.applicants" :key="applicant.username" class="applicant-item">
              <div class="applicant-info">
                <div class="applicant-avatar">
                  <img src="@/assets/avatar.png" alt="Avatar">
                </div>
                <div class="applicant-details">
                  <h3>{{ applicant.fullName || applicant.username }}</h3>
                  <p class="username">@{{ applicant.username }}</p>
                </div>
              </div>
              <div class="applicant-actions">
                <button class="accept-btn" @click="acceptApplicant(project.projectId, applicant.username)">Accept</button>
                <button class="reject-btn" @click="rejectApplicant(project.projectId, applicant.username)">Reject</button>
                <button class="view-btn" @click="viewProfile(applicant.username)">View Profile</button>
              </div>
            </li>
          </ul>
        </div>
        <div v-else class="no-applicants">
          No applicants for this project yet.
        </div>
      </div>
    </div>
    <div v-else class="no-projects">
      <p>No projects with applicants found.</p>
      <button class="create-project-btn" @click="goToCreateProject">Create a Project</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyProjectsApplicants',
  data() {
    return {
      applicantsList: [],
      username: localStorage.getItem("authToken") || 'guest',
      loading: true,
      error: null
    };
  },
  methods: {
    async fetchApplicants() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.get(`http://localhost:3001/getApplicantsForMyProjects/${this.username}`);
        this.applicantsList = response.data;
      } catch (error) {
        console.error("Error fetching applicants:", error);
        this.error = "Failed to load applicants data.";
        this.applicantsList = [];
      } finally {
        this.loading = false;
      }
    },
    
    async acceptApplicant(projectId, applicantUsername) {
      try {
        const response = await axios.post('http://localhost:3001/acceptApplicant', {
          projectId,
          applicantUsername,
          ownerUsername: this.username
        });
        
        alert("Applicant accepted successfully!");
        this.fetchApplicants(); // Refresh the list
      } catch (error) {
        console.error("Error accepting applicant:", error);
        alert("Failed to accept applicant. Please try again.");
      }
    },
    
    async rejectApplicant(projectId, applicantUsername) {
      try {
        const response = await axios.post('http://localhost:3001/rejectApplicant', {
          projectId,
          applicantUsername,
          ownerUsername: this.username
        });
        
        alert("Applicant rejected successfully!");
        this.fetchApplicants(); // Refresh the list
      } catch (error) {
        console.error("Error rejecting applicant:", error);
        alert("Failed to reject applicant. Please try again.");
      }
    },
    
    async viewProfile(username) {
      try {
        // Clear any existing profile data for this user
        localStorage.removeItem(`userProfile_${username}`);
        
        // Try to fetch fresh profile data from the database
        const response = await axios.get(`http://localhost:3001/userInfo/${username}`);
        
        if (response.data) {
          // Store the fresh profile data in localStorage
          localStorage.setItem(`userProfile_${username}`, JSON.stringify(response.data));
          console.log(`Fresh profile data for ${username} fetched from database`);
        }
      } catch (error) {
        console.error(`Could not fetch profile for ${username} from database:`, error);
        // If database fetch fails, we'll let the Profile component handle the fallback
      }
      
      // Navigate to the profile page of the applicant
      this.$router.push({ name: 'UserProfile', params: { username } });
    },
    
    goToCreateProject() {
      this.$router.push({ name: 'CreateProject' });
    }
  },
  mounted() {
    this.fetchApplicants();
  }
};
</script>

<style scoped>
.applicants-container {
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

.project-applicants {
  background-color: #34495e;
  border-radius: 8px;
  border: 1px solid #455a64;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 25px;
  overflow: hidden;
}

.project-title {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 15px 20px;
  margin: 0;
  font-size: 1.4rem;
  border-bottom: 1px solid #455a64;
}

.applicants-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.applicant-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #455a64;
  transition: background-color 0.2s ease;
}

.applicant-item:last-child {
  border-bottom: none;
}

.applicant-item:hover {
  background-color: #2c3e50;
}

.applicant-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.applicant-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #e74c3c;
}

.applicant-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.applicant-details h3 {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
  color: #ecf0f1;
}

.username {
  margin: 0;
  font-size: 0.9rem;
  color: #bdc3c7;
}

.applicant-actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 15px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.accept-btn {
  background-color: #27ae60;
  color: white;
  border: 1px solid #219653;
}

.reject-btn {
  background-color: #e74c3c;
  color: white;
  border: 1px solid #c0392b;
}

.view-btn {
  background-color: #3498db;
  color: white;
  border: 1px solid #2980b9;
}

button:hover {
  filter: brightness(110%);
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

button:active {
  transform: translateY(0);
}

.no-applicants, .no-projects {
  padding: 20px;
  text-align: center;
  color: #bdc3c7;
  font-style: italic;
}

.no-projects {
  background-color: #34495e;
  border-radius: 8px;
  border: 1px solid #455a64;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.create-project-btn {
  background-color: #e74c3c;
  color: white;
  border: 1px solid #c0392b;
  padding: 10px 20px;
  margin-top: 15px;
  font-size: 1rem;
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

.error-message {
  background-color: #34495e;
  color: #e74c3c;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #c0392b;
  text-align: center;
  margin-bottom: 25px;
}

@media (max-width: 768px) {
  .applicant-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .applicant-actions {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 480px) {
  .applicants-container {
    padding: 10px;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .project-title {
    font-size: 1.2rem;
    padding: 12px 15px;
  }
  
  .applicant-item {
    padding: 12px 15px;
  }
  
  .applicant-avatar {
    width: 40px;
    height: 40px;
  }
  
  .applicant-details h3 {
    font-size: 1rem;
  }
  
  .applicant-actions {
    flex-wrap: wrap;
    gap: 5px;
  }
  
  button {
    padding: 6px 10px;
    font-size: 0.8rem;
  }
}
</style>