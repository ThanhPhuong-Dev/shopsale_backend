const userRouter = require('./userRouter');
const productRouter = require('./productRouter');

const routes = (app) => {
  app.use('/user', userRouter);
  app.use('/product', productRouter);
};

module.exports = routes;
