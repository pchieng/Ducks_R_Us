const client = require('../client');

module.exports = {
    createProduct_category

}


async function createProduct_category ({productId, categoryId}) {
    try {
        const { rows: [product_category]} = await client.query(`
        INSERT INTO product_categories ("productId", "categoryId")
        VALUES ($1, $2)
        RETURNING *
        `, [productId, categoryId]);
        return product_category;
    } catch (error) {
        throw error;
    }

}

async function getProduct_categoriesByProduct (productId) {
    try {
        const { rows: [product_categories]} = await client.query(`
        SELECT *
        FROM product_categories
        WHERE "productId"=$1
        `, [productId])
        return product_categories;
    } catch (error) {
        throw error;
    }
}