

const { Router } = require('express');

const {addPermission,deletePermission} = require('../controllers/permission.controller');
const { route } = require('../app');

const router = Router();

router.patch('/:id',addPermission);

module.exports = router;