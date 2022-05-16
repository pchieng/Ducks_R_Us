const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');


const {createProduct} = require('./models/products');
const { createUser } = require('./models/user');



async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Dropping all tables...");

    await client.query(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    `)

    console.log("Finished dropping all tables");

    // build tables in correct order
    console.log("Starting to build tables...");

    await client.query(`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price FLOAT NOT NULL
    )
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      "isAdmin" BOOLEAN DEFAULT false
    )
    `);

    console.log("Finished building all tables");

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
    
    // Creating dummy products
    console.log('Starting to create products...')

    const productsToCreate = [
      {name: 'Alpha Ducky', description: 'This is the first rubber ducky to ever be created.', quantity: 100, price: 9.99},
      {name: 'Sister Ducky', description: 'She is the sister of Alpha Ducky.', quantity: 100, price: 9.99},
      {name: 'Baby Ducky', description: 'Baby Duck Doo Doo doo doo doo doo..', quantity: 100, price: 7.99}
    ]

    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log('Products created:');
    console.log(products);

    console.log('Finished creating products!')

    // Creating dummy users
    console.log('Starting to create users...')

    const usersToCreate = [
      {email: 'DonnyD@gmail.com', username: 'DonnyD', password: 'OGduck31', isAdmin: false},
      {email: 'countduckula@gmail.com', username: 'TheCount', password: 'veggies1988', isAdmin: false},
      {email: 'BigDaff@gmail.com', username: 'Daffy', password: 'ihateporky', isAdmin: false},
      {email: 'admin@gmail.com', username: 'Admin', password: 'admin1', isAdmin: true},
      
    ]

    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('users created:');
    console.log(users);

    console.log('Finished creating users!')

  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
