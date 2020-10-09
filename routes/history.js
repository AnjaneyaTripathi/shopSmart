const History = require("../models/history")
const express = require('express');
const router = express.Router();
const {isLoggedIn, isLoggedInA} = require("../middleware/middleware");

router.get("/", isLoggedIn, function(req, res) {
	var user = req.user;
	History.find().populate('product').exec(function(err, product) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("history.ejs", {history: product, user: user});
		}
	});
});

module.exports=router;