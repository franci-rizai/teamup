<template>
  <div class="tips-section">
    <h1 class="section-title">Tips for TeamUP</h1>
    
    <div class="tips-container">
      <div class="tip-card">
        <div class="tip-image">
          <img src="../assets/profile.png" alt="Profile making">
        </div>
        <div class="tip-content">
          <h2>Build A Complete Profile</h2>
          <p>Make sure to list your skills, experience, and project interests clearly so that others can understand your expertise at a glance.</p>
        </div>
      </div>
      
      <div class="tip-card reverse">
        <div class="tip-image">
          <img src="../assets/goals.png" alt="Setting goals">
        </div>
        <div class="tip-content">
          <h2>Set Clear Goals</h2>
          <p>Think about the kind of projects or partners you're looking for, and specify this in your profile or project descriptions.</p>
        </div>
      </div>
      
      <div class="tip-card">
        <div class="tip-image">
          <img src="../assets/proactive.webp" alt="Being proactive">
        </div>
        <div class="tip-content">
          <h2>Be Proactive</h2>
          <p>Don't wait for others to find you. Reach out to potential collaborators whose skills complement yours.</p>
        </div>
      </div>
      
      <div class="tip-card reverse">
        <div class="tip-image">
          <img src="../assets/keywords.webp" alt="Using keywords">
        </div>
        <div class="tip-content">
          <h2>Use Keywords</h2>
          <p>When creating a project or looking for partners, use keywords that are relevant to the industry or skill set you need.</p>
        </div>
      </div>
      
      <div class="tip-card">
        <div class="tip-image">
          <img src="../assets/comm.png" alt="Communication">
        </div>
        <div class="tip-content">
          <h2>Communicate Effectively</h2>
          <p>Send a personalized message when reaching out, highlighting why you think you'd be a good fit for their project or why they'd be ideal for yours.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.tips-section {
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

.tips-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;
}

.tip-card {
  display: flex;
  background-color: #2c3e50;
  border: 1px solid #455a64;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.tip-card.reverse {
  flex-direction: row-reverse;
}

.tip-image {
  flex: 0 0 200px;
  background-color: #34495e;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.tip-image img {
  max-width: 100%;
  max-height: 150px;
  object-fit: contain;
}

.tip-content {
  flex: 1;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tip-content h2 {
  color: #e74c3c;
  margin: 0 0 15px 0;
  font-size: 1.4rem;
}

.tip-content p {
  color: #ecf0f1;
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .tips-section {
    padding: 40px 15px;
  }
  
  .section-title {
    font-size: 1.8rem;
    margin-bottom: 35px;
  }
  
  .tips-container {
    gap: 25px;
  }
  
  .tip-card, .tip-card.reverse {
    flex-direction: column;
  }
  
  .tip-image {
    flex: 0 0 auto;
    padding: 15px;
    min-height: 120px;
  }
  
  .tip-image img {
    max-height: 100px;
  }
  
  .tip-content {
    padding: 20px;
  }
  
  .tip-content h2 {
    font-size: 1.2rem;
  }
  
  .tip-content p {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .tips-section {
    padding: 30px 10px;
  }
  
  .section-title {
    font-size: 1.6rem;
    margin-bottom: 25px;
  }
  
  .tips-container {
    gap: 20px;
  }
  
  .tip-image {
    padding: 12px;
    min-height: 100px;
  }
  
  .tip-image img {
    max-height: 80px;
  }
  
  .tip-content {
    padding: 15px;
  }
  
  .tip-content h2 {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }
  
  .tip-content p {
    font-size: 0.85rem;
    line-height: 1.5;
  }
}
</style>