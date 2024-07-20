// controllers/todoController.js
const Todo = require('../models/todomodel');
const mongoose = require('mongoose');

exports.getTodos = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log('Fetching todos for userId:', userId);
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId format.' });
    }

    // Fetch todos for the given userId
    const todos = await Todo.findOne({ userId});

    if (!todos) {
      return res.status(404).json({ message: 'No todos found for this user.' });
    }
res.status(200).json({ tasks: todos.tasks });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Error fetching todos', error: error.message });
  }
};

exports.addTask = async (req, res) => {
    try {
        const { userId } = req.params;
        const { text } = req.body;
    
        // Check if the user has existing todos
        let todo = await Todo.findOne({ userId });
    
        if (!todo) {
          todo = new Todo({
            userId,
            tasks: []
          });
        }
    
        // Add the new task
        todo.tasks.push({
          text,
          completed: false,
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours later
        });
    
        await todo.save();
        res.status(201).json(todo);
      } catch (error) {
        res.status(500).json({ message: 'Error adding task', error });
      }
    }

exports.deleteTask = async (req, res) => {
    try {
        const { userId, taskId } = req.params;
        
        // Find the user's todo list
        const todo = await Todo.findOne({ userId });
        
        if (!todo) {
          return res.status(404).json({ message: 'Todo list not found for this user.' });
        }
    
        // Find the task and remove it
        const taskIndex = todo.tasks.findIndex(task => task._id.toString() === taskId);
        if (taskIndex === -1) {
          return res.status(404).json({ message: 'Task not found.' });
        }
    
        // Remove the task
        todo.tasks.splice(taskIndex, 1);
        await todo.save();
    
        res.status(200).json({ message: 'Task deleted successfully.' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
      }
      
};
