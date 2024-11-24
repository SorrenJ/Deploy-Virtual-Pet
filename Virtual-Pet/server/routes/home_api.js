const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToMongoDatabase = require("../db/mongoConnection");

router.use(bodyParser.json());
router.use(cors());

router.get("/", async (req, res) => {
  const userId = 1; // Hardcoded user ID for now
  const selectedPetId = parseInt(req.query.selectedPetId, 10); // Ensure selectedPetId is a number

  try {
    const db = await connectToMongoDatabase();

    // Fetch all pets for the user
    const pets = await db.collection("pets").find({ user_id: userId }).toArray();

    if (pets.length === 0) {
      return res.json({ pets: [], selectedPet: null });
    }

    // Find the selected pet or default to the first pet
    const selectedPet = selectedPetId
      ? pets.find((pet) => pet._id === selectedPetId)
      : pets[0];

    if (!selectedPet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    // Fetch the inventory for the user
    const inventory = await db
      .collection("inventory")
      .findOne({ user_id: userId });

    // Fetch counts for food, toiletries, and toys from user-specific collections
    const userFoods = await db.collection("user_foods").find({ user_id: userId }).toArray();
    const userToiletries = await db.collection("user_toiletries").find({ user_id: userId }).toArray();
    const userToys = await db.collection("user_toys").find({ user_id: userId }).toArray();

    // Summarize item counts
    const foodCount = userFoods.reduce((sum, item) => sum + item.count, 0);
    const toiletriesCount = userToiletries.reduce((sum, item) => sum + item.count, 0);
    const toysCount = userToys.reduce((sum, item) => sum + item.count, 0);

    // Fetch species data for pets
    const species = await db.collection("species").find().toArray();

    // Add species data to each pet
    const petsWithSpecies = pets.map((pet) => {
      const petSpecies = species.find((s) => s._id === pet.species_id);
      return {
        ...pet,
        species_name: petSpecies?.species_name || "Unknown",
        species_image: petSpecies?.image || null,
      };
    });

    res.json({
      pets: petsWithSpecies,
      selectedPet,
      inventory,
      foodCount,
      toiletriesCount,
      toysCount,
      userFood: userFoods,
      userToiletries: userToiletries,
      userToys: userToys,
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
