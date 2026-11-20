const { Router } = require('express');
const {createRepository,updateRepository,getRepoDetail,allCategory,eventDetail} = require('../controllers/categories.controllers');
const router = Router();
router.get('/:id',getRepoDetail);
router.get('/',allCategory)
router.post('/',createRepository);
router.patch('/:id',updateRepository);




module.exports = router;