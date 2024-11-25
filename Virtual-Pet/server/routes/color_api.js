const express = require("express");
const router = express.Router();
const connectToMongoDatabase = require("../db/mongoConnection");

router.get("/", async (req, res) => {
  const { species_id, color_id } = req.query;

  if (!species_id || !color_id) {
    return res.status(400).json({ error: "Missing species_id or color_id" });
  }

  try {
    const db = await connectToMongoDatabase();

    // Fetch the default mood from the moods collection
    const defaultMood = await db.collection("moods").findOne({ mood_name: "default" });
    if (!defaultMood) {
      return res.status(404).json({ error: "Default mood not found" });
    }

    // Fetch the sprite matching species_id, color_id, and default mood_id
    const sprite = await db.collection("sprites").findOne({
      species_id: parseInt(species_id, 10),
      color_id: parseInt(color_id, 10),
      mood_id: defaultMood.id, // Match using the default mood ID
    });

    if (!sprite) {
      return res.status(404).json({ error: "Sprite not found for the given parameters" });
    }

    res.status(200).json({ spriteUrl: sprite.image_url });
  } catch (error) {
    console.error("Error fetching sprite:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
