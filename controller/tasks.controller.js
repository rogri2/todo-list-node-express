const Task = require('../models/task.model');

let tasks = [];
let idCounter = 1;

exports.getAllTasks = (req, res) => {
  res.json(tasks);
};

exports.createTask = (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ id: idCounter++, title: title, description: description });
    tasks.push(newTask);
    res.status(201).json(newTask);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTask = (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  task.toggleComplete();
  res.json(task);
};

exports.deleteTask = (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks.splice(taskIndex, 1);
  res.status(204).send();
};