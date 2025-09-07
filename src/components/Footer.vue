<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section about">
        <h2 class="logo">Team<span>Up</span></h2>
        <p>
          TeamUp is a platform that connects individuals with shared interests and skills,
          making it easy to find collaborators for any project.
        </p>
        <div class="social-icons">
          <a href="#" class="social-icon"><i class="fab fa-facebook"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-linkedin"></i></a>
        </div>
      </div>

      <div class="footer-section links">
        <h2>Quick Links</h2>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/Project">Projects</router-link></li>
          <li><router-link to="/signup">Sign Up</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
        </ul>
      </div>

      <div class="footer-section contact">
        <h2>Contact Us</h2>
        <div class="contact-info">
          <div class="contact-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>123 Innovation Street, Tech City</span>
          </div>
          <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <span>info@teamup.com</span>
          </div>
          <div class="contact-item">
            <i class="fas fa-phone"></i>
            <span>+1 234 567 8900</span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2023 TeamUp. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background-color: #1a2530;
  color: #ecf0f1;
  padding: 50px 0 0 0;
  border-top: 1px solid #455a64;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-section {
  flex: 1;
  min-width: 250px;
  margin-bottom: 30px;
  padding: 0 15px;
}

.about .logo {
  color: #ecf0f1;
  font-size: 1.8rem;
  margin-bottom: 15px;
}

.about .logo span {
  color: #e74c3c;
}

.about p {
  color: #bdc3c7;
  line-height: 1.6;
  margin-bottom: 20px;
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #2c3e50;
  border-radius: 50%;
  color: #ecf0f1;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background-color: #e74c3c;
  transform: translateY(-3px);
}

.links h2, .contact h2 {
  color: #ecf0f1;
  font-size: 1.4rem;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 10px;
}

.links h2::after, .contact h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 2px;
  background-color: #e74c3c;
}

.links ul {
  list-style: none;
  padding: 0;
}

.links ul li {
  margin-bottom: 15px;
}

.links ul li a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s ease;
}

.links ul li a:hover {
  color: #e74c3c;
  padding-left: 5px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-item i {
  color: #e74c3c;
  font-size: 1.2rem;
}

.contact-item span {
  color: #bdc3c7;
}

.footer-bottom {
  background-color: #15202b;
  text-align: center;
  padding: 20px 0;
  margin-top: 30px;
}

.footer-bottom p {
  color: #95a5a6;
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }
  
  .footer-section {
    margin-bottom: 30px;
  }
}
</style>