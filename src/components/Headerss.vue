<template>
    <div class="header">
  <img src="../assets/logo.png" >

  <ul>
    <li>Home</li>
    <li>Projects</li>
    <li>Home</li>
    <li>Dashboard</li>
    <li>Profile</li>
    <li>Create Project</li>
    <li>N</li>
    
  </ul>

</div>

</template>

<script>

export default {

}
</script>

<style>

.header{
 padding-left: 5em;
 margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom:1px solid rgb(210, 209, 209);
padding-bottom: 1em;
}
.header img{
  width: 100px;
  
}
ul{
  
   list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2em;
  padding-right: 5em;
}
</style>