const { getAll } = require("../database/todo.database");

const getAllTodos = async (req, res) => {
    const { _id } = req.user;

    try {

        const todos = await getAll(_id);
        todos.map(todo => {
            delete todo.userId;
            return todo;
        });

        return res.status(200).json(todos);

    } catch (error) {

        return res.status(401).json({
            message: "Uncaught error expected.",
            success: false,
            statusCode: 401
        });

    }
}

module.exports = getAllTodos;