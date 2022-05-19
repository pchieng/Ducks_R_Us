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
      {name: 'Alpha Ducky', description: 'This is the first rubber ducky to ever be created.', category: 'toys', quantity: 100, price: 9.99, isActive: true, pictureUrl: productPicturesToCreate.AlphaDuckyAlphaDucky},
      {name: 'Sister Ducky', description: 'She is the sister of Alpha Ducky.', category: 'toys', quantity: 100, price: 9.99, isActive: true, pictureUrl: productPicturesToCreate.SisterDucky},
      {name: 'Baby Ducky', description: 'Baby Duck Doo Doo doo doo doo doo..', category: 'toys', quantity: 100, price: 7.99, isActive: true, pictureUrl: productPicturesToCreate.BabyDucky},
      {name: 'Ducky Shirt', description: 'Crew neck t-shirt with ducky logo', category: 'clothing', quantity: 100, price: 15.49, isActive: true, pictureUrl: productPicturesToCreate.DuckyShirt},
      {name: 'Ducky Hat', description: 'White cap with ducky logo', category: 'clothing', quantity: 100, price: 19.99, isActive: true, pictureUrl: productPicturesToCreate.DuckyHat},
      {name: 'Ducky Umbrella', description: 'Large golf umbrella with ducky logos', category: 'miscellaneous', quantity: 50, price: 23.99, isActive: true, pictureUrl: productPicturesToCreate.DuckyUmbrella},
      {name: 'Boomer Ducky', description: 'This old ducky is no longer active.', category: 'toys', quantity: 0, price: 9.99, isActive: false, pictureUrl: productPicturesToCreate.BoomerDucky},
      {name: 'Duck', description: 'Bucephala albeola', category: 'miscellaneous', quantity: 20, price: 49.99, isActive: true, pictureUrl: productPicturesToCreate.Duck}
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
