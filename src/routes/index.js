const userRouter = require('./user');

const routes = (app) => {
  app.use('/user', userRouter);
};

module.exports = routes;
