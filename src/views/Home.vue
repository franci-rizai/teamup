<template>
<div class="home-container">
    <div class="hero-section">
        <div class="hero-content">
            <h1>Find Your Perfect Project Partner</h1>
            <h2>TeamUp connects individuals with shared interests and skills, making it easy to find collaborators for any project</h2>
            <router-link to="/Project" class="cta-button">Get Started</router-link>
        </div>
    </div>
    <Howitworks/>
    <Tips/>
    <Testimonials/>
    <Footer/>
</div>
</template>

<script>
import Howitworks from '@/views/Howitworks.vue'
import Tips from '@/views/Tips.vue'
import Testimonials from '@/views/Testimonials.vue'
import Footer from '@/components/Footer.vue'

export default {
    components: {Howitworks, Tips, Testimonials, Footer}
}
</script>

<style scoped>
.home-container {
    min-height: 100vh;
    background-color: #1a2530;
}

.hero-section {
    height: 85vh;
    background: linear-gradient(135deg, #2c3e50, #1a2530);
    border-bottom: 1px solid #455a64;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
}

.hero-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('../assets/backg.jpg') center/cover no-repeat;
    opacity: 0.15;
    z-index: 0;
}

.hero-content {
    position: relative;
    z-index: 1;
    max-width: 800px;
    text-align: center;
    padding: 40px;
    background-color: rgba(26, 37, 48, 0.8);
    border-radius: 8px;
    border: 1px solid #455a64;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.hero-content h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    color: #e74c3c;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-content h2 {
    color: #ecf0f1;
    font-size: 1.5rem;
    line-height: 1.5;
    margin-bottom: 30px;
    font-weight: 400;
}

.cta-button {
    background: linear-gradient(to right, #e74c3c, #c0392b);
    color: white;
    padding: 15px 30px;
    font-size: 1.2rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    font-weight: 600;
    text-decoration: none;
    display: inline-block;
}

.cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
    filter: brightness(110%);
}

.cta-button:active {
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
    .hero-section {
        padding: 0 15px;
        height: 75vh;
    }
    
    .hero-content {
        padding: 25px 20px;
        max-width: 90%;
    }
    
    .hero-content h1 {
        font-size: 2rem;
        margin-bottom: 15px;
    }
    
    .hero-content h2 {
        font-size: 1.1rem;
        margin-bottom: 25px;
    }
    
    .cta-button {
        padding: 12px 24px;
        font-size: 1rem;
        width: auto;
    }
}

@media (max-width: 480px) {
    .hero-section {
        height: 70vh;
        padding: 0 10px;
    }
    
    .hero-content {
        padding: 20px 15px;
        max-width: 95%;
    }
    
    .hero-content h1 {
        font-size: 1.6rem;
        margin-bottom: 12px;
        line-height: 1.2;
    }
    
    .hero-content h2 {
        font-size: 0.95rem;
        margin-bottom: 20px;
        line-height: 1.4;
    }
    
    .cta-button {
        padding: 10px 20px;
        font-size: 0.9rem;
        width: 100%;
        max-width: 200px;
    }
}
</style>