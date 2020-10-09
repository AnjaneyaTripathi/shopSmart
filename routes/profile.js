const Profile = require("../models/profile")
const express = require('express');
const router = express.Router();
const {isLoggedIn,isLoggedInA} = require("../middleware/middleware");

router.get("/", isLoggedIn, function(req, res) {
	Profile.find({}, function(err, profiles) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("profile.ejs", {profiles: profiles, user: req.user});
		}
	});
});

module.exports=router;