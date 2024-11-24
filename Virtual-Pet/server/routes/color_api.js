const express = require('express');
const router = express.Router();
const connectToMongoDatabase = require('../db/mongoConnection'); // MongoDB connection utility

router.get('/', async (req, res) => {
  const { species_id, color_id } = req.query;

  try {
    // Validate query parameters
    if (!species_id || !color_id) {
      return res.status(400).json({ error: 'Missing species_id or color_id' });
    }

    const db = await connectToMongoDatabase();

    // Fetch the default mood ID
    const defaultMood = await db.collection('moods').findOne({ mood_name: 'default' });
    if (!defaultMood) {
      return res.status(404).json({ error: 'Default mood not found' });
    }

    // Find the sprite based on species_id, color_id, and default mood_id
    const sprite = await db.collection('sprites').findOne({
      species_id: parseInt(species_id, 10),
      color_id: parseInt(color_id, 10),
      mood_id: defaultMood._id, // Use the ID of the default mood
    });

    if (!sprite) {
      return res.status(404).json({ error: 'Sprite not found' });
    }

    res.status(200).json({ spriteUrl: sprite.image_url });
  } catch (err) {
    console.error('Error fetching sprite:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
