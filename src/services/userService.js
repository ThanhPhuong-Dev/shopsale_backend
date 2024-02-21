const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken } = require('./jwtService');

const registerUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword } = newUser;
    try {
      const checkEmail = await User.findOne({ email: email });
      if (checkEmail !== null) {
        reject({
          status: 'ERR',
          message: 'Email Đã Được Sử Dụng!!!'
        });
      }
      if (password !== confirmPassword) {
        return reject({
          status: 'ERR',
          message: 'Mật Khẩu Không trùng Khớp!!!'
        });
      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const createUser = await User.create({
        name,
        email,
        password: hashedPassword
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

const loginUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = newUser;
    try {
      const checkUser = await User.findOne({ email: email });
      if (checkUser === null) {
        reject({
          status: 'ERR',
          message: 'Người Dùng Này Không Tồn Tại!!!'
        });
      }

      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        reject({
          status: 'ERR',
          message: 'Người Giùm Nhập Sai Mật Khẩu!!!'
        });
      }

      const access_token = await generalAccessToken({ id: checkUser.id, isAdmin: checkUser.isAdmin });
      const refresh_token = await generalRefreshToken({ id: checkUser.id, isAdmin: checkUser.isAdmin });

      if (checkUser) {
        resolve({
          status: 'OK',
          message: 'Sussces',
          access_token,
          refresh_token
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id, imageUrl, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { avatar, ...newData } = data;
      const checkUser = await User.findOne({ _id: id });
      if (checkUser === null) {
        resolve({
          status: 'Ok',
          message: 'the user is not defined'
        });
      }
      const updateUser = await User.findByIdAndUpdate(id, { ...data, avatar: imageUrl }, { new: true });
      if (checkUser) {
        resolve({
          status: 'OK',
          message: 'Sussces update',
          data: updateUser
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOneAndDelete({ _id: userID });
      if (checkUser === null) {
        resolve({
          status: 'Ok',
          message: 'the user is not defined'
        });
      }
      if (checkUser) {
        resolve({
          status: 'OK',
          message: 'Remove Success'
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.find({});
      if (checkUser) {
        resolve({
          status: 'OK',
          message: 'Success',
          checkUser
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsUser = (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: userID });
      if (checkUser === null) {
        resolve({
          status: 'ERR',
          message: 'the user is not defined'
        });
      }
      resolve({
        status: 'OK',
        message: 'Success',
        data: checkUser
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { registerUser, loginUser, updateUser, deleteUser, getAllUser, getDetailsUser };
