const express = require('express');
const controller = require('../../controllers/user.controller');
const validate = require('express-validation');

const validation = require('../../validations/user.validation');

const router = express.Router();

router.get('/', controller.allUsers);

module.exports = router;
