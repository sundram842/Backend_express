const { Router } = require('express');
const {createTicket,ticketDetail,ticketList} = require('../controllers/ticket.controller')
const router = Router();
const {createEvents,updateEvent,eventDetail} = require('../controllers/event.controller');
router.post('/:id/ticket-types',createTicket);
router.get('/:id/ticket-types',ticketList)
router.get('/:id',eventDetail);
router.get('/',eventDetail)
router.post('/',createEvents);
router.put('/:id',updateEvent)

module.exports = router;
