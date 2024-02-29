const express = require('express');
const router = express.Router();
const OrderControllers = require('../controllers/OrderControllers');
const { authUserMiddleware } = require('../middleware/authmiddleware');

router.post('/create', OrderControllers.create);
router.get('/order-user/:id', OrderControllers.getOrderUser);
router.get('/order-all', authUserMiddleware, OrderControllers.getOrderAll);
router.delete('/order-cancel/:id', OrderControllers.orderCancel);

module.exports = router;
