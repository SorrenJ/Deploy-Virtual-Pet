const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from the .env file

// Import the pool from db.js to handle PostgreSQL queries
// const pool = require('./db/db'); 

const connectToMongoDatabase = require('./db/mongoConnection');





const app = express();

const main = async () => {
    const db = await connectToMongoDatabase();

    // Example: Fetch all documents from the 'foods' collection
    const all = await db.collection('allall').find().toArray();
    console.log("All:", all);
};

main().catch(console.error);




// Middleware

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://virtual-pet-frontend-y0c7.onrender.com']
  : ['http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Parse incoming JSON requests
app.use(bodyParser.json());
app.use(express.json());

// Serve static files from the "db" directory (if needed)
// app.use('/db', express.static('db'));

// Set up EJS as the templating engine (if needed)
app.set('view engine', 'ejs');





// Connect to MongoDB
const connectMongoDB = async () => {
    db = await connectToMongoDatabase();
  };
  
  // Call the connection function when the server starts
  connectMongoDB().catch(console.error);


// Routes
app.get('/api/all', async (req, res) => {
    try {
      // Fetch data from the MongoDB collection
      const all = await db.collection('all').find().toArray();
      res.status(200).json(all);
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server error');
    }
  });


// Routes

// Importing routes from separate files
const convertScoreRoutes = require('./routes/convert-score');
const speciesApiRoute = require('./routes/species_api');
const petApiRoute = require('./routes/pet_api');
const userPetsApi = require('./routes/user_pet_api');
const homeApiRoute = require('./routes/home_api');
const cleanApiRoute = require('./routes/clean_pet_api');
const feedApiRoute = require('./routes/feed_pet_api');
const playApiRoute = require('./routes/play_with_pet_api');
const itemApiRoute = require('./routes/inventory_api');
const statsApiRoute = require('./routes/pets_stats_api');
const colorApiRoute = require('./routes/color_api')
const sleepApiRoute = require('./routes/sleep_pet_api');
const deleteApiRoute = require('./routes/delete_pet_api');
const databaseRoutes = require('./routes/databaseRoutes');
// Register routes
app.use('/api/convert-score', convertScoreRoutes);
app.use('/api/pets', petApiRoute);
app.use('/api/species', speciesApiRoute);
app.use('/api/user-pets', userPetsApi); // Changed to avoid duplicate paths
app.use('/api/home', homeApiRoute);
app.use('/api/clean-pet', cleanApiRoute);
app.use('/api/feed-pet', feedApiRoute);
app.use('/api/play-with-pet', playApiRoute);
app.use('/api/inventory', itemApiRoute);
app.use('/api/pets-stats', statsApiRoute);
app.use('/api/species/sprite', colorApiRoute)
app.use('/api/sleep-pet', sleepApiRoute);
app.use('/api/delete-pet', deleteApiRoute);
app.use('/api', databaseRoutes);

// Start the server on port 5000
// const PORT = process.env.PORT || 5000;

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// Example: Adoption Route using MongoDB
app.post('/api/adopt-pet', async (req, res) => {
    const { species_id, color_id } = req.body; // Get species_id and color_id from the request
    const userId = 1; // Hardcoded user ID for now

    console.log('Received species_id:', species_id, 'and color_id:', color_id); // Debug log

    try {
        // Fetch the appropriate sprite_id based on the selected species_id, mood, and color
        const sprite = await db.collection('all').findOne({
            species_id: species_id,
            color_id: color_id,
            mood_id: await db.collection('all').findOne({ mood_name: 'default' }).then((mood) => mood?._id),
        });

        if (!sprite) {
            console.log('No matching sprite found for the given species and color.');
            return res.status(400).json({ error: 'No matching sprite found for the given species and color.' });
        }

        const sprite_id = sprite._id; // Get the sprite ID

        // Insert the new pet (without name initially)
        const newPet = {
            user_id: userId,
            species_id: species_id,
            age: 1, // Hardcoded age
            adopted_at: new Date(), // Current timestamp
            sprite_id: sprite_id,
            mood_id: await db.collection('all').findOne({ mood_name: 'default' }).then((mood) => mood?._id),
            color_id: color_id,
            personality_id: await db.collection('all').findOne({ personality_name: 'Gloomy' }).then((personality) => personality?._id),
            update_time: new Date(),
            energy: 100,
            happiness: 100,
            hunger: 100,
            cleanliness: 100,
        };

        const result = await db.collection('all').insertOne(newPet);

        res.status(201).json(result.ops[0]); // Send the newly created pet back to the client
    } catch (err) {
        console.error('Error inserting pet:', err.message);
        res.status(500).send('Server error');
    }
});



  app.post('/api/adopt-pet', async (req, res) => {
    const { species_id, color_id } = req.body; // Get species_id and color_id from the request
    const userId = 1; // Hardcoded user ID for now

    console.log('Received species_id:', species_id, 'and color_id:', color_id); // Debug log

    try {
        // Fetch the appropriate sprite_id based on the selected species_id, mood, and color
        const sprite = await db.collection('all').findOne({
            species_id: species_id,
            color_id: color_id,
            mood_id: await db.collection('all').findOne({ mood_name: 'default' }).then((mood) => mood?._id),
        });

        if (!sprite) {
            console.log('No matching sprite found for the given species and color.');
            return res.status(400).json({ error: 'No matching sprite found for the given species and color.' });
        }

        const sprite_id = sprite._id; // Get the sprite ID

        // Insert the new pet (without name initially)
        const newPet = {
            user_id: userId,
            species_id: species_id,
            age: 1, // Hardcoded age
            adopted_at: new Date(), // Current timestamp
            sprite_id: sprite_id,
            mood_id: await db.collection('all').findOne({ mood_name: 'default' }).then((mood) => mood?._id),
            color_id: color_id,
            personality_id: await db.collection('all').findOne({ personality_name: 'Gloomy' }).then((personality) => personality?._id),
            update_time: new Date(),
            energy: 100,
            happiness: 100,
            hunger: 100,
            cleanliness: 100,
        };

        const result = await db.collection('all').insertOne(newPet);

        res.status(201).json(result.ops[0]); // Send the newly created pet back to the client
    } catch (err) {
        console.error('Error inserting pet:', err.message);
        res.status(500).send('Server error');
    }
});



app.post('/api/set-pet-name', async (req, res) => {
    const { pet_id, name } = req.body;
  
    try {
      const db = await connectToMongoDatabase();
  
      // Update the pet's name based on pet_id
      const result = await db.collection('all').findOneAndUpdate(
        { _id: pet_id },
        { $set: { name, update_time: new Date() } },
        { returnDocument: 'after' } // Return the updated document
      );
  
      if (!result.value) {
        return res.status(404).json({ error: 'No pet found to update.' });
      }
  
      res.status(200).json(result.value);
    } catch (err) {
      console.error('Error setting pet name:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  app.get('/shop', async (req, res) => {
    try {
      const db = await connectToMongoDatabase();
  
      // Fetch all toys, toiletries, foods, and user's money
      const toys = await db.collection('all').find().toArray();
      const toiletries = await db.collection('all').find().toArray();
      const foods = await db.collection('all').find().toArray();
      const inventory = await db.collection('all').findOne({ user_id: 1 }); // Replace 1 with actual user ID
  
      const money = inventory?.money || 0;
  
      res.json({ toys, toiletries, foods, money });
    } catch (err) {
      console.error('Error fetching shop data:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
// Buy route
app.post('/buy', async (req, res) => {
    const { userId, itemId, itemType, itemCount } = req.body;
  
    try {
      const db = await connectToMongoDatabase();
  
      // Get item price based on item type
      const item = await db.collection(itemType).findOne({ _id: itemId });
  
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      const totalCost = item.price * itemCount;
  
      // Fetch user's current money
      const inventory = await db.collection('all').findOne({ user_id: userId });
  
      if (!inventory || inventory.money < totalCost) {
        return res.status(400).json({ error: 'Not enough money' });
      }
  
      // Deduct money from inventory
      await db.collection('all').updateOne(
        { user_id: userId },
        { $inc: { money: -totalCost } }
      );
  
      // Check if the item already exists in the user's collection
      const userItemCollection = `user_${itemType}`;
      const userItem = await db.collection(userItemCollection).findOne({
        user_id: userId,
        item_type_id: itemId,
      });
  
      if (userItem) {
        // Update item count if it exists
        await db.collection(userItemCollection).updateOne(
          { user_id: userId, item_type_id: itemId },
          { $inc: { count: itemCount } }
        );
      } else {
        // Insert new item if it doesn't exist
        await db.collection(userItemCollection).insertOne({
          count: itemCount,
          user_id: userId,
          inventory_id: inventory._id,
          item_type_id: itemId,
          created_at: new Date(),
        });
      }
  
      res.status(200).json({ message: 'No refunds!' });
    } catch (err) {
      console.error('Error purchasing item:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

// Temporary add money route
app.post('/add-money', async (req, res) => {
    const { userId, amount } = req.body;
  
    try {
      const db = await connectToMongoDatabase();
  
      // Update user's money in the inventory
      const result = await db.collection('all').updateOne(
        { user_id: userId },
        { $inc: { money: amount } }
      );
  
      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: 'User inventory not found' });
      }
  
      res.status(200).json({ message: `$${amount} added to your balance` });
    } catch (err) {
      console.error('Error adding money:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

// Route to get all data from all tables
app.get('/all_tables', async (req, res) => {
    try {
      const db = await connectToMongoDatabase();
  
      // Fetch all data from collections
      const species = await db.collection('allspecies').find().toArray();
      const users = await db.collection('allusers').find().toArray();
      const pets = await db.collection('allpets').find().toArray();
      const moods = await db.collection('allmoods').find().toArray();
      const sprites = await db.collection('allsprites').find().toArray(); // Fetch sprites data
      const colors = await db.collection('allcolors').find().toArray();
      const personalities = await db.collection('allpersonalities').find().toArray(); // Fetch personalities data
  
      const inventory = await db.collection('allinventory').find().toArray();
      const userFood = await db.collection('alluser_foods').find().toArray();
      const userToiletries = await db.collection('alluser_toiletries').find().toArray();
      const userToys = await db.collection('alluser_toys').find().toArray();
      const shop = await db.collection('allshop').find().toArray();
      const toys = await db.collection('alltoys').find().toArray();
      const toiletries = await db.collection('alltoiletries').find().toArray();
      const foods = await db.collection('allfoods').find().toArray();
  
      // Render the EJS template and pass all the data to the template
      res.render('all_tables', {
        species,
        users,
        pets,
        moods,
        sprites, // Pass sprites data to the view
        colors,
        personalities, // Pass personalities data to the view
        inventory,
        userFood,
        userToiletries,
        userToys,
        shop,
        toys,
        toiletries,
        foods,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  



 

  

// Convert score to money


