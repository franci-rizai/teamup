<template>
  <form @submit.prevent="CreateProj()">
    <input type="text" placeholder="Title" v-model="title" >
    <input type="textarea" placeholder="Description" v-model="description" >
    <input type="text" placeholder="category" v-model="category" >
    <input type="text" placeholder="Tags" v-model="tempTag" @keydown="AddTag">


    <div v-for="tag in tags" :key="tag" >
        {{ tag }}
    </div>
    <input type="text" placeholder="Requirements" v-model="TempRequirement" @keydown="AddRequirement">
    <div v-for="req in requirements" :key="req" >
        {{ req }}
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            title:"",
            description:"",
            category:"",
            tags: [],
            tempTag:"",
            requirements: [],
            TempRequirement:""

        }
    },
    methods:{
        AddTag(e) {
    if (e.key === ',' && this.tempTag) {
        if (!this.tags.includes(this.tempTag)) {
            this.tags.push(this.tempTag.trim());
        }
        this.tempTag = '';
    }
},
AddRequirement(e) {
    if (e.key === ',' && this.TempRequirement) {
        if (!this.requirements.includes(this.TempRequirement)) {
            this.requirements.push(this.TempRequirement.trim());
        }
        this.TempRequirement = '';
    }
},
       async CreateProj(){

        try{

            const response = await axios.post('http://localhost:3001/CreateProject',{

                title: this.title,
                description: this.description,
                category: this.category,
                tags: this.tags,
                requirements: this.requirements
            })

            console.log('Project created:', response.data);
            alert('Project created successfully!');

        }catch(error){
            console.log(response.data.message);
        }


        }

    }

}
</script>

<style scoped>
/* General Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Form Container */
form {
  width: 100%;
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

/* Input Fields */
input[type="text"],
input[type="textarea"] {
  width: 100%;
  padding: 10px 15px;
  margin: 10px 0;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="textarea"]:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.25);
}

/* Tags and Requirements */
div {
  margin: 5px 0;
  padding: 5px;
  display: inline-block;
  background-color: #e9ecef;
  border-radius: 4px;
  font-size: 14px;
  color: #495057;
}

/* Submit Button */
button {
  width: 100%;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #0056b3;
  transform: scale(1.02);
}

button:active {
  background-color: #004085;
  transform: scale(0.98);
}

/* Mobile Responsiveness */
@media (max-width: 600px) {
  form {
    padding: 15px;
  }

  button {
    font-size: 16px;
  }
}
</style>
