const express = require('express');
const usersRouter = express.Router()
const jwt = require('jsonwebtoken');
const {User} = require('../db');

usersRouter.use((req,res,next) => {
    console.log('A request is being made to /users');
    next();
})

usersRouter.get('/', async (req,res,next) => {
    try{
        const users = await User.getAllUsers()
        return res.send(users)
    }catch(error){
        throw error
    }
})

// REGISTER
usersRouter.post('/register', async (req, res, next) => {
    const {email, username, password} = req.body;
    const _user = await User.getUserByUsername(username);

    try {
      if (_user) {
        next({
          name: 'UserExistsError',
          message: 'A user by that username already exists'
        });
      }
      const newUser = await User.createUser({
        email,
        username,
        password   
      });
      console.log('TESTEST',newUser, process.env.JWT_SECRET); 
      const token = jwt.sign(newUser, process.env.JWT_SECRET);
      return res.send({ 
        user: newUser,
        message: "Thank you for signing up",
        token: token
      });
    } catch (error) {
      throw error
    } 
  });


// LOGIN 
usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
  
    // the request must have both for it to work
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password"
      });
    }
  
    try {
      const user = await User.getUserByUserName(username);
  
      if (user && user.password == password) {
        // create token & return to user
        console.log("process.env.JWT_SECRET",process.env.JWT_SECRET)
        const token = jwt.sign({ id: user.id, username: username }, process.env.JWT_SECRET,{
            expiresIn: '1w'
          } );
        console.log("token",token)
        const verifiedData = jwt.verify(token, process.env.JWT_SECRET)
        console.log("verifiedData",verifiedData)
        console.log("sending token...")
        // res.send(token)
        res.send({token, message: "you are logged in"});
      } else {
        next({ 
          name: 'IncorrectCredentialsError', 
          message: 'username or password is incorrect'
        });
      }
    } catch(error) {
      throw error
    }
  });


module.exports = usersRouter
