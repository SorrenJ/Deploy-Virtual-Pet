const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../db/mongoConnection'); // Import the MongoDB connection

router.use(bodyParser.json());
router.use(cors()); // Enable CORS for cross-origin requests

// Route to delete a pet
router.delete('/:petId', async (req, res) => {
    const { petId } = req.params;

    try {
        // Attempt to delete the pet from the "pets" collection
        const result = await db.collection('all').deleteOne({ _id: petId });

        // Check if a pet was deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        res.json({ success: true, message: 'Pet deleted successfully' });
    } catch (error) {
        console.error('Error deleting pet:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
