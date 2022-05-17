const express = require('express');
const reviewsRouter = express.Router()
const {Reviews} = require('../db')

reviewsRouter.use((req, res, next) => {
    console.log('A request is being made to /reviews');
    next();
});

reviewsRouter.get('/', async (req, res, next) => {
    try {
        // console.log('retrieving reviews')
        const reviews = await Reviews.getAllreviews();
        return res.send(reviews);
    } catch (error) {
        throw error;
    }
})


