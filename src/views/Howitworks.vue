<template>
  <div class="template">
    <h1>How it works</h1>

  <div class="showcase">
    <div class="fir">
        <h1>Step 1</h1>
        <h1>Create Your Profile</h1>
        <p>Set up a profile that highlights your skills, experience, and areas of interest.
             </p>
    </div>
    <div class="sec">
        <h1>Step 2</h1>
        <h1>Discover Projects and People</h1>
        <p>Browse through a curated list of projects and collaborators.
             Use filters based on skills, interests, or project categories to find the perfect match.
              </p>
    </div>
    <div class="thi">
        <h1>Step 3</h1>
        <h1>Start collaborating</h1>
        <p>Once you find a project or partner, connect directly through the platform. </p>
    </div>
  </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.template{
    
    margin: 5px;
    display: flex;
    flex-direction: column;
}
.showcase{
    margin-top: 2em;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
}
h1{
    font-size: 26px;
}

.showcase div{
    width: 350px;
    height: 350px;
    border-radius: 10px;
    border: 1px solid;
    display: flex;
    flex-direction: column;
    
    align-items: center;
    justify-content: start;
}
.showcase div p{
    
    width:350px;
    text-align: center;
}

</style>