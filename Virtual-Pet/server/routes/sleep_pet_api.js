const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb"); // Import ObjectId for MongoDB ID validation
const db = require('../db/mongoConnection'); // Import MongoDB connection

router.patch('/:petId', async (req, res) => {
    const { petId } = req.params;
    const { amount } = req.body;

    try {
        // Validate the petId format
        if (!ObjectId.isValid(petId)) {
            return res.status(400).json({ error: "Invalid pet ID format" });
        }

        // Fetch the current pet stats
        const pet = await db.collection('pets').findOne({ _id: new ObjectId(petId) });

        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        // Calculate the new energy value
        const newEnergy = Math.max(0, (pet.energy || 0) + amount); // Ensure energy doesn't go below 0

        // Update the pet's energy in the database
        const result = await db.collection('pets').findOneAndUpdate(
            { _id: new ObjectId(petId) },
            { $set: { energy: newEnergy } },
            { returnDocument: 'after' } // Return the updated document
        );

        if (!result.value) {
            return res.status(500).json({ error: 'Failed to update pet energy' });
        }

        // Respond with success and the updated pet data
        res.json({
            success: true,
            pet: result.value, // The updated pet document
        });
    } catch (error) {
        console.error('Error updating pet energy:', error);
        res.status(500).json({ error: 'Failed to update pet energy' });
    }
});

module.exports = router;
