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


module.exports = categoriesRouter;
