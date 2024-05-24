const express = require('express');
const {
    getProjects,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');
const upload = require('../middleware/upload');
const router = express.Router();

router.get('/', getProjects);
router.post('/', upload.single('image'), createProject);
router.put('/:id', upload.single('image'), updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
