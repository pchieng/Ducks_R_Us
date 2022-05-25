import axios from 'axios';
import { getUserByUsername } from '../../db/models/user';

export async function getAllUsers() {
    try {
      const { data: users } = await axios.get('/api/users');
      return users;
    } catch (err) {
      console.error(err);
    }
  }


export async function register (userToRegister) {
    try{
        const { data } = await axios.post('/api/users',{
            email: userToRegister.email,
            username: userToRegister.username,
            password: userToRegister.password,
            deliveryAddress: userToRegister.deliveryAddress,
            isAdmin: userToRegister.isAdmin
        })
        return data
    }catch(err){
        console.error(err)
    }
}

export async function login () {
    try{
        const { data } = await axios.post('api/users')
    }catch(err){
        console.error(err)   
    }
}

 /*
//  LOGIN
export const login = async (username, password) => {  
  try{ const response  = await fetch(`${url}/users/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
     username: username,
     password: password
 })})
 const data = await response.json()
 console.log(data)
 localStorage.setItem("token", data.token);
 return data
} catch (error){
   console.error(error)
   alert("Error logging in: incorrect username or password")
}
} 
 */