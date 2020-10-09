const express = require('express');
const router = express.Router();
const passport = require('passport');
var LocalStrategy = require("passport-local");

router.get("/", function(req, res) {
	res.render("login.ejs");
});


router.post("/", passport.authenticate("local", 
	{
		successRedirect: "/home",
		failureRedirect: "/"
	}), function(req, res) {
		
});

module.exports=router;