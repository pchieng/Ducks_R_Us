const express = require('express');
const cartRouter = express.Router();
const { Cart } = require('../db');


cartRouter.use((req, res, next) => {
    console.log('A request is being made to /cart');
    next();
});

cartRouter.get('/', async (req, res, next) => {
    try {
        const cart = await Cart.getCart({ userId: 1})
        console.log(cart);
        res.send(cart)
      } catch (error) {
        throw error;
      }
    });

    cartRouter.post('/:userId', async (req, res, next) => {
      try {
        const userId = req.params.userId
        const productId = req.body.productId
        console.log(userId, productId)
        const cart = await Cart.createCart ({userId, productId})
        console.log(cart);
        res.send(cart)
      }catch (error) {
        throw error;
      }
  });

    cartRouter.delete("/:productId", (req, res, next) => {
      Cart.removeFromCart({where: {productId: req.params.productId}})
          .then(() => res.send(204))
          .catch(next);
  });


    
module.exports = cartRouter;