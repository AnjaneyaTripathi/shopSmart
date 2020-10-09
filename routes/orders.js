const History = require("../models/history")
const express = require('express');
const router = express.Router();
const {isLoggedIn, isLoggedInA} = require("../middleware/middleware");

router.get("/orders", isLoggedIn, function(req, res) {
	History.find().populate('product').exec(function(err, product) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("orders.ejs", {orders: product, user: req.user});
		}
	})
});

module.exports=router;