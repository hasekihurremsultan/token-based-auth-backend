const db = require(".");
const {ObjectId} = require("mongodb");

const cursor = db.collection("todos");

const createTodo = async payload => {
    try {
        const { insertedId, acknowledged } = await cursor.insertOne(payload);

        if (!acknowledged) {
            throw new Error("Failed to create new to-do");
        }

        return insertedId;
    } catch (error) {
        console.error(error);
    }
}

const getTodoById = async todoId => {
    try {
        return await cursor.findOne({ _id: new ObjectId(todoId) });
    } catch (error) {
        console.error("Todo not found with id: " + todoId);
    }
}

const deleteTodoById = async todoId => {
    try {

        const result = await cursor.deleteOne({ _id: new ObjectId(todoId) });

        if (result.deletedCount === 0) {
            throw new Error("Todo not found");
        }
        return result.acknowledged;

    } catch (error) {
        throw error;
    }
}

module.exports = { createTodo, getTodoById, deleteTodoById }