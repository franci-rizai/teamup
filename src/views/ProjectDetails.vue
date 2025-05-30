<template>
  <div class="project-details" v-if="project">
    <div class="header">
      <h1>{{ project.title }}</h1>
      <h3 class="category">{{ project.category }}</h3>
    </div>

    <p class="description">{{ project.description }}</p>

    <div class="tags">
      <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>

    <div class="owner">
      <h3>Owner: {{ project.owner || 'N/A' }}</h3>
    </div>

    <div class="status">
      <h3>Status: <span class="status-text">{{ project.status }}</span></h3>
    </div>

    <div class="requirements">
      <h3>Skills Required:</h3>
      <ul>
        <li v-for="req in project.requirements" :key="req">{{ req }}</li>
      </ul>
    </div>

    <button
      @click="applyButton"
      class="sub"
      type="submit"
      :disabled="hasApplied"
    >
      {{ hasApplied ? "APPLIED" : "APPLY" }}
    </button>

    <p v-if="showSuccessMessage" class="success-msg">
      ✅ You have successfully applied to this project!
    </p>
  </div>

  <div v-else>
    <p>Loading project details...</p>
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
        const res = await axios.get(`http://localhost:3001/getAppliedProjects/${this.username}`);
        const appliedProjects = res.data;
        this.hasApplied = appliedProjects.some(p => p._id === this.project._id);
      } catch (err) {
        console.error("Error checking applied projects:", err);
      }
    },

    async applyButton() {
      try {
        console.log("Applying as", this.username, "to project", this.project._id);

        const projectId = this.project._id;
        const response = await axios.put(`http://localhost:3001/addProjectToUser/${projectId}`, {
          username: this.username,

        });
        console.log("Applied successfully", response.data);
        this.hasApplied = true;
        this.showSuccessMessage = true;
      } catch (err) {
        console.error("Error applying to the project:", err);
      }
    },
  },
  mounted() {
    this.fetchProject();
  },
};
</script>

<style scoped>
.project-details {
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

h1 {
  font-size: 2em;
  color: #333;
}

.category {
  font-size: 1em;
  color: #666;
}

.description {
  font-size: 1.2em;
  color: #555;
  margin-bottom: 20px;
}

.tags {
  margin-bottom: 20px;
}

.tag {
  background-color: #e3f2fd;
  color: #007bff;
  padding: 5px 10px;
  border-radius: 20px;
  margin-right: 10px;
  font-size: 0.9em;
}

.owner,
.status,
.requirements {
  margin-bottom: 20px;
}

.status-text {
  font-weight: bold;
  color: #28a745;
}

.sub {
  font-size: 20px;
  color: green;
  background-color: white;
  width: 120px;
  cursor: pointer;
  padding: 10px;
  border: 2px solid green;
  border-radius: 5px;
  transition: all 0.2s;
}

.sub:disabled {
  background-color: #f0f0f0;
  color: gray;
  border-color: gray;
  cursor: not-allowed;
}

.success-msg {
  margin-top: 15px;
  color: #28a745;
  font-weight: bold;
}
</style>
