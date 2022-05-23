const express = require('express');
const categoriesRouter = express.Router();
const { Categories, Product_Categories } = require('../db');

categoriesRouter.use((req, res, next) => {
    console.log('A request is being made to /categories');
    next();
});

categoriesRouter.get('/', async (req, res, next) => {
    try {
        const categories = await Categories.getAllCategories();
        return res.send(categories);
    } catch (error) {
        throw error;
    }
})

categoriesRouter.delete('/:categoryId', async (req, res, next) => {

    try {
        const {categoryId} = req.params;
        const category = await Categories.getCategoryById(categoryId);
        const product_categories = await Product_Categories.getProduct_categoriesByCategory(categoryId);
        if (product_categories) {
            await Product_Categories.deleteProduct_categoriesByCategory(categoryId);
        }
        const deletedCategory = await Categories.deleteCategory(categoryId);
    
        if (!deletedCategory.rowCount) {
            console.error({
                name: 'DeletionError',
                message: 'This category does not exist and cannot be deleted'
            })
            return res.send({Error: 'This category does not exist and cannot be deleted'});
        }
            return res.send(`Category ${category.name} has been deleted`)
        
    } catch (error) {
        throw error;
    }
})


module.exports = categoriesRouter;
