const Order = require('../models/OrderModel');

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createOrder = await Order.create({
        // name,
        // image,
        // type,
        // price,
        // countInStock,
        // rating,
        // description,
        // location,
        // discount,
        // sold
        ...newOrder
      });
      if (createOrder) {
        resolve({
          status: 'OK',
          message: 'Sussces',
          data: createOrder
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { createOrder };
