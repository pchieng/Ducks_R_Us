const {
  client,
  User,
  Products,
  Reviews
  // declare your model imports here
  // for example, User
} = require('./');



const {
  createProduct
} = require('./models/products')

const {
  createCart
} = require('./models/cart')



async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Dropping all tables...");

    await client.query(`

    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS reviews;
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
      "isActive" BOOLEAN NOT NULL,
      picture TEXT
    );

    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      "isAdmin" BOOLEAN DEFAULT false
    ); 
      CREATE TABLE cart (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER,
      "productId" INTEGER,
      paid BOOLEAN DEFAULT false
      );
    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      "writerId" INTEGER NOT NULL,
      "productId" INTEGER NOT NULL,
      "starRating" INTEGER NOT NULL,
      body TEXT NOT NULL
    )

    `);
    //   CREATE TABLE orders (
    //     id SERIAL PRIMARY KEY,
    //     "userId" INTEGER REFERENCES users(id),
    //     "cartId" INTEGER REFERENCES cart(id)
    //   );
    
    // );

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


    const productPicturesToCreate = {
      AlphaDucky: 'https://cdn11.bigcommerce.com/s-jnapaiw/images/stencil/1280x1280/products/2945/4049/Sunny_duck__52036.1400093435.jpg?c=2',
      SisterDucky: 'https://i5.walmartimages.com/asr/3593788e-22cd-4a3c-883b-e177ab0d97ef.1a27b3bf92f8f5628c5acf3fa9c447d4.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
      BabyDucky: 'https://amsterdamduckstore.com/wp-content/uploads/2015/10/baby-blue-rubber-duck-front-e1569756109220.jpg',
      DuckyShirt: 'https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C91PRUxw3EKL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UL1500_.png',
      DuckyHat: 'https://m.media-amazon.com/images/I/81ZmkBJewcL._AC_UL1500_.jpg',
      DuckyUmbrella: 'https://cdn.shopify.com/s/files/1/2280/6547/products/Rubber-Duck-Print-Pattern-Foldable-Umbrella_2d42b71f-050e-421e-b900-e5eef4ef336c_720x.jpg?v=1631332434',
      BoomerDucky: 'https://i.ebayimg.com/images/g/tCEAAOSwN~VeZDXh/s-l500.jpg',
      Duck: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Mallard2.jpg'
    }



    const productsToCreate = [
      {name: 'Alpha Ducky', description: 'This is the first rubber ducky to ever be created.', category: 'toys', quantity: 100, price: 9.99, isActive: true, picture: productPicturesToCreate.AlphaDucky},
      {name: 'Sister Ducky', description: 'She is the sister of Alpha Ducky.', category: 'toys', quantity: 100, price: 9.99, isActive: true, picture: productPicturesToCreate.SisterDucky},
      {name: 'Baby Ducky', description: 'Baby Duck Doo Doo doo doo doo doo..', category: 'toys', quantity: 100, price: 7.99, isActive: true, picture: productPicturesToCreate.BabyDucky},
      {name: 'Ducky Shirt', description: 'Crew neck t-shirt with ducky logo', category: 'clothing', quantity: 100, price: 15.49, isActive: true, picture: productPicturesToCreate.DuckyShirt},
      {name: 'Ducky Hat', description: 'White cap with ducky logo', category: 'clothing', quantity: 100, price: 19.99, isActive: true, picture: productPicturesToCreate.DuckyHat},
      {name: 'Ducky Umbrella', description: 'Large golf umbrella with ducky logos', category: 'miscellaneous', quantity: 50, price: 23.99, isActive: true, picture: productPicturesToCreate.DuckyUmbrella},
      {name: 'Boomer Ducky', description: 'This old ducky is no longer active.', category: 'toys', quantity: 0, price: 9.99, isActive: false, picture: productPicturesToCreate.BoomerDucky},
      {name: 'Duck', description: 'Bucephala albeola', category: 'miscellaneous', quantity: 20, price: 49.99, isActive: true, picture: productPicturesToCreate.Duck}
    ]

    const products = await Promise.all(productsToCreate.map(Products.createProduct));

    console.log('Products created:', products);

    // Creating dummy users
    console.log('Starting to create users...')

    const usersToCreate = [
      {email: 'DonnyD@hotmail.com', username: 'DonnyD', password: 'OGduck31', isAdmin: false},
      {email: 'countduckula@yahoo.com', username: 'TheCount', password: 'veggies1988', isAdmin: false},
      {email: 'BigDaff@utk.edu', username: 'Daffy', password: 'ihateporky', isAdmin: false},
      {email: 'admin@gmail.com', username: 'Admin', password: 'admin1', isAdmin: true},
      
    ]
    const users = await Promise.all(usersToCreate.map(User.createUser));

    console.log('users created:', users);

    // Creating dummy reviews
    console.log('Starting to create reviews...')

    const reviewsToCreate = [
        {writerId: 19, productId: 1, starRating: 5, body: 'This is literally the best duck ever made.'},
        {writerId: 63, productId: 2, starRating: 5, body: 'My 57 month old loved it! Would buy again!'},
        {writerId: 202, productId: 3, starRating: 1, body: 'Honestly so trash do not waste your money on this.'},
        {writerId: 48, productId: 3, starRating: 3, body: 'A good starting point for duck collectors but not the best.'}
    ]
    const reviews = await Promise.all(reviewsToCreate.map(Reviews.createReview));
console.log('reviews created:', reviews);

    console.log('Finished creating products!')
 
    const cartToCreate = [
    {userId: 1, productId:2},
    {userId: 1, productId:1}
 ]
    const cart = await Promise.all(cartToCreate.map(createCart))
 
  console.log("created Cart", cart);  

  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());