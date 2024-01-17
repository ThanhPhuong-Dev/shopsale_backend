const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');
const db = require('./config/db/connect');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();
const port = process.env.PORT || 2002;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

routes(app);
db.connect();

app.listen(port, () => {
  console.log(`Code backEnd Phia shopSale http://localhost:${port} `);
});
