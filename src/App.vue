<template>
  <div id="app">
    <Headerss />
    <div class="content">
      <router-view />
    </div>
    
  </div>
</template>




<script>
// import { defineComponent } from '@vue/composition-api'
import Headerss from './components/Headerss.vue'

import Footer from './components/Footer.vue'






export default {
  components: { Headerss,Footer}
}
  
</script>


<style>
body {
  margin: 0;
  background: #1a2530;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #ecf0f1;
}

#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ecf0f1;
  min-height: 100vh;
  background-color: #1a2530;
}

.content {
  padding: 15px;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: hidden;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .content {
    padding: 10px;
  }
  
  h1 {
    font-size: 1.8rem;
  }
  
  h2 {
    font-size: 1.4rem;
  }
  
  h3 {
    font-size: 1.2rem;
  }
}

/* Global button styles */
button {
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #e74c3c;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

button:hover {
  filter: brightness(110%);
}

button:active {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Global card styles */
.card {
  background-color: #2c3e50;
  border-radius: 6px;
  border: 1px solid #455a64;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 15px;
  margin-bottom: 15px;
}

/* Global form styles */
input, textarea, select {
  width: 100%;
  padding: 10px;
  background-color: #34495e;
  border: 1px solid #455a64;
  border-radius: 4px;
  font-size: 14px;
  color: #ecf0f1;
  transition: all 0.2s ease;
  margin-bottom: 12px;
}

input:focus, textarea:focus, select:focus {
  border-color: #e74c3c;
  outline: none;
  box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
}

/* Global headings */
h1, h2, h3, h4, h5, h6 {
  color: #ecf0f1;
  margin-top: 0;
  font-weight: 600;
}

/* Global links */
a {
  color: #3498db;
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: #e74c3c;
}

/* Tables */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
  background-color: #2c3e50;
  border: 1px solid #455a64;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #455a64;
}

th {
  background-color: #34495e;
  color: #ecf0f1;
  font-weight: 600;
}

tr:hover {
  background-color: #34495e;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #2c3e50;
}

::-webkit-scrollbar-thumb {
  background: #455a64;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #e74c3c;
}
</style>