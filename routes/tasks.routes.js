const express = require('express');
const controller = require('../controller/tasks.controller');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the ToDo API' });
});

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;