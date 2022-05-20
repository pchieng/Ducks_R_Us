const client = require('../client');

module.exports = {
    createProduct,
    getAllProducts,
    getAllActiveProducts,
    getProductById,
    getActiveProductsByCategory,
    updateProduct,
    deleteProduct
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

async function getAllActiveProducts() {
    try {
        const {rows: products} = await client.query(`
        SELECT *
        FROM products
        WHERE "isActive"=true;
        `)
        return products;
    } catch (error) {
        throw error;
    }
}

async function getAllProducts() {
    try {
        const {rows: products} = await client.query(`
        SELECT *
        FROM products;
        `)
        return products;
    } catch (error) {
        throw error;
    }
}

async function updateProduct({productId, name, description, price, quantity, category, isActive }) {
    try {
        const { rows: [product] } = await client.query(`
        UPDATE products
        SET name=$1, description=$2, price=$3, quantity=$4, category=$5, "isActive"=$6
        WHERE id=$7
        RETURNING *;
        `, [name, description, price, quantity, category, isActive, productId])
        console.log(productId)
        return product;
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

async function getActiveProductsByCategory(category) {
    try {
        const {rows: products} = await client.query(`
        SELECT *
        FROM products
        WHERE category=$1 AND "isActive"=true;
        `, [category])
        console.log(products)
        return products;
    }catch (error){
        throw error;
    }
}


async function deleteProduct(productId) {
    try {
        const product = await client.query(`
        DELETE FROM products
        WHERE id=$1;
        `, [productId]);
        return (product)
    } catch (error) {
        throw error;
    }
}