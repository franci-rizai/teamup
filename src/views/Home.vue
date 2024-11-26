<template>
<div>
    <div class="template">
        <img src="@/assets/col.webp" alt="photo of people collaborating">
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

.template{
    display: flex;
    
}
.text{
    display: flex;
    flex-direction: column;
    align-items: center;
    
    background-image: url(../assets/backg_beige.avif);
    background-position: center;
    background-repeat: no-repeat;
  background-size: cover;
  
    justify-content: space-evenly;
    color: black;
    
}

.text h1{
    font-size: 2.5em;
   color:white;
    background-color: black;

   padding: 5px;
    margin-top: -15px;
    

}

.text h2{
    background-color:black;
    color: beige;
    padding: 10px;
}
button{
    background-color: aliceblue;
    border: none;
    padding: 0.5em;
    font-size: 25px;
   border-radius: 10px;
   cursor: pointer;

}

</style>
