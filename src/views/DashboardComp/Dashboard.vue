<template>
  <div class="dashboard-container">
    <div class="dashboard-sidebar">
      <h1 class="dashboard-title">Dashboard</h1>
      <ul class="dashboard-menu">
        <li :class="{ active: welcomePage === 'Home' }" @click="welcomePage='Home'">
          <span class="menu-icon">🏠</span>
          <span class="menu-text">Home</span>
        </li>
        <li :class="{ active: welcomePage === 'Projects' }" @click="welcomePage='Projects'">
          <span class="menu-icon">📋</span>
          <span class="menu-text">Projects</span>
        </li>
        <li :class="{ active: welcomePage === 'MyProjectsApplicants' }" @click="welcomePage='MyProjectsApplicants'">
          <span class="menu-icon">👥</span>
          <span class="menu-text">My Projects Applicants</span>
        </li>
        <li :class="{ active: welcomePage === 'Inbox' }" @click="welcomePage='Inbox'">
          <span class="menu-icon">📩</span>
          <span class="menu-text">Inbox</span>
        </li>
        <li :class="{ active: welcomePage === 'Notifications' }" @click="welcomePage='Notifications'">
          <span class="menu-icon">🔔</span>
          <span class="menu-text">Notifications</span>
          <span v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</span>
        </li>
      </ul>
    </div>
    
    <div class="dashboard-content">
      <div v-if="welcomePage === 'Home'">
        <HomeDash />
      </div>
      <div v-if="welcomePage === 'Projects'">
        <ProjectDash />
      </div>
      <div v-if="welcomePage === 'MyProjectsApplicants'">
        <MyProjectsApplicants />
      </div>
      <div v-if="welcomePage === 'Inbox'">
        <CollaboratorInbox />
      </div>
      <div v-if="welcomePage === 'Notifications'">
        <Notifications />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import HomeDash from '@/views/DashboardComp/HomeDash.vue'
import ProjectDash from '@/views/DashboardComp/ProjectDash.vue';
import MyProjectsApplicants from '@/views/DashboardComp/MyProjectsApplicants.vue';
import Notifications from '@/views/DashboardComp/Notifications.vue';
import CollaboratorInbox from '@/views/DashboardComp/CollaboratorInbox.vue';

export default {
  components: {
    HomeDash,
    ProjectDash,
    MyProjectsApplicants,
    Notifications,
    CollaboratorInbox
  },
  data() {
    return {
      welcomePage: 'Home',
      notificationCount: 0
    }
  },
  methods: {
    async checkNotifications() {
      try {
        const username = localStorage.getItem("authToken");
        if (!username) return;
        
        const response = await axios.get(`http://localhost:3001/getApplicantsForMyProjects/${username}`);
        const applicantsData = response.data;
        
        // Count total applicants
        let totalApplicants = 0;
        for (const project of applicantsData) {
          totalApplicants += (project.applicants || []).length;
        }
        
        // Filter out read notifications
        const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]');
        let unreadCount = 0;
        
        for (const project of applicantsData) {
          for (const applicant of project.applicants || []) {
            const notificationId = `${project.projectId}_${applicant.username}`;
            if (!readNotifications.includes(notificationId)) {
              unreadCount++;
            }
          }
        }
        
        this.notificationCount = unreadCount;
      } catch (error) {
        console.error("Error checking notifications:", error);
        this.notificationCount = 0;
      }
    }
  },
  mounted() {
    // Initial check for notifications
    this.checkNotifications();
    
    // Check for new notifications every 2 minutes
    this.notificationInterval = setInterval(this.checkNotifications, 120000);
  },
  
  beforeUnmount() {
    // Clean up interval when component is destroyed
    if (this.notificationInterval) {
      clearInterval(this.notificationInterval);
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #1a2530;
  color: #ecf0f1;
}

.dashboard-sidebar {
  width: 250px;
  background-color: #2c3e50;
  border-right: 1px solid #455a64;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
}

.dashboard-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 30px;
  padding: 0 20px;
  color: #e74c3c;
}

.dashboard-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dashboard-menu li {
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  border-left: 4px solid transparent;
}

.dashboard-menu li:hover {
  background-color: #34495e;
  border-left-color: #3498db;
}

.dashboard-menu li.active {
  background-color: #34495e;
  border-left-color: #e74c3c;
}

.menu-icon {
  margin-right: 10px;
  font-size: 1.2rem;
}

.menu-text {
  font-size: 1rem;
}

.notification-badge {
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  min-width: 20px;
  height: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
  
  .dashboard-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #455a64;
    padding: 10px 0;
  }
  
  .dashboard-title {
    font-size: 1.4rem;
    margin-bottom: 10px;
    padding: 0 15px;
  }
  
  .dashboard-menu {
    display: flex;
    overflow-x: auto;
    padding: 0 10px 10px;
    gap: 5px;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .dashboard-menu::-webkit-scrollbar {
    display: none;
  }
  
  .dashboard-menu li {
    flex-direction: column;
    padding: 8px 12px;
    text-align: center;
    border-left: none;
    border-bottom: 3px solid transparent;
    min-width: 80px;
    white-space: nowrap;
    border-radius: 8px;
  }
  
  .dashboard-menu li:hover, .dashboard-menu li.active {
    border-left-color: transparent;
    border-bottom-color: #e74c3c;
    background-color: #34495e;
  }
  
  .menu-icon {
    margin-right: 0;
    margin-bottom: 3px;
    font-size: 1.1rem;
  }
  
  .menu-text {
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    min-width: 16px;
    height: 16px;
    font-size: 10px;
  }
  
  .dashboard-content {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .dashboard-title {
    font-size: 1.2rem;
    padding: 0 10px;
  }
  
  .dashboard-menu {
    padding: 0 5px 8px;
  }
  
  .dashboard-menu li {
    padding: 6px 8px;
    min-width: 70px;
  }
  
  .menu-icon {
    font-size: 1rem;
    margin-bottom: 2px;
  }
  
  .menu-text {
    font-size: 0.65rem;
    line-height: 1.2;
  }
  
  .notification-badge {
    min-width: 14px;
    height: 14px;
    font-size: 9px;
    top: -3px;
    right: -3px;
  }
  
  .dashboard-content {
    padding: 10px;
  }
  
  .dashboard-sidebar {
    padding: 8px 0;
  }
}
</style>