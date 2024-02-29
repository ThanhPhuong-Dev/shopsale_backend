const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');
const User = require('../models/UserModel');
const EmailServices = require('./EmailService');

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const { orderItems, email, user, paymentMethod, totalPrice } = newOrder;
    try {
      if (paymentMethod === 'pay_coin') {
        const userCoin = await User.findByIdAndUpdate(
          {
            _id: user
          },
          {
            $inc: {
              userCoin: -totalPrice
            }
          }
        );
      }
      const promises = orderItems.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
            countInStock: { $gte: order.amount }
          },
          {
            $inc: {
              countInStock: -order.amount,
              sold: +order.amount
            }
          },
          { new: true }
        );

        if (productData) {
          return {
            status: 'OK',
            message: 'SUCCESS'
          };
        } else {
          return {
            status: 'OK',
            message: 'ERR',
            id: order.product
          };
        }
      });

      const results = await Promise.all(promises);
      const newData = results && results.filter((item) => item.id);
      if (newData.length) {
        const arrId = [];
        newData.forEach((item) => {
          arrId.push(item.id);
        });
        resolve({
          status: 'ERR',
          message: `San pham voi id: ${arrId.join(',')} khong du hang`
        });
      } else {
        const createdOrder = await Order.create({
          ...newOrder
        });
        if (createdOrder) {
          await EmailServices.sendEmailCreateOrder(email, orderItems);
          resolve({
            status: 'OK',
            message: 'success'
          });
        }
      }
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
