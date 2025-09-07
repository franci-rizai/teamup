// Firebase configuration
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBXQAHBTQBBGQKQtRHFLcJdG_n8o2Db-Ow",
  authDomain: "teamup-messages.firebaseapp.com",
  databaseURL: "https://teamup-messages-default-rtdb.firebaseio.com",
  projectId: "teamup-messages",
  storageBucket: "teamup-messages.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:1234567890abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };