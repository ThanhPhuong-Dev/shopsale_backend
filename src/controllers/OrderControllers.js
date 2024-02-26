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

  async getOrderUser(req, res, next) {
    try {
      const userID = req.params.id;

      if (!userID) {
        return res.status(200).json({
          status: 'ERROR',
          message: 'the userID is required'
        });
      }
      const response = await OrderService.getOrderUser(userID);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }

  async orderCancel(req, res, next) {
    try {
      const userID = req.params.id;
      
      if (!userID) {
        return res.status(200).json({
          status: 'ERROR',
          message: 'the userID is required'
        });
      }
      const response = await OrderService.orderCancel(userID);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }
}

module.exports = new OrderControllers();
