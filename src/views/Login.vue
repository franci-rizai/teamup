<template>
    <div class="login-container">
      <form @submit.prevent="login" class="login-form">
        <h2>Login</h2>
        <input v-model="username" type="text" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <p v-if="errMessage" class="error">{{ errMessage }}</p>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        username: "",
        password: "",
        errMessage: ""
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:3001/login', {
            username: this.username,
            password: this.password
          });
          
          // Assuming successful login: handle as needed, e.g., redirect or display success
          if (response.data.message==="Login successful"){
             this.errMessage = ""; // Clear any previous error messages
             localStorage.setItem("authToken",this.username);
            this.$router.push({name: 'Home'})
          }
         else {
        this.errMessage = response.data.message; // Display any server message
     
      }
          
          // Here you could redirect the user or update the state
          // e.g., this.$router.push('/home') if using Vue Router
  
        } catch (error) {
          if (error.response && error.response.data && error.response.data.message) {
            this.errMessage = error.response.data.message; // Show specific message
          } else {
            this.errMessage = "An unexpected error occurred"; // Generic message
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    max-width: 300px;
    width: 100%;
  }
  
  .login-form h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
  
  .login-form input {
    margin-bottom: 15px;
    padding: 10px;
    width: 100%;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .login-form button {
    padding: 10px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .login-form button:hover {
    background-color: #0056b3;
  }
  .error {
    color: red;
    margin-bottom: 10px;
    font-size: 14px;
  }
  </style>
  

  