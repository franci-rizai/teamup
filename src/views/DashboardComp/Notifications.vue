<template>
  <div class="notifications-container">
    <h1 class="section-title">Notifications</h1>
    
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading notifications...</p>
    </div>
    
    <div v-else-if="error" class="error-message">{{ error }}</div>
    
    <div v-else>
      <div v-if="notifications.length === 0" class="empty-state">
        <p>No new notifications</p>
      </div>
      
      <div v-else class="notifications-list">
        <div v-for="(notification, index) in notifications" :key="index" class="notification-card">
          <div class="notification-icon">
            <span class="icon">👤</span>
          </div>
          <div class="notification-content">
            <p class="notification-text">
              <strong>{{ notification.applicantName }}</strong> has applied to your project 
              <strong>"{{ notification.projectTitle }}"</strong>
            </p>
            <p class="notification-time">{{ formatTime(notification.timestamp) }}</p>
            <div class="notification-actions">
              <button class="view-profile-btn" @click="viewProfile(notification.applicantUsername)">
                View Profile
              </button>
              <button class="mark-read-btn" @click="markAsRead(index)">
                Mark as Read
              </button>
            </div>
          </div>
        </div>
        
        <div class="action-buttons">
          <button class="view-applicants-btn" @click="goToApplicants">
            View All Applicants
          </button>
          <button v-if="notifications.length > 0" class="mark-all-read-btn" @click="markAllAsRead">
            Mark All as Read
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Notifications',
  data() {
    return {
      username: localStorage.getItem("authToken"),
      notifications: [],
      loading: true,
      error: null
    };
  },
  methods: {
    async fetchNotifications() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.get(`http://localhost:3001/getApplicantsForMyProjects/${this.username}`);
        const applicantsData = response.data;
        
        // Convert applicants data to notifications format
        const notifications = [];
        
        for (const project of applicantsData) {
          for (const applicant of project.applicants || []) {
            notifications.push({
              id: `${project.projectId}_${applicant.username}`,
              applicantName: applicant.fullName || applicant.username,
              applicantUsername: applicant.username,
              projectTitle: project.title,
              projectId: project.projectId,
              timestamp: new Date() // In a real app, you'd store the application timestamp
            });
          }
        }
        
        // Filter out already read notifications
        const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]');
        this.notifications = notifications.filter(notification => 
          !readNotifications.includes(notification.id)
        );
        
      } catch (error) {
        console.error("Error fetching notifications:", error);
        this.error = "Failed to load notifications.";
        this.notifications = [];
      } finally {
        this.loading = false;
      }
    },
    
    formatTime(timestamp) {
      // Simple time formatting - in a real app, use a library like date-fns
      return new Date(timestamp).toLocaleString();
    },
    
    goToApplicants() {
      // Change the parent component's active page to MyProjectsApplicants
      this.$parent.welcomePage = 'MyProjectsApplicants';
    },
    
    async viewProfile(username) {
      try {
        // Clear any existing profile data for this user
        localStorage.removeItem(`userProfile_${username}`);
        
        // Try to fetch fresh profile data from the database
        const response = await axios.get(`http://localhost:3001/users/${username}`);
        
        if (response.data) {
          // Store the fresh profile data in localStorage
          localStorage.setItem(`userProfile_${username}`, JSON.stringify(response.data));
          console.log(`Fresh profile data for ${username} fetched from database`);
        }
      } catch (error) {
        console.error(`Could not fetch profile for ${username} from database:`, error);
        // If database fetch fails, we'll let the Profile component handle the fallback
      }
      
      // Navigate to the profile page of the applicant
      this.$router.push({ name: 'UserProfile', params: { username } });
    },
    
    markAsRead(index) {
      // Get the notification ID
      const notificationId = this.notifications[index].id;
      
      // Get current read notifications
      const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]');
      
      // Add this notification to read list
      readNotifications.push(notificationId);
      
      // Save back to localStorage
      localStorage.setItem('readNotifications', JSON.stringify(readNotifications));
      
      // Remove from current list
      this.notifications.splice(index, 1);
      
      // Update notification count in parent component if it exists
      if (this.$parent && this.$parent.checkNotifications) {
        this.$parent.checkNotifications();
      }
    },
    
    markAllAsRead() {
      // Get all notification IDs
      const notificationIds = this.notifications.map(notification => notification.id);
      
      // Get current read notifications
      const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]');
      
      // Add all notifications to read list
      const updatedReadNotifications = [...readNotifications, ...notificationIds];
      
      // Save back to localStorage
      localStorage.setItem('readNotifications', JSON.stringify(updatedReadNotifications));
      
      // Clear current list
      this.notifications = [];
      
      // Update notification count in parent component if it exists
      if (this.$parent && this.$parent.checkNotifications) {
        this.$parent.checkNotifications();
      }
    }
  },
  mounted() {
    this.fetchNotifications();
  }
};
</script>

<style scoped>
.notifications-container {
  padding: 20px;
  color: #ecf0f1;
}

.section-title {
  margin-bottom: 25px;
  font-size: 1.8rem;
  color: #ecf0f1;
  border-bottom: 1px solid #455a64;
  padding-bottom: 10px;
}

.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.notification-card {
  display: flex;
  align-items: flex-start;
  background-color: #34495e;
  border: 1px solid #455a64;
  border-radius: 6px;
  padding: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.notification-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.notification-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background-color: #e74c3c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.icon {
  font-size: 20px;
}

.notification-content {
  flex: 1;
}

.notification-text {
  margin: 0 0 5px 0;
  color: #ecf0f1;
  line-height: 1.4;
}

.notification-text strong {
  color: #3498db;
}

.notification-time {
  margin: 0 0 10px 0;
  font-size: 0.8rem;
  color: #bdc3c7;
}

.notification-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.action-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.view-applicants-btn, .mark-all-read-btn {
  background-color: #e74c3c;
  color: white;
  border: 1px solid #c0392b;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-profile-btn {
  background-color: #3498db;
  color: white;
  border: 1px solid #2980b9;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mark-read-btn {
  background-color: #2c3e50;
  color: #bdc3c7;
  border: 1px solid #455a64;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mark-all-read-btn {
  background-color: #2c3e50;
  color: #ecf0f1;
}

.view-applicants-btn:hover, .view-profile-btn:hover, .mark-read-btn:hover, .mark-all-read-btn:hover {
  filter: brightness(110%);
  transform: translateY(-2px);
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #3498db;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #34495e;
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message {
  background-color: #2c3e50;
  color: #e74c3c;
  padding: 15px;
  border: 1px solid #c0392b;
  border-radius: 4px;
  text-align: center;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #bdc3c7;
  text-align: center;
  background-color: #2c3e50;
  border: 1px solid #455a64;
  border-radius: 6px;
}

@media (max-width: 768px) {
  .notifications-container {
    padding: 15px;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .notification-card {
    padding: 12px;
  }
  
  .notification-actions {
    flex-direction: column;
    gap: 8px;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 10px;
  }
  
  .view-applicants-btn, .mark-all-read-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .notifications-container {
    padding: 10px;
  }
  
  .notification-icon {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  
  .icon {
    font-size: 16px;
  }
  
  .notification-text {
    font-size: 0.9rem;
  }
}
</style>