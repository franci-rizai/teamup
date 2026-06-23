<template>
  <div class="create-project-container">
    <div class="form-header">
      <h1>Create a New Project</h1>
      <p>Share your project idea and find the perfect team to collaborate with</p>
    </div>
    
    <form @submit.prevent="createProject" class="project-form">
      <!-- Basic Information -->
      <div class="form-section">
        <h2 class="section-title">Basic Information</h2>
        <div class="form-grid">
          <div class="form-group full-width">
            <label for="title">Project Title</label>
            <input 
              v-model="project.title" 
              id="title" 
              type="text" 
              placeholder="Enter a descriptive title for your project" 
              required 
            />
          </div>
          
          <div class="form-group full-width">
            <label for="description">Project Description</label>
            <textarea
              v-model="project.description"
              id="description"
              rows="6"
              placeholder="Describe your project in detail, including goals and vision"
              required
            ></textarea>
          </div>
          
          <div class="form-group full-width">
            <label for="category">Category</label>
            <select v-model="project.category" id="category" required>
              <option value="" disabled>Select a category</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Game Development">Game Development</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Data Science">Data Science</option>
              <option value="Blockchain">Blockchain</option>
              <option value="IoT">IoT</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="DevOps">DevOps</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Database Systems">Database Systems</option>
              <option value="Distributed Systems">Distributed Systems</option>
              <option value="Computer Graphics">Computer Graphics</option>
              <option value="Computer Vision">Computer Vision</option>
              <option value="Natural Language Processing">Natural Language Processing</option>
              <option value="Embedded Systems">Embedded Systems</option>
              <option value="Robotics">Robotics</option>
              <option value="Quantum Computing">Quantum Computing</option>
              <option value="Algorithms & Data Structures">Algorithms & Data Structures</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Project Details -->
      <div class="form-section">
        <h2 class="section-title">Project Details</h2>
        <div class="form-grid">
          
          <div class="form-group full-width">
            <label for="tags">Tags (comma separated)</label>
            <input
              v-model="tagsInput"
              id="tags"
              type="text"
              placeholder="E.g., React, MongoDB, UI/UX, Machine Learning"
            />
          </div>

          <div class="form-group">
            <label for="teamSize">Team Size</label>
            <select v-model="project.teamSize" id="teamSize" required>
              <option value="" disabled>Select team size</option>
              <option value="solo">Solo</option>
              <option value="small">Small (2-3 People)</option>
              <option value="medium">Medium (4-6 People)</option>
              <option value="large">Large (7+ People)</option>
            </select>
          </div>

          <div class="form-group">
            <label for="duration">Duration</label>
            <select v-model="project.duration" id="duration" required>
              <option value="" disabled>Select duration</option>
              <option value="short">Short-term</option>
              <option value="medium">Medium-term</option>
              <option value="long">Long-term</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Team Requirements -->
      <div class="form-section">
        <h2 class="section-title">Team Requirements</h2>
        <div class="form-grid">
          <div class="form-group full-width">
            <label>Roles Needed</label>
            <div class="roles-container">
              <div v-for="(role, index) in projectRoles" :key="index" class="role-item">
                <div class="role-header">
                  <span class="role-number">Role #{{ index + 1 }}</span>
                  <button type="button" class="remove-role" @click="removeRole(index)" v-if="projectRoles.length > 1">×</button>
                </div>
                <div class="role-fields">
                  <div class="role-field">
                    <label :for="'roleType-' + index">Role Type</label>
                    <select v-model="role.roleType" :id="'roleType-' + index" required>
                      <option value="" disabled>Select a role</option>
                      <option value="Frontend Developer">Frontend Developer</option>
                      <option value="Backend Developer">Backend Developer</option>
                      <option value="Full Stack Developer">Full Stack Developer</option>
                      <option value="Mobile Developer">Mobile Developer</option>
                      <option value="Game Developer">Game Developer</option>
                      <option value="DevOps Engineer">DevOps Engineer</option>
                      <option value="QA Engineer">QA Engineer</option>
                      <option value="Data Scientist">Data Scientist</option>
                      <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                      <option value="AI Researcher">AI Researcher</option>
                      <option value="Database Administrator">Database Administrator</option>
                      <option value="Security Engineer">Security Engineer</option>
                      <option value="Cloud Architect">Cloud Architect</option>
                      <option value="Blockchain Developer">Blockchain Developer</option>
                      <option value="Embedded Systems Engineer">Embedded Systems Engineer</option>
                      <option value="Computer Vision Engineer">Computer Vision Engineer</option>
                      <option value="NLP Engineer">NLP Engineer</option>
                      <option value="Systems Architect">Systems Architect</option>
                      <option value="Network Engineer">Network Engineer</option>
                      <option value="Compiler Developer">Compiler Developer</option>
                      <option value="Graphics Programmer">Graphics Programmer</option>
                      <option value="Algorithm Specialist">Algorithm Specialist</option>
                      <option value="UI/UX Designer">UI/UX Designer</option>
                      <option value="Project Manager">Project Manager</option>
                      <option value="Technical Writer">Technical Writer</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div class="role-field">
                    <label :for="'roleDescription-' + index">Description</label>
                    <input 
                      v-model="role.description" 
                      :id="'roleDescription-' + index" 
                      type="text" 
                      placeholder="Brief description of responsibilities"
                    />
                  </div>
                  <div class="role-field">
                    <label :for="'roleSkills-' + index">Required Skills</label>
                    <input 
                      v-model="role.skills" 
                      :id="'roleSkills-' + index" 
                      type="text" 
                      placeholder="Skills needed (comma separated)"
                    />
                  </div>
                </div>
              </div>
              <button type="button" class="add-role-btn" @click="addRole">+ Add Another Role</button>
            </div>
          </div>
          
          <div class="form-group full-width">
            <label for="requirements">Soft Skills Required (one per line)</label>
            <textarea
              v-model="requirementsInput"
              id="requirements"
              rows="4"
              placeholder="Enter each required skill on a new line"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="create-button">Create Project</button>
      </div>
      
      <div v-if="message" :class="{'success-message': success, 'error-message': !success}" class="form-message">
        {{ message }}
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      project: {
        title: "",
        description: "",
        category: "",
        tags: [],
        requirements: [],
        roles: [],
        teamSize: "",
        duration: "",
        owner: localStorage.getItem("authToken") || "guest"
      },
      projectRoles: [
        {
          roleType: "",
          description: "",
          skills: "",
          filled: false
        }
      ],
      tagsInput: "",
      requirementsInput: "",
      message: "",
      success: false
    };
  },
  methods: {
    addRole() {
      this.projectRoles.push({
        roleType: "",
        description: "",
        skills: "",
        filled: false
      });
    },
    
    removeRole(index) {
      if (this.projectRoles.length > 1) {
        this.projectRoles.splice(index, 1);
      }
    },
    
    async createProject() {
      try {
        // Process tags
        if (this.tagsInput) {
          this.project.tags = this.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
        }
        
        // Process requirements
        if (this.requirementsInput) {
          this.project.requirements = this.requirementsInput.split('\n').map(req => req.trim()).filter(req => req);
        }
        
        // Process roles
        this.project.roles = this.projectRoles.map(role => ({
          title: role.roleType,
          description: role.description,
          skills: role.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
          filled: false
        }));
        
        // Add createdAt timestamp
        this.project.createdAt = new Date().toISOString();
        
        console.log("Creating project:", this.project);
        
        const response = await axios.post("http://localhost:3001/CreateProject", this.project);
        
        if (response.status === 200) {
          this.message = "Project created successfully!";
          this.success = true;
          
          // Redirect to projects page after a short delay
          setTimeout(() => {
            this.$router.push('/Project');
          }, 1500);
        } else {
          throw new Error("Failed to create project");
        }
      } catch (error) {
        this.message = `Error: ${error.message || "Failed to create project"}`;
        this.success = false;
        console.error("Error creating project:", error);
      }
    }
  }
};
</script>

<style scoped>
.create-project-container {
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

.project-form {
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

.roles-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 5px;
}

.role-item {
  background-color: #34495e;
  border: 1px solid #455a64;
  border-radius: 6px;
  padding: 15px;
}

.role-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #455a64;
  padding-bottom: 10px;
}

.role-number {
  font-weight: 600;
  color: #3498db;
}

.remove-role {
  background-color: #e74c3c;
  color: white;
  border: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
}

.role-fields {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}

.role-field label {
  margin-bottom: 5px;
}

.add-role-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 10px;
  transition: all 0.2s;
}

.add-role-btn:hover {
  background-color: #2980b9;
}

.form-actions {
  margin-top: 30px;
  text-align: center;
}

.create-button {
  background: linear-gradient(to right, #e74c3c, #c0392b);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.create-button:hover {
  filter: brightness(110%);
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
}

.create-button:active {
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
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
  
  .project-form {
    padding: 20px;
  }
  
  .checkbox-group {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .create-project-container {
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
  
  .project-form {
    padding: 15px;
  }
  
  input, select, textarea {
    padding: 10px;
    font-size: 0.9rem;
  }
  
  .create-button {
    width: 100%;
    padding: 12px;
    font-size: 1rem;
  }
}
</style>