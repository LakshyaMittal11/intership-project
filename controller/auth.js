const express = require("express");
const router = express.Router();
const login = require("./login");
const signup = require("./signup");
const logout = require("./logout");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
