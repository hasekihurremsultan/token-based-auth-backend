const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

module.exports = client.db(process.env.DB_NAME);