import axios from 'axios';

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
            isAdmin: userToRegister.isAdmin
        })
        localStorage.setItem("token", data.token)
        console.log(data)
        return data
    }catch(err){
        console.error(err)
    }
}

export async function login (userToLogin) {
    try{
        const { data } = await axios.post('/api/users',{
            username: userToLogin.username,
            password: userToLogin.password
        })

        localStorage.setItem("token", data.token)
        console.log(data)
        return data
    }catch(err){
        console.error(err)   
    }
}

 