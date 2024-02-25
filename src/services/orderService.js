const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');
const User = require('../models/UserModel');

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { orderItems } = newOrder;
      

      const promises = orderItems.map(async (order) => {
        const productData = await Product.findByIdAndUpdate(
          {
            _id: order.product,
            countInStock: { $gte: order.amount }
          },
          {
            $inc: { countInStock: -order.amount, sold: +order.amount }
          },
          { new: true }
        );

        if (productData) {
          const createOrder = await Order.create({
            ...newOrder
          });
          if (createOrder) {
            return {
              status: 'OK',
              message: 'Sussces',
              data: createOrder
            };
          }
        } else {
          return { message: 'ERROR', status: 'ERR', data: order.product };
        }
      });
      const results = await Promise.all(promises);
      const newData = results && results.filter((item) => item.id);
      if (newData.length) {
        resolve({ status: 'ERR', message: `San pham voi id${newData.join(',')} khong đủ hàng` });
      }
      resolve({ status: 'OK', message: `Success` });
    } catch (e) {
      reject(e);
    }
  });
};

const getOrderUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getAllUserId = await Order.find({
        user: userId
      });

      if (getAllUserId) {
        const orderUser = getAllUserId.map((order) => {
          return order.orderItems;
        });
        const orderUserArr = [].concat(...orderUser);
        resolve({
          status: 'OK',
          message: 'Data Success',
          data: getAllUserId,
          totalOrderUser: orderUserArr
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { createOrder, getOrderUser };
