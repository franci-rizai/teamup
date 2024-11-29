<template>
  <div class="header">
    <img src="../assets/logo.png" alt="Logo">

    <ul>
      <li><router-link class="router" to="/">Home</router-link></li>  
      <li><router-link class="router" to="/Project">Projects</router-link></li>  
     
      <li><router-link class="router" to="/Dashboard">Dashboard</router-link></li>  
    <li><router-link class="router" to="/Profile">Profile</router-link></li>  
     
      <li><router-link class="router" to="/CreateProject">Create Project</router-link></li>
     <li  v-if="!isLoggedIn" ><button>Sign up</button></li>
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
    },
    PushToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.header {
  padding-left: 5em;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(210, 209, 209);
  background-color: beige;
  padding-bottom: 1em;
}
.header img {
  width: 170px;
}

.router{
  text-decoration: none;
  color:rgb(0, 0, 0);
  
}
ul {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2em;
  padding-right: 5em;
}


ul li{
 
  font-family: arial;
  font-size: 18px;
  padding: 10px;
  
  
}

ul li:hover{
  background-color: rgb(167, 240, 167);
  
  border-radius: 10px;
  

}

button{
background-color: white;
border: none;
border-radius: 5px;
font-size: 20px;
color:rgb(125, 235, 125);
font-weight: bold;
font-style: italic;
padding: 10px;

cursor: pointer;
  
}
</style>
