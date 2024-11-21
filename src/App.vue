<template>
  <div id="app">
    <Headerss />
    <div class="content">
      <router-view />
    </div>
    
  </div>
</template>




<script>
// import { defineComponent } from '@vue/composition-api'
import Headerss from './components/Headerss.vue'

import Footer from './components/Footer.vue'






export default {
  components: { Headerss,Footer}
}
  
</script>


<style>
body{
  margin:0;
}
#app {

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}



</style>
