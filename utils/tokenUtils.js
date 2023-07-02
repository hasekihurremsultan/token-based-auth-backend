const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign(
        {userId: user._id, email: user.email, username: user.username},
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {expiresIn: '1h'}
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        {userId: user._id},
        process.env.JWT_REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    );
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
};
