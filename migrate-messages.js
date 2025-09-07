/**
 * Message Migration Script
 * 
 * This script migrates messages from project.forumMessages arrays to the new messages collection.
 * Run this script after setting up the new messages collection and endpoints.
 * 
 * Usage: node migrate-messages.js
 */

const mongoose = require('mongoose');
const { MongoClient, ObjectId } = require('mongodb');

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/teamup', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schemas
const userSchema = new mongoose.Schema({
  username: String,
  // other fields not needed for migration
});

const messageSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const projectSchema = new mongoose.Schema({
  title: String,
  owner: String,
  forumMessages: [{
    author: String,
    text: String,
    timestamp: Date
  }]
});

// Define models
const User = mongoose.model('User', userSchema);
const Message = mongoose.model('Message', messageSchema);
const Project = mongoose.model('Project', projectSchema);

async function migrateMessages() {
  try {
    console.log('Starting message migration...');
    
    // Get all projects with messages
    const projects = await Project.find({ 'forumMessages.0': { $exists: true } });
    console.log(`Found ${projects.length} projects with messages`);
    
    let totalMessages = 0;
    let migratedMessages = 0;
    
    // Process each project
    for (const project of projects) {
      console.log(`\nProcessing project: ${project.title} (${project._id})`);
      console.log(`Messages to migrate: ${project.forumMessages.length}`);
      totalMessages += project.forumMessages.length;
      
      // Process each message
      for (const message of project.forumMessages) {
        try {
          // Find user by username
          const user = await User.findOne({ username: message.author });
          
          if (!user) {
            console.log(`  ⚠️ User not found for message: ${message.author}`);
            continue;
          }
          
          // Create new message document
          const newMessage = new Message({
            projectId: project._id,
            userId: user._id,
            username: message.author,
            message: message.text,
            timestamp: message.timestamp
          });
          
          // Save the message
          await newMessage.save();
          migratedMessages++;
          
          console.log(`  ✓ Migrated message: ${message.text.substring(0, 30)}...`);
        } catch (err) {
          console.error(`  ❌ Error migrating message:`, err);
        }
      }
    }
    
    console.log('\n=== Migration Summary ===');
    console.log(`Total messages found: ${totalMessages}`);
    console.log(`Successfully migrated: ${migratedMessages}`);
    console.log(`Failed: ${totalMessages - migratedMessages}`);
    
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    mongoose.disconnect();
    console.log('\nMigration complete. Database disconnected.');
  }
}

// Run the migration
migrateMessages();