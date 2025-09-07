// ProfileService.js - Service for managing profile data
import axios from 'axios';

const ProfileService = {
  // Get profile data for a specific user
  async getProfile(username) {
    try {
      const response = await axios.get(`http://localhost:3001/userInfo/${username}`);
      if (response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching profile for ${username}:`, error);
      return null;
    }
  },
  
  // Update profile in database
  async updateProfile(profileData) {
    try {
      console.log('ProfileService: Updating profile in database:', profileData);
      const response = await axios.post('http://localhost:3001/updateUser', profileData);
      console.log('ProfileService: Profile updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('ProfileService: Error updating profile:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default ProfileService;