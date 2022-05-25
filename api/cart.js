const express = require('express');
//const jwt = require("jsonwebtoken");
const cartRouter = express.Router();
const { Cart } = require('../db');

// function verifyToken(req, res, next) {
//     const bearerHeader = req.headers["authorization"];
//     if (typeof bearerHeader !== "undefined") {
//       const bearer = bearerHeader.split(" ");
//       const bearerToken = bearer[1];
//       req.token = bearerToken;
//       next();
//     } else {
//       res.sendStatus(403);
//     }
//   }

cartRouter.use((req, res, next) => {
    console.log('A request is being made to /cart');
    next();
});

cartRouter.get('/', async (req, res, next) => {
    try {
        const cart = await Cart.getCart({ userId: 1})
        res.send(cart)
      } catch (error) {
        throw error;
      }
    });

//     cartRouter.patch("/cart/remove", verifyToken, async (req, res, next) => {
//     const { userId, productId } = req.body;
//     try {
//       jwt.verify(req.token, "secretkey", async (err, authData) => {
//         if (err) {
//           res.send({ error: err, status: 403 });
//         } else {
//           const updatedCart = await removeFromCart({ userId, productId });
  
//           res.send({ updatedCart });
//         }
//       });
//     } catch (error) {
//       next(error);
//     }
//   });



    
module.exports = cartRouter;