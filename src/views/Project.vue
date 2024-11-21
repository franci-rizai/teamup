<template>
    <div class="projects">
      <h1>All Projects</h1>
      <div v-if="loading" class="loading">Loading projects...</div>
      <div v-else-if="projects.length === 0" class="no-projects">
        No projects found.
      </div>
      <div  v-else class="project-list">
        <div v-for="project in projects" :key="project._id" class="project-card">
          <h2>{{ project.title }}</h2>
          <p>{{ project.description }}</p>
          <div class="tags">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <p><strong>Category:</strong> {{ project.category }}</p>
          <p><strong>Status:</strong> {{ project.status }}</p>
          <p><strong>Owner:</strong> {{ project.owner || 'Unknown' }}</p>
          <router-link :to="{name: 'ProjectDetails', params: {id: project._id}}">
          <button type="submit"> View details... </button>
        </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "Project",
    data() {
      return {
        projects: [],
        loading: true,
      };
    },
    methods: {
      async fetchProjects() {
        try {
          const response = await axios.get("http://localhost:3001/getProjects");
          this.projects = response.data;
        } catch (error) {
          console.error("Error fetching projects:", error);
        } finally {
          this.loading = false;
        }
      },
    },
    created() {
      this.fetchProjects();
    },
  };
  </script>
  
  <style scoped>
  .projects {
    padding: 20px;
  }
  
  .project-list {
    display: flex;
    gap:2em;
    flex-wrap: wrap;
  }
  
  .project-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    width:300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    aspect-ratio: 16/18;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .project-card h2 {
    margin: 0;
    color: #333;
  }
  
  .project-card p {
    margin: 8px 0;
  }
  
  .tags {
    margin: 8px 0;
  }
  
  .tag {
    display: inline-block;
    background-color: #007bff;
    color: white;
    padding: 2px 8px;
    margin-right: 4px;
    border-radius: 4px;
    font-size: 12px;
  }
  </style>
  