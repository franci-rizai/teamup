<template>
  <div class="login-container">
    <form @submit.prevent="login" class="login-form">
      <h2>Login to TeamUp</h2>
      
      <div class="form-group">
        <label for="username">Username</label>
        <input 
          id="username"
          v-model="username" 
          type="text" 
          placeholder="Enter your username" 
          required 
        />
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input 
          id="password"
          v-model="password" 
          type="password" 
          placeholder="Enter your password" 
          required 
        />
      </div>
      
      <p v-if="errMessage" class="error-message">{{ errMessage }}</p>
      
      <button type="submit" class="login-button">Login</button>
      
      <div class="form-footer">
        <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
      </div>
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
        console.log("Attempting login with:", this.username, this.password);

        const response = await axios.post('http://localhost:3001/login', {
          username: this.username,
          password: this.password
        });

        if (response.data.message === "Login successful") {
          this.errMessage = "";
          localStorage.setItem("authToken", this.username);
          this.$router.push({ name: 'Home' });
        } else {
          this.errMessage = response.data.message;
        }
      } catch (error) {
        console.error("Login error:", error);
        if (error.response && error.response.data && error.response.data.message) {
          this.errMessage = error.response.data.message;
        } else {
          this.errMessage = "An unexpected error occurred";
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
  min-height: 100vh;
  padding: 20px;
  background-color: #1a2530;
}

.login-form {
  width: 100%;
  max-width: 400px;
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

.login-button {
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

.login-button:hover {
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
  .login-form {
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
  
  .login-button {
    padding: 10px;
    font-size: 0.9rem;
  }
}
</style>