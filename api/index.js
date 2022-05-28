const apiRouter = require('express').Router();
const {User} = require('../db');
const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

// token & login authorization stuff
apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  // if the auth header wasnt set
  if (!auth) { 
    next();
  //  if auth was set and begins with a Bearer followed by a space (prefix):
} else if (auth.startsWith(prefix)) {
  const token = auth.slice(prefix.length);
  console.log(token)
  
  try {
      const { id } = jwt.verify(token, JWT_SECRET);
      console.log(id)
      
      // if successful verification try to read the user from the database 
      if (id) {
          req.user = await User.getUserById(id);
          next();
      }
      // if failed verify throws error (in the catch block)
    } catch ({ name, message }) {
      next({ name, message });
    }
  //   user set a header but it wasnt formed correctly
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});

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