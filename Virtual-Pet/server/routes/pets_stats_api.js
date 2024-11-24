const express = require("express");
const router = express.Router();
const connectToMongoDatabase = require("../db/mongoConnection"); // MongoDB connection utility

// Function to decrement pet stats
const decrementPetStats = async () => {
  console.time("decrementPetStats");
  try {
    const db = await connectToMongoDatabase();
    const pets = await db
      .collection("pets")
      .aggregate([
        {
          $lookup: {
            from: "personalities",
            localField: "personality_id",
            foreignField: "_id",
            as: "personality",
          },
        },
        {
          $unwind: "$personality",
        },
      ])
      .toArray();

    for (const pet of pets) {
      const newStats = {
        energy: Math.max(Math.floor(pet.energy - pet.personality.energy_decay), 0),
        happiness: Math.max(Math.floor(pet.happiness - pet.personality.happiness_decay), 0),
        hunger: Math.max(Math.floor(pet.hunger - pet.personality.hunger_decay), 0),
        cleanliness: Math.max(Math.floor(pet.cleanliness - pet.personality.cleanliness_decay), 0),
      };

      await db.collection("pets").updateOne(
        { _id: pet._id },
        { $set: newStats }
      );
    }

    console.timeEnd("decrementPetStats");
    console.log("Pet stats updated successfully.");
  } catch (error) {
    console.error("Error decrementing pet stats:", error);
  }
};

// Run the decrement function every 60 seconds
const intervalId = setInterval(() => {
  decrementPetStats();
}, 60000);

// Clear interval when the app shuts down
process.on("SIGTERM", () => {
  clearInterval(intervalId);
});

// Test route
router.get("/test", (req, res) => {
  res.send("Test route works!");
});

// Fetch pet stats for a specific pet
router.get("/:petId", async (req, res) => {
  const petId = req.params.petId;

  try {
    const db = await connectToMongoDatabase();
    const pet = await db.collection("pets").findOne({ _id: petId });

    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    res.json(pet);
  } catch (error) {
    console.error("Error fetching pet stats:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update pet's hunger
router.patch("/reduce-hunger/:petId", async (req, res) => {
  const petId = req.params.petId;
  const { amount } = req.body;

  try {
    const db = await connectToMongoDatabase();
    const pet = await db.collection("pets").findOne({ _id: petId });

    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    const newHunger = Math.max(0, pet.hunger + amount);
    await db.collection("pets").updateOne({ _id: petId }, { $set: { hunger: newHunger } });

    const updatedPet = await db.collection("pets").findOne({ _id: petId });
    res.json(updatedPet);
  } catch (error) {
    console.error("Error reducing hunger:", error);
    res.status(500).json({ error: "Failed to reduce hunger" });
  }
});

// Update other stats (energy, happiness, cleanliness) using similar patch routes

// Update pet's mood
router.patch("/update-mood/:petId", async (req, res) => {
  const petId = req.params.petId;
  let { moodId } = req.body;

  moodId = moodId && !isNaN(parseInt(moodId, 10)) ? parseInt(moodId, 10) : 1;

  try {
    const db = await connectToMongoDatabase();
    await db.collection("pets").updateOne({ _id: petId }, { $set: { mood_id: moodId } });

    res.status(200).json({ message: "Mood updated successfully" });
  } catch (error) {
    console.error("Error updating mood:", error);
    res.status(500).json({ error: "Failed to update mood" });
  }
});

// Fetch pet's sprite based on mood
router.get("/pet-sprite/:petId", async (req, res) => {
  const petId = req.params.petId;
  const { mood_id, color_id } = req.query;

  if (!mood_id || !color_id) {
    return res.status(400).json({ error: "Invalid or missing mood_id or color_id" });
  }

  try {
    const db = await connectToMongoDatabase();
    const pet = await db.collection("pets").findOne({ _id: petId });

    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    const sprite = await db.collection("sprites").findOne({
      species_id: pet.species_id,
      mood_id: parseInt(mood_id, 10),
      color_id: parseInt(color_id, 10),
    });

    if (!sprite) {
      return res.status(404).json({ error: "Sprite not found for this mood" });
    }

    res.json({ pet_image_url: sprite.image_url });
  } catch (error) {
    console.error("Error fetching sprite:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
