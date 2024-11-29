<template>
  <div class="template">
    <div class="nav">
        <h1>Dashboard</h1>
        <ul>

            <li  :class= "{ active: welcomePage === 'Home' }" @click="welcomePage='Home'">Home</li>
            
            <li :class= "{ active: welcomePage === 'Projects' }"  @click=" welcomePage='Projects'">Projects</li>
            <li>Inbox</li>
            <li>Notifications</li>
        </ul>
    </div>
    <div class="Project">

    <div class="info-skills">

  
        <div class="Info">
        <img src="../assets/avatar.png" alt="avatar">
        <div class="name-level">
            <h3>Franci Rizaj</h3>
            <p>Level one</p>
        </div>
        <p>★</p>
        </div>
        <div class="skills">
            <p>Deliver on time ----100%</p>
            <p>Communication Skills ----100%</p>
            <p>Team Spirit ----100%</p>
            <p>Creativity ----100%</p>
        </div>
    </div>

   
    <div class="performance-dash">
       <h1>Performance Overview</h1>
       <div class="performance-info">
        <div class="track">
            <img src="../assets/completed-task.png">
            <div class="num-type">
            <h1>13</h1>
            <p>Total Collaborators Worked With:</p>
        </div>
        </div>
        <div class="track">
            <img src="../assets/completed-task.png">
            <div class="num-type">
            <h1>2</h1>
            <p>Projects Completed</p>
        </div>
        </div>
        <div class="track">
            <img src="../assets/completed-task.png">
            <div class="num-type">
            <h1>17</h1>
            <p>Total Projects Applied </p>
            </div>
        </div>
        
    </div>
</div>
    </div>
  </div>
</template>

<script>
export default {
data(){
    return{
        welcomePage: 'Home'
    }
}
}
</script>

<style scoped>
*{
    margin:0px;
    padding: 0;
    

}

.template{
    
    height: 83vh;
    display: flex;
    justify-content: start;
    align-content: center;
  
   position: relative;
    font-family: Arial, Helvetica, sans-serif;
}
.nav{

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
 
    background-color: #1f1c2e;
    color: white;
  
 
  

   
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

img{
    width: 30px;
    height: 40px;
}

.Info{
    display: flex;
    width: 180px;
   border-right: 1px solid gray;
   height: 40px;

  
    
    
}

.info-skills{
 
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: rgb(241, 241, 241);
    padding: 20px;
    border-radius: 30px;
    box-shadow: 2px 2px 10px;
    
}

.Project{
    margin: 2em;

    margin-left: 5em;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    
width: fit-content;
  

   
   
}

.skills{
    margin-left: 1em;
    display: flex;
    gap:1em
}


.performance-info{
    
    display: flex;
    gap: 3em;

 


}

.performance-dash{
   
    margin-top: 3em;
    padding: 30px;
    border-radius: 30px;
    box-shadow: 2px 2px 10px;
    display: flex;
    justify-content: center;
    align-items: start;
    gap:3em;
    flex-direction: column;
}
.track  {
    
  
    text-align: center;
display: flex;
justify-content: center;
align-items: center;
text-align: start;
gap:1em;
width: 250px;

height: 160px;
border-radius: 30px;
box-shadow: 2px 2px 10px;
color:black;

}

.track img{
    width: 70px;
    height: 80px;
    object-fit: cover;
}

.track p{
    color: rgb(175, 174, 174);
    font-size: 15px;
}

li.active {
  background-color: #4caf50; /* Highlight color */
  color: white;
  font-weight: bold;
}


</style>