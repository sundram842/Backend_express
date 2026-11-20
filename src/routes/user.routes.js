const { Router } = require('express');
const authenticate = require('../middlewares/auth.middleware')
const { createUser, getUsers,userById } = require('../controllers/user.controller');

const router = Router();

router.post('/', authenticate,createUser);
router.get('/:id', authenticate,userById);
router.get('/', authenticate,getUsers);


module.exports = router;
