const bcrypt = require("bcrypt");
const { getUserByEmail } = require("../database/user.database");
const { generateAccessToken, generateRefreshToken } = require("../utils/tokenUtils");

const loginController = async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        const code = 401;

        return res.status(code).json({
            success: false,
            message: "Missing credentials",
            details: "Please provide your email and password",
            statusCode: code
        });
    }

    // Retrieve the user by email
    const user = await getUserByEmail(email);

    // Check if the user exists
    if (!user) {
        const code = 401;

        return res.status(code).json({
            success: false,
            message: "Invalid credentials",
            details: "Invalid email or password",
            statusCode: code
        });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user?.password);

    if (!passwordMatch) {
        const code = 401;

        return res.status(code).json({
            success: false,
            message: "Invalid credentials",
            details: "Invalid email or password",
            statusCode: code
        });
    }

    // Password is correct, proceed with successful login
    const code = 200;

    res.status(code).json({
        success: true,
        message: 'Login successful',
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user),
        statusCode: code
    });
}

module.exports = loginController;