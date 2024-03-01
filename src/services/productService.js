const Product = require('../models/ProductModel');

const createProduct = (newProduct, imagePath) => {
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
        ...newProduct,
        image: imagePath
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

const updateProduct = (productID, data, imagePath) => {
  return new Promise(async (resolve, reject) => {
    const { countInStock } = data;
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
        reject({
          status: 'error',
          message: 'the product not defined'
        });
      }

      const updateNewProduct = await Product.findByIdAndUpdate(
        productID,
        {
          ...data,

          image: imagePath
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
        message: 'Sussces Product Details',
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

const deleteMany = (productID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const removeProduct = await Product.deleteMany({
        _id: { $in: productID }
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
      //sort
      // if (sort) {
      //   const objectSort = {};
      //   objectSort[sort[1]] = sort[0];
      //   const allProductSort = await Product.find({})
      //     .limit(limit)
      //     .skip(page * limit)
      //     .sort(objectSort);

      //   resolve({
      //     status: 'OK',
      //     message: 'Sussces sort',
      //     data: allProductSort,
      //     totalProduct: totalProduct,
      //     pageCurrent: Number(page + 1),
      //     totalPage: Math.ceil(totalProduct / limit)
      //   });
      // }

      const checkiDProduct = await Product.find({})
        .limit(limit)
        .skip(page * limit);
      resolve({
        status: 'OK',
        message: 'Sussces getALL limit',
        data: checkiDProduct,
        totalProduct: totalProduct,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProduct / limit)
      });

      // const allProduct = await Product.find({});
      // resolve({
      //   status: 'OK',
      //   message: 'Sussces getALL',
      //   data: allProduct,
      //   totalProduct: totalProduct,
      //   pageCurrent: Number(page + 1),
      //   totalPage: Math.ceil(totalProduct / limit)
      // });
    } catch (e) {
      reject(e);
    }
  });
};

const searchProduct = (filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const searchfilter = await Product.find({
        [filter[0]]: { $regex: filter[1], $options: 'i' }
      });
      if (searchfilter) {
        resolve({
          status: 'Success search',
          message: 'tìm kiếm thành công',
          totalSearch: Number(searchfilter.length),
          data: searchfilter
        });
      }
      //
    } catch (e) {
      reject(e);
    }
  });
};

const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const typeProduct = await Product.distinct('type');
      resolve({
        status: 'Success Type',
        message: 'Type thành công',
        data: typeProduct
      });
    } catch (e) {
      reject(e);
    }
  });
};

const pageTypeProduct = (limit, page, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalType = await Product.countDocuments({ [filter[0]]: { $regex: filter[1] } });
      if (filter) {
        const filterProduct = await Product.find({
          [filter[0]]: { $regex: filter[1] }
        })
          .limit(limit)
          .skip(page * limit);
        resolve({
          status: 'OK',
          message: 'Sussces type filter',
          data: filterProduct,
          toltalType: totalType,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalType / limit)
        });
      }

      // const typeProduct = await Product.find({ type: typeName });
      // resolve({
      //   status: 'Success Type',
      //   message: 'Type thành công',
      //   data: typeProduct
      // });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  deleteMany,
  searchProduct,
  getAllType,
  pageTypeProduct
};
