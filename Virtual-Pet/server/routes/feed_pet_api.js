const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../db/mongoConnection'); // Import your MongoDB connection

router.use(bodyParser.json());
router.use(cors());

// POST route to feed a pet
router.post('/', async (req, res) => {
    const { petId, foodId } = req.body; // Get petId and foodId from the request body
    const userId = 1; // Replace with actual userId from session or request
    console.log(`Feeding pet. User ID: ${userId}, Pet ID: ${petId}, Food ID: ${foodId}`); // Log details

    try {
        const petsCollection = db.collection('all');
        const foodsCollection = db.collection('all');
        const userFoodsCollection = db.collection('all');

        // Initialize hunger to 100 if it's currently null
        const pet = await petsCollection.findOneAndUpdate(
            { _id: petId, hunger: { $exists: false } },
            { $set: { hunger: 100 } },
            { returnDocument: 'after' }
        );

        // Fetch food's effect, count, and the pet's current hunger
        const food = await foodsCollection.findOne({ _id: foodId });
        const userFood = await userFoodsCollection.findOne({ userId, foodId });
        if (!food || !userFood || userFood.count <= 0) {
            console.log(`Food not found or insufficient count for user ${userId}`);
            return res.status(400).json({ error: 'Food not found or not enough count' });
        }

        const effect = food.effects || 0;
        const hunger = pet?.value?.hunger || 0;

        // Update the pet's hunger, ensuring it doesn't exceed the max limit
        const newHunger = Math.min(hunger + effect, 200); // Adjust max hunger to 200
        await petsCollection.updateOne(
            { _id: petId },
            { $set: { hunger: newHunger } }
        );

        // Decrease the food count in user_foods
        await userFoodsCollection.updateOne(
            { userId, foodId },
            { $inc: { count: -1 } }
        );

        res.json({ success: true, newHunger });
    } catch (error) {
        console.error('Error feeding pet:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
