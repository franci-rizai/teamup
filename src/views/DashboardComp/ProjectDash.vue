<template>
  <div class="dashboard">
    <h1>{{ username }}'s Projects</h1>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div class="board">
        <!-- Applied Projects -->
        <div class="column">
          <h2>Applied</h2>
          <div v-if="appliedProjects.length === 0">No applied projects.</div>
          <div v-for="project in appliedProjects" :key="project._id" class="card">
            <p><strong>Project Name:</strong> {{ project.title }}</p>
            <p><strong>Applied:</strong> waiting...</p>
            <p><strong>Category:</strong> {{ project.category }}</p>
            <button @click="withdrawApplication(project._id)">Withdraw</button>

          </div>
        </div>

        <!-- In Progress Projects -->
        <div class="column">
          <h2>In Progress</h2>
          <div v-if="inProgressProjects.length === 0">No in-progress projects.</div>
          <div v-for="project in inProgressProjects" :key="project._id" class="card">
            <p><strong>Project Name:</strong> {{ project.title }}</p>
            <p><strong>Status:</strong> In Progress</p>
            <p><strong>Category:</strong> {{ project.category }}</p>
          </div>
        </div>

        <!-- Completed Projects -->
        <div class="column">
          <h2>Completed</h2>
          <div v-if="completedProjects.length === 0">No completed projects.</div>
          <div v-for="project in completedProjects" :key="project._id" class="card">
            <p><strong>Project Name:</strong> {{ project.title }}</p>
            <p><strong>Status:</strong> Completed</p>
            <p><strong>Category:</strong> {{ project.category }}</p>
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
      username: localStorage.getItem("authToken"), // Default username for testing
      appliedProjects: [],
      inProgressProjects: [],
      completedProjects: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchProjects() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`http://localhost:3001/getAppliedProjects/${this.username}`);
        console.log("API Response:", response.data);

        // Assuming the response is just an array of applied projects
        this.appliedProjects = response.data;

        // Optional: reset others to empty if your backend doesn’t return them yet
        this.inProgressProjects = [];
        this.completedProjects = [];
      } catch (err) {
        console.error("Error fetching projects:", err);
        this.error = "Failed to load projects.";
      } finally {
        this.loading = false;
      }
    },
    async withdrawApplication(projectId) {
  try {
    const response = await axios.post("http://localhost:3001/withdraw", {
      username: this.username,
      projectId,
    });
    console.log("Withdraw success:", response.data.message);
    this.fetchProjects(); // Refresh the list
  } catch (err) {
    console.error("Error withdrawing application:", err);
  }
}



  },
  mounted() {
    this.fetchProjects();
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
.board {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
.column {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  background-color: #f9f9f9;
}
.card {
  background: white;
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
}
button {
  background-color: #ff4d4d;
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
button:hover {
  background-color: #ff1a1a;
}
</style>
