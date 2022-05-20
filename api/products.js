const express = require('express');
const productsRouter = express.Router();
const {Products} = require('../db');


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

productsRouter.post('/', async (req, res, next) => {
    try {
        const { name, description, price, quantity, category, isActive } = req.body;
        const product = await Products.createProduct({ name, description, price, quantity, category, isActive });
        return res.send(product);
    } catch (error) {
        throw error;
    }
})



productsRouter.patch('/:productId', async (req, res, next) => {

    try {
    const {productId} = req.params;
    const { name, description, price, quantity, category, isActive} = req.body;
    const originalProduct = await Products.getProductById(productId);

    if (!originalProduct) {
        next({
            name: 'NoProductError',
            message: 'There is no product to update'
        })
    }


    if (parseInt(originalProduct.id) === parseInt(productId)) {
        const updatedProduct = await Products.updateProduct({ productId: productId, name, description, price, quantity, category, isActive });

        return res.send(updatedProduct)
    } else {
        next({
            name: 'InvalidUpdate',
            message: 'Product update could not be completed'
        });
    }
    } catch (error) {
        throw error;
    }

})


module.exports = productsRouter;