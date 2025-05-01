const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../Controllers/taskController');
const authMiddleware = require('../Middleware/authMiddleware');
router.post('/tasks', authMiddleware, createTask);
router.get('/tasks/:taskId', authMiddleware, getTasks);
router.put('/tasks/:taskId', authMiddleware, updateTask);
router.delete('/tasks/:taskId', authMiddleware, deleteTask);
module.exports = router;