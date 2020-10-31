const Profile = require("../models/profile")
const History = require("../models/history")
const Slot = require("../models/slot")
const express = require('express');
const router = express.Router();
const {isLoggedIn, isLoggedInA} = require("../middleware/middleware");

router.get("/", isLoggedInA, function(req, res) {
	History.find().populate('product').exec(function(err, allHistory) {
		if(err) {
			console.log(err);
		}
		else {
			//console.log(allHistory);
			res.render("pendingOrder.ejs", {orders: allHistory});
		}
	});
});

router.post("/:id", isLoggedInA, function(req, res) {
	console.log(req.params.id)
	History.findById(req.params.id, function(err, history) {
		if(err) {
			console.log(err);
		}
		else {
			if(history.completed == "red") {
				history.completed = "green";
				history.save();
			}
			else if(history.completed == "green") {
				history.completed = "blue";
				Slot.find({people: history.username}, function(err, slots) {
					if(err) {
						console.log(err);
					}
					else {
						console.log(slots)
						slots.forEach(function(s) {
							console.log(s)
							console.log('Tryna delete the record')
							var i = 0;
							while (i < s.people.length) {
								if (s.people[i] === history.username) {
									s.people.splice(i, 1);
									s.save();
								} else {
									++i;
								}
							}
							//slots.save();
							console.log(s)
						})
						console.log(slots)
					}
				});
				history.save();
			}
			console.log(history);
			res.redirect("/pendingOrders");
		}
	});
});

module.exports=router;