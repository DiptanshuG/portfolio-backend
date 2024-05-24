const Project = require('../models/Project');

// Fetch all projects
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new project
const createProject = async (req, res) => {
    const { image, title, technologies, description, link } = req.body;

    try {
        const newProject = new Project({ image, title, technologies, description, link });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a project
const updateProject = async (req, res) => {
    const { id } = req.params;
    const { image, title, technologies, description, link } = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { image, title, technologies, description, link },
            { new: true }
        );
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a project
const deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        await Project.findByIdAndDelete(id);
        res.json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
};
