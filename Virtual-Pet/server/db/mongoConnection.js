const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://soalexjao:Bionicle20!0@cluster0.yymbu.mongodb.net/";

let dbConnection;

const connectToDatabase = async () => {
    if (!dbConnection) {
        const client = new MongoClient(uri);
        dbConnection = client.db();
        console.log("Connected to MongoDB");
    }
    return dbConnection;
};

module.exports = connectToDatabase;
