import axios from 'axios';

export async function getAllUsers() {
    try {
      const { data: users } = await axios.get('/api/users');
      return users;
    } catch (err) {
      console.error(err);
    }
  }