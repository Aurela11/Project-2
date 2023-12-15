const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks');

router.post('/', tasksController.createTask);
router.put('/:taskId', tasksController.updateTaskDetails);
router.delete('/:taskId', tasksController.deleteTask);
router.get('/', tasksController.getTasks);

module.exports = router;