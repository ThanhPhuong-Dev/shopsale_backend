const express = require('express');
const router = express.Router();
const RouterControllers = require('../controllers/OrderControllers')
const { authUserMiddleware } = require('../middleware/authmiddleware');

router.post('/create', authUserMiddleware, RouterControllers.create);

module.exports = router;
