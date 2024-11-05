<template>
    <div class="testimonials">
      <h1>What Our Users Say</h1>
      <div class="testimonial-cards">
        <div class="testimonial">
          <p class="quote">"TeamUp made it so easy to find the perfect collaborators!"</p>
          <h2 class="name">Alex M.</h2>
          <p class="title">Web Developer</p>
        </div>
        <div class="testimonial">
          <p class="quote">"The best platform for connecting with talented people."</p>
          <h2 class="name">Jamie L.</h2>
          <p class="title">Marketing Specialist</p>
        </div>
        <div class="testimonial">
          <p class="quote">"Working together on TeamUp has been a game-changer for our startup."</p>
          <h2 class="name">Taylor P.</h2>
          <p class="title">Project Manager</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
  };
  </script>
  
  <style scoped>
  .testimonials {
    margin: 5px;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  
  .testimonials h1 {
    font-size: 26px;
    margin-bottom: 20px;
  }
  
  .testimonial-cards {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 20px;
  }
  
  .testimonial {
    width: 300px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .testimonial .quote {
    font-style: italic;
    margin-bottom: 15px;
  }
  
  .testimonial .name {
    font-weight: bold;
    margin: 5px 0;
  }
  
  .testimonial .title {
    color: #666;
    font-size: 0.9em;
  }
  </style>
  