const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const app = express();
const port = process.env.PORT || 2002;

app.get('/', (req, res) => {
  res.send('heloo worddd');
});

console.log('process.env.MONGO_DB', process.env.MONGO_DB);
mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => console.log('thanh cong'))
  .catch((err) => console.log('Looi ket noi'));

app.listen(port, () => {
  console.log(`Code backEnd Phia shopSale http://localhost:${port} `);
});
