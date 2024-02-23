const OrderService = require('../services/orderService');
class OrderControllers {
  async create(req, res, next) {
    try {
      // console.log('req.body', req.body);
      const {
        orderItems,
        shippingAddress,
        type,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        user,
        isPaid,
        isdelivered,
        deliveredAt
      } = req.body;
      const response = await OrderService.createOrder(req.body);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }
}

module.exports = new OrderControllers();
