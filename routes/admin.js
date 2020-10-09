const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require("../models/user")
router.get("/login", function(req, res) {
	res.render("adminLogin.ejs")
});

router.get("/register", function(req, res) {
	res.render("adminRegister.ejs");
});

router.post("/register", function(req, res) {
	if(req.body.password == req.body.cpassword) {
		User.register(new User({username: req.body.username, type: "admin"}), req.body.password, function(err, user) {
			if(err) {
				console.log(err);
				return res.render("adminRegister.ejs");
			}
			passport.authenticate("local")(req, res, function() {
				res.redirect("/admin/login");
			});
		});
	}	
	else {
		res.redirect("/register");
	}
});

router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/warehouse",
		failureRedirect: "/admin/login"
	}), function(req, res) {
});

module.exports=router;