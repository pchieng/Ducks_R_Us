import axios from 'axios';

export async function getActiveProductsByCategory(category) {
    try {
      const {data} = await axios.get(`/api/products/category/${category}`);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  
  export async function getAllCategories() {
    try {
      const { data } = await axios.get(`/api/categories/`);
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  export async function getCategoryById(categoryId) {
    try  {
      const { data } = await axios.get(`/api/categories/${categoryId}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
  