<template>
  <div>
    <h1>Team Forum</h1>
    
    <div style="margin-bottom: 20px;">
      <button 
        v-for="(project, index) in projects" 
        :key="index"
        style="margin-right: 10px; margin-bottom: 10px; padding: 8px 15px; background-color: #34495e; border: 1px solid #455a64; border-radius: 20px; color: white; cursor: pointer;"
        :style="{ backgroundColor: selectedProject === index ? '#3498db' : '#34495e' }"
        @click="selectedProject = index"
      >
        {{ project.title }}
      </button>
    </div>
    
    <div v-if="selectedProject !== null" style="background-color: #2c3e50; border-radius: 8px; border: 1px solid #455a64; padding: 20px;">
      <div v-for="(message, index) in projects[selectedProject].messages" :key="index" style="background-color: #34495e; border-radius: 8px; padding: 15px; margin-bottom: 15px; border: 1px solid #455a64;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <div style="font-weight: bold;">{{ message.author }}</div>
          <div style="color: #bdc3c7; font-size: 0.8rem;">{{ message.time }}</div>
        </div>
        <div style="color: #bdc3c7;">{{ message.content }}</div>
      </div>
      
      <div style="margin-top: 20px; display: flex;">
        <textarea 
          placeholder="Write your message here..." 
          style="flex: 1; padding: 10px; background-color: #34495e; border: 1px solid #455a64; border-radius: 4px; color: white; min-height: 80px;"
        ></textarea>
        <button style="margin-left: 10px; background-color: #3498db; color: white; border: none; padding: 0 20px; border-radius: 4px; cursor: pointer;">Send</button>
      </div>
    </div>
    
    <div v-else style="background-color: #2c3e50; border-radius: 8px; border: 1px solid #455a64; padding: 40px; text-align: center; color: #bdc3c7;">
      Select a project to view the forum
    </div>
  </div>
</template>

<script>
export default {
  name: 'Inbox',
  data() {
    return {
      selectedProject: null,
      projects: [
        {
          title: "Web Development Project",
          messages: [
            { author: "John", time: "Today, 10:30 AM", content: "I've completed the frontend components. Ready for review!" },
            { author: "Sarah", time: "Today, 11:15 AM", content: "Great work! I'll check it out this afternoon." }
          ]
        },
        {
          title: "Mobile App Design",
          messages: [
            { author: "Mike", time: "Yesterday", content: "The wireframes are ready. Let's discuss them in our next meeting." },
            { author: "Emma", time: "Yesterday", content: "I like the direction we're going. Can we add a dark mode option?" }
          ]
        }
      ]
    };
  }
}
</script>