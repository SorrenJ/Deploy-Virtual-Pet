const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../db/mongoConnection'); // Import the MongoDB connection

router.use(bodyParser.json());
router.use(cors()); // Enable CORS for cross-origin requests

router.post('/', async (req, res) => {
    const { petId, toiletriesId } = req.body; // Get petId and toiletriesId from the request body
    const userId = 1; // Hardcoded user ID (replace with session/user context if available)

    try {
        // Step 1: Fix any pets with NULL cleanliness by setting them to 100
        await db.collection('pets').updateOne(
            { _id: petId, cleanliness: { $exists: false } },
            { $set: { cleanliness: 100 } }
        );

        // Step 2: Fetch the toiletry's effect and the pet's current cleanliness
        const toiletryResult = await db.collection('user_toiletries')
            .aggregate([
                { $match: { userId, _id: toiletriesId } },
                {
                    $lookup: {
                        from: 'toiletries',
                        localField: 'itemTypeId',
                        foreignField: '_id',
                        as: 'toiletryDetails'
                    }
                },
                { $unwind: '$toiletryDetails' },
                {
                    $lookup: {
                        from: 'pets',
                        localField: 'userId', // Ensures the pet belongs to the user
                        foreignField: 'userId',
                        as: 'petDetails'
                    }
                },
                { $unwind: '$petDetails' },
                { $match: { 'petDetails._id': petId } },
                {
                    $project: {
                        effect: '$toiletryDetails.effects',
                        count: '$count',
                        cleanliness: '$petDetails.cleanliness'
                    }
                }
            ])
            .toArray();

        if (toiletryResult.length === 0) {
            return res.status(400).json({ error: 'Toiletry not found or insufficient count' });
        }

        let { effect, count, cleanliness } = toiletryResult[0];

        // Ensure effect and cleanliness are valid numbers (default to 0 if undefined)
        effect = effect || 0;
        cleanliness = cleanliness || 0;

        if (count <= 0) {
            return res.status(400).json({ error: 'No toiletry left to use' });
        }

        // Step 3: Update the pet's cleanliness
        const newCleanliness = Math.min(cleanliness + effect, 200); // Cap cleanliness at 200

        await db.collection('pets').updateOne(
            { _id: petId },
            { $set: { cleanliness: newCleanliness } }
        );

        // Step 4: Decrease the toiletries count for the user
        await db.collection('user_toiletries').updateOne(
            { userId, _id: toiletriesId },
            { $inc: { count: -1 } }
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Error cleaning pet:', error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
