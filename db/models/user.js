// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require("bcrypt");

async function createUser({ email, username, password }) {
  try {
    const saltRounds = 10;
    const hashedPwd = await bcrypt.hash(password, saltRounds);

    const {rows: [user]} = await client.query(`
        INSERT INTO users(
            email,
            username,
            password 
        ) VALUES ($1, $2, $3)
        RETURNING *;
        `, [email, username, hashedPwd]
    );
    delete user.password;
    // console.log("createUser test:",user)
    return user;
  } catch (error) {

    throw error;
  }
}

async function getAllUsers() {
  try {
    const {rows: users} = await client.query(`
    SELECT * 
    FROM users
    `,[]) 
    return users
}catch(error){
  throw error
}
}

const getUserByUserId = async (userId) => {
  try{
    const { rows: [user] } = await client.query(`
      SELECT * 
      FROM users 
      WHERE id = $1;
      `, [userId]);
    delete user.password;
    return user;
  }catch (error){
  throw error
}
}

async function getUserByUsername(username) {
  try {
    const {rows: [user]} = await client.query(`
        SELECT *
        FROM users
        WHERE username = $1;
        `, [username]);
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  // add your database adapter fns here
  createUser,
  getAllUsers,
  getUserByUserId,
  getUserByUsername
};