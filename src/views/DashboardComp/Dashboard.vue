<template>
  <div class="template">
    <div class="nav">
        <h1>Dashboard</h1>
        <ul>

            <li  :class= "{ active: welcomePage === 'Home' }" @click="welcomePage='Home'">Home</li>
            
            <li :class= "{ active: welcomePage === 'Projects' }"  @click=" welcomePage='Projects'">Projects</li>
            <li :class= "{ active: welcomePage === 'Inbox' }"  @click=" welcomePage='Inbox'">Inbox</li>
            <li :class= "{ active: welcomePage === 'Notifications' }"  @click=" welcomePage='Notifications'">Notifications</li>
        </ul>
    </div>
    
    
    <div v-if="welcomePage === 'Home'">
      <HomeDash />
    </div>
    

  </div>
</template>

<script>
import HomeDash from '@/views/DashboardComp/HomeDash.vue'
export default {
    components: {
    HomeDash, // Register it here
  },
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
    gap: 5em;
  
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
  gap: 1em;
    list-style-type: none;
    padding: 30px;
  
    
}
.nav ul li{
    width: 120%;
    height: 35px;
    line-height: 35px;
    cursor: pointer;

}

li.active{
    background-color: lightgreen;
}

li:hover{
    background-color: rgb(131, 168, 131);
}


</style>