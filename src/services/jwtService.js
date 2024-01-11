const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const generalAccessToken = (payload) => {
  const access_token = jwt.sign(
    {
      payload
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: '1h' }
  );
  return access_token;
};

const generalRefreshToken = (payload) => {
  const refresh_token = jwt.sign(
    {
      payload
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: '365d' }
  );
  return refresh_token;
};

const refreshTokenService = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) {
          resolve({
            status: 'ERROR',
            message: 'the athencation'
          });
        }
        const { payload } = user;
        const access_token = generalAccessToken({
          id: payload?.id,
          isAdmin: payload?.isAdmin
        });
        resolve({
          status: 'OK',
          message: 'Success',
          data: access_token
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  generalAccessToken,
  generalRefreshToken,
  refreshTokenService
};
