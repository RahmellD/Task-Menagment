const router = require('express').Router();
const { updateTaskStatus, getTaskByUser, getTasksByStatus } = require('../controllers/status');

router.get('/:id', getTaskByUser)
router.put('/:id/status', updateTaskStatus);
router.get('/status/:status', getTasksByStatus)

module.exports = router