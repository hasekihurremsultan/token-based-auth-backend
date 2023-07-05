const { getTodoById, updateTodoById } = require("../database/todo.database");
const { ObjectId } = require("mongodb");

const updateTodo = async (req, res) => {

    const { title, desc, done } = req.body;
    const { todoId } = req.params;
    const userId = new ObjectId(req.user._id);

    if (!todoId || !title) {
        // Title is a required field
        return res.status(401).json({
            message: "Missing props",
            success: false
        })
    }

    try {

        const todo = await getTodoById(todoId);
        const ownerId = todo.userId;

        if (!todo) {
            return res.status(404).json({ message: "Not found", success: false });
        }

        if (!ownerId.equals(userId)) {
            return res.status(403).json({ message: "Unauthorized", success: false });
        }

        if (!await updateTodoById({ title, done, todoId, description: desc })) {
            throw new Error();
        }

        return res.status(200).json({ message: "Todo updated successfully!", success: true });

    } catch (e) {
        res.status(401).json({ message: "An error has occurred", success: false });
    }
}

module.exports = updateTodo;