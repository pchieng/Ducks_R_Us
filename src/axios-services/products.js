import axios from 'axios';

export async function getAllProducts() {
    try {
      const { data } = await axios.get('/api/products');
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  
  
  export async function getAllActiveProducts() {
    try {
      const { data } = await axios.get('/api/products/active');
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
  
  
  export async function addNewProduct(productToAdd) {
    try {
      const { data } = await axios.post('/api/products', {
        name: productToAdd.name,
        description: productToAdd.description,
        categoryId: productToAdd.categoryId,
        quantity: productToAdd.quantity,
        price: productToAdd.price,
        isActive: productToAdd.isActive,
        picture: productToAdd.picture
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  
  export async function updateProduct(productId, updatedProductValues) {
    try {
      const {data} = await axios.patch(`/api/products/${productId}`, updatedProductValues);
      return data;
    } catch (err) {
      console.error(err)
    }
  }
  
  
  export async function deleteProduct(productId) {
    try {
      const { data } = await axios.delete(`/api/products/${productId}`);
      return data;
    } catch (error) {
      throw error;
    }
  }