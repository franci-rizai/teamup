<template>
    <div class="template">
        <img src="../assets/col.webp" alt="photo of people collaborating">
        <div class="text">
            <h1>Find Your Perfect Project Partner</h1>
            <h2>TeamUp connects individuals with shared interests and skills, making it easy to find collaborators for any project</h2>
            <button>Get Started</button>
        </div>

    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
img{
    width: 80%;
    height: 83.5dvh;
    object-fit: cover;
}

.template{
    display: flex;
    
}
.text{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #121212;
    justify-content: space-evenly;
    color: white
    
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
