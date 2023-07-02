const bcrypt = require("bcrypt");
const { getUserByEmailOrUsername, createUser } = require("../database/user.database");

const registerController = async (req, res) => {
    const { username, email, password } = req.body;

    // Check if any required credential is missing
    if (!username || !email || !password) {
        const code = 401;

        return res.status(code).json({
            success: false,
            message: "Missing credentials.",
            details: "Please provide a username, email and password",
            statusCode: code
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { username, email, password: hashedPassword };

    // Check if user already exists with the given email or username
    const userExists = await getUserByEmailOrUsername(userData);

    if (userExists) {
        const code = 401;

        return res.status(code).json({
            success: false,
            message: "Invalid credentials",
            details: "An account with the same email address already exists",
            statusCode: code
        })
    }

    // Create the user
    const createdUser = createUser(userData);
    if (createdUser) {
        const code = 201;

        return res.status(code).json({
            success: true,
            message: "User successfully created",
            statusCode: code
        });
    }

    // Return an error if user creation fails
    const code = 500;
    return res.status(code).json({
        success: false,
        message: "An error has occurred",
        details: "An error occurred while creating the user",
        statusCode: code
    });
}

module.exports = registerController;