const jwt = require("jsonwebtoken");
const { getUserById } = require("../database/user.database");

const verifyUser = async (req, res, next) => {
    // Retrieve the access token from the request header
    const accessToken = req.headers.authorization;

    // Check if the access token is provided
    if (!accessToken) {
        return res.status(401).json({ message: "Access token missing" })
    }

    try {

        // Verify the access token using secret key
        const { userId }  = jwt.verify(accessToken.split(" ")[1], process.env.JWT_ACCESS_TOKEN_SECRET);

        // Retrieve the user from database
        const user = await getUserById(userId);

        // Throw an error if user is not found
        if (!user) {
            throw new Error("User not found.");
        }

        // Add the user object to request for use in
        // subsequent middleware or route handlers
        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid access token" })
    }
}

module.exports = { verifyUser }