const jwt = require("jsonwebtoken");
const { getUserById } = require("../database/user.database");
const { generateAccessToken } = require("../utils/tokenUtils");

const accessToken = async (req, res) => {
    const { refreshToken } = req.body;

    // Check if the refresh token is valid
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
        const userId = decoded.userId;

        // Retrieve the user from the database using the userId
        const user = await getUserById(userId);
        if (!user) {
            throw new Error("User not found!");
        }

        // Generate a new access token
        const accessToken = generateAccessToken(user);

        res.status(200).json({
            success: true,
            accessToken
        });
    } catch (error) {
        // Handle invalid or expired refresh token
        res.status(401).json({ success: false })
    }
}

module.exports = accessToken;