const ValidateEmail = require('../utils/validateEmail');
const UserService = require('../services/userService');
const jwtService = require('../services/jwtService');
const uploadToCloudinary = require('../utils/uploadToCloudinary');
class UserControllers {
  // [POST] /user/register
  async register(req, res, next) {
    try {
      const { email, password, confirmPassword } = req.body;
      const isCheckEmail = ValidateEmail(email);
      if (!email || !password || !confirmPassword) {
        return res.status(400).json({
          status: 'ERR',
          message: 'The input required!!!'
        });
      } else if (!isCheckEmail) {
        return res.status(400).json({
          message: { status: 'ERR', message: 'Mời Nhập Email Chính Xác!!!' }
        });
      }
      // else if (password !== confirmPassword) {
      //   return res.status(400).json({
      //     status: 'ERR',
      //     message: 'Mật Khẩu Không trùng Khớp!!!'
      //   });
      // }

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
      const { email, password } = req.body;
      const isCheckEmail = ValidateEmail(email);
      if (!email || !password) {
        return res.status(400).json({
          status: 'ERR',
          message: 'The login required'
        });
      } else if (!isCheckEmail) {
        return res.status(400).json({
          message: { status: 'ERR', message: 'Mời Nhập Email Chính Xác!!!' }
        });
      }
      const response = await UserService.loginUser(req.body);
      const { refresh_token, ...newResponse } = response;
      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false
      });
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
      let imageUrl;
      if (req.file) {
        imageUrl = await uploadToCloudinary(req.file.path, { folder: 'avatars' });
      } else {
        imageUrl = req.body.avatar;
      }

      if (req.body.email) {
        const isCheckEmail = ValidateEmail(req.body.email);
        if (!isCheckEmail) {
          return res.status(400).json({
            message: {
              status: 'ERR',
              message: 'Email Chỉnh Sửa Không Chính Xác'
            }
          });
        }
      }

      const response = await UserService.updateUser(userID, imageUrl, req.body);
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
          status: 'ERR',
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
  // async refreshToken(req, res, next) {
  //   try {
  //     const token = req.cookies.refresh_token;
  //     // const token = req.body.refresh_token;
  //     if (!token) {
  //       return res.status(200).json({
  //         status: 'ERR',
  //         message: 'the token is required'
  //       });
  //     }
  //     const response = await jwtService.refreshTokenService(token);
  //     return res.status(200).json(response);
  //   } catch (e) {
  //     return res.status(400).json({
  //       message: e
  //     });
  //   }
  // }

  // [POST] api/user/log-out
  async logoutUser(req, res, next) {
    try {
      res.clearCookie('refresh_token');
      return res.status(200).json({
        status: 'OK',
        message: 'Log Out Success'
      });
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }

  async refreshToken(req, res, next) {
    try {
     
      const token = req.headers.token.split(' ')[1];
     
      if (!token) {
        return res.status(401).json({
          status: 'ERR',
          message: 'Token is missing in Authorization header'
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

  async LoadCoin(req, res, next) {
    try {
      const userID = req.params.id;

      if (!userID) {
        return res.status(400).json({
          message: 'Lỗi id'
        });
      }
      const response = await UserService.LoadCoin(userID, req.body);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }
}

module.exports = new UserControllers();
