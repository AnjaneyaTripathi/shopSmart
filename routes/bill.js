const History = require("../models/history")
const Cart = require("../models/cart")
const express = require('express');
const router = express.Router();
const {isLoggedIn, isLoggedInA} = require("../middleware/middleware");

router.post("/", isLoggedIn, function(req, res) {
	var user = req.user;
	var temp = [];
	var n = 0;
	Cart.findById(user.cart, function(err, cart) {
		if(err) {
			console.log(err);
		}
		else {
			cart.product.forEach(function(products) {
				temp.push(products._id);
				n++;

			});
			var date = Date.now();
			var newHistory = {
				product: temp,
				date: date,
				completed: "red",
				username: user.username
			}
			History.create(newHistory, function(err, newHistory) {
				if(err) {
					console.log(err);
				}
				else {
					console.log(newHistory);
				}
			});
			cart.product = [];
			cart.save();
			res.redirect("/bill");
		}
	});
});

router.get("/", isLoggedIn, function(req, res) {
	var user = req.user;
	res.render("bill.ejs", {orderId: user.cart, user: req.user});
});

module.exports=router;