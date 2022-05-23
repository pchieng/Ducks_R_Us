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
const cartRouter = require('./cart');
apiRouter.use('/cart', cartRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const usersRouter = require('./user');
apiRouter.use('/users', usersRouter);

const reviewsRouter = require('./reviews')
apiRouter.use('/reviews', reviewsRouter)

const categoriesRouter = require('./categories');
apiRouter.use('/categories', categoriesRouter)


module.exports = apiRouter;