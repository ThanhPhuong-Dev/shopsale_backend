const Product = require('../models/ProductModel');

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, countInStock, rating, description } = newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name
      });
      if (checkProduct !== null) {
        resolve({
          status: 'error',
          message: 'name repeat'
        });
      }

      const createProduct = await Product.create({
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        description
      });
      if (createProduct) {
        resolve({
          status: 'OK',
          message: 'Sussces',
          data: createProduct
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (productID, data) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, countInStock, rating, description } = data;
    try {
      const checkiDProduct = await Product.findOne({
        _id: productID
      });
      // console.log('fsdfs', checkiDProduct);
      // const checkProduct = await Product.findOne({
      //   name: name
      // });
      // if (checkProduct !== null) {
      //   resolve({
      //     status: 'error',
      //     message: 'name repeat'
      //   });
      // }
      if (checkiDProduct === null) {
        resolve({
          status: 'error',
          message: 'the product not defined'
        });
      }

      const updateNewProduct = await Product.findByIdAndUpdate(
        productID,
        {
          name,
          image,
          type,
          price,
          countInStock,
          rating,
          description
        },
        { new: true }
      );

      resolve({
        status: 'OK',
        message: 'Sussces update',
        data: updateNewProduct
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsProduct = (productID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkiDProduct = await Product.findOne({
        _id: productID
      });
      console.log('test', checkiDProduct);
      if (checkiDProduct === null) {
        resolve({
          status: 'error',
          message: 'the product not defined'
        });
      }
      resolve({
        status: 'OK',
        message: 'Sussces update',
        data: checkiDProduct
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (productID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkiDProduct = await Product.findOne({
        _id: productID
      });
      if (checkiDProduct === null) {
        resolve({
          status: 'error',
          message: 'the product not defined'
        });
      }
      const removeProduct = await Product.findByIdAndDelete({
        _id: productID
      });
      if (removeProduct) {
        resolve({
          status: 'OK',
          message: 'Sussces remove'
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = { createProduct, updateProduct, getDetailsProduct, deleteProduct };
