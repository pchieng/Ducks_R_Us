const express = require('express');
const productsRouter = express.Router();
const {Products} = require('../db');

productsRouter.use((req, res, next) => {
    console.log('A request is being made to /products');
    next();
});

productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await Products.getAllProducts();
        return res.send(products);
    } catch (error) {
        throw error;
    }
})




module.exports = productsRouter;