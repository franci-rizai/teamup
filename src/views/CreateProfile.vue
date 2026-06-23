<template>
  <div class="create-profile-container">
    <div class="form-header">
      <h1>Complete Your Profile</h1>
      <p>Add your details to increase your chances of finding the perfect team</p>
    </div>
    
    <form @submit.prevent="saveProfile" class="profile-form">
      <!-- Personal Details -->
      <div class="form-section">
        <h2 class="section-title">Personal Details</h2>
        <div class="form-grid">
          <div class="form-group">
            <label for="fullName">Full Name</label>
            <input 
              v-model="profile.fullName" 
              id="fullName" 
              type="text" 
              placeholder="Enter your full name" 
              required 
            />
          </div>
          
          <div class="form-group">
            <label for="dob">Date of Birth</label>
            <input 
              v-model="profile.dob" 
              id="dob" 
              type="date" 
              required 
            />
          </div>
          
          <div class="form-group">
            <label for="gender">Gender</label>
            <select v-model="profile.gender" id="gender" required>
              <option value="" disabled>Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div class="form-group full-width">
            <label for="about">About Me</label>
            <textarea
              v-model="profile.about"
              id="about"
              rows="4"
              placeholder="Write a short bio about yourself"
              required
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="form-section">
        <h2 class="section-title">Contact Information</h2>
        <div class="form-grid">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              v-model="profile.email" 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              required
            />
          </div>
          
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input 
              v-model="profile.phone" 
              id="phone" 
              type="tel" 
              placeholder="Enter your phone number" 
            />
          </div>
          
          <div class="form-group full-width">
            <label for="address">Location (City, Country)</label>
            <input
              v-model="profile.address"
              id="address"
              type="text"
              placeholder="Enter your city and country"
            />
          </div>
        </div>
      </div>

      <!-- Professional Details -->
      <div class="form-section">
        <h2 class="section-title">Professional Details</h2>
        <div class="form-grid">
          <div class="form-group">
            <label for="skills">Skills (comma separated)</label>
            <input
              v-model="skillsInput"
              id="skills"
              type="text"
              placeholder="E.g., Web Development, Graphic Design"
            />
          </div>
          
          <div class="form-group">
            <label for="education">Education</label>
            <input 
              v-model="profile.education" 
              id="education" 
              type="text" 
              placeholder="Enter your education" 
            />
          </div>
          
          <div class="form-group full-width">
            <label for="experience">Work Experience</label>
            <textarea
              v-model="profile.experience"
              id="experience"
              rows="4"
              placeholder="Describe your past work experiences"
            ></textarea>
          </div>
          
          <div class="form-group full-width">
            <label for="portfolio">Portfolio/Website URL</label>
            <input
              v-model="profile.portfolio"
              id="portfolio"
              type="url"
              placeholder="Link to your portfolio or website"
            />
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="save-button">Save Profile</button>
      </div>
      
      <div v-if="message" :class="{'success-message': success, 'error-message': !success}" class="form-message">
        {{ message }}
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import ProfileService from '@/services/ProfileService';

export default {
  data() {
    return {
      profile: {
        username: "",
        fullName: "",
        dob: "",
        gender: "",
        about: "",
        email: "",
        phone: "",
        address: "",
        skills: [],
        education: "",
        experience: "",
        portfolio: "",
      },
      skillsInput: "",
      message: "",
      success: false,
    };
  },
  mounted() {
    this.profile.username = localStorage.getItem('authToken');
    this.loadProfileData();
  },
  methods: {
    async loadProfileData() {
      const username = this.profile.username;
      if (!username) return;

      try {
        const response = await import('axios').then(m => m.default.get(`http://localhost:3001/users/${username}`));
        const data = response.data;

        Object.keys(this.profile).forEach(key => {
          if (data[key] !== undefined && data[key] !== '-') {
            this.profile[key] = data[key];
          }
        });

        if (Array.isArray(this.profile.skills)) {
          this.skillsInput = this.profile.skills.join(', ');
        }
      } catch (e) {
        console.error('Error loading profile data:', e);
      }
    },

    setBlankProfile() {
      // Set all fields to blank or dash for display, except date field
      this.profile.fullName = this.profile.fullName || "";
      this.profile.about = this.profile.about || "";
      this.profile.phone = this.profile.phone || "";
      this.profile.address = this.profile.address || "";
      this.profile.education = this.profile.education || "";
      this.profile.experience = this.profile.experience || "";
      this.profile.portfolio = this.profile.portfolio || "";
      this.profile.dob = this.profile.dob || "";
      this.skillsInput = "";
    },
    

    
    async saveProfile() {
      try {
        // Convert skills input to array
        if (this.skillsInput) {
          this.profile.skills = this.skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill);
        }
        
        console.log('Saving profile data:', this.profile);
        
        // Save profile using ProfileService
        await ProfileService.updateProfile(this.profile.username, this.profile);
        

        
        this.message = "Profile updated successfully!";
        this.success = true;
        
        // Redirect to profile page after a short delay
        setTimeout(() => {
          this.$router.push('/profile');
        }, 1500);
      } catch (error) {
        this.message = `Error: ${error.message || 'Failed to update profile'}`;
        this.success = false;
        console.error("Error updating profile:", error);
      }
    },
  },
};
</script>

<style scoped>
.create-profile-container {
  max-width: 900px;
  margin: 30px auto;
  padding: 0 20px;
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.form-header h1 {
  color: #e74c3c;
  font-size: 2rem;
  margin-bottom: 10px;
}

.form-header p {
  color: #bdc3c7;
  font-size: 1.1rem;
}

.profile-form {
  background-color: #2c3e50;
  border-radius: 8px;
  border: 1px solid #455a64;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  padding: 30px;
}

.form-section {
  margin-bottom: 30px;
}

.section-title {
  color: #ecf0f1;
  font-size: 1.4rem;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #455a64;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  margin-bottom: 5px;
}

.full-width {
  grid-column: span 2;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #ecf0f1;
  font-weight: 500;
  font-size: 0.95rem;
}

input, select, textarea {
  width: 100%;
  padding: 12px;
  background-color: #34495e;
  border: 1px solid #455a64;
  border-radius: 4px;
  color: #ecf0f1;
  font-size: 1rem;
  transition: all 0.2s ease;
}

input:focus, select:focus, textarea:focus {
  border-color: #e74c3c;
  outline: none;
  box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  margin-top: 30px;
  text-align: center;
}

.save-button {
  background-color: #e74c3c;
  color: white;
  border: 1px solid #c0392b;
  padding: 12px 30px;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.save-button:hover {
  filter: brightness(110%);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.save-button:active {
  transform: translateY(0);
}

.form-message {
  margin-top: 20px;
  padding: 12px;
  border-radius: 4px;
  text-align: center;
  font-weight: 500;
}

.success-message {
  background-color: rgba(46, 204, 113, 0.2);
  color: #2ecc71;
  border: 1px solid #27ae60;
}

.error-message {
  background-color: rgba(231, 76, 60, 0.2);
  color: #e74c3c;
  border: 1px solid #c0392b;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .full-width {
    grid-column: span 1;
  }
  
  .profile-form {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .create-profile-container {
    margin: 15px auto;
  }
  
  .form-header h1 {
    font-size: 1.6rem;
  }
  
  .form-header p {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.2rem;
  }
  
  .profile-form {
    padding: 15px;
  }
  
  input, select, textarea {
    padding: 10px;
    font-size: 0.9rem;
  }
  
  .save-button {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
  }
}
</style>