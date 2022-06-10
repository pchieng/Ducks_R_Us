import axios from 'axios';


  export async function getCart() {
    try {
      const userId = localStorage.getItem('userId')
      const { data } = await axios.get(`/api/cart/${userId}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  export async function createCart (userId, productId) {
    try {
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
        const { data } = await axios.delete(`/api/cart/${userId}/${productId}`, dataToSend);
        return data;
      }
    } catch (error) {
      throw error;
    }
  }
