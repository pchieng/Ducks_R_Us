const apiRouter = require('express').Router();


apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here
const productsRouter = require('./products');
const usersRouter = require('./user');
const reviewsRouter = require('./reviews')
apiRouter.use('/products', productsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/reviews', reviewsRouter)

module.exports = apiRouter;