const History = require("../models/history")
const Cart = require("../models/cart")
const Slot = require("../models/slot")
const express = require('express');
const router = express.Router();
const {isLoggedIn, isLoggedInA} = require("../middleware/middleware");

router.post("/", isLoggedIn, function(req, res) {
	var user = req.user;
	var slot = req.body.slot;
	console.log('Hi')
	console.log(slot)
	var temp = [];
	var n = 0;
	Slot.findOne({slot: slot}, function(err, result) {
		if(err) {
			console.log(err)
		}
		else {
			result.people.push(user.username)
			result.save()
			console.log(result)
		}
	})
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
				username: user.username,
				slot: slot
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