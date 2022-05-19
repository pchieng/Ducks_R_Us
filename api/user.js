const express = require('express');
const usersRouter = express.Router()
const {User} = require('../db');

usersRouter.use((req,res,next) => {
    console.log('A request is being made to /users');
    next();
})

usersRouter.get('/', async (req,res,next) => {
    try{
        const users = await User.getAllUsers()
        console.log("displaying all users")
        return res.send(users)
    }catch(error){
        throw error
    }
})

module.exports = usersRouter
