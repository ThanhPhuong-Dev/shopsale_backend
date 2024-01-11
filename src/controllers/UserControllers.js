const ValidateEmail = require('../utils/validateEmail');
const UserService = require('../services/userService');
const jwtService = require('../services/jwtService');

class UserControllers {
  // [POST] /user/register
  async register(req, res, next) {
    try {
      const { name, email, password, confirmPassword, phone } = req.body;
      const isCheckEmail = ValidateEmail(email);
      if (!name || !email || !password || !confirmPassword || !phone) {
        return res.status(200).json({
          status: 'EROOR',
          message: 'the input required'
        });
      } else if (!isCheckEmail) {
        return res.status(200).json({
          status: 'Error',
          message: 'the input email'
        });
      } else if (password !== confirmPassword) {
        return res.status(200).json({
          status: 'Error',
          message: 'the input passsww'
        });
      }
      const response = await UserService.registerUser(req.body);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }

  // [POST] /user/login
  async login(req, res, next) {
    try {
      const { name, email, password, confirmPassword, phone } = req.body;
      const isCheckEmail = ValidateEmail(email);
      if (!name || !email || !password || !confirmPassword || !phone) {
        return res.status(200).json({
          status: 'EROOR',
          message: 'the input required'
        });
      } else if (!isCheckEmail) {
        return res.status(200).json({
          status: 'Error',
          message: 'the input email'
        });
      } else if (password !== confirmPassword) {
        return res.status(200).json({
          status: 'Error',
          message: 'the input passsww'
        });
      }
      const response = await UserService.loginUser(req.body);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }

  // [PUT] /user/update/:id
  async updateUser(req, res, next) {
    try {
      const userID = req.params.id;
      const response = await UserService.updateUser(userID, req.body);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }

  // [DElETE] /user/delete/:id
  async deleteUser(req, res, next) {
    try {
      const userID = req.params.id;
      if (!userID) {
        return res.status(200).json({
          status: 'Error',
          message: 'the user is required'
        });
      }
      const response = await UserService.deleteUser(userID);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }

  // [GET] /user/getAllUser
  async getAllUser(req, res, next) {
    try {
      const response = await UserService.getAllUser();
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }

  // [GET] /user/get-details/:id
  async getDetailsUser(req, res, next) {
    try {
      const userID = req.params.id;
      if (!userID) {
        return res.status(200).json({
          status: 'Error',
          message: 'the user is required'
        });
      }
      const response = await UserService.getDetailsUser(userID);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }

  // [POST] /user/refresh-token
  async refreshToken(req, res, next) {
    try {
      const token = req.headers.token.split(' ')[1];
      if (!token) {
        return res.status(200).json({
          status: 'Error',
          message: 'the token is required'
        });
      }
      const response = await jwtService.refreshTokenService(token);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }
}

module.exports = new UserControllers();
