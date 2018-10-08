const express = require('express');
const controller = require('../../controllers/ticket.controller');
const validate = require('express-validation');
const validation = require('../../validations/ticket.validation');

const router = express.Router();

router.post('/', validate(validation.saveTicket), controller.saveTicket);
router.get('/',  controller.getAllTickets);
router.put('/updatestatus',  controller.updateStatus);
router.put('/updatepriority',  controller.updatePriority);
router.put('/updateassignto',  controller.updateAssignTo);


module.exports = router;
