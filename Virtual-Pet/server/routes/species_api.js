const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const connectToMongoDatabase = require('../db/mongoConnection');
router.use(bodyParser.json());
router.use(cors());

router.get('/', async (req, res) => {
  try {
    const db = await connectToMongoDatabase(); // Connect to MongoDB
    const result = await db.collection('all').findOne(); // Assuming a single document in the 'all' collection
    
    if (!result || !result.species) {
      return res.status(404).json({ error: 'Species data not found' }); // Handle missing data
    }

    res.status(200).json(result.species); // Send only the species array
  } catch (error) {
    console.error('Error fetching species:', error); // Log detailed error
    res.status(500).json({ error: 'Internal server error' }); // Return a 500 status with error details
  }
});

module.exports = router;
