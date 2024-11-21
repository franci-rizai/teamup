<template>
  <div class="template">
    <div class="nav">
        <h1>Dashboard</h1>
        <ul>

            <li>Home</li>
            <li>Projects</li>
            <li>Inbox</li>
            <li>Notifications</li>
        </ul>
    </div>
    <div class="Project">

    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
*{
    margin:0px;
    padding: 0;

}

.template{
   position: relative;
    font-family: Arial, Helvetica, sans-serif;
}
.nav{
position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
   
    background-color: #1f1c2e;
    color: white;
    left: 0;
  bottom: 0;
  top:116px;
  
  z-index: 1321;
    width:max-content;
   padding: 30px;
    

}

.nav ul{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    
    padding: 30px;
    
    
}

</style>