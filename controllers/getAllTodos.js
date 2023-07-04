const { getAll } = require("../database/todo.database");

const getAllTodos = async (req, res) => {
    const { _id } = req.user;

    try {

        return res.status(200).json(await getAll(_id));

    } catch (error) {

        return res.status(401).json({
            message: "Uncaught error expected.",
            success: false,
            statusCode: 401
        });

    }
}

module.exports = getAllTodos;