const router = require('express').Router();
const { assignTaskToUser, updateTaskStatus, getTaskByUser, getTasksByStatus } = require('../controllers/status');

router.get('/:id', getTaskByUser)
router.post('/assign-task', assignTaskToUser);
router.put('/:id/status', updateTaskStatus);
router.get('/status/:status', getTasksByStatus)

module.exports = router