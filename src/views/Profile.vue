<template>
  <div class="profile-container">
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading profile...</p>
    </div>
    
    <div v-else-if="error" class="error-message">{{ error }}</div>
    
    <div v-else class="profile-content">
      <div class="profile-card">
        <div class="profile-header">
          <div class="profile-avatar">
            <img src="../assets/avatar.png" alt="Profile Avatar">
          </div>
          <div class="profile-info">
            <h2>{{ profileData.fullName || profileData.username || 'User' }}</h2>
            <p class="profile-title">{{ profileData.skills && profileData.skills.length > 0 ? profileData.skills[0] : 'Team Member' }}</p>
            <p class="profile-location">{{ profileData.address || 'Location not specified' }}</p>
            <button v-if="!isOwnProfile" class="message-btn">Message</button>
          </div>
        </div>

        <div class="profile-links">
          <div v-if="profileData.portfolio" class="link-item">
            <div class="link-label">1. Website</div>
            <div class="link-value">{{ profileData.portfolio }}</div>
          </div>
          <div class="link-item">
            <div class="link-label">2. Email</div>
            <div class="link-value">{{ profileData.email || 'Not provided' }}</div>
          </div>
          <div v-if="profileData.phone" class="link-item">
            <div class="link-label">3. Phone</div>
            <div class="link-value">{{ profileData.phone }}</div>
          </div>
        </div>
      </div>

      <div class="profile-details">
        <div class="personal-info-card">
          <h2 class="card-title">Personal Information</h2>
          <div class="info-item">
            <h3>Full Name</h3>
            <p>{{ profileData.fullName || 'Not provided' }}</p>
          </div>
          <div class="info-item">
            <h3>Email</h3>
            <p>{{ profileData.email || 'Not provided' }}</p>
          </div>
          <div class="info-item">
            <h3>Date of Birth</h3>
            <p>{{ formatDate(profileData.dob) || 'Not provided' }}</p>
          </div>
          <div class="info-item">
            <h3>Gender</h3>
            <p>{{ profileData.gender || 'Not provided' }}</p>
          </div>
        </div>

        <div class="profile-content">
          <div class="bio-card">
            <h2 class="card-title">Self Introduction</h2>
            <p>{{ profileData.about || 'No bio provided yet.' }}</p>
          </div>
          
          <div class="skills-card">
            <h2 class="card-title">Top Skills</h2>
            <div class="skill-tags">
              <span v-for="(skill, index) in skillsList" :key="index" class="skill-tag">{{ skill }}</span>
              <span v-if="skillsList.length === 0" class="no-skills">No skills listed</span>
            </div>
          </div>
        </div>
        
        <div v-if="isOwnProfile" class="profile-actions">
          <router-link class="edit-profile-btn" to="/CreateProfile">Edit Profile</router-link>
        </div>
        
        <div v-if="profileData.experience" class="experience-card">
          <h2 class="card-title">Work Experience</h2>
          <p>{{ profileData.experience }}</p>
        </div>
        
        <div v-if="profileData.education" class="education-card">
          <h2 class="card-title">Education</h2>
          <p>{{ profileData.education }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProfileService from '@/services/ProfileService';

export default {
  data() {
    return {
      profileData: {},
      loading: true,
      error: null,
      currentUsername: localStorage.getItem("authToken")
    };
  },
  computed: {
    // Check if this is the user's own profile
    isOwnProfile() {
      return this.currentUsername === this.$route.params.username || 
             (!this.$route.params.username && this.currentUsername);
    },
    // Parse skills into an array
    skillsList() {
      if (!this.profileData.skills) return [];
      return Array.isArray(this.profileData.skills) ? this.profileData.skills : [this.profileData.skills];
    }
  },
  methods: {
    async fetchProfileData() {
      this.loading = true;
      
      try {
        const username = this.$route.params.username || this.currentUsername;
        
        if (!username) {
          this.error = "No username provided";
          this.loading = false;
          return;
        }
        
        // Always try to get fresh data from database first
        const user = await ProfileService.getProfile(username);
        if (user) {
          this.profileData = user;
          console.log(`Loaded fresh profile for ${username}:`, user);
          this.loading = false;
          return;
        }
        
        // Fallback to demo data
        this.generateDemoProfile(username);
      } catch (error) {
        console.error("Error loading profile:", error);
        this.error = "Failed to load profile data";
      } finally {
        this.loading = false;
      }
    },
    
    generateDemoProfile(username) {
      this.profileData = {
        username: username,
        fullName: username,
        email: `${username}@example.com`,
        skills: [],
        about: "No profile information available",
        dob: "-",
        gender: "-",
        address: "-",
        education: "-",
        experience: "-",
        phone: "-",
        portfolio: "-"
      };
    },
    
    formatDate(dateString) {
      if (!dateString) return null;
      
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch (e) {
        return dateString;
      }
    },
    
    // Method to refresh profile data (can be called from other components)
    refreshProfile() {
      this.profileData = {};
      this.fetchProfileData();
    }
  },
  mounted() {
    this.fetchProfileData();
  },
  watch: {
    '$route.params.username': function() {
      this.fetchProfileData();
    }
  }
};
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 20px;
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
  background-color: #2c3e50;
  color: #e74c3c;
  padding: 20px;
  border: 1px solid #c0392b;
  border-radius: 6px;
  text-align: center;
  margin: 20px 0;
}

.profile-content {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
}

.profile-card {
  flex: 1;
  min-width: 300px;
  background-color: #2c3e50;
  border-radius: 6px;
  border: 1px solid #455a64;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.profile-header {
  padding: 25px;
  text-align: center;
  background-color: #34495e;
  border-bottom: 1px solid #455a64;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #e74c3c;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info h2 {
  margin: 0 0 10px;
  font-size: 1.8rem;
  color: #ecf0f1;
}

.profile-title {
  color: #3498db;
  font-weight: 600;
  margin: 5px 0;
}

.profile-location {
  color: #bdc3c7;
  margin: 5px 0 15px;
}

.message-btn {
  background-color: #e74c3c;
  color: white;
  border: 1px solid #c0392b;
  padding: 8px 20px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.message-btn:hover {
  filter: brightness(110%);
}

.profile-links {
  background-color: #2c3e50;
}

.link-item {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border-bottom: 1px solid #455a64;
  transition: background-color 0.2s ease;
}

.link-item:hover {
  background-color: #34495e;
}

.link-label {
  color: #ecf0f1;
  font-weight: 600;
}

.link-value {
  color: #3498db;
}

.profile-details {
  flex: 2;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card-title {
  color: #ecf0f1;
  font-size: 1.4rem;
  margin: 0 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #455a64;
}

.personal-info-card, .bio-card, .skills-card, .experience-card, .education-card {
  background-color: #2c3e50;
  border-radius: 6px;
  border: 1px solid #455a64;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #455a64;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item h3 {
  margin: 0;
  color: #ecf0f1;
  font-size: 1rem;
  font-weight: 600;
}

.info-item p {
  margin: 0;
  color: #bdc3c7;
}

.profile-content {
  display: flex;
  gap: 20px;
}

.bio-card, .skills-card {
  flex: 1;
}

.bio-card p, .experience-card p, .education-card p {
  color: #bdc3c7;
  line-height: 1.6;
  margin: 0;
  white-space: pre-line;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-tag {
  background-color: #3498db;
  color: white;
  padding: 5px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid #2980b9;
}

.no-skills {
  color: #bdc3c7;
  font-style: italic;
}

.profile-actions {
  display: flex;
  justify-content: flex-end;
}

.edit-profile-btn {
  display: inline-block;
  background-color: #e74c3c;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 600;
  text-align: center;
  transition: all 0.2s ease;
  border: 1px solid #c0392b;
}

.edit-profile-btn:hover {
  filter: brightness(110%);
}

@media (max-width: 992px) {
  .profile-content {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .profile-container {
    flex-direction: column;
  }
  
  .profile-card, .profile-details {
    width: 100%;
  }
  
  .edit-profile-btn {
    align-self: center;
    width: 100%;
    margin-top: 10px;
  }
}

@media (max-width: 480px) {
  .profile-container {
    padding: 0 10px;
    margin: 15px auto;
  }
  
  .profile-header {
    padding: 15px;
  }
  
  .profile-avatar {
    width: 100px;
    height: 100px;
  }
  
  .profile-info h2 {
    font-size: 1.5rem;
  }
  
  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .info-item h3 {
    margin-bottom: 5px;
  }
  
  .card-title {
    font-size: 1.2rem;
  }
  
  .personal-info-card, .bio-card, .skills-card, .experience-card, .education-card {
    padding: 15px;
  }
  
  .link-item {
    padding: 12px 15px;
  }
}
</style>