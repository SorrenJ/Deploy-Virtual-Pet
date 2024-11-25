const express = require("express");
const router = express.Router();
const connectToMongoDatabase = require("../db/mongoConnection");

router.get("/database", async (req, res) => {
  try {
    const db = await connectToMongoDatabase();
    const collections = await db.listCollections().toArray(); // List all collections
    const databaseData = {};

    for (const collection of collections) {
      const collectionName = collection.name;
      try {
        const documents = await db.collection(collectionName).find({}).toArray();
        databaseData[collectionName] = documents;
      } catch (err) {
        console.error(`Error fetching documents for collection: ${collectionName}`, err);
      }
    }

    if (Object.keys(databaseData).length === 0) {
      return res.status(404).json({ error: "No collections or documents found in the database" });
    }

    res.status(200).json(databaseData);
  } catch (err) {
    console.error("Error fetching database collections:", err);
    res.status(500).json({ error: "Failed to fetch database collections" });
  }
});

module.exports = router;
