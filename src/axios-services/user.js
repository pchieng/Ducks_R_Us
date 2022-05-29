import axios from 'axios';

export async function getAllUsers() {
    try {
      const { data: users } = await axios.get('/api/users');
      return users;
    } catch (err) {
      console.error(err);
    }
  }
// still working on this for Admin front end rendering
export async function getCurrUser(username) {
    try{
        const { data: user} = await axios.get(`/api/users/${username}`);
        console.log(user)
        return user
    }catch(err){
        console.error(err)
    }
}

export async function register (userToRegister) {
    try{
        const { data } = await axios.post('/api/users/register',{
            email: userToRegister.email,
            username: userToRegister.username,
            password: userToRegister.password
        })
        localStorage.setItem("token", data.token)
        return data
    }catch(err){
        console.error(err)
    }
}

export async function login (userToLogin) {
    try{
        const { data } = await axios.post('/api/users/login',{
            username: userToLogin.username,
            password: userToLogin.password
        })

        localStorage.setItem("token", data.token)
        return data
    }catch(err){
        console.error(err)   
    }
}

 