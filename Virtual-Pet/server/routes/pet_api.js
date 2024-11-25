const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToMongoDatabase = require("../db/mongoConnection"); // MongoDB connection utility

router.use(bodyParser.json());
router.use(cors());

// Retrieve pets information
router.get("/", async (req, res) => {
  try {
    const db = await connectToMongoDatabase();

    // Check if the pets collection exists
    const petsCollectionExists = await db.listCollections({ name: "pets" }).hasNext();
    if (!petsCollectionExists) {
      return res.status(404).json({ error: "Pets collection not found in the database." });
    }

    // Aggregate pets with related data from species, moods, colors, sprites, and personalities
    const pets = await db
      .collection("pets")
      .aggregate([
        {
          $lookup: {
            from: "species",
            localField: "species_id",
            foreignField: "id",
            as: "species_info",
          },
        },
        {
          $lookup: {
            from: "moods",
            localField: "mood_id",
            foreignField: "id",
            as: "mood_info",
          },
        },
        {
          $lookup: {
            from: "colors",
            localField: "color_id",
            foreignField: "id",
            as: "color_info",
          },
        },
        {
          $lookup: {
            from: "sprites",
            localField: "sprite_id",
            foreignField: "id",
            as: "sprite_info",
          },
        },
        {
          $lookup: {
            from: "personalities",
            localField: "personality_id",
            foreignField: "id",
            as: "personality_info",
          },
        },
        {
          $project: {
            _id: 1, // Include MongoDB default ID
            name: 1,
            age: 1,
            adopted_at: 1,
            energy: 1,
            happiness: 1,
            hunger: 1,
            cleanliness: 1,
            species_name: { $arrayElemAt: ["$species_info.species_name", 0] },
            diet_desc: { $arrayElemAt: ["$species_info.diet_desc", 0] },
            mood_name: { $arrayElemAt: ["$mood_info.mood_name", 0] },
            color_name: { $arrayElemAt: ["$color_info.color_name", 0] },
            sprite_image_url: { $arrayElemAt: ["$sprite_info.image_url", 0] },
            personality_name: { $arrayElemAt: ["$personality_info.trait_name", 0] },
          },
        },
      ])
      .toArray();

    if (pets.length === 0) {
      return res.status(404).json({ error: "No pets found in the database." });
    }

    res.status(200).json(pets); // Return pets data as JSON
  } catch (err) {
    console.error("Error fetching pets:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
