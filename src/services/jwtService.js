const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const generalAccessToken = (payload) => {
  const access_token = jwt.sign(
    {
      ...payload
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: '10s' }
  );
  return access_token;
};

const generalRefreshToken = (payload) => {
  const refresh_token = jwt.sign(
    {
      ...payload
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
            status: 'ERR',
            message: 'the athencation'
          });
        }
        // console.log('user', user);
        const access_token = generalAccessToken({
          id: user?.id,
          isAdmin: user?.isAdmin
        });
        resolve({
          status: 'OK',
          message: 'Success',
          access_token: access_token
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
