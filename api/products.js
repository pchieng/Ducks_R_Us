const express = require('express');
const productsRouter = express.Router();
const { Products } = require('../db');


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

productsRouter.get('/active', async (req, res, next) => {
    try {
        const products = await Products.getAllActiveProducts();
        return res.send(products);
    } catch (error) {
        throw error;
    }
})

productsRouter.get('/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await Products.getProductById(productId);
        return res.send(product);
    } catch (error) {
        throw error;
    }
})

productsRouter.get('/category/:productCategory', async (req, res, next) => {
    try {
        const { productCategory } = req.params;
        const products = await Products.getActiveProductsByCategory(productCategory);
        return res.send(products);
    } catch (error) {
        throw error;
    }
})

productsRouter.post('/', async (req, res, next) => {
    try {
        const { name, description, price, quantity, category, isActive, picture } = req.body;
        const product = await Products.createProduct({ name, description, price, quantity, category, isActive, picture });
        res.send(product);
    } catch (error) {
        throw error;
    }
})



productsRouter.patch('/:productId', async (req, res, next) => {

    try {
        const { productId } = req.params;
        const { name, description, price, quantity, category, isActive, picture } = req.body;
        const originalProduct = await Products.getProductById(productId);

        const updatedProductValues = {};

        if(name) updatedProductValues.name = name;
        if(description) updatedProductValues.description = description;
        if(price) updatedProductValues.price = price;
        if(quantity) updatedProductValues.quantity = quantity;
        if(category) updatedProductValues.category = category;
        if(isActive !== null) updatedProductValues.isActive = isActive;
        if(picture) updatedProductValues.picture = picture;

        if (!originalProduct) {
            console.error({
                name: 'NoProductError',
                message: 'There is no product to update'
            })
        }


        if (parseInt(originalProduct.id) === parseInt(productId)) {
            const updatedProduct = await Products.updateProduct(productId, updatedProductValues);
            return res.send(updatedProduct)
        } else {
            console.error({
                name: 'InvalidUpdate',
                message: 'Product update could not be completed'
            });
        }
    } catch (error) {
        throw error;
    }

})


productsRouter.delete('/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await Products.getProductById(productId);
        const deletedProduct = await Products.deleteProduct(productId);
        if (!deletedProduct.rowCount) {
            console.error({
                name: 'DeletionError',
                message: 'This product does not exist and cannot be deleted'
            })
        }
        return res.send(`${product.name} has been deleted`)
    } catch (error) {
        throw error;
    }
})




module.exports = productsRouter;