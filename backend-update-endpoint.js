// Add this to your existing backend server file

// Update user profile endpoint
app.patch('/users/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const updateData = req.body;
    
    // Find and update the user in MongoDB
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { $set: updateData },
      { new: true, upsert: false }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Alternative POST endpoint for updating users
app.post('/updateUser', async (req, res) => {
  try {
    const updateData = req.body;
    const { username } = updateData;
    
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }
    
    // Find and update the user in MongoDB
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { $set: updateData },
      { new: true, upsert: false }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});