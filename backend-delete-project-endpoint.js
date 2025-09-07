// Add this to your existing backend server file

// Delete project endpoint
app.delete('/deleteProject/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    
    // Find the project first to get collaborators
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Remove project from all users' applied/inProgress arrays
    if (project.collaborators && project.collaborators.length > 0) {
      for (const collaborator of project.collaborators) {
        const username = typeof collaborator === 'string' ? collaborator : collaborator.username;
        
        await User.updateOne(
          { username: username },
          { 
            $pull: { 
              appliedProjects: projectId,
              inProgressProjects: projectId,
              projects: projectId
            }
          }
        );
      }
    }
    
    // Remove project from owner's projects array
    await User.updateOne(
      { username: project.owner },
      { 
        $pull: { 
          projects: projectId,
          inProgressProjects: projectId
        }
      }
    );
    
    // Delete the project
    await Project.findByIdAndDelete(projectId);
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error' });
  }
});