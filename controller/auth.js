const express=require("express");
const login=require("./login");
const signup=require("./signup");
const logout=require("./logout");
const router=express.Router();
router.post("/signup",signup);
router.post("/login",login);
module.exports= router;