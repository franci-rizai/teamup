<template>
  <div class="dashboard">
    <!-- User Info -->
    <section class="user-info">
      <img src="@/assets/avatar.png" alt="Avatar" />
      <div>
        <h2>{{ user.name }}</h2>
        <p>{{ user.email }}</p>
        <small>{{ user.role }}</small>
      </div>
    </section>

    <!-- Stats -->
    <section class="stats">
      <div class="stat-box" v-for="s in stats" :key="s.label">
        <h3>{{ s.value }}</h3>
        <p>{{ s.label }}</p>
      </div>
    </section>

    <!-- Skills -->
    <section class="skills">
      <h3>My Skills</h3>
      <div v-for="skill in user.skills" :key="skill.name" class="skill-bar">
        <label>{{ skill.name }}</label>
        <div class="bar">
          <div class="fill" :style="{ width: skill.level + '%' }"></div>
        </div>
      </div>
    </section>

    <!-- Applicants -->
    <section class="applicants">
      <h2>Applicants for My Projects</h2>
      <div v-if="applicantsList.length > 0">
        <div v-for="project in applicantsList" :key="project.projectId" class="project-applicants">
          <h3>{{ project.title }}</h3>
          <ul>
            <li v-for="applicant in project.applicants" :key="applicant.username">
              {{ applicant.fullName }} - {{ applicant.username }}
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <p>No applicants yet.</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      applicantsList: [],
      username: 'frantzi', // Default fallback for now
      user: {
        name: "Frantzi Rizai",
        email: "frantzi@example.com",
        role: "Team Leader",
        skills: [
          { name: "Vue.js", level: 85 },
          { name: "JavaScript", level: 90 },
          { name: "HTML/CSS", level: 95 }
        ]
      },
      stats: [
        { label: "Projects Created", value: 5 },
        { label: "Applications Received", value: 12 },
        { label: "Projects In Progress", value: 2 }
      ]
    };
  },
  mounted() {
    const currentUsername = this.username;
    fetch(`http://localhost:3001/getApplicantsForMyProjects/${currentUsername}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        this.applicantsList = data;
      })
      .catch((error) => {
        console.error("Error fetching applicants:", error);
      });
  }
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
  padding: 2em;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1em;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1em;
  margin-bottom: 2em;
}

.user-info img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.stats {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2em;
  margin-bottom: 2em;
}

.stat-box {
  background: #f5f5f5;
  padding: 1em 2em;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 150px;
}

.skills {
  width: 100%;
  max-width: 600px;
  margin-bottom: 2em;
}

.skill-bar {
  margin-bottom: 1em;
}

.skill-bar label {
  display: block;
  margin-bottom: 0.3em;
  font-weight: bold;
}

.bar {
  background: #eee;
  border-radius: 8px;
  height: 10px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.4s ease;
}

.applicants {
  width: 100%;
  max-width: 700px;
}

.project-applicants {
  margin-bottom: 1.5em;
}

.project-applicants h3 {
  margin-bottom: 0.5em;
}

.project-applicants ul {
  padding-left: 1.2em;
}

.project-applicants li {
  margin-bottom: 0.3em;
}
</style>
