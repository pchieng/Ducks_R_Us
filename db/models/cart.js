const client = require('../client');

module.exports = {
    createCart,
    // addToCart,
    // removeFromCart,
    getCart
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

//   async function addToCart({ userId, productId }) {
//     const cart = await getCart({ userId });
//     const cartId = cart.id;
//     const oldProducts = cart.products;
  
//     const newProducts = [];
//     if (oldProducts.length > 0) {
//       for (i = 0; i < oldProducts.length; i++) {
//         newProducts.push(oldProducts[i].id);
//       }
//       newProducts.push(...productId);
//     } else {
//       newProducts.push(...productId);
//     }
  
//     try {
//       const {rows: [updatedCart],} = await client.query(`
//         UPDATE cart
//         SET "productId" = $1, status = $2
//         WHERE "id" = $3
//         RETURNING *; `,[newProducts, "processing", cartId]
//       );
  
//       return updatedCart;
//     } catch (error) {
//       throw error;
//     }
//   }
  
//   async function removeFromCart({ userId, productId }) {
//     const cart = await getCart({ userId });
  
//     const oldProducts = cart.products;
//     const idArr = [];
//     try {
//       if (oldProducts.length > 0) {
//         const index = oldProducts.findIndex(
//           (product) => product.id === productId
//         );
  
//         if (index !== -1) {
//           oldProducts.splice(index, 1);
//         }
  
//         for (i = 0; i < oldProducts.length; i++) {
//           idArr.push(oldProducts[i].id);
//         }
  
//         const {rows: [updatedCart],} = await client.query( `
//           UPDATE cart 
//           SET "productId" = $1, status = $2 
//           WHERE "userId" = ${userId} 
//           RETURNING *;`,[idArr, "processing"]
//         );
  
//         return updatedCart;
//       }
//     } catch (error) {
//       throw error;
//     }
//   }

  async function getCart({ userId }) {
    try {
      const { rows } = await client.query(
        `
        SELECT * FROM cart
        WHERE "userId" = $1 AND paid = false`,[userId]
      );
  
      const cart = [];
      // for (let i = 0; i < rows.length; i++) {
      //   rows[i].status === "processing" ? cart.push(rows[i]) : null;
      // }
    console.log(rows)


      if (rows.length > 0) {
        const productArr = [];
        // if (cart.length > 0) {
        //   const products = cart[0].productId;
          for (i = 0; i < rows.length; i++) {
            const {rows: [product],} = await client.query(`
              SELECT * FROM products
              WHERE id = ${rows[i].productId}
            `);
            productArr.push(product);

        }
  
        // const products = rows[0].productId;
        // for (i = 0; i < products.length; i++) {
        //   const {rows: [product],} = await client.query(`
        //       SELECT * FROM products
        //       WHERE id = ${products[i]}
        //     `);
        //   productArr.push(product);
        // }
  
        return productArr;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }