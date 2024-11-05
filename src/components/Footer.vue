<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section about">
          <h2>About TeamUp</h2>
          <p>TeamUp is a platform dedicated to connecting professionals, students, and hobbyists to collaborate on exciting projects. Join us and find your perfect team today!</p>
        </div>
        <div class="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Collaborators</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div class="footer-section social">
          <h2>Follow Us</h2>
          <div class="social-icons">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-linkedin-in"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 TeamUp. All rights reserved.</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .footer {
    background-color: #333;
    color: #f9f9f9;
    padding: 20px;
    font-size: 14px;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }
  
  .footer-section {
    width: 30%;
  }
  
  .footer-section h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .footer-section p, .footer-section ul {
    font-size: 14px;
    line-height: 1.6;
  }
  
  .footer-section ul {
    list-style-type: none;
    padding: 0;
  }
  
  .footer-section ul li a {
    color: #f9f9f9;
    text-decoration: none;
  }
  
  .footer-section ul li a:hover {
    color: #ddd;
  }
  
  .social-icons a {
    color: #f9f9f9;
    font-size: 18px;
    margin-right: 10px;
    text-decoration: none;
  }
  
  .footer-bottom {
    text-align: center;
    padding: 10px 0;
    border-top: 1px solid #555;
    margin-top: 10px;
  }
  
  .footer-bottom p {
    margin: 0;
  }
  </style>
  