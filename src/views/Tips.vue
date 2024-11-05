<template>
    
  <div class="template">
    <h1> Tips for TeamUP</h1>
    <div>
        <img src="../assets/profile.png" alt="Profile making">
        <p> <strong>Build A Complete Profile</strong><br><br> <br>Make sure to list your skills, experience, and project interests clearly so that others can understand your expertise at a glance.</p>
    </div>
    <div>
       
        <p><strong>Set Clear Goals</strong><br><br> <br>Make sure to list your skills, experience, and project interests clearly so that others can understand your expertise at a glance.</p>
        <img src="../assets/goals.png" alt="Profile making">
    </div>
    <div>
        <img src="../assets/proactive.webp" alt="Profile making">
        <p><strong>Be Proactive</strong><br><br> <br>Think about the kind of projects or partners you’re looking for, and specify this in your profile or project descriptions.</p>
    </div>
    <div>
        <p><strong>Use Keywords</strong><br><br> <br>When creating a project or looking for partners, use keywords that are relevant to the industry or skill set you need.</p>
        <img src="../assets/keywords.webp" alt="Profile making">
    </div>
    <div>
        <img src="../assets/comm.png" alt="Profile making">
        <p><strong>Communicate Effectively</strong><br><br> <br>Send a personalized message when reaching out, highlighting why you think you’d be a good fit for their project or why they’d be ideal for yours.</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
img{
    width: 200px;
}

.template{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5em;
}

.template div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15em;
}

p{
    width: 400px;
    font-size: 20px;
}

</style>