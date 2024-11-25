const express = require("express");
const router = express.Router();
const connectToMongoDatabase = require("../db/mongoConnection");

router.use(express.json());

// Fetch all pets for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "Invalid or missing user ID" });
  }

  try {
    const db = await connectToMongoDatabase();

    // Fetch the `all` document
    const allDocument = await db.collection("all").findOne({});
    if (!allDocument || !allDocument.pets) {
      return res.status(404).json({ error: "No pets found in the collection" });
    }

    // Filter pets by `user_id`
    const userPets = allDocument.pets.filter((pet) => pet.user_id === parseInt(userId, 10));
    if (!userPets.length) {
      return res.status(404).json({ error: "No pets found for this user" });
    }

    // Enrich pets with related details
    const enrichedPets = userPets.map((pet) => {
      const species = allDocument.species.find((sp) => sp.id === pet.species_id);
      const color = allDocument.colors.find((col) => col.color_id === pet.color_id);
      const mood = allDocument.moods.find((md) => md.mood_name === "default"); // Default mood

      return {
        id: pet.id,
        name: pet.name,
        species_name: species ? species.species_name : "Unknown",
        color_name: color ? color.color_name : "Unknown",
        mood_name: mood ? mood.mood_name : "default",
        energy: pet.energy,
        happiness: pet.happiness,
        hunger: pet.hunger,
        cleanliness: pet.cleanliness,
      };
    });

    res.status(200).json(enrichedPets);
  } catch (error) {
    console.error("Error fetching user pets:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update pet image and mood
router.put("/update-image/:userId/:petId", async (req, res) => {
  const { userId, petId } = req.params;
  const { mood_id } = req.body;

  if (!mood_id || typeof mood_id !== "number") {
    return res.status(400).json({ error: "Invalid or missing mood_id" });
  }

  try {
    const db = await connectToMongoDatabase();

    // Fetch the `all` document
    const allDocument = await db.collection("all").findOne({});
    if (!allDocument || !allDocument.pets) {
      return res.status(404).json({ error: "No pets found in the collection" });
    }

    // Find the pet by `id` and `user_id`
    const petIndex = allDocument.pets.findIndex(
      (pet) => pet.id === parseInt(petId, 10) && pet.user_id === parseInt(userId, 10)
    );

    if (petIndex === -1) {
      return res.status(404).json({ error: "Pet not found" });
    }

    const pet = allDocument.pets[petIndex];

    // Find sprite for the new mood
    const newSprite = allDocument.sprites.find(
      (sprite) =>
        sprite.species_id === pet.species_id &&
        sprite.color_id === pet.color_id &&
        sprite.mood_id === mood_id
    );

    if (!newSprite) {
      return res.status(404).json({ error: "Sprite not found for this mood" });
    }

    // Update pet's mood_id and sprite_id
    allDocument.pets[petIndex] = {
      ...pet,
      mood_id,
      sprite_id: newSprite.sprite_id,
    };

    // Simulate saving the updated document
    await db.collection("all").replaceOne({}, allDocument);

    res.status(200).json({ pet_image_url: newSprite.image_url });
  } catch (error) {
    console.error("Error updating pet mood and sprite:", error);
    res.status(500).json({ error: "Failed to update pet mood and sprite" });
  }
});

module.exports = router;
