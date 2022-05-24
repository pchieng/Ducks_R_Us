import axios from 'axios';


export async function getAllActiveProducts() {
    try {
      const { data } = await axios.get('/api/products');
      return data;
    } catch (err) {
      console.error(err);
    }
}

export async function getProductById(productId) {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  
  export async function getActiveProductsByCategory(category) {
    try {
      const {data} = await axios.get(`/api/products/category/${category}`);
      return data;
    } catch (err) {
      console.error(err);
    }
  }