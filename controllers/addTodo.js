const { ObjectId } = require("mongodb");
const { createTodo } = require("../database/todo.database");

const addTodo = async (req, res) => {
    const { user, body } = req;
    const { title, desc } = body;

    if (!title) {
        return res.status(400).json({ message: "Please provide a title" });
    }

    const NEW_TODO_PAYLOAD = {
        _id: new ObjectId(),
        title: title,
        description: typeof desc !== "undefined" ? desc : null,
        done: false,
        userId: user._id,
        timestamp: Date.now()
    }

    try {

        const todoId = await createTodo(NEW_TODO_PAYLOAD);

        return res.status(201).json({
            success: true,
            message: "Your new todo successfully created!",
            id: todoId
        });

    } catch (error) {
        return res.status(400).json({ success: false, message: "An error has occurred, please try again later." })
    }
}

module.exports = addTodo;