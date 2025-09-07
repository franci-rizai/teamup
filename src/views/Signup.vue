<template>
  <div class="signup-container">
    <form @submit.prevent="signup" class="signup-form">
      <h2>Create an Account</h2>
      
      <div class="form-group">
        <label for="username">Username</label>
        <input 
          id="username"
          v-model="username" 
          type="text" 
          placeholder="Choose a username" 
          required 
        />
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          id="email"
          v-model="email" 
          type="email" 
          placeholder="Enter your email" 
          required 
        />
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input 
          id="password"
          v-model="password" 
          type="password" 
          placeholder="Create a password" 
          required 
        />
      </div>
      
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input 
          id="confirmPassword"
          v-model="confirmPassword" 
          type="password" 
          placeholder="Confirm your password" 
          required 
        />
      </div>
      
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      
      <button type="submit" class="signup-button">Sign Up</button>
      
      <div class="form-footer">
        <p>Already have an account? <router-link to="/login">Login</router-link></p>
      </div>
    </form>
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
      errorMessage: ''
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

        this.errorMessage = response.data.message;
        
        // If signup was successful, redirect to login
        if (response.data.message === "Signup successful") {
          setTimeout(() => {
            this.$router.push('/login');
          }, 1500);
        }
      } catch (error) {
        console.error("Unexpected error during signup:", error);

        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = "An unexpected error occurred";
        }
      }
    }
  }
}
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #1a2530;
}

.signup-form {
  width: 100%;
  max-width: 450px;
  padding: 30px;
  background-color: #2c3e50;
  border-radius: 6px;
  border: 1px solid #455a64;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #ecf0f1;
  font-size: 1.8rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #ecf0f1;
  font-weight: 500;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 12px;
  background-color: #34495e;
  border: 1px solid #455a64;
  border-radius: 4px;
  color: #ecf0f1;
  font-size: 1rem;
  transition: all 0.2s ease;
}

input:focus {
  border-color: #e74c3c;
  outline: none;
  box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
}

.signup-button {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  background-color: #e74c3c;
  color: white;
  border: 1px solid #c0392b;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.signup-button:hover {
  filter: brightness(110%);
}

.error-message {
  color: #e74c3c;
  margin: 10px 0;
  font-size: 0.9rem;
  text-align: center;
}

.form-footer {
  margin-top: 20px;
  text-align: center;
  color: #bdc3c7;
  font-size: 0.9rem;
}

.form-footer a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.form-footer a:hover {
  color: #e74c3c;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .signup-form {
    padding: 20px;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  input {
    padding: 10px;
    font-size: 0.9rem;
  }
  
  .signup-button {
    padding: 10px;
    font-size: 0.9rem;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
}
</style>