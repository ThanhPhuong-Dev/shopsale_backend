const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const orderRouter = require('./orderRouter');

const routes = (app) => {
  app.use('/api/user', userRouter);
  app.use('/api/product', productRouter);
  app.use('/api/order', orderRouter);
};

module.exports = routes;
