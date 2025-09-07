<template>
  <div class="how-it-works">
    <h1 class="section-title">How It Works</h1>

    <div class="steps-container">
      <div class="step-card">
        <div class="step-number">1</div>
        <h2>Create Your Profile</h2>
        <p>Set up a profile that highlights your skills, experience, and areas of interest.</p>
        <router-link to="/CreateProfile" class="step-button">Create Profile</router-link>
      </div>
      
      <div class="step-card">
        <div class="step-number">2</div>
        <h2>Discover Projects and People</h2>
        <p>Browse through a curated list of projects and collaborators. Use filters based on skills, interests, or project categories to find the perfect match.</p>
        <router-link to="/Project" class="step-button">Browse Projects</router-link>
      </div>
      
      <div class="step-card">
        <div class="step-number">3</div>
        <h2>Start Collaborating</h2>
        <p>Once you find a project or partner, connect directly through the platform.</p>
        <router-link to="/signup" class="step-button">Join Now</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.how-it-works {
  padding: 60px 20px;
  background-color: #1a2530;
}

.section-title {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 50px;
  color: #ecf0f1;
  position: relative;
  padding-bottom: 15px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: #e74c3c;
}

.steps-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.step-card {
  background-color: #2c3e50;
  border: 1px solid #455a64;
  border-radius: 6px;
  padding: 30px;
  width: 300px;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.step-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.step-number {
  background-color: #e74c3c;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.step-card h2 {
  color: #ecf0f1;
  font-size: 1.4rem;
  margin-bottom: 15px;
}

.step-card p {
  color: #bdc3c7;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
}

.step-button {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  display: inline-block;
  margin-top: auto;
}

.step-button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .how-it-works {
    padding: 40px 15px;
  }
  
  .section-title {
    font-size: 1.8rem;
    margin-bottom: 30px;
  }
  
  .steps-container {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .step-card {
    width: 100%;
    max-width: 350px;
    padding: 25px 20px;
    min-height: 280px;
  }
  
  .step-card h2 {
    font-size: 1.2rem;
  }
  
  .step-card p {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .how-it-works {
    padding: 30px 10px;
  }
  
  .section-title {
    font-size: 1.6rem;
    margin-bottom: 25px;
  }
  
  .step-card {
    padding: 20px 15px;
    min-height: 250px;
  }
  
  .step-number {
    width: 35px;
    height: 35px;
    font-size: 1.3rem;
    margin-bottom: 15px;
  }
  
  .step-card h2 {
    font-size: 1.1rem;
    margin-bottom: 12px;
  }
  
  .step-card p {
    font-size: 0.9rem;
    margin-bottom: 15px;
  }
  
  .step-button {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
}
</style>