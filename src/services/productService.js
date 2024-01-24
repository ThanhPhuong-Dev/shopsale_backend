const Product = require('../models/ProductModel');

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, countInStock, rating, description, location, discount, sold } = newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name
      });
      if (checkProduct !== null) {
        reject({
          status: 'ERR',
          message: 'Tên Sản Phẩm Này Đã Có Trong Cửa Hàng'
        });
      }

      const createProduct = await Product.create({
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
        ...newProduct
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

const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments();

      if (filter) {
        const filterProduct = await Product.find({
          [filter[0]]: { $regex: filter[1] }
        });
        resolve({
          status: 'OK',
          message: 'Sussces filter',
          data: filterProduct,
          totalProduct: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit)
        });
      }

      //sort
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allProductSort = await Product.find({})
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);

        resolve({
          status: 'OK',
          message: 'Sussces sort',
          data: allProductSort,
          totalProduct: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit)
        });
      }

      const checkiDProduct = await Product.find({})
        .limit(limit)
        .skip(page * limit);
      resolve({
        status: 'OK',
        message: 'Sussces getALL',
        data: checkiDProduct,
        totalProduct: totalProduct,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProduct / limit)
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = { createProduct, updateProduct, getDetailsProduct, deleteProduct, getAllProduct };
