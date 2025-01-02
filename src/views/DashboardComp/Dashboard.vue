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
    <div v-if="welcomePage === 'Projects'">
      <ProjectDash />
    </div>
    

  </div>
</template>

<script>
import HomeDash from '@/views/DashboardComp/HomeDash.vue'
import ProjectDash from '@/views/DashboardComp/ProjectDash.vue';
export default {
    components: {
    HomeDash,ProjectDash // Register it here
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
.template {
  display: flex;
  flex-direction: row;
  height: 100vh; /* Full viewport height */
  width: 100%; /* Full width */
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  flex: 1; /* Take up all remaining space */
}

.template > div:not(.nav) {
  flex: 1;
  
  height: 100%; 
  display: flex;
  flex-direction: column;
}
.nav {
  width: 250px;
  flex-shrink: 0;
  height: 100%;
  background-color: #1f1c2e;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
}

.nav ul {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1em;
  list-style-type: none;
  padding: 30px;
}

.nav ul li {
  width: 100%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  cursor: pointer;
}


li.active{
    background-color: lightgreen;
}

li:hover{
    background-color: rgb(131, 168, 131);
}


</style>