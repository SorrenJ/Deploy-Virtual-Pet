const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToMongoDatabase = require("../db/mongoConnection"); // MongoDB connection utility

router.use(bodyParser.json());
router.use(cors());

// Route to fetch all pets by user ID
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  // Validate userId
  if (!userId) {
    return res.status(400).json({ error: "Invalid or missing user ID" });
  }

  try {
    const db = await connectToMongoDatabase();

    // Fetch pets for the given userId
    const pets = await db
      .collection("pets")
      .aggregate([
        { $match: { user_id: parseInt(userId) } },
        {
          $lookup: {
            from: "sprites",
            localField: "sprite_id",
            foreignField: "_id",
            as: "sprite_info",
          },
        },
        {
          $lookup: {
            from: "colors",
            localField: "color_id",
            foreignField: "_id",
            as: "color_info",
          },
        },
        {
          $project: {
            id: 1,
            name: 1,
            pet_image_url: { $arrayElemAt: ["$sprite_info.image_url", 0] },
            color_name: { $arrayElemAt: ["$color_info.color_name", 0] },
            mood_id: 1,
          },
        },
      ])
      .toArray();

    if (pets.length === 0) {
      return res.status(404).json({ error: "No pets found for this user" });
    }

    res.json(pets);
  } catch (error) {
    console.error("Error fetching pets:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to update a specific pet's image based on mood
router.put("/update-image/:userId/:petId", async (req, res) => {
  const { userId, petId } = req.params;
  const { mood_id } = req.body;

  try {
    const db = await connectToMongoDatabase();

    // Find the new sprite_id based on mood and color
    const pet = await db.collection("pets").findOne({ _id: parseInt(petId), user_id: parseInt(userId) });
    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    const newSprite = await db.collection("sprites").findOne({
      species_id: pet.species_id,
      color_id: pet.color_id,
      mood_id: mood_id,
    });

    if (!newSprite) {
      return res.status(404).json({ error: "Matching sprite not found for the mood" });
    }

    // Update the pet's mood_id and sprite_id
    await db.collection("pets").updateOne(
      { _id: parseInt(petId), user_id: parseInt(userId) },
      { $set: { mood_id: mood_id, sprite_id: newSprite._id } }
    );

    // Return the updated pet's image URL
    res.json({ pet_image_url: newSprite.image_url });
  } catch (error) {
    console.error("Error updating pet mood and sprite:", error);
    res.status(500).json({ error: "Failed to update pet mood and sprite" });
  }
});

module.exports = router;
