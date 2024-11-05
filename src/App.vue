<template>
  <div >
    <Headerss />
    <Home/>
    <Howitworks/>
    <Tips/>
    <Testimonials/>
    <Footer/>

</div>
</template>



<script>
// import { defineComponent } from '@vue/composition-api'
import Headerss from './components/Headerss.vue'
import Home from './views/Home.vue'
import Howitworks from './views/Howitworks.vue'
import Tips from './views/Tips.vue'
import Testimonials from './views/Testimonials.vue'
import Footer from './components/Footer.vue'






export default {
  components: { Headerss,Home,Howitworks,Tips,Testimonials,Footer }
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
