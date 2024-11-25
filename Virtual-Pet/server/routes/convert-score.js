const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb'); // Import ObjectId for MongoDB validation
const db = require('../db/mongoConnection'); // MongoDB connection

// Convert score to money
router.post('/', async (req, res) => {
    const { userId, score } = req.body;
    const moneyPerScore = 10;
    const moneyEarned = score * moneyPerScore;

    try {
        // Validate userId format
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        // Update the user's money in the inventory
        const updateResult = await db.collection('all').findOneAndUpdate(
            { userId: new ObjectId(userId) },
            { $inc: { money: moneyEarned } }, // Increment money by the earned amount
            { returnDocument: 'after' } // Return the updated document
        );

        if (!updateResult.value) {
            return res.status(404).json({ error: 'Inventory not found for the user' });
        }

        const updatedMoney = updateResult.value.money || 0;

        // Respond with the updated money amount
        res.json({ money: updatedMoney });
    } catch (error) {
        console.error('Error converting score:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
