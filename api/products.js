const express = require('express');
const productsRouter = express.Router();
const {
    Products
} = require('../db');



productsRouter.use((req, res, next) => {
    console.log('A request is being made to /products');
    next();
});

productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await Products.getAllActiveProducts();
        return res.send(products);
    } catch (error) {
        throw error;
    }
})

productsRouter.get('/:productId', async (req, res, next) => {
    try {
        const {productId} = req.params;
        const product = await Products.getProductById(productId);
        return res.send(product);
    } catch (error) {
        throw error;
    }
})

productsRouter.get('/category/:productCategory', async (req, res, next) => {
    try {
        const {productCategory} = req.params;
        const products = await Products.getActiveProductsByCategory(productCategory);
        return res.send(products);
    } catch (error) {
        throw error;
    }
})



module.exports = productsRouter;