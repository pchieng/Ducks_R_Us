import axios from 'axios';

export async function getAllUsers() {
    try {
      const { data: users } = await axios.get('/api/users');
      return users;
    } catch (err) {
      console.error(err);
    }
  }

/* need to change these over to axios 

// REGISTER 
export const register = async (username, password) => { 
    try{ 
      const response  = await fetch(`${url}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       username: username,
       password: password
     }
   )})
   const data = await response.json()
   console.log("response: ", data);
   localStorage.setItem("token", data.token)
 } catch (error){
     console.error(error)
     alert("Error registering: please supply a valid username & password")
 }
 } 

 */

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