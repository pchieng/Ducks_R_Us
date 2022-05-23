const client = require('../client');

module.exports = {
    createCategory,
    getAllCategories
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