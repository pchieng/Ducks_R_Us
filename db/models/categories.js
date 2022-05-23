const client = require('../client');

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    deleteCategory
};

async function createCategory ({name}) {
    try {
        const {rows: [category]} = await client.query(`
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING *
        `, [name])
        return category;
    } catch (error) {
        throw error;
    }
}

async function getAllCategories() {
    try {
        const {rows: categories} = await client.query(`
        SELECT *
        FROM categories
        `)
        return categories;
    } catch (error) {
        throw error;
    }
}

async function getCategoryById(categoryId) {
    try {
        const {rows: [category]} = await client.query(`
        SELECT *
        FROM categories
        WHERE id=$1
        `, [categoryId])
        return category;
    } catch (error) {
        throw error;
    }
}


async function deleteCategory(categoryId) {
    try {
        const category = await client.query(`
        DELETE FROM categories
        WHERE id=$1
        `, [categoryId]);
        return category;
    } catch (error) {
        throw error;
    }
}