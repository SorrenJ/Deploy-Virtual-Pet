// Import required libraries
const { MongoClient } = require('mongodb');
const fs = require('fs');

// MongoDB connection URI
const uri = "mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority";

// Database and collection names
const databaseName = "beastly_bonds";
const collections = ["foods", "toiletries", "user_foods"];

// File paths for your JSON files
const jsonFiles = {
    foods: "./data/foods.json",
    toiletries: "./data/toiletries.json",
    user_foods: "./data/user_foods.json"
};

// Function to load JSON data from files
const loadJSONData = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

// Main function
async function main() {
    const client = new MongoClient(uri);

    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        // Get the database
        const db = client.db(databaseName);

        // Insert data into collections
        for (const collectionName of collections) {
            const collection = db.collection(collectionName);
            
            // Load JSON data
            const jsonData = loadJSONData(jsonFiles[collectionName]);

            // Insert data
            await collection.insertMany(jsonData);
            console.log(`Inserted data into ${collectionName}`);
        }
    } catch (error) {
        console.error("Error connecting to MongoDB or inserting data:", error);
    } finally {
        // Close the connection
        await client.close();
        console.log("Connection closed");
    }
}

// Execute the script
main().catch(console.error);
