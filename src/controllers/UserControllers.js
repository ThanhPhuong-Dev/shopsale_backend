const ValidateEmail = require('../utils/validateEmail');
const UserService = require('../services/userService');
class UserControllers {
  async create(req, res, next) {
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
      const response = await UserService.createUser(req.body);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        message: e
      });
    }
  }
}

module.exports = new UserControllers();
