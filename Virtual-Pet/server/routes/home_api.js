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

    // Fetch the user data
    const user = await db.collection("users").findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch all pets for the user
    const pets = await db.collection("pets").find({ user_id: userId }).toArray();
    if (pets.length === 0) {
      return res.json({ pets: [], selectedPet: null });
    }

    // Find the selected pet or default to the first pet
    const selectedPet = selectedPetId
      ? pets.find((pet) => pet.id === selectedPetId)
      : pets[0];

    if (!selectedPet) {
      return res.status(404).json({ error: "Selected pet not found" });
    }

    // Fetch inventory for the user
    const inventory = user.inventory || {};
    const foodCount = inventory.user_foods?.reduce((sum, food) => sum + food.count, 0) || 0;
    const toiletriesCount =
      inventory.user_toiletries?.reduce((sum, toiletry) => sum + toiletry.count, 0) || 0;
    const toysCount = inventory.user_toys?.reduce((sum, toy) => sum + toy.count, 0) || 0;

    // Fetch species data
    const speciesData = await db.collection("species").find().toArray();
    const speciesMap = Object.fromEntries(
      speciesData.map((species) => [species.id, species])
    );

    // Enhance pets with species data
    const petsWithSpecies = pets.map((pet) => {
      const petSpecies = speciesMap[pet.species_id];
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
      userFood: inventory.user_foods || [],
      userToiletries: inventory.user_toiletries || [],
      userToys: inventory.user_toys || [],
    });
  } catch (error) {
    console.error("Error fetching home data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
