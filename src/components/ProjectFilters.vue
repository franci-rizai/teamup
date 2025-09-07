<template>
  <div class="filters-container">
    <div class="search-bar">
      <input 
        type="text" 
        v-model="filters.keyword" 
        placeholder="Search projects..." 
        @input="applyFilters"
      />
      <button class="search-button">
        <i class="fas fa-search"></i>
      </button>
    </div>
    
    <div class="filters-toggle">
      <button 
        class="toggle-filters-btn" 
        @click="showFilters = !showFilters"
      >
        <i class="fas fa-filter"></i> {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
      </button>
    </div>
    
    <div v-if="showFilters" class="filters-dropdown">
      <div class="filters-grid">
        <div class="filter-group">
          <h4>Field / Domain</h4>
          <div class="filter-chips">
            <div 
              v-for="domain in domainOptions" 
              :key="domain.value"
              :class="['filter-chip', { active: filters.domain.includes(domain.value) }]"
              @click="toggleFilter('domain', domain.value)"
            >
              {{ domain.label }}
            </div>
          </div>
        </div>
        
        <div class="filter-group">
          <h4>Tech Stack</h4>
          <div class="filter-chips">
            <div 
              v-for="tech in techOptions" 
              :key="tech.value"
              :class="['filter-chip', { active: filters.tech.includes(tech.value) }]"
              @click="toggleFilter('tech', tech.value)"
            >
              {{ tech.label }}
            </div>
          </div>
        </div>
        
        <!-- Time Filters -->
        <div class="filter-group">
          <h4>Created Within</h4>
          <div class="filter-chips">
            <div 
              v-for="time in timeOptions" 
              :key="time.value"
              :class="['filter-chip', { active: filters.createdWithin === time.value }]"
              @click="setFilter('createdWithin', time.value)"
            >
              {{ time.label }}
            </div>
          </div>
        </div>
        
        <div class="filter-group">
          <h4>Duration</h4>
          <div class="filter-chips">
            <div 
              v-for="duration in durationOptions" 
              :key="duration.value"
              :class="['filter-chip', { active: filters.duration.includes(duration.value) }]"
              @click="toggleFilter('duration', duration.value)"
            >
              {{ duration.label }}
            </div>
          </div>
        </div>
        
        <!-- Team Filters -->
        <div class="filter-group">
          <h4>Team Size</h4>
          <div class="filter-chips">
            <div 
              v-for="size in teamSizeOptions" 
              :key="size.value"
              :class="['filter-chip', { active: filters.teamSize.includes(size.value) }]"
              @click="toggleFilter('teamSize', size.value)"
            >
              {{ size.label }}
            </div>
          </div>
        </div>
        
        <div class="filter-group">
          <h4>Roles Needed</h4>
          <div class="filter-chips">
            <div 
              v-for="role in roleOptions" 
              :key="role.value"
              :class="['filter-chip', { active: filters.roles.includes(role.value) }]"
              @click="toggleFilter('roles', role.value)"
            >
              {{ role.label }}
            </div>
          </div>
        </div>
        

      </div>
      
      <div class="filters-actions">
        <button @click="clearAllFilters" class="clear-filters-btn">
          <i class="fas fa-times"></i> Clear All Filters
        </button>
      </div>
    </div>
    
    <div class="active-filters" v-if="hasActiveFilters">
      <div class="filter-tags">
        <span 
          v-for="(tag, index) in activeTags" 
          :key="index" 
          class="filter-tag"
        >
          {{ tag }}
          <button @click="removeFilter(tag)" class="remove-tag">×</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectFilters',
  data() {
    return {
      showFilters: false,
      filters: {
        keyword: '',
        domain: [],
        tech: [],
        createdWithin: '',
        duration: [],
        teamSize: [],
        roles: [],
        creatorReputation: ''
      },

      domainOptions: [
        { value: 'Web Development', label: 'Web Development' },
        { value: 'Mobile App Development', label: 'Mobile App Development' },
        { value: 'Game Development', label: 'Game Development' },
        { value: 'AI/ML', label: 'AI/ML' },
        { value: 'Data Science', label: 'Data Science' },
        { value: 'Blockchain', label: 'Blockchain' },
        { value: 'IoT', label: 'IoT' },
        { value: 'Cybersecurity', label: 'Cybersecurity' },
        { value: 'DevOps', label: 'DevOps' },
        { value: 'Cloud Computing', label: 'Cloud Computing' },
        { value: 'Database Systems', label: 'Database Systems' },
        { value: 'Distributed Systems', label: 'Distributed Systems' },
        { value: 'Computer Graphics', label: 'Computer Graphics' },
        { value: 'Computer Vision', label: 'Computer Vision' },
        { value: 'Natural Language Processing', label: 'Natural Language Processing' },
        { value: 'Embedded Systems', label: 'Embedded Systems' },
        { value: 'Robotics', label: 'Robotics' },
        { value: 'Quantum Computing', label: 'Quantum Computing' },
        { value: 'Algorithms & Data Structures', label: 'Algorithms & Data Structures' },
        { value: 'Other', label: 'Other' }
      ],
      techOptions: [
        { value: 'JavaScript', label: 'JavaScript' },
        { value: 'TypeScript', label: 'TypeScript' },
        { value: 'Python', label: 'Python' },
        { value: 'Java', label: 'Java' },
        { value: 'C++', label: 'C++' },
        { value: 'C#', label: 'C#' },
        { value: 'Go', label: 'Go' },
        { value: 'Rust', label: 'Rust' },
        { value: 'PHP', label: 'PHP' },
        { value: 'Ruby', label: 'Ruby' },
        { value: 'Swift', label: 'Swift' },
        { value: 'Kotlin', label: 'Kotlin' },
        { value: 'React', label: 'React' },
        { value: 'Vue.js', label: 'Vue.js' },
        { value: 'Angular', label: 'Angular' },
        { value: 'Node.js', label: 'Node.js' },
        { value: 'Express.js', label: 'Express.js' },
        { value: 'Django', label: 'Django' },
        { value: 'Flask', label: 'Flask' },
        { value: 'Spring Boot', label: 'Spring Boot' },
        { value: 'Laravel', label: 'Laravel' },
        { value: 'Ruby on Rails', label: 'Ruby on Rails' },
        { value: 'MongoDB', label: 'MongoDB' },
        { value: 'PostgreSQL', label: 'PostgreSQL' },
        { value: 'MySQL', label: 'MySQL' },
        { value: 'Redis', label: 'Redis' },
        { value: 'Docker', label: 'Docker' },
        { value: 'Kubernetes', label: 'Kubernetes' },
        { value: 'AWS', label: 'AWS' },
        { value: 'Azure', label: 'Azure' },
        { value: 'Google Cloud', label: 'Google Cloud' },
        { value: 'Firebase', label: 'Firebase' },
        { value: 'GraphQL', label: 'GraphQL' },
        { value: 'REST API', label: 'REST API' },
        { value: 'TensorFlow', label: 'TensorFlow' },
        { value: 'PyTorch', label: 'PyTorch' },
        { value: 'Scikit-learn', label: 'Scikit-learn' },
        { value: 'Unity', label: 'Unity' },
        { value: 'Unreal Engine', label: 'Unreal Engine' },
        { value: 'React Native', label: 'React Native' },
        { value: 'Flutter', label: 'Flutter' },
        { value: 'Figma', label: 'Figma' },
        { value: 'Adobe XD', label: 'Adobe XD' },
        { value: 'Git', label: 'Git' },
        { value: 'Jenkins', label: 'Jenkins' },
        { value: 'Terraform', label: 'Terraform' }
      ],
      timeOptions: [
        { value: '24h', label: 'Last 24h' },
        { value: 'week', label: 'Last week' },
        { value: 'month', label: 'Last month' },
        { value: 'all', label: 'All time' }
      ],
      durationOptions: [
        { value: 'short', label: 'Short-term' },
        { value: 'medium', label: 'Medium-term' },
        { value: 'long', label: 'Long-term' }
      ],
      teamSizeOptions: [
        { value: 'solo', label: 'Solo' },
        { value: 'small', label: '2-3' },
        { value: 'medium', label: '4-6' },
        { value: 'large', label: '7+' }
      ],
      roleOptions: [
        { value: 'Frontend Developer', label: 'Frontend Developer' },
        { value: 'Backend Developer', label: 'Backend Developer' },
        { value: 'Full Stack Developer', label: 'Full Stack Developer' },
        { value: 'Mobile Developer', label: 'Mobile Developer' },
        { value: 'Game Developer', label: 'Game Developer' },
        { value: 'DevOps Engineer', label: 'DevOps Engineer' },
        { value: 'QA Engineer', label: 'QA Engineer' },
        { value: 'Data Scientist', label: 'Data Scientist' },
        { value: 'Machine Learning Engineer', label: 'Machine Learning Engineer' },
        { value: 'AI Researcher', label: 'AI Researcher' },
        { value: 'Database Administrator', label: 'Database Administrator' },
        { value: 'Security Engineer', label: 'Security Engineer' },
        { value: 'Cloud Architect', label: 'Cloud Architect' },
        { value: 'Blockchain Developer', label: 'Blockchain Developer' },
        { value: 'Embedded Systems Engineer', label: 'Embedded Systems Engineer' },
        { value: 'Computer Vision Engineer', label: 'Computer Vision Engineer' },
        { value: 'NLP Engineer', label: 'NLP Engineer' },
        { value: 'Systems Architect', label: 'Systems Architect' },
        { value: 'Network Engineer', label: 'Network Engineer' },
        { value: 'Compiler Developer', label: 'Compiler Developer' },
        { value: 'Graphics Programmer', label: 'Graphics Programmer' },
        { value: 'Algorithm Specialist', label: 'Algorithm Specialist' },
        { value: 'UI/UX Designer', label: 'UI/UX Designer' },
        { value: 'Project Manager', label: 'Project Manager' },
        { value: 'Technical Writer', label: 'Technical Writer' },
        { value: 'Other', label: 'Other' }
      ]
    };
  },
  computed: {
    hasActiveFilters() {
      return this.activeTags.length > 0;
    },
    activeTags() {
      let tags = [];
      
      if (this.filters.keyword) {
        tags.push(`Search: ${this.filters.keyword}`);
      }
      

      
      this.filters.domain.forEach(domain => {
        const option = this.domainOptions.find(opt => opt.value === domain);
        if (option) tags.push(`Domain: ${option.label}`);
      });
      
      this.filters.tech.forEach(tech => {
        const option = this.techOptions.find(opt => opt.value === tech);
        if (option) tags.push(`Tech: ${option.label}`);
      });
      
      if (this.filters.createdWithin) {
        const option = this.timeOptions.find(opt => opt.value === this.filters.createdWithin);
        if (option) tags.push(`Created: ${option.label}`);
      }
      
      this.filters.duration.forEach(duration => {
        const option = this.durationOptions.find(opt => opt.value === duration);
        if (option) tags.push(`Duration: ${option.label}`);
      });
      
      this.filters.teamSize.forEach(size => {
        const option = this.teamSizeOptions.find(opt => opt.value === size);
        if (option) tags.push(`Team Size: ${option.label}`);
      });
      
      this.filters.roles.forEach(role => {
        const option = this.roleOptions.find(opt => opt.value === role);
        if (option) tags.push(`Role: ${option.label}`);
      });
      

      
      return tags;
    }
  },
  methods: {
    toggleFilter(filterType, value) {
      if (this.filters[filterType].includes(value)) {
        this.filters[filterType] = this.filters[filterType].filter(item => item !== value);
      } else {
        this.filters[filterType].push(value);
      }
      this.applyFilters();
    },
    
    setFilter(filterType, value) {
      if (this.filters[filterType] === value) {
        this.filters[filterType] = '';
      } else {
        this.filters[filterType] = value;
      }
      this.applyFilters();
    },
    
    toggleBooleanFilter(filterType) {
      this.filters[filterType] = !this.filters[filterType];
      this.applyFilters();
    },
    
    applyFilters() {
      this.$emit('filter-changed', this.filters);
    },
    
    removeFilter(tag) {
      const [type, value] = tag.split(': ');
      
      switch (type) {
        case 'Search':
          this.filters.keyword = '';
          break;

        case 'Domain':
          this.filters.domain = this.filters.domain.filter(d => 
            this.domainOptions.find(opt => opt.value === d)?.label !== value);
          break;
        case 'Tech':
          this.filters.tech = this.filters.tech.filter(t => 
            this.techOptions.find(opt => opt.value === t)?.label !== value);
          break;
        case 'Created':
          this.filters.createdWithin = '';
          break;
        case 'Duration':
          this.filters.duration = this.filters.duration.filter(d => 
            this.durationOptions.find(opt => opt.value === d)?.label !== value);
          break;
        case 'Team Size':
          this.filters.teamSize = this.filters.teamSize.filter(s => 
            this.teamSizeOptions.find(opt => opt.value === s)?.label !== value);
          break;
        case 'Role':
          this.filters.roles = this.filters.roles.filter(r => 
            this.roleOptions.find(opt => opt.value === r)?.label !== value);
          break;

      }
      
      this.applyFilters();
    },
    
    clearAllFilters() {
      this.filters = {
        keyword: '',
        domain: [],
        tech: [],
        createdWithin: '',
        duration: [],
        teamSize: [],
        roles: [],
        creatorReputation: ''
      };
      
      this.applyFilters();
    }
  }
};
</script>

<style scoped>
.filters-container {
  background-color: #2c3e50;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #455a64;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.search-bar {
  display: flex;
  margin-bottom: 15px;
}

.search-bar input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #455a64;
  border-radius: 4px 0 0 4px;
  background-color: #34495e;
  color: #ecf0f1;
  font-size: 1rem;
}

.search-bar input:focus {
  outline: none;
  border-color: #3498db;
}

.search-button {
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  padding: 0 15px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-button:hover {
  background-color: #2980b9;
}

.filters-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.toggle-filters-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
}

.toggle-filters-btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.toggle-filters-btn i {
  margin-right: 5px;
}

.filters-dropdown {
  background-color: #34495e;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  border: 1px solid #455a64;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.filter-group {
  margin-bottom: 15px;
}

.filter-group h4 {
  color: #ecf0f1;
  margin: 0 0 10px 0;
  font-size: 1rem;
  font-weight: 600;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 120px;
  overflow-y: auto;
  padding-right: 5px;
}

.filter-chips::-webkit-scrollbar {
  width: 4px;
}

.filter-chips::-webkit-scrollbar-track {
  background: #34495e;
  border-radius: 2px;
}

.filter-chips::-webkit-scrollbar-thumb {
  background: #3498db;
  border-radius: 2px;
}

.filter-chips::-webkit-scrollbar-thumb:hover {
  background: #2980b9;
}

.filter-chip {
  background-color: #2c3e50;
  color: #bdc3c7;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #455a64;
  user-select: none;
}

.filter-chip:hover {
  border-color: #3498db;
  color: #ecf0f1;
}

.filter-chip.active {
  background-color: #3498db;
  color: white;
  border-color: #2980b9;
}

.filters-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

.clear-filters-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
  font-size: 0.9rem;
}

.clear-filters-btn:hover {
  background-color: #c0392b;
}

.clear-filters-btn i {
  margin-right: 5px;
}

.active-filters {
  margin-top: 15px;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-tag {
  background-color: #3498db;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
}

.remove-tag {
  background: none;
  border: none;
  color: white;
  margin-left: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
  padding: 0 3px;
}

.remove-tag:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

@media (max-width: 768px) {
  .filters-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .filters-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-chips {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 10px;
  }
  
  .filter-chip {
    white-space: nowrap;
  }
}
</style>