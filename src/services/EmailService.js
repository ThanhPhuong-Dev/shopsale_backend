const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();

const sendEmailCreateOrder = async (email, orderItems) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  letOrderString = '';

  orderItems?.forEach(
    (product) =>
      (letOrderString += `<div>
  <div>Bạn đã đã đặt sản phẩm <b>${product.name} </div>
  <div>Có số lượng là : <b>${product.amount}</b> Giá là :<b>${Number(product.amount * product.price)}VND</b></div>
  <div style="width: 50px; height: 50px;"><img style="width: 100%; height: 100%;" src="${product.image}" alt=""></div>
  </div>`)
  );

  let info = await transporter.sendMail({
    from: process.env.EMAIL_ACCOUNT, // sender address
    to: email || 'ohphuong123@gmail.com', // list of receivers
    subject: 'Đơn hàng đã đặt của website https://www.facebook.com/profile.php?id=100015982263062', // Subject line
    text: `${orderItems}`, // plain text body
    html: `<div><b>Bạn đã đặt hàng thành công tại website thanhphuong</b></div> ${letOrderString}` // html body
  });
};

module.exports = { sendEmailCreateOrder };
