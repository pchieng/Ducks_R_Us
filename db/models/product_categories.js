const client = require('../client');

module.exports = {
    createProduct_category,
    getProduct_categoriesByCategory,
    getProduct_categoriesByProduct,
    deleteProduct_categoriesByCategory,
    deleteProduct_category

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
        const { rows: product_categories} = await client.query(`
        SELECT *
        FROM product_categories
        WHERE "productId"=$1
        `, [productId])
        return product_categories;
    } catch (error) {
        throw error;
    }
}

async function getProduct_categoriesByCategory (categoryId) {
    try {
        const { rows: product_categories} = await client.query(`
        SELECT *
        FROM product_categories
        WHERE "categoryId"=$1
        `, [categoryId])
        return product_categories;
    } catch (error) {
        throw error;
    }
}

async function deleteProduct_categoriesByCategory (categoryId) {
    try {
        const product_categories = await client.query (`
        DELETE FROM product_categories
        WHERE "categoryId"=$1
        `, [categoryId])
        return product_categories;
    } catch (error) {
        throw error;
    }
}

async function deleteProduct_category (productId, categoryId) {
    try {
        const product_category = await client.query (`
        DELETE FROM product_categories
        WHERE "productId"=$1 AND "categoryId"=$2
        `, [productId, categoryId])
        return product_category;
    } catch (error) {
        throw error;
    }
}