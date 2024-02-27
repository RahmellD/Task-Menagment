const router = require('express').Router();
const { createTask, getTasks, updateTask, deleteTask, addTaskToUser } = require('../controllers/task')

router.post('/create', createTask);
router.get('/', getTasks);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);
router.put('/addUser', addTaskToUser)

module.exports = router