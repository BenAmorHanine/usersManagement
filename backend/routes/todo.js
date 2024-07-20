// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todocontroller');
const authMiddleware = require('../tools/authMiddleware');

// Fetch user's to-do list
//router.get('/todos/:userid', authMiddleware.protect, todoController.getTodos);
router.get('/todos/:id', authMiddleware.protect, todoController.getTodos);

// Add a new task
router.post('/todos/:userId', authMiddleware.protect, todoController.addTask);

// Delete a task
router.delete('/todos/:userId/:taskId', authMiddleware.protect, todoController.deleteTask);

module.exports = router;
