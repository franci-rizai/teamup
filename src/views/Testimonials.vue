<template>
  <div class="testimonials-section">
    <h1 class="section-title">What Our Users Say</h1>
    
    <div class="testimonial-cards">
      <div class="testimonial-card">
        <div class="quote-icon">"</div>
        <p class="quote-text">TeamUp made it so easy to find the perfect collaborators!</p>
        <div class="user-info">
          <div class="avatar">AM</div>
          <div class="user-details">
            <h3>Alex M.</h3>
            <p>Web Developer</p>
          </div>
        </div>
      </div>
      
      <div class="testimonial-card">
        <div class="quote-icon">"</div>
        <p class="quote-text">The best platform for connecting with talented people.</p>
        <div class="user-info">
          <div class="avatar">JL</div>
          <div class="user-details">
            <h3>Jamie L.</h3>
            <p>Marketing Specialist</p>
          </div>
        </div>
      </div>
      
      <div class="testimonial-card">
        <div class="quote-icon">"</div>
        <p class="quote-text">Working together on TeamUp has been a game-changer for our startup.</p>
        <div class="user-info">
          <div class="avatar">TP</div>
          <div class="user-details">
            <h3>Taylor P.</h3>
            <p>Project Manager</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.testimonials-section {
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

.testimonial-cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.testimonial-card {
  background-color: #2c3e50;
  border: 1px solid #455a64;
  border-radius: 6px;
  padding: 30px;
  width: 300px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.quote-icon {
  font-size: 4rem;
  color: #e74c3c;
  line-height: 1;
  margin-bottom: 10px;
  font-family: Georgia, serif;
  opacity: 0.7;
}

.quote-text {
  color: #ecf0f1;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
  font-style: italic;
}

.user-info {
  display: flex;
  align-items: center;
  margin-top: 20px;
  border-top: 1px solid #455a64;
  padding-top: 20px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e74c3c;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
  font-size: 1.2rem;
}

.user-details h3 {
  color: #ecf0f1;
  margin: 0 0 5px 0;
  font-size: 1.1rem;
}

.user-details p {
  color: #bdc3c7;
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .testimonials-section {
    padding: 40px 15px;
  }
  
  .section-title {
    font-size: 1.8rem;
    margin-bottom: 35px;
  }
  
  .testimonial-cards {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .testimonial-card {
    width: 100%;
    max-width: 350px;
    padding: 25px;
  }
  
  .quote-text {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .testimonials-section {
    padding: 30px 10px;
  }
  
  .section-title {
    font-size: 1.6rem;
    margin-bottom: 25px;
  }
  
  .testimonial-cards {
    gap: 15px;
  }
  
  .testimonial-card {
    padding: 20px 15px;
    max-width: 100%;
  }
  
  .quote-icon {
    font-size: 2.5rem;
    margin-bottom: 8px;
  }
  
  .quote-text {
    font-size: 0.9rem;
    margin-bottom: 15px;
    line-height: 1.5;
  }
  
  .user-info {
    margin-top: 15px;
    padding-top: 15px;
  }
  
  .avatar {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
    margin-right: 12px;
  }
  
  .user-details h3 {
    font-size: 0.95rem;
  }
  
  .user-details p {
    font-size: 0.8rem;
  }
}
</style>