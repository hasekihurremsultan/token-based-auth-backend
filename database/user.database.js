const db = require(".");
const { ObjectId } = require("mongodb");

const cursor = db.collection("users");

const getUserByEmailOrUsername = async (data) => {
    const query = {
        $or: [
            { username: data.username },
            { email: data.email }
        ]
    };

    return !!await cursor.findOne(query);
}

const createUser = async (userData) => {
    try {
        const { insertedId } = await cursor.insertOne(userData);
        console.log("User created successfully: ", insertedId);
        return insertedId;
    } catch (err) {
        console.error("Failed to create user: ", err);
    }
}

const getUserByEmail = async email => {
    try {
        return await cursor.findOne({ email });
    } catch (err) {
        console.error("Error retrieving user by email: ", err);
    }
}

const getUserById = async userId => {
    try {
        return await cursor.findOne({ _id: new ObjectId(userId) });
    } catch (err) {
        console.error("Error retrieving user by id: ", err);
    }
}

module.exports = {
    getUserByEmailOrUsername,
    createUser,
    getUserByEmail,
    getUserById
}