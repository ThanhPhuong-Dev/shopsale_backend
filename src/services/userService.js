const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const checkEmail = await User.findOne({ email: email });
      if (checkEmail !== null) {
        resolve({
          status: 'Ok',
          message: 'the email is already'
        });
      }
      
      const hashedPassword = bcrypt.hashSync(password, 10);
      console.log(hashedPassword);
      const createUser = await User.create({
        name,
        email,
        password,
        confirmPassword,
        phone
      });

      if (createUser) {
        resolve({
          status: 'OK',
          message: 'Sussces',
          data: createUser
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { createUser };
