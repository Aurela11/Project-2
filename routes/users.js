const express = require ('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.post('/create', usersController.createUser);
router.put('/:userId', usersController.updateUser);
router.get('/:id', usersController.getUser);
router.delete('/:userId', usersController.deleteUser);
router.put('/tasks/:taskId/assign/:userId', usersController.assignTaskToUser);
router.get('/:userId/tasks', usersController.viewUserTasks);

module.exports = router;

