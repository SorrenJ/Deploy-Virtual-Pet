const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const connectToDatabase = require('../db/mongoConnection'); // Updated import

router.use(bodyParser.json());
router.use(cors()); // Enable CORS for cross-origin requests

router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase(); // Get the database instance
        const userId = 1; // Hardcoded user ID for now (replace with session-based ID if needed)

        // Fetch inventory
        const inventory = await db.collection('inventory').find({ userId }).toArray();

        // Fetch counts from separate collections
        const userFoodCount = await db.collection('user_food_counts').findOne({ userId });
        const userToiletriesCount = await db.collection('user_toiletries_counts').findOne({ userId });
        const userToysCount = await db.collection('user_toy_counts').findOne({ userId });

        const foodCount = userFoodCount?.count || 0;
        const toiletriesCount = userToiletriesCount?.count || 0;
        const toysCount = userToysCount?.count || 0;

        // Fetch user food details
        const userFood = await db.collection('user_foods')
            .aggregate([
                { $match: { userId } },
                {
                    $lookup: {
                        from: 'foods',
                        localField: 'itemTypeId',
                        foreignField: '_id',
                        as: 'foodDetails'
                    }
                },
                { $unwind: '$foodDetails' },
                {
                    $project: {
                        count: 1,
                        itemTypeId: 1,
                        id: 1,
                        foodName: '$foodDetails.name',
                        foodImage: '$foodDetails.image',
                        description: '$foodDetails.description'
                    }
                }
            ])
            .toArray();

        // Fetch user toiletries details
        const userToiletries = await db.collection('user_toiletries')
            .aggregate([
                { $match: { userId } },
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
                    $project: {
                        count: 1,
                        itemTypeId: 1,
                        id: 1,
                        toiletriesName: '$toiletryDetails.name',
                        toiletryImage: '$toiletryDetails.image',
                        description: '$toiletryDetails.description'
                    }
                }
            ])
            .toArray();

        // Fetch user toys details
        const userToys = await db.collection('user_toys')
            .aggregate([
                { $match: { userId } },
                {
                    $lookup: {
                        from: 'toys',
                        localField: 'itemTypeId',
                        foreignField: '_id',
                        as: 'toyDetails'
                    }
                },
                { $unwind: '$toyDetails' },
                {
                    $project: {
                        count: 1,
                        itemTypeId: 1,
                        id: 1,
                        toysName: '$toyDetails.name',
                        toyImage: '$toyDetails.image',
                        description: '$toyDetails.description'
                    }
                }
            ])
            .toArray();

        // Send JSON response
        res.json({
            inventory,
            foodCount,
            toiletriesCount,
            toysCount,
            userFood,
            userToiletries,
            userToys
        });

    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Failed to fetch inventory' });
    }
});

module.exports = router;
