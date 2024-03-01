const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.access_token.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(400).json({
        message: 'the authemtications',
        status: 'ERR',
        error: err
      });
    }
    if (user?.isAdmin) {
      next();
    } else {
      return res.status(400).json({
        message: 'the authemticationn',
        status: 'ERR'
      });
    }
  });
};

const authUserMiddleware = (req, res, next) => {
  const token = req.headers.access_token.split(' ')[1];
  const userID = req.params.id;

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(400).json({
        message: 'the authemtication',
        status: 'ERR'
      });
    }
    console.log('user?.isAdmin', user?.isAdmin);
    if (user?.isAdmin || user?.id === userID) {
      next();
    } else {
      return res.status(400).json({
        message: 'the autheffmtication',
        status: 'ERR'
      });
    }
  });
};

module.exports = { authMiddleware, authUserMiddleware };
