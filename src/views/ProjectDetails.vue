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
        <h3>Owner: {{ project.owner }}</h3>
   
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
  
    
  
     
    </div>
  
    <div v-else>
      <p>Loading project details...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['id'], // This is passed via the router
    data() {
      return {
        project: null, // Will store the fetched project data
      };
    },
    mounted() {
      this.fetchProject();
    },
    methods: {
      async fetchProject() {
        try {
          const response = await axios.get(`http://localhost:3001/getProject/${this.id}`);
          this.project = response.data; // Update the project with fetched data
          console.log(this.project);
        } catch (error) {
          console.error("Error fetching project:", error);
        }
      },
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
  .requirements,
  .team,
  .progress {
    margin-bottom: 20px;
  }
  
  a {
    color: #007bff;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  .status-text {
    font-weight: bold;
    color: #28a745;
  }
  
  .role {
    color: #6c757d;
  }
  </style>
  