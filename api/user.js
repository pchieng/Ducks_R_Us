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
    const _userByUsername = await User.getUserByUsername(username);
    const _userByEmail = await User.getUserByEmail(email);

console.log('TEST',_userByUsername, _userByEmail)
    try {
      if (_userByUsername || _userByEmail) {
        next({
          name: 'UserExistsError',
          message: 'A user with that username/email already exists'
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
      const user = await User.getUser({ username, password });
      console.log('TESTSETS',user)
      if (!user) {
        return next({ 
          name: 'IncorrectCredentialsError', 
          message: 'Username or password is incorrect'
        });
      }

      const token = jwt.sign(user, process.env.JWT_SECRET);
      process.env.token = token;

      return res.send({
        user: user,
        message: "You're logged in!",
        token: token
    })

    } catch(error) {
      throw error
    }
  });


module.exports = usersRouter
