<template>
    <div>
      <h1>It's time to edit your profile</h1>
      <h2>So you get more chances</h2>
      <form @submit.prevent="saveProfile" class="userData">
        <!-- Personal Details -->
        <h2>Personal Details</h2>
        <div class="PersonalDetails">
          <div>
            <label for="fullName"><strong>Full Name:</strong></label>
            <input v-model="profile.fullName" id="fullName" type="text" placeholder="Enter your full name" required />
  
            <label for="dob"><strong>Date of Birth:</strong></label>
            <input v-model="profile.dob" id="dob" type="date" required />
          </div>
          <div>
            <label for="gender"><strong>Gender:</strong></label>
            <select v-model="profile.gender" id="gender" required>
              <option value="" disabled>Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
  
            <label for="about"><strong>Tell us about yourself:</strong></label>
            <textarea
              v-model="profile.about"
              id="about"
              rows="4"
              placeholder="Write a short bio about yourself"
              required
            ></textarea>
          </div>
        </div>
  
        <!-- Contact Information -->
        <h2>Contact Information</h2>
        <div class="ContactInfo">
          <div>
            <label for="email"><strong>Email:</strong></label>
            <input v-model="profile.email" id="email" type="email" placeholder="Enter your email" required />
  
            <label for="phone"><strong>Phone Number:</strong></label>
            <input v-model="profile.phone" id="phone" type="tel" placeholder="Enter your phone number" required />
          </div>
          <div>
            <label for="address"><strong>Address (City, Country):</strong></label>
            <input
              v-model="profile.address"
              id="address"
              type="text"
              placeholder="Enter your city and country"
              required
            />
          </div>
        </div>
  
        <!-- Professional Details -->
        <h2>Professional Details</h2>
        <div class="ProfessionalDetails">
          <div>
            <label for="skills"><strong>Skills/Expertise:</strong></label>
            <input
              v-model="profile.skills"
              id="skills"
              type="text"
              placeholder="E.g., Web Development, Graphic Design"
              required
            />
  
            <label for="education"><strong>Education:</strong></label>
            <input v-model="profile.education" id="education" type="text" placeholder="Enter your education" required />
          </div>
          <div>
            <label for="experience"><strong>Work Experience:</strong></label>
            <textarea
              v-model="profile.experience"
              id="experience"
              rows="4"
              placeholder="Describe your past work experiences"
              required
            ></textarea>
  
            <label for="portfolio"><strong>Portfolio Links:</strong></label>
            <input
              v-model="profile.portfolio"
              id="portfolio"
              type="url"
              placeholder="Link to your portfolio or website"
            />
          </div>
        </div>
  
        <button type="submit" class="save-button">Save Profile</button>
        <p v-if="message" :class="{'success': success, 'error': !success}">{{ message }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        profile: {
            username:"",
          fullName: "",
          dob: "",
          gender: "",
          about: "",
          
          phone: "",
          address: "",
          skills: "",
          education: "",
          experience: "",
          portfolio: "",
          lastname:"",
        },
        message: "", // Message for success or error feedback
        success: false, // Determines the message type
      };
    },
    mounted(){
        this.profile.username = localStorage.getItem('authToken');
       
    },
    methods: {
    
      async saveProfile() {
        try {
          const response = await axios.post("http://localhost:3001/userInfo", {
            username: this.profile.username, // Replace with dynamic username if needed
            fullName: this.profile.fullName,
    dob: this.profile.dob,
    gender: this.profile.gender,
    about: this.profile.about,
    email: this.profile.email,
    phone: this.profile.phone,
    address: this.profile.address,
    skills: this.profile.skills,
    education: this.profile.education,
    experience: this.profile.experience,
    portfolio: this.profile.portfolio,
          });
  
          if (response.status === 200) {
            this.message = "Profile updated successfully!";
            this.success = true;
          } else {
            this.message = "Failed to update profile.";
            this.success = false;
          }
        } catch (error) {
          this.message = "An error occurred while updating the profile.";
          this.success = false;
          console.error("Error:", error);
        }
      },
     
    },
  };
  </script>
  
  <style scoped>
  /* General Styling */
  .userData {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1,
  h2 {
    text-align: center;
    color: #007bff;
  }
  
  label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
    color: #333;
  }
  
  input,
  select,
  textarea {
    width: 100%;
    padding: 10px;
    margin: 5px 0 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
  }
  
  textarea {
    resize: none;
  }
  
  .save-button {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .save-button:hover {
    background-color: #0056b3;
  }
  
  .success {
    color: green;
    text-align: center;
  }
  
  .error {
    color: red;
    text-align: center;
  }
  </style>
  