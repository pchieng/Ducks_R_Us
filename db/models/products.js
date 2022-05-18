const client = require('../client');

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory
}


async function createProduct({ name, description, price, quantity, category, isActive }) {
    try {
        const {rows: [product]} = await client.query(`
        INSERT INTO products (name, description, price, quantity, category, "isActive")
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `, [name, description, price, quantity, category, isActive]);
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

async function getProductById(productId) {
    try {
        const {rows: [product]} = await client.query(`
        SELECT *
        FROM products
        WHERE id=$1;
        `, [productId])
        return product;
    } catch (error) {
        throw error;
    }
}

async function getProductsByCategory(category) {
    try {
        const {rows: products} = await client.query(`
        SELECT *
        FROM products
        WHERE category=$1;
        `, [category])
        return products;
    }catch (error){
        throw error;
    }
}