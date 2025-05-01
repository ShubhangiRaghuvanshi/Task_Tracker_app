const express = require('express');



const {createProject,getProjects,addTaskToProject} = require('../Controllers/projectController');
const authMiddleware = require('../Middleware/authMiddleware');
const router = express.Router();
router.post('/projects', authMiddleware , createProject);
router.get('/projects', authMiddleware , getProjects);
router.post('/projects/:projectId/tasks', authMiddleware , addTaskToProject);
module.exports = router;