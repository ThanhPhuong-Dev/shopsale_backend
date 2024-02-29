const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');
const db = require('./config/db/connect');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
// const cloudinaryConnect = require('./config/db/cloudinary');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-with,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});
const corsOptions = {
  origins: 'http://localhost:5173',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
};
app.use(express.json({ limit: '50mb' }));
app.use(cors(corsOptions));
// app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// cloudinaryConnect();
routes(app);
db.connect();

app.listen(port, () => {
  console.log(`Code backEnd Phia shopSale http://localhost:${port} `);
});
