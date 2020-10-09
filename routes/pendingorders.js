const Profile = require("../models/profile")
const History = require("../models/history")
const express = require('express');
const router = express.Router();
const {isLoggedIn, isLoggedInA} = require("../middleware/middleware");

router.get("/", isLoggedInA, function(req, res) {
	History.find().populate('product').exec(function(err, allHistory) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(allHistory);
			res.render("pendingOrder.ejs", {orders: allHistory});
		}
	});
});

router.post("/:id", isLoggedInA, function(req, res) {
	History.findById(req.params.id, function(err, history) {
		if(err) {
			console.log(history);
		}
		else {
			if(history.completed == "red") {
				history.completed = "green";
				history.save();
			}
			else if(history.completed == "green") {
				history.completed = "blue";
				history.save();
			}
			console.log(history);
			res.redirect("/pendingOrders");
		}
	});
});

module.exports=router;