<template>
  <div >
    <Headerss />
    <Home/>

</div>
</template>



<script>
// import { defineComponent } from '@vue/composition-api'
import Headerss from './components/Headerss.vue'
import Home from './views/Home.vue'


export default {
  components: { Headerss,Home }
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
