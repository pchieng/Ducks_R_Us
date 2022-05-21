import axios from 'axios';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export async function getAPIHealth() {
  try {
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

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

export async function addNewProduct({productToAdd}) {
  try {
    const { data } = await axios.post('/api/products', {
      name: productToAdd.name,
      description: productToAdd.description,
      category: productToAdd.category,
      quantity: productToAdd.quantity,
      price: productToAdd.price,
      isActive: productToAdd.isActive
    });
    return data;
  } catch (err) {
    console.error(err);
  }
}



export async function getAllUsers() {
  try {
    const { data: users } = await axios.get('/api/users');
    return users;
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

export async function getAllReviews() {
  try {
    const { data: reviews } = await axios.get('/api/reviews');
    return reviews;
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
