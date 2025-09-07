// Simple shared data service for forum messages
const ForumService = {
  // Store messages by project ID
  messages: {},
  
  // Store team members by project ID
  members: {},
  
  // Add a message to a project
  addMessage(projectId, message) {
    if (!this.messages[projectId]) {
      this.messages[projectId] = [];
    }
    this.messages[projectId].push(message);
    
    // Save to localStorage for persistence
    localStorage.setItem(`forum_messages_${projectId}`, JSON.stringify(this.messages[projectId]));
    
    return this.messages[projectId];
  },
  
  // Get messages for a project
  getMessages(projectId) {
    // Try to load from localStorage first
    const savedMessages = localStorage.getItem(`forum_messages_${projectId}`);
    if (savedMessages) {
      this.messages[projectId] = JSON.parse(savedMessages);
    }
    
    return this.messages[projectId] || [];
  },
  
  // Set team members for a project
  setMembers(projectId, members) {
    this.members[projectId] = members;
    localStorage.setItem(`forum_members_${projectId}`, JSON.stringify(members));
  },
  
  // Get team members for a project
  getMembers(projectId) {
    // Try to load from localStorage first
    const savedMembers = localStorage.getItem(`forum_members_${projectId}`);
    if (savedMembers) {
      this.members[projectId] = JSON.parse(savedMembers);
    }
    
    return this.members[projectId] || [];
  }
};

export default ForumService;