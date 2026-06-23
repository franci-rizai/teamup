<template>
  <div class="dashboard">
    <!-- User Info -->
    <section class="user-info">
      <img src="@/assets/avatar.png" alt="Avatar" />
      <div>
        <h2>{{ user.name || 'Welcome' }}</h2>
        <p>{{ user.email }}</p>
        <small>{{ user.role }}</small>
      </div>
    </section>

    <!-- Stats -->
    <section class="stats">
      <div class="stat-box" v-for="s in stats" :key="s.label">
        <h3>{{ s.value }}</h3>
        <p>{{ s.label }}</p>
      </div>
    </section>




  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: localStorage.getItem("authToken") || 'guest',
      loading: false,
      error: null,
      user: {
        name: "",
        email: "",
        role: "",
        skills: []
      },
      stats: [
        { label: "Projects Created", value: 0 },
        { label: "Applications Received", value: 0 },
        { label: "Projects In Progress", value: 0 }
      ],
      userProjects: [],
      projectsWithMessages: []
    };
  },
  methods: {
    async fetchApplicants() {
      // Disabled until server routes are fixed
      this.stats[1].value = 0;
    },
    
    async fetchUserProjects() {
      if (!this.username || this.username === 'guest') return;
      
      try {
        // Get all projects and filter for this user
        const allProjectsResponse = await axios.get('http://localhost:3001/getProjects');
        const allProjects = allProjectsResponse.data || [];
        
        // Filter projects where user is owner or collaborator
        this.userProjects = allProjects.filter(project => {
          // User is owner
          if (project.owner === this.username) return true;
          
          // User is collaborator
          if (project.collaborators && project.collaborators.some(c => 
            c.username === this.username || c === this.username
          )) return true;
          
          return false;
        });
        
        // Update stats
        const ownedProjects = allProjects.filter(p => p.owner === this.username);
        this.stats[0].value = ownedProjects.length;
        this.stats[2].value = this.userProjects.length;
        
        // Messages disabled until server routes are fixed
        this.projectsWithMessages = this.userProjects.map(project => ({
          _id: project._id,
          title: project.title,
          messages: [{
            author: "System",
            text: "Messages temporarily unavailable",
            timestamp: new Date()
          }]
        }));
      } catch (error) {
        this.userProjects = [];
        this.projectsWithMessages = [];
      }
    },
    
    formatTime(timestamp) {
      if (!timestamp) return '';
      
      const date = new Date(timestamp);
      return date.toLocaleString();
    },
    
    async fetchUserProfile() {
      const username = this.username;
      
      try {
        // Get real user data from database
        const userResponse = await axios.get(`http://localhost:3001/users/${username}`);
        const userData = userResponse.data;
        
        // Set user info with real data
        this.user = {
          name: userData.fullName || userData.username || username,
          email: userData.email || 'Email not provided',
          role: userData.role || 'Team Member',
          skills: userData.skills || []
        };
        
        return userData;
      } catch (error) {
        console.error("Error fetching user profile:", error);
        
        // Fallback to default data if API fails
        this.user = {
          name: username,
          email: 'Email not provided',
          role: 'Team Member',
          skills: []
        };
        
        return {
          username: username,
          fullName: username,
          email: 'Email not provided',
          skills: [],
          role: 'Team Member'
        };
      }
    },
    
    viewProfile(username) {
      // Navigate to the profile page of the applicant
      this.$router.push({ name: 'UserProfile', params: { username } });
    },
    
    goToForum() {
      // Find the parent component (Dashboard) and change the welcomePage to 'Inbox'
      let parent = this.$parent;
      while (parent && !parent.welcomePage) {
        parent = parent.$parent;
      }
      
      if (parent && parent.welcomePage) {
        parent.welcomePage = 'Inbox';
      }
    },
    
    goToInbox() {
      // Find the parent component (Dashboard) and change the welcomePage to 'Inbox'
      let parent = this.$parent;
      while (parent && !parent.welcomePage) {
        parent = parent.$parent;
      }
      
      if (parent && parent.welcomePage) {
        parent.welcomePage = 'Inbox';
      }
    },
    

  },
  async mounted() {
    await this.fetchUserProfile();
    this.fetchApplicants();
    await this.fetchUserProjects(); // Fetch real projects
  },
  
  // Prevent any auto-refresh
  beforeCreate() {
    // Stop any existing intervals that might be causing refresh
    if (window) {
      const existingIntervals = window.intervals || [];
      existingIntervals.forEach(interval => clearInterval(interval));
      window.intervals = [];
    }
  }
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 1.5em;
  background-color: #2c3e50;
  min-height: 100vh;
  color: #ecf0f1;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1.5em;
  background-color: #34495e;
  padding: 1.2em;
  border-radius: 8px;
  border: 1px solid #455a64;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 1.5em;
  width: 100%;
  max-width: 700px;
}

.user-info img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid #e74c3c;
  padding: 2px;
  object-fit: cover;
}

.user-info div {
  flex: 1;
}

.user-info h2 {
  margin: 0;
  color: #ecf0f1;
  font-size: 1.4rem;
  font-weight: 600;
}

.user-info p {
  margin: 5px 0;
  color: #bdc3c7;
}

.user-info small {
  background-color: #e74c3c;
  color: white;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  display: inline-block;
  margin-top: 5px;
}

.stats {
  display: flex;
  justify-content: space-between;
  gap: 1em;
  margin-bottom: 1.5em;
  width: 100%;
  max-width: 700px;
}

.stat-box {
  background: #34495e;
  padding: 1.2em;
  border-radius: 8px;
  border: 1px solid #455a64;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  flex: 1;
  min-width: 120px;
  border-left: 4px solid #e74c3c;
}

.stat-box h3 {
  font-size: 1.8rem;
  margin: 0;
  color: #ecf0f1;
  font-weight: 700;
}

.stat-box p {
  margin: 8px 0 0;
  color: #bdc3c7;
  font-size: 0.85rem;
  font-weight: 500;
}



mpty-forum {
  text-align: center;
  padding: 20px;
  color: #bdc3c7;
  font-style: italic;
  background-color: #2c3e50;
  border-radius: 8px;
  border: 1px dashed #455a64;
}

.skills {
  width: 100%;
  max-width: 700px;
  margin-bottom: 1.5em;
  background-color: #34495e;
  padding: 1.2em;
  border-radius: 8px;
  border: 1px solid #455a64;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.skills h3 {
  margin-top: 0;
  color: #ecf0f1;
  font-size: 1.2rem;
  margin-bottom: 1em;
  border-bottom: 1px solid #455a64;
  padding-bottom: 0.5em;
}

.skill-bar {
  margin-bottom: 15px;
}

.skill-bar label {
  display: block;
  margin-bottom: 5px;
  color: #ecf0f1;
  font-weight: 500;
  position: relative;
}

.skill-bar label::after {
  content: attr(data-level);
  position: absolute;
  right: 0;
  color: #3498db;
  font-size: 0.85rem;
}

.bar {
  height: 10px;
  background-color: #2c3e50;
  border-radius: 5px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background-color: #3498db;
  border-radius: 5px;
  transition: width 0.5s ease-in-out;
}mpty-forum {
  text-align: center;
  padding: 20px;
  color: #bdc3c7;
  font-style: italic;
  background-color: #2c3e50;
  border-radius: 8px;
  border: 1px dashed #455a64;
}

.skills {
  width: 100%;
  max-width: 700px;
  margin-bottom: 1.5em;
  background-color: #34495e;
  padding: 1.2em;
  border-radius: 8px;
  border: 1px solid #455a64;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.skills h3 {
  margin-top: 0;
  color: #ecf0f1;
  font-size: 1.2rem;
  margin-bottom: 1em;
  border-bottom: 1px solid #455a64;
  padding-bottom: 0.5em;
}

.skill-bar {
  margin-bottom: 15px;
}

.skill-bar label {
  display: block;
  margin-bottom: 5px;
  color: #ecf0f1;
  font-weight: 500;
  position: relative;
}

.skill-bar label::after {
  content: attr(data-level);
  position: absolute;
  right: 0;
  color: #3498db;
  font-size: 0.85rem;
}

.bar {
  height: 10px;
  background-color: #2c3e50;
  border-radius: 5px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background-color: #3498db;
  border-radius: 5px;
  transition: width 0.5s ease-in-out;
}

@media (max-width: 768px) {
  .dashboard {
    padding: 1em;
  }
  
  .user-info {
    flex-direction: column;
    text-align: center;
    gap: 1em;
    padding: 1em;
  }
  
  .user-info img {
    width: 60px;
    height: 60px;
  }
  
  .user-info h2 {
    font-size: 1.2rem;
  }
  
  .stats {
    flex-direction: column;
    gap: 0.8em;
  }
  
  .stat-box {
    padding: 1em;
    min-width: auto;
  }
  
  .stat-box h3 {
    font-size: 1.5rem;
  }
  
  .stat-box p {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .dashboard {
    padding: 0.8em;
  }
  
  .user-info {
    padding: 0.8em;
    margin-bottom: 1em;
  }
  
  .user-info img {
    width: 50px;
    height: 50px;
  }
  
  .user-info h2 {
    font-size: 1.1rem;
  }
  
  .user-info p {
    font-size: 0.9rem;
  }
  
  .user-info small {
    font-size: 0.75rem;
    padding: 2px 8px;
  }
  
  .stats {
    gap: 0.6em;
    margin-bottom: 1em;
  }
  
  .stat-box {
    padding: 0.8em;
    border-left-width: 3px;
  }
  
  .stat-box h3 {
    font-size: 1.3rem;
  }
  
  .stat-box p {
    font-size: 0.75rem;
    margin-top: 5px;
    line-height: 1.3;
  }
  
  .skills {
    padding: 1em;
  }
  
  .skills h3 {
    font-size: 1.1rem;
  }
}
</style>