const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');
const User = require('../models/UserModel');
const EmailServices = require('./EmailService');
const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { orderItems, email } = newOrder;

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
        console.log('product', productData);
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
      console.log('chay dc1');
      await EmailServices.sendEmailCreateOrder(email, orderItems);
      console.log('chay dcc');
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

const orderCancel = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userOrder = await Order.findOne({
        'orderItems._id': userId // Tìm đơn hàng chứa orderItem có _id là userId
      });

      if (!userOrder) {
        return resolve({ status: 'Error', message: 'Order not found' });
      }

      const { orderItems, ...newUserOrder } = userOrder;
      const userCancel = orderItems?.filter((item) => item._id != userId);

      if (userCancel.length === 0) {
        // Nếu mảng orderItems trở thành rỗng, xóa đối tượng Order
        const deletedOrder = await Order.findOneAndDelete({ _id: userOrder._id });
        return resolve({ status: 'OK', message: 'Order deleted', data: deletedOrder });
      }

      const updatedOrder = await Order.findOneAndUpdate(
        { 'orderItems._id': userId },
        { newUserOrder, orderItems: userCancel },
        { new: true }
      );

      resolve({ status: 'OK', message: 'Remove Success', data: updatedOrder });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { createOrder, getOrderUser, orderCancel };
