const express = require("express");
const router = express.Router();
const db = require("./database-config")
const logout = require("../controller/logout")
const loggedIn = require("../controller/loggedIn")

router.get("/", (req, res) => {
    res.sendFile("index.html", { root: "./" }
    )
})
router.get("/login", (req, res) => {
    res.sendFile("login.html", { root: "./public/html" })
})
router.get("/signup", (req, res) => {
    res.sendFile("signup.html", { root: "./public/html" })
})
router.get("/forget", (req, res) => {
    res.sendFile("forget.html", { root: "./public/html" })
})

router.get("/logout", logout)


router.get('/home', loggedIn, (req, res) => {
    if (req.user) {
        if (req.headers.accept && req.headers.accept.indexOf('application/json') !== -1) {
            res.json({ userName: req.user.name });
        } else {
            res.sendFile('home.html', { root: './public/html' });
        }
    } else {
        console.log("error");
        res.redirect('/login');
    }
});
module.exports = router;