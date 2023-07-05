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

const getAll = userId => cursor.find({ userId: new ObjectId(userId) }).toArray()

const updateTodoById = async payload => {
    try {
        const {modifiedCount} = await cursor.updateOne({ _id: new ObjectId(payload.todoId) }, {
            $set: {
                title: payload.title,
                description: payload.description,
                done: payload.done,
                updated_at: Date.now()
            }
        });

        return modifiedCount > 0;
    } catch (err) {
        console.error("Failed to update todo: ", err);
        return false;
    }
}

module.exports = {
    createTodo,
    getTodoById,
    deleteTodoById,
    getAll,
    updateTodoById
}