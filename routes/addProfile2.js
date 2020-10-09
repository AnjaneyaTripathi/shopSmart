const Profile = require("../models/profile")
const express = require('express');
const router = express.Router();
const {isLoggedIn, isLoggedInA} = require("../middleware/middleware.js");

router.post("/:i", isLoggedIn, function(req, res) {
	var email = req.body.email;
	var contact = req.body.mobile;
	var address = req.params.i;
	var newProfile = {
		username: req.user.username,
		address: address,
		email: email,
		contact: contact
	}
	Profile.create(newProfile, function(err, newlyCreated) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(newlyCreated);
			res.redirect("/home");
		}
	});
});

module.exports=router;