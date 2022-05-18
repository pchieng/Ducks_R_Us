const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');


const {
  createProduct
} = require('./models/products')



async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Dropping all tables...");

    await client.query(`
    DROP TABLE IF EXISTS products;
    `)

    console.log("Finished dropping all tables");

    // build tables in correct order
    console.log("Starting to build tables...");

    await client.query(`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      category VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price FLOAT NOT NULL,
      "isActive" BOOLEAN NOT NULL
    );
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
      {name: 'Alpha Ducky', description: 'This is the first rubber ducky to ever be created.', category: 'toys', quantity: 100, price: 9.99, isActive: true},
      {name: 'Sister Ducky', description: 'She is the sister of Alpha Ducky.', category: 'toys', quantity: 100, price: 9.99, isActive: true},
      {name: 'Baby Ducky', description: 'Baby Duck Doo Doo doo doo doo doo..', category: 'toys', quantity: 100, price: 7.99, isActive: true},
      {name: 'Ducky Shirt', description: 'Crew neck t-shirt with ducky logo', category: 'clothing', quantity: 100, price: 15.49, isActive: true},
      {name: 'Ducky Hat', description: 'White cap with ducky logo', category: 'clothing', quantity: 100, price: 19.99, isActive: true},
      {name: 'Ducky Umbrella', description: 'Large golf umbrella with ducky logos', category: 'miscellaneous', quantity: 50, price: 23.99, isActive: true}
    ]

    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log('Products created:');
    console.log(products);

    console.log('Finished creating products!')

  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
