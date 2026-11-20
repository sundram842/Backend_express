const { Router } = require('express');
const {loggedInUser,newAccessToke,logout} = require('../controllers/auth.controller');
const { route } = require('../app');

const router = Router();

router.post('/', loggedInUser);
router.post('/refresh',newAccessToke);
router.post('/logout', logout)

module.exports = router;
