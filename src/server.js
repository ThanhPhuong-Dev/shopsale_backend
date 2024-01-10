const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
const bodyParser = require('body-parser');
const db = require('./config/db/connect');
dotenv.config();
const app = express();
const port = process.env.PORT || 2002;

app.use(bodyParser.json());
routes(app);
db.connect();
app.listen(port, () => {
  console.log(`Code backEnd Phia shopSale http://localhost:${port} `);
});
