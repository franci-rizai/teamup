<template>
  <div class="header">
    <img src="../assets/logo.png" alt="Logo">

    <ul>
      <li><router-link class="router" to="/">Home</router-link></li>  
      <li><router-link class="router" to="/Project">Projects</router-link></li>  
     
      <li><router-link class="router" to="/Dashboard">Dashboard</router-link></li>  
    <li><router-link class="router" to="/Profile">Profile</router-link></li>  
     
      <li><router-link class="router" to="/CreateProject">Create Project</router-link></li>
     <li  v-if="!isLoggedIn" ><button @click="goToSignup">Sign up</button></li>
      <li>
        <button @click="handleButtonClick">{{ SituationLog }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false, // Assume initially not logged in
      SituationLog: 'Login',
    };
  },
  mounted() {
    // Check login status when the component is mounted
    this.isLoggedIn = !!localStorage.getItem('authToken'); // Update based on token presence
    this.updateButtonLabel();
  },
  watch: {
    $route() {
      // Update login status when route changes
      this.isLoggedIn = !!localStorage.getItem('authToken');
      this.updateButtonLabel();
    }
  },
  methods: {
    updateButtonLabel() {
      this.SituationLog = this.isLoggedIn ? 'Logout' : 'Login';
    },
    handleButtonClick() {
      if (this.isLoggedIn) {
        this.logout();
      } else {
        this.PushToLogin();
      }
    },
    logout() {
      localStorage.clear();
      this.isLoggedIn = false;
      this.updateButtonLabel();
      this.$router.push('/login');
    },
    PushToLogin() {
      this.$router.push('/login');
    },
    goToSignup() {
      this.$router.push('/signup');
    },
  },
};
</script>

<style scoped>
.header {
  padding: 12px 25px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  border-bottom: 1px solid #455a64;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header img {
  width: 140px;
  height: auto;
  filter: brightness(1.1);
}

.router {
  text-decoration: none;
  color: #ecf0f1;
  font-weight: 500;
  position: relative;
  padding: 5px 0;
}

.router:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: #e74c3c;
  transition: width 0.2s ease;
}

.router:hover:after {
  width: 100%;
}

.router-link-active {
  color: #e74c3c;
  font-weight: 600;
}

.router-link-active:after {
  width: 100%;
}

ul {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 1.2em;
  padding: 0;
  margin: 0;
}

ul li {
  font-size: 15px;
  padding: 6px 10px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

ul li:hover {
  background-color: #34495e;
}

button {
  background-color: #e74c3c;
  border: 1px solid #c0392b;
  border-radius: 4px;
  font-size: 15px;
  color: white;
  font-weight: 600;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

button:hover {
  filter: brightness(110%);
}

button:active {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    padding: 10px;
  }
  
  ul {
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 12px;
    gap: 0.8em;
  }
  
  .header img {
    width: 110px;
  }
  
  ul li {
    font-size: 14px;
    padding: 5px 8px;
  }
  
  button {
    font-size: 14px;
    padding: 6px 12px;
  }
}

@media (max-width: 480px) {
  ul {
    flex-direction: column;
    width: 100%;
  }
  
  ul li {
    width: 100%;
    text-align: center;
  }
  
  .router {
    display: block;
    width: 100%;
  }
}
</style>