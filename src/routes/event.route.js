const { Router } = require('express');
const router = Router();
const {createEvents,updateEvent,eventDetail} = require('../controllers/event.controller');
router.get('/:id',eventDetail);
router.get('/',eventDetail)
router.post('/',createEvents);
router.put('/:id',updateEvent)

module.exports = router;
