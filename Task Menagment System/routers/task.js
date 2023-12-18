const router = require('express').Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/task')

router.post('/create', createTask);
router.get('/', getTasks);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);

module.exports = router