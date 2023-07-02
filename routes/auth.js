const express = require("express");
const router = express.Router();

// Call all the authentication controllers here
const register = require("../controllers/register");
const login = require("../controllers/login");
const accessToken = require("../controllers/accessToken");

router.post("/register", register);
router.post("/login", login);
router.post("/access-token", accessToken);

module.exports = router;