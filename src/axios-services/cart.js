import axios from 'axios';


export async function getCartProducts() {
    try {
      const { data } = await axios.get(`/api/cart`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  export async function getCart(userId) {
    try {
      const { data } = await axios.get(`/api/cart/${userId}`);
      console.log (data)
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  export async function createCart (userId, productId) {
    try {
      console.log(userId)
      const { data } = await axios.post(`/api/cart/${userId}`, {productId});
      return data;
    } catch (error) {
      throw error;
    }
  }
  
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

