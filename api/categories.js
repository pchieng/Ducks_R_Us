const express = require('express');
const categoriesRouter = express.Router();
const { Categories } = require('../db');

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

categoriesRouter.get('/:categoryId', async (req, res, next) => {
    try {
        const {categoryId} = req.params;
        const category = await Categories.getCategoryById(categoryId);
        if (!category) {
            console.error({
                name: 'CategoryMissing',
                message: 'This category does not exist'
            })
            return res.send({Error: 'This category does not exist'})
        }
        return res.send(category.name);
    } catch (error) {
        throw error;
    }

})



categoriesRouter.delete('/:categoryId', async (req, res, next) => {

    try {
        const {categoryId} = req.params;
        const category = await Categories.getCategoryById(categoryId);
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
