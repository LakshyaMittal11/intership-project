const express = require("express");
const router = express.Router();

router.get("/login",(req,res)=>{
    res.sendFile("login.html",{root:"./public/html"})
})
router.get("/signup",(req,res)=>{
    res.sendFile("signup.html",{root:"./public/html"})
})
router.get("/forget",(req,res)=>{
    res.sendFile("forget.html",{root:"./public/html"})
})

router.get("/",(req,res)=>{
    res.sendFile("index.html",{root:"./"}
    )
})

router.get("/home",(req,res)=>{
    res.sendFile("home.html",{root:"./public/html"})
})
module.exports = router