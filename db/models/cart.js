const client = require('../client');

module.exports = {
    createCart,
    removeFromCart,
    getCart,
    clearCart
}
async function createCart({ userId, productId }) {
    try {
      const {rows: [cart],} = await client.query(`
        INSERT INTO cart("userId", "productId")
        VALUES ($1, $2)
        RETURNING *;`,[userId, productId]
      );
  
      return cart;
    } catch (error) {
      throw error;
    }
  }
  
  async function removeFromCart({ userId, productId }) {

    try { 
        const {rows: [updatedCart]} = await client.query( `
          DELETE FROM cart 
          WHERE "userId" = $1 AND "productId" = $2 AND paid = false
          RETURNING *;`,[userId, productId]
        );
        return updatedCart;
    } catch (error) {
      throw error;
    }
  }

  async function getCart({ userId }) {
    try {
      const { rows } = await client.query(
        `
        SELECT * FROM cart
        WHERE "userId" = $1 AND paid = false`,[userId]
      );

      if (rows.length > 0) {
          for (i = 0; i < rows.length; i++) {
            const {rows: [product],} = await client.query(`
              SELECT * FROM products
              WHERE id = ${rows[i].productId}
            `);
            rows[i].product = product;

        }
        return rows;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }


  async function clearCart({userId}) {
    try {
      const {rows: [updatedCart]} = await client.query (`
      DELETE FROM cart
      WHERE "userId" = $1
      RETURNING *;
      `, [userId])
    } catch (error) {
      throw error;
    }
  }