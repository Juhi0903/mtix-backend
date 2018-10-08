const express = require('express');

// import all the routes here
const userRoutes = require('./user.route');

const ticketRoutes = require('./ticket.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send({ message: 'OK' }));

router.use('/user', userRoutes);

router.use('/ticket', ticketRoutes);

module.exports = router;
