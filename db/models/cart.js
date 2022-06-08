const client = require('../client');

module.exports = {
    createCart,
    removeFromCart,
    getCart
}
async function createCart({ userId, productId }) {
    try {
      console.log(userId, productId)
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
    // const cart = await getCart({ userId });
  console.log(userId, productId)
    // const oldProducts = cart.products;
    // const idArr = [];
    try {
      // if (oldProducts.length > 0) {
      //   const index = oldProducts.findIndex(
      //     (product) => product.id === productId
      //   );
  
      //   if (index !== -1) {
      //     oldProducts.splice(index, 1);
      //   }
  
      //   for (i = 0; i < oldProducts.length; i++) {
      //     idArr.push(oldProducts[i].id);
      //   }
  
        const {rows: [updatedCart],} = await client.query( `
          DELETE FROM cart 
          WHERE "userId" = $1 AND "productId" = $2 AND paid = false
          RETURNING *;`,[userId, productId]
        );
  
        return updatedCart;
      
      console.log(idArr)
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
        console.log(rows, "myCart")

      if (rows.length > 0) {
        const productArr = [];
          for (i = 0; i < rows.length; i++) {
            const {rows: [product],} = await client.query(`
              SELECT * FROM products
              WHERE id = ${rows[i].productId}
            `);
            rows[i].product = product;

        }
        console.log(rows, "Hello")
        return rows;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }