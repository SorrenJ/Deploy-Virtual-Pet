const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://soalexjao:Bionicle20!0@cluster0.yymbu.mongodb.net/beastly_bonds_development";

let dbConnection;

const connectToDatabase = async () => {
    if (!dbConnection) {
        const client = new MongoClient(uri);
        dbConnection = client.db("beastly_bonds_development");
        console.log("Connected to MongoDB");
    }
    return dbConnection;
};

module.exports = connectToDatabase;
