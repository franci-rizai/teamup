export default {
  name: 'Inbox',
  render(h) {
    return h('div', { class: 'inbox-container' }, [
      h('h1', { class: 'section-title' }, 'Inbox'),
      h('div', { class: 'message-list' }, [
        h('div', { class: 'message-card' }, [
          h('h3', 'Welcome to TeamUp!'),
          h('p', 'This is your inbox where you\'ll receive messages from team members.'),
          h('span', { class: 'date' }, 'Today')
        ]),
        h('div', { class: 'message-card' }, [
          h('h3', 'Project Update'),
          h('p', 'Your project "Web Development" has a new applicant.'),
          h('span', { class: 'date' }, 'Yesterday')
        ]),
        h('div', { class: 'message-card' }, [
          h('h3', 'Getting Started'),
          h('p', 'Here are some tips to help you get started with TeamUp.'),
          h('span', { class: 'date' }, '3 days ago')
        ])
      ])
    ]);
  },
  style: `
    .inbox-container {
      padding: 20px;
      color: #ecf0f1;
    }
    
    .section-title {
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #455a64;
    }
    
    .message-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .message-card {
      background-color: #34495e;
      border-radius: 8px;
      padding: 15px;
      border: 1px solid #455a64;
      position: relative;
    }
    
    .message-card h3 {
      margin: 0 0 10px 0;
      color: #3498db;
    }
    
    .message-card p {
      margin: 0;
      color: #bdc3c7;
    }
    
    .date {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 0.8rem;
      color: #7f8c8d;
    }
  `
}