const express = require('express');
const router = express.Router();

const statusController = require('../controllers/status');

router.put ('/:taskId/status', statusController.updateTaskStatus);
router.get('/tasks/:status', statusController.getTasksByStatus);

module.exports = router;