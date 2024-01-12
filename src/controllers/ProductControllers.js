const ProductService = require('../services/productService');

class ProductControllers {
  // [POST] /product/create
  async create(req, res, next) {
    try {
      const { name, image, type, price, countInStock, rating, description } = req.body;
      if (!name || !image || !type || !price || !countInStock || !rating || !description) {
        return res.status(200).json({
          status: 'EROOR',
          message: 'the product all required'
        });
      }
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
        return res.status(200).json({
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

  // [GET] /product/getAllProduct
  async getAllProduct(req, res, next) {
    try {
      const { page, limit, sort, filter } = req.query;

      const response = await ProductService.getAllProduct(Number(limit) || 8, Number(page) || 0, sort, filter);

      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }
}

module.exports = new ProductControllers();
