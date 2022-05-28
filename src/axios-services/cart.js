import axios from 'axios';


export async function getCartProducts() {
    try {
      const { data } = await axios.get(`/api/cart`);
      return data;
    } catch (error) {
      throw error;
    }
  }


/* 
export async function removeFromCart(userId, productId) {
  const dataToSend = {
    userId,
    productId,
  };

  try {
    if (dataToSend.userId && dataToSend.productId) {
      const { data } = await axios.patch(`/api/cart/remove`, dataToSend);
      return data;
    }
  } catch (error) {
    throw error;
  }
}
*/
