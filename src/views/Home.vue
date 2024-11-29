<template>
<div>
    <div class="template">
        <div class="text">
            <h1>Find Your Perfect Project Partner</h1>
            <h2>TeamUp connects individuals with shared interests and skills, making it easy to find collaborators for any project</h2>
            <button>Get Started</button>
        </div>
    </div>
        <Howitworks/>
        <Tips/>
        <Testimonials/>



    </div>
</template>

<script>


import Howitworks from '@/views/Howitworks.vue'
import Tips from '@/views/Tips.vue'
import Testimonials from '@/views/Testimonials.vue'

export default {
    components: {Howitworks,Tips,Testimonials}

}
</script>

<style scoped>
img{
    width: 80%;
    height: 85.5dvh;
    object-fit: cover;
}
.text {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 85vh;
    background: linear-gradient(to bottom, #f8f0e3, #e9dcc6);
    justify-content: space-evenly;
    color: black;
    position: relative;
    padding: 20px;
    border-radius: 0 0 100px 100px; /* Curve only the bottom corners */
    transform: translateY(-20px); /* Move it slightly up */
}

.text h1 {
    font-size: 3em;
    color: rgb(52, 230, 111);
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.text h2 {
    background-color: rgb(255, 255, 255,0.5);
    color: rgb(105, 105, 82);
    
    padding: 10px 20px;
    border-radius: 40px;
    text-align: center;
    font-size: 1.5em;
    line-height: 1.4;
    max-width: 70%;
}

button {
    background: linear-gradient(to right, #adebad, #52c752);
    border: none;
    color: white;
    padding: 0.8em 1.5em;
    font-size: 1.2em;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    
}

button:hover {
    background: linear-gradient(to right, #52c752, #adebad);
    transform: scale(1.05);
   
}



</style>
