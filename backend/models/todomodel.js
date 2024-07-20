// models/todoModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tasks: [{
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: () => Date.now() + 24 * 60 * 60 * 1000 } // 24 hours from creation
  }]
});

module.exports = mongoose.model('Todo', todoSchema);
