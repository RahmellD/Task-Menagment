const router = require('express').Router();
const { getUser, getAllUsers, createUser, deleteUser, updateUser } = require('../controllers/users');

router.get('/:id', getUser);
router.post('/', createUser);
router.delete('/:id/delete', deleteUser)
router.put('/:id', updateUser)
router.get('/', getAllUsers)

module.exports = router;