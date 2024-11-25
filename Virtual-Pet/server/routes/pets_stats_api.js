const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const connectToMongoDatabase = require("../db/mongoConnection");

// Decrement pet stats
const decrementPetStats = async () => {
  console.time("decrementPetStats");
  try {
    const db = await connectToMongoDatabase();

    // Fetch pets along with their personality data
    const pets = await db
      .collection("pets")
      .aggregate([
        {
          $lookup: {
            from: "personalities",
            localField: "personality_id",
            foreignField: "id",
            as: "personality_info",
          },
        },
        { $unwind: "$personality_info" },
      ])
      .toArray();

    for (const pet of pets) {
      if (!pet.personality_info) {
        console.warn(`Pet with ID ${pet._id} has no personality data.`);
        continue;
      }

      const newStats = {
        energy: Math.max((pet.energy || 0) - pet.personality_info.energy_decay, 0),
        happiness: Math.max((pet.happiness || 0) - pet.personality_info.happiness_decay, 0),
        hunger: Math.max((pet.hunger || 0) - pet.personality_info.hunger_decay, 0),
        cleanliness: Math.max((pet.cleanliness || 0) - pet.personality_info.cleanliness_decay, 0),
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

// Start periodic updates
const intervalId = setInterval(decrementPetStats, 60000);

// Cleanup on shutdown
process.on("SIGTERM", () => {
  clearInterval(intervalId);
});

// Test Route
router.get("/test", (req, res) => {
  res.send("Pets stats API is working!");
});

// Fetch Pet Stats
router.get("/:petId", async (req, res) => {
  const { petId } = req.params;

  if (!ObjectId.isValid(petId)) {
    return res.status(400).json({ error: "Invalid pet ID format" });
  }

  try {
    const db = await connectToMongoDatabase();

    // Fetch pet along with related personality information
    const pet = await db
      .collection("pets")
      .aggregate([
        { $match: { _id: new ObjectId(petId) } },
        {
          $lookup: {
            from: "personalities",
            localField: "personality_id",
            foreignField: "id",
            as: "personality_info",
          },
        },
        { $unwind: "$personality_info" },
        {
          $project: {
            _id: 1,
            name: 1,
            age: 1,
            energy: 1,
            happiness: 1,
            hunger: 1,
            cleanliness: 1,
            personality_trait: "$personality_info.trait_name",
            energy_decay: "$personality_info.energy_decay",
            happiness_decay: "$personality_info.happiness_decay",
            hunger_decay: "$personality_info.hunger_decay",
            cleanliness_decay: "$personality_info.cleanliness_decay",
          },
        },
      ])
      .toArray();

    if (pet.length === 0) {
      return res.status(404).json({ error: "Pet not found" });
    }

    res.status(200).json(pet[0]);
  } catch (error) {
    console.error("Error fetching pet stats:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
