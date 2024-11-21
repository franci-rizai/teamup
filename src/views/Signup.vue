<template>
    <div class="signup">
      <h1>Sign Up</h1>
      <form @submit.prevent="signup">
        <input v-model="username" type="text" placeholder="Username" required />
        <input v-model="email" type="email" placeholder="E-mail" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required />
        <button type="submit">Sign Up</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <router-link :to="{ name: 'Login' }">Login</router-link>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errorMessage: ''  // Store error messages here
      }
    },
    methods: {
      async signup() {
        
        // Check if passwords match
        if (this.password !== this.confirmPassword) {
          this.errorMessage = "Passwords do not match";
          return;
        }
  
        try {
          const response = await axios.post('http://localhost:3001/signup', {
            username: this.username,
            email: this.email,
            password: this.password
          });
  
          // Display the success message returned from the server
        
          this.errorMessage = response.data.message;  // Clear error messages on success
        } // In your signup method, handle the error message
catch (error) {
  // Log full error details to the console for debugging
  console.error("Unexpected error during signup:", error);

  // Check if server returned a specific error message
  if (error.response && error.response.data && error.response.data.message) {
    this.errorMessage = error.response.data.message;  // Show specific message
  } else {
    this.errorMessage = "An unexpected error occurred";  // Generic message
  }
}

      }
    }
  }
  </script>
  
  <style scoped>
  .signup {
    max-width: 400px;
    margin: 50px auto;
    text-align: center;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  input {
    padding: 10px;
    font-size: 16px;
    margin: 8px 0;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  