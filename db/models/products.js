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


async function createProduct({ name, description, price, quantity, isActive, picture, categoryId }) {
    try {
        const {rows: [product]} = await client.query(`
        INSERT INTO products (name, description, price, quantity, "isActive", picture, "categoryId")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `, [name, description, price, quantity, isActive, picture, categoryId]);
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
        SELECT
            products.id,
            products.name,
            products.description,
            products.price,
            products.quantity,
            products."isActive",
            products.picture,
            categories.name AS category_name
        FROM products
        JOIN categories ON products."categoryId" = categories.id;
        `)
        return products;
    } catch (error) {
        throw error;
    }
}

async function updateProduct(productId, fields = {}) {

    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');
    
      if (setString.length === 0) {
        return;
      }

    try {
        const { rows: [product] } = await client.query(`
        UPDATE products
        SET ${setString}
        WHERE id=${productId}
        RETURNING *;
        `, Object.values(fields))
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