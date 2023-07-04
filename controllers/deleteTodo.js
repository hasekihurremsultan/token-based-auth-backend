const { getTodoById, deleteTodoById } = require("../database/todo.database");
const { ObjectId } = require("mongodb");

const deleteTodo = async (req, res) => {
    const userId = new ObjectId(req.user._id);
    const { todoId } = req.params;

    if (!todoId) return res.json({
        message: "Please provide a todo id to delete it",
        success: false,
        statusCode: 400
    });

    try {
        const todo = await getTodoById(todoId);
        if (!todo || !todo.userId.equals(userId)) {
            return res.status(403).json({ message: "Unauthorized to delete this todo", success: false, statusCode: 403 })
        }

        await deleteTodoById(todoId);
        return res.status(200).json({ message: "Todo deleted successfully", success: true, statusCode: 200 });
    } catch (error) {
        res.status(401).json({ message: error.message, success: false, statusCode: 401 })
    }
}

module.exports = deleteTodo;