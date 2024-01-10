const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

async function connect() {
  try {
    await mongoose.connect(`${process.env.MONGO_DB}`);
    console.log('Kết Nối thành công');
  } catch (e) {
    console.error('Lỗi kết nối ', e);
  }
}
module.exports = { connect };
