const express = require('express');
const cartRouter = express.Router();
const { Cart } = require('../db');


cartRouter.use((req, res, next) => {
    console.log('A request is being made to /cart');
    next();
});
cartRouter.get('/', async (req, res, next) => {
  try {
      const userId = req.body.userId
      const cart = await Cart.getCart({ userId })
      res.send(cart)
    } catch (error) {
      throw error;
    }
  });

cartRouter.get('/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId
        const cart = await Cart.getCart({ userId })
        res.send(cart)
      } catch (error) {
        throw error;
      }
    });

    cartRouter.post('/:userId', async (req, res, next) => {
      try {
        const userId = req.params.userId
        const productId = req.body.productId
        const cart = await Cart.createCart ({userId, productId})
        res.send(cart)
      }catch (error) {
        throw error;
      }
  });

    cartRouter.delete("/:userId/:productId", async (req, res, next) => {
      try{
        const userId = req.params.userId
        const productId = req.params.productId
        const cart = await Cart.removeFromCart ({userId, productId})
        console.log(cart);
        res.send(cart)
      }catch (error) {
        throw error;
      }
    });

module.exports = cartRouter;