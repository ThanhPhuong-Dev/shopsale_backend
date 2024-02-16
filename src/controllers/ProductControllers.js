const ProductService = require('../services/productService');
const isNumberS = require('../utils/isNumer');

class ProductControllers {
  // [POST] /product/create
  async create(req, res, next) {
    try {
      console.log('chạydc');
      const { name, image, type, price, countInStock, rating, description, location, discount, sold } = req.body;
      // if (
      //   !name ||
      //   !image ||
      //   !type ||
      //   !price ||
      //   !countInStock ||
      //   !rating ||
      //   !description ||
      //   !location ||
      //   !discount ||
      //   !sold
      // ) {
      //   return res.status(400).json({
      //     message: {
      //       status: 'ERR',
      //       message: 'Mời Nhập Thông Tin Sản Phẩm'
      //     }
      //   });
      // }
      // console.log('isNumber(price)', isNumberS(price));
      if (isNumberS(price) || isNumberS(countInStock) || isNumberS(discount) || isNumberS(sold) || isNumberS(rating)) {
        return res.status(400).json({
          message: {
            status: 'ERR',
            message: 'Các Giá trị Phải Nhập Bằng Số'
          }
        });
      }
      console.log('chạydc');
      const response = await ProductService.createProduct(req.body);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }
  // [PUT] /product/update/:id
  async update(req, res, next) {
    try {
      const { name, image, type, price, countInStock, rating, description } = req.body;
      const productID = req.params.id;
      if (!name || !image || !type || !price || !countInStock || !rating || !description) {
        return res.status(400).json({
          status: 'EROOR',
          message: 'the product all required'
        });
      }
      const response = await ProductService.updateProduct(productID, req.body);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }

  // [GET] /product/getDetails/:id
  async getDetails(req, res, next) {
    try {
      const productID = req.params.id;
      if (!productID) {
        return res.status(200).json({
          status: 'ERROR',
          message: 'the productID is required'
        });
      }
      const response = await ProductService.getDetailsProduct(productID);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }

  // [DELETE] /product/delete/:id
  async deleteProduct(req, res, next) {
    try {
      const productID = req.params.id;
      if (!productID) {
        return res.status(200).json({
          status: 'ERROR',
          message: 'the productID is required'
        });
      }
      const response = await ProductService.deleteProduct(productID);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }

  async deleteMany(req, res, next) {
    try {
      const productID = req.body;
      if (!productID) {
        return res.status(400).json({
          status: 'ERR',
          message: 'the productID is required'
        });
      }
      const response = await ProductService.deleteMany(req.body);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }

  // [GET] /product/getAllProduct
  async getAllProduct(req, res, next) {
    try {
      const { page, limit, sort, filter } = req.query;
      console.log('limit', limit);
      const response = await ProductService.getAllProduct(Number(limit) || 12, Number(page) || 0, sort, filter);

      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }

  // [GET] /product/searchProduct
  async searchProduct(req, res, next) {
    try {
      const { filter } = req.query;
      console.log('req.body', req.query);
      const response = await ProductService.searchProduct(filter);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }
}

module.exports = new ProductControllers();
