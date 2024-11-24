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
    const all = await db.collection('all').find().toArray();
    console.log("All:", all);
};

main().catch(console.error);




// Middleware

const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://virtual-pet-frontend-y0c7.onrender.com' // Deployed frontend
];

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
        const sprite = await db.collection('sprites').findOne({
            species_id: species_id,
            color_id: color_id,
            mood_id: await db.collection('moods').findOne({ mood_name: 'default' }).then((mood) => mood?._id),
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
            mood_id: await db.collection('moods').findOne({ mood_name: 'default' }).then((mood) => mood?._id),
            color_id: color_id,
            personality_id: await db.collection('personalities').findOne({ personality_name: 'Gloomy' }).then((personality) => personality?._id),
            update_time: new Date(),
            energy: 100,
            happiness: 100,
            hunger: 100,
            cleanliness: 100,
        };

        const result = await db.collection('pets').insertOne(newPet);

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
        const sprite = await db.collection('sprites').findOne({
            species_id: species_id,
            color_id: color_id,
            mood_id: await db.collection('moods').findOne({ mood_name: 'default' }).then((mood) => mood?._id),
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
            mood_id: await db.collection('moods').findOne({ mood_name: 'default' }).then((mood) => mood?._id),
            color_id: color_id,
            personality_id: await db.collection('personalities').findOne({ personality_name: 'Gloomy' }).then((personality) => personality?._id),
            update_time: new Date(),
            energy: 100,
            happiness: 100,
            hunger: 100,
            cleanliness: 100,
        };

        const result = await db.collection('pets').insertOne(newPet);

        res.status(201).json(result.ops[0]); // Send the newly created pet back to the client
    } catch (err) {
        console.error('Error inserting pet:', err.message);
        res.status(500).send('Server error');
    }
});




app.post('/api/set-pet-name', async (req, res) => {
    const { pet_id, name } = req.body;

    try {
        // Update the pet's name based on the pet_id
        const updatedPetResult = await pool.query(`
            UPDATE pets
            SET 
                name = $1,
                update_time = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING *
        `, [name, pet_id]);

        if (updatedPetResult.rowCount === 0) {
            return res.status(404).send('No pet found to update.');
        }

        res.status(200).json(updatedPetResult.rows[0]);
    } catch (err) {
        console.error('Error setting pet name:', err);
        res.status(500).send('Server error');
    }
});
app.get('/shop', async (req, res) => {
    try {
        const toysResult = await pool.query('SELECT * FROM toys');
        const toys = toysResult.rows;

        const toiletriesResult = await pool.query('SELECT * FROM toiletries');
        const toiletries = toiletriesResult.rows;

        const foodsResult = await pool.query('SELECT * FROM foods');
        const foods = foodsResult.rows;

        const moneyResult = await pool.query('SELECT money FROM inventory WHERE user_id = $1', [1]); // Replace 1 with actual user ID if available
        const money = moneyResult.rows[0] ? moneyResult.rows[0].money : 0; // Fallback to 0 if no money found

        // Send data as JSON response
        res.json({ toys, toiletries, foods, money });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Buy route
app.post('/buy', async (req, res) => {
  const { userId, itemId, itemType, itemCount } = req.body;

  try {
      // Get item price based on item type
      const itemResult = await pool.query('SELECT price FROM ' + itemType + ' WHERE id = $1', [itemId]);
      const item = itemResult.rows[0];

      if (!item) {
          return res.status(404).json({ error: 'Item not found' });
      }

      const totalCost = item.price * itemCount;

      // Update the user's money in the inventory
      const moneyResult = await pool.query('SELECT money FROM inventory WHERE user_id = $1', [userId]);

      // Check if the moneyResult has any rows
      if (moneyResult.rows.length === 0) {
          return res.status(404).json({ error: 'User inventory not found' });
      }

      const currentMoney = moneyResult.rows[0].money;

      if (currentMoney < totalCost) {
          return res.status(400).json({ error: 'Not enough money' });
      }

      // Deduct money from the inventory
      await pool.query('UPDATE inventory SET money = money - $1 WHERE user_id = $2', [totalCost, userId]);

      // Check if the item already exists in the user-specific table
      const userItemResult = await pool.query(`
          SELECT * FROM user_${itemType} 
          WHERE user_id = $1 AND item_type_id = $2
      `, [userId, itemId]);

      if (userItemResult.rows.length > 0) {
          // If it exists, update the count
          await pool.query(`
              UPDATE user_${itemType} 
              SET count = count + $1 
              WHERE user_id = $2 AND item_type_id = $3
          `, [itemCount, userId, itemId]);
      } else {
          // If it doesn't exist, insert a new row
          await pool.query(`
              INSERT INTO user_${itemType} (count, user_id, inventory_id, item_type_id) 
              VALUES ($1, $2, (SELECT id FROM inventory WHERE user_id = $2), $3)
          `, [itemCount, userId, itemId]);
      }

      res.status(200).json({message: 'No refunds!'});
  } catch (err) {
      console.error('Error purchasing item:', err);
      res.status(500).json({ error: 'Server error' });
  }
});

// Temporary add money route
app.post('/add-money', async (req, res) => {
  const { userId, amount } = req.body;


  try {
      // Update the user's money in the inventory
      await pool.query('UPDATE inventory SET money = money + $1 WHERE user_id = $2', [amount, userId]);
      
      res.status(200).json({ message: `$${amount} added to your balance` });
  } catch (err) {
      console.error('Error adding money:', err);
      res.status(500).json({ error: 'Server error' });
  }
});

// Route to get all data from all tables
// Route to get all data from all tables
app.get('/all_tables', async (req, res) => {
    try {
      // Queries for all tables
      const speciesQuery = 'SELECT * FROM species';
      const usersQuery = 'SELECT * FROM users';
      const petsQuery = 'SELECT * FROM pets';
      const moodsQuery = 'SELECT * FROM moods';
      const spritesQuery = 'SELECT * FROM sprites';  // Added sprites query
      const colorsQuery = 'SELECT * FROM colors';
      const personalitiesQuery = 'SELECT * FROM personalities';  // Added personalities query
  
      const inventoryQuery = 'SELECT * FROM inventory';
      const userFoodQuery = 'SELECT * FROM user_foods';
      const userToiletriesQuery = 'SELECT * FROM user_toiletries';
      const userToysQuery = 'SELECT * FROM user_toys';
      const shopQuery = 'SELECT * FROM shop';
      const toysQuery = 'SELECT * FROM toys';
      const toiletriesQuery = 'SELECT * FROM toiletries';
      const foodsQuery = 'SELECT * FROM foods';
  
      // Execute all queries
      const species = await pool.query(speciesQuery);
      const users = await pool.query(usersQuery);
      const pets = await pool.query(petsQuery);
      const moods = await pool.query(moodsQuery);
      const sprites = await pool.query(spritesQuery);  // Fetch sprites data
      const colors = await pool.query(colorsQuery);
      const personalities = await pool.query(personalitiesQuery);  // Fetch personalities data
  
      const inventory = await pool.query(inventoryQuery);
      const userFood = await pool.query(userFoodQuery);
      const userToiletries = await pool.query(userToiletriesQuery);
      const userToys = await pool.query(userToysQuery);
      const shop = await pool.query(shopQuery);
      const toys = await pool.query(toysQuery);
      const toiletries = await pool.query(toiletriesQuery);
      const foods = await pool.query(foodsQuery);
  
      // Render the EJS template and pass all the data to the template
      res.render('all_tables', {
        species: species.rows,
        users: users.rows,
        pets: pets.rows,
        moods: moods.rows,
        sprites: sprites.rows,  // Pass sprites data to the view
        colors: colors.rows,
        personalities: personalities.rows,  // Pass personalities data to the view
        inventory: inventory.rows,
        userFood: userFood.rows,
        userToiletries: userToiletries.rows,
        userToys: userToys.rows,
        shop: shop.rows,
        toys: toys.rows,
        toiletries: toiletries.rows,
        foods: foods.rows
      });
    } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Internal Server Error');
    }
  });
  



 

  

// Convert score to money


