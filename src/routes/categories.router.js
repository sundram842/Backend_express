const { Router } = require('express');
const authenticate = require('../middlewares/auth.middleware')
const {createRepository,updateRepository,getRepoDetail,allCategory,eventDetail} = require('../controllers/categories.controllers');
const {checkPermission} = require('../middlewares/permission.middleware')
const router = Router();
router.get('/:id',authenticate,checkPermission,getRepoDetail);
router.get('/',authenticate,checkPermission('72c5fa99-f261-43a8-b2d0-120ec662581f'),allCategory)
router.post('/',authenticate,createRepository);
router.patch('/:id',authenticate, updateRepository);




module.exports = router;