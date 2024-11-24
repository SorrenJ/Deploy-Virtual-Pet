const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://soalexjao:Bionicle20!0@cluster0.yymbu.mongodb.net/beastly_bonds_development";

const client = new MongoClient(uri);

let db;

const connectToDatabase = async () => {
    if (!db) {
        await client.connect();
        db = client.db('beastly_bonds_development'); // Replace with your database name
    }
    return db;
};

module.exports = connectToDatabase;