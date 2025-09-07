<template>
  <div class="dashboard-container">
    <div class="sidebar">
      <div class="logo">
        <h1>Team<span>Up</span></h1>
      </div>
      <div class="user-info">
        <div class="avatar">
          <img src="../assets/avatar.png" alt="User Avatar" />
        </div>
        <div class="user-details">
          <h2>{{ username }}</h2>
          <p>Team Member</p>
        </div>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li @click="welcomePage = 'HomeDash'" :class="{ active: welcomePage === 'HomeDash' }">
            <i class="fas fa-home"></i> Home
          </li>
          <li @click="welcomePage = 'MyProjects'" :class="{ active: welcomePage === 'MyProjects' }">
            <i class="fas fa-project-diagram"></i> My Projects
          </li>
          <li @click="welcomePage = 'MyProjectsApplicants'" :class="{ active: welcomePage === 'MyProjectsApplicants' }">
            <i class="fas fa-users"></i> Applicants
          </li>
          <li @click="welcomePage = 'Notifications'" :class="{ active: welcomePage === 'Notifications' }">
            <i class="fas fa-bell"></i> Notifications
            <span v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</span>
          </li>
          <li @click="welcomePage = 'Forum'" :class="{ active: welcomePage === 'Forum' }">
            <i class="fas fa-comments"></i> Team Forum
          </li>
          <li @click="welcomePage = 'Inbox'" :class="{ active: welcomePage === 'Inbox' }">
            <i class="fas fa-envelope"></i> Inbox
          </li>
          <li @click="welcomePage = 'Settings'" :class="{ active: welcomePage === 'Settings' }">
            <i class="fas fa-cog"></i> Settings
          </li>
        </ul>
      </nav>
      <div class="sidebar-footer">
        <button @click="logout" class="logout-btn">
          <i class="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </div>

    <div class="main-content">
      <div class="top-bar">
        <div class="search-bar">
          <input type="text" placeholder="Search..." />
          <button><i class="fas fa-search"></i></button>
        </div>
        <div class="top-nav">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/Project" class="nav-link">Projects</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
        </div>
      </div>

      <div class="dashboard-content">
        <component :is="currentComponent"></component>
      </div>
    </div>
  </div>
</template>

<script>
import HomeDash from './DashboardComp/HomeDash.vue';
import MyProjects from './DashboardComp/MyProjects.vue';
import MyProjectsApplicants from './DashboardComp/MyProjectsApplicants.vue';
import Notifications from './DashboardComp/Notifications.vue';
import Forum from './DashboardComp/Forum.vue';
import Settings from './DashboardComp/Settings.vue';
import Inbox from './DashboardComp/Inbox.js';

export default {
  components: {
    HomeDash,
    MyProjects,
    MyProjectsApplicants,
    Notifications,
    Forum,
    Inbox,
    Settings
  },
  data() {
    return {
      welcomePage: 'HomeDash',
      username: localStorage.getItem("authToken") || 'Guest',
      notificationCount: 0
    };
  },
  computed: {
    currentComponent() {
      return this.welcomePage;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("authToken");
      this.$router.push('/login');
    },
    checkNotifications() {
      // Disabled until server routes are fixed
      this.notificationCount = 0;
    }
  },
  mounted() {
    this.checkNotifications();
    
    // Check notifications every minute
    setInterval(this.checkNotifications, 60000);
  }
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #1a2530;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #455a64;
}

.logo {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #455a64;
}

.logo h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #ecf0f1;
}

.logo span {
  color: #e74c3c;
}

.user-info {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-bottom: 1px solid #455a64;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #e74c3c;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details h2 {
  margin: 0;
  font-size: 1.1rem;
  color: #ecf0f1;
}

.user-details p {
  margin: 5px 0 0;
  font-size: 0.8rem;
  color: #bdc3c7;
}

.sidebar-nav {
  flex: 1;
  padding: 20px 0;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  position: relative;
}

.sidebar-nav li:hover {
  background-color: #34495e;
}

.sidebar-nav li.active {
  background-color: #3498db;
  color: white;
}

.sidebar-nav li i {
  margin-right: 10px;
  width: 20px;
  text-align: center;
}

.notification-badge {
  background-color: #e74c3c;
  color: white;
  font-size: 0.7rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 15px;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid #455a64;
}

.logout-btn {
  width: 100%;
  padding: 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.logout-btn:hover {
  background-color: #c0392b;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.top-bar {
  height: 60px;
  background-color: #2c3e50;
  border-bottom: 1px solid #455a64;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-bar input {
  padding: 8px 12px;
  border: 1px solid #455a64;
  border-radius: 4px 0 0 4px;
  background-color: #34495e;
  color: #ecf0f1;
  width: 200px;
}

.search-bar button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.top-nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #ecf0f1;
}

.dashboard-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
  }
  
  .user-info {
    justify-content: center;
  }
  
  .sidebar-nav ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .sidebar-nav li {
    padding: 10px 15px;
  }
  
  .top-bar {
    flex-direction: column;
    height: auto;
    padding: 10px;
    gap: 10px;
  }
  
  .search-bar {
    width: 100%;
  }
  
  .search-bar input {
    width: 100%;
  }
}
</style>