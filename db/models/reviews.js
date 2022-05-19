const client = require('../client');



async function createReview({ writerId, productId, starRating, body }) {
    try {
        const {rows: [review]} = await client.query(`
        INSERT INTO reviews ("writerId", "productId", "starRating", body)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [writerId, productId, starRating, body]);
        return review;
    } catch (error) {
        throw error;
    }
}

async function getAllReviews() {
    try {
        const {rows: reviews} = await client.query(`
        SELECT *
        FROM reviews
        `)
        return reviews;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createReview,
    getAllReviews

}