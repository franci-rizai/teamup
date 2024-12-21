<template>
    <div class="template">

        <div class="left-side">
            <div class="profile">
                <img src="../assets/avatar.png">
                <h2>John Doe</h2>
                <p>Full Stack Developer</p>
                <p>Bay Area, San Fransisco, CA</p>
                
                <button>
                    Message
                </button>
            </div>
            <div class="links">
                <div>
                    <p>&nbsp; 1. Website</p>
                    <p>Franciwebdev.site &nbsp; </p>
                </div>
                <div>
                    <p>&nbsp; 2. Github</p>
                    <p>Github.site &nbsp;</p>
                </div>
                <div>
                    <p>&nbsp; 3. Linkedin</p>
                    <p>Linkedin.site &nbsp;</p>
                </div>

            </div>
        </div>

        <div class="right-side">
            <div class="personal-info">
                <div>
                    <h2>Full Name</h2>
                    <p> John Doe </p>
                </div>
                <div>
                    <h2>Email</h2>
                    <p> John@gmail.com</p>
                </div>
                <div>
                    <h2>Date of Birth</h2>
                    <p> 16th of september 2002 </p>
                </div>
                <div>
                    <h2>Gender</h2>
                    <p> Male </p>
                </div>

            </div>

            <div class="project-skills">
                <div class="desc">
                    <h1>Self intoduction</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, ratione dolorum! Expedita, quia enim sed, maxime magnam porro velit totam cum maiores quas optio aliquam hic aliquid nobis nihil dolores?
                    </p>

                </div>
                <div class="skills">
                    <h1>Top Skills</h1>
                    <p>Web desing</p>
                    <p>Web desing</p>
                    <p>Web desing</p>
                    <p>Web desing</p>
                </div>
            </div>
        </div>
        <router-link class="edit-profile" to="/CreateProfile">Edit Profile</router-link>
    </div>
  
</template>

<script>
export default {

}
</script>

<style scoped>
.project-skills{
    display: flex;
    margin-top: 1em;
    gap: 1em;
    justify-content: space-between;
    align-items: center;
}
.desc{
    background-color: white;
    width: 50%;
    aspect-ratio: 16/8;
}

.skills{
    background-color: white;
    width: 50%;
    aspect-ratio: 16/8;
}
.left-side{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

img{
    width: 140px;
    border-radius: 100%;
    margin-top: 15px;

}

.template{
    margin-top: 2em;
    display: flex;
    justify-content: space-around;
    align-items: start;
    
}

.profile p{
    color: gray;
    margin: 7px;
}

.profile button{
margin:auto;
background: beige;
border: none ;
padding: 10px;
font-size: 20px;
color: rgb(97, 165, 97);
letter-spacing: 1px;
}

.profile{
background: white;
display: flex;
flex-direction: column;
align-items: center;
width: 350px;
aspect-ratio: 16/17;
text-align: center;

box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.links{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: white;
    margin-top: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    width:350px;
   
}
.links div{
    
display: flex;
display: flex;
    justify-content: space-between
    ;
    width: 100%;
   height: 45px;
   font-size: 18px;
  
   
   font-family: 'Times New Roman', Times, serif;
    align-items: center;
    border-bottom: 1px solid gray;
    
}


.personal-info{
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    background-color: white;
    
}

.right-side{
    
    width:70%;
    
}
.personal-info div{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    
    

}
.personal-info div p{
    text-align: left;
   
    width: 70%;

}


</style>