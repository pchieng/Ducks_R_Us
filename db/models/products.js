const client = require('../client');



async function createProduct({ name, description, price, quantity }) {
    try {
        const {rows: [product]} = await client.query(`
        INSERT INTO products (name, description, price, quantity)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [name, description, price, quantity]);
        return product;
    } catch (error) {
        throw error;
    }
}

async function getAllProducts() {
    try {
        const {rows: products} = await client.query(`
        SELECT *
        FROM products
        `)
        return products;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createProduct,
    getAllProducts
}