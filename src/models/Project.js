const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    technologies: {
        type: String,
    },
    description: {
        type: String,
    },
    link: {
        type: String,
    },
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
