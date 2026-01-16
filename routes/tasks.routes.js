const express = require('express');
const controller = require('../controller/tasks.controller');
const router = express.Router();

router.get('/', controller.getAllTasks);

router.post('/', controller.createTask);

router.put('/:id', controller.updateTask);

router.delete('/:id', controller.deleteTask);

module.exports = router;