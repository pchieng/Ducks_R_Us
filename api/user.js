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

// register a user
usersRouter.post('/register', async (req, res, next) => {
    const {email, username, password} = req.body;
    const _userByUsername = await User.getUserByUsername(username);
    const _userByEmail = await User.getUserByEmail(email);

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
        password,
        isAdmin: false   
      });
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


// login a user
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
  

// edit a individual user's profile information 
usersRouter.put("/:id", async (req, res, next) => {
  try {
    if (req.body.token) {
      let user = await User.findByToken(req.body.token);
      user.update(req.body.user);
      res.send(user);
    }
    // if user is guest only let them change non critical info
    else {
      let user = await User.findByPk(req.params.id);
      user.update({
        addressLine1: req.body.user.addressLine1,
        addressLine2: req.body.user.addressLine2,
        city: req.body.user.city,
        state: req.body.user.state,
        zipcode: req.body.user.zipcode,
      });
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter
