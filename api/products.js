const express = require('express');
const productsRouter = express.Router();
const { Products } = require('../db');
const { getCategoryById } = require('../db/models/categories');


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


productsRouter.post('/', async (req, res, next) => {
    try {
        const { name, description, price, quantity, isActive, picture, categoryId } = req.body;
        const product = await Products.createProduct({ name, description, price, quantity, isActive, picture, categoryId });
        res.send(product);
    } catch (error) {
        throw error;
    }
})



productsRouter.patch('/:productId', async (req, res, next) => {

    try {
        const { productId } = req.params;
        const { name, description, price, quantity, isActive, picture, categoryId } = req.body;
        const originalProduct = await Products.getProductById(productId);

        const updatedProductValues = {};

        if(name) updatedProductValues.name = name;
        if(description) updatedProductValues.description = description;
        if(price) updatedProductValues.price = price;
        if(quantity) updatedProductValues.quantity = quantity;
        if(isActive !== undefined) updatedProductValues.isActive = isActive;
        if(picture) updatedProductValues.picture = picture;
        if(categoryId) updatedProductValues.categoryId = categoryId;

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
            return;
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
            return res.send({Error: 'This product does not exist and cannot be deleted'})
        }
        return res.send(`${product.name} has been deleted`)
    } catch (error) {
        throw error;
    }
})

productsRouter.delete('/category/:productId/:categoryId', async (req, res, next) => {
    try {
        const {productId, categoryId} = req.params;
        const category = await getCategoryById(categoryId);
        const deletedProduct_category = await Product_Categories.deleteProduct_category(productId, categoryId);
        if(!deletedProduct_category.rowCount) {
            console.error({
                name: 'DeletionError',
                message: 'This category does not exist for this product and cannot be deleted'
            })
            return res.send({Error: 'This category does not exist for this product and cannot be deleted'})
        }
        return res.send(`Category ${category.name} has been removed from this product`)

    } catch (error) {
        throw error;
    }
})


module.exports = productsRouter;