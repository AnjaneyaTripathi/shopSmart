
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require("../models/user")
const View = require("../models/view")
const Cart = require("../models/cart")

router.get("/", function(req, res) {
	res.render("register.ejs");
});

router.post("/", (req, res) => {
	if(req.body.password == req.body.cpassword) {
		User.register(new User({username: req.body.username, type: "customer"}), req.body.password, function(err, user) {
			if(err) {
				console.log(err);
				return res.render("register.ejs");
			}
			var newView = {
				product: []
			}
			View.create(newView, function(err, newView) {
				if(err) {
					console.log(err);
				}
				else {
					console.log("newView",newView)
					console.log("user",user)
					console.log("user.view",user.view)
					user.view = newView._id;
					console.log("user.view afterwards",user.view)
					user.save(function(err,callback) {
						console.log("user after saving",user)
						var newCart = {
							product: []
						}
						Cart.create(newCart, function(err, newCart) {
							if(err) {
								console.log(err);
							}
							else {
								user.cart = newCart._id;
								user.save(async (err, callback) => {
									console.log("at end", user)
									User.findById(user._id , (err, result)=>{
										console.log("results", result)
								    })
                                    passport.authenticate("local")(req, res, function() {
									res.redirect("/addProfile");
									})
								});
							}
						});

					});
				}
			});
		});
	}
	else {
		res.redirect("/");
	}
});

module.exports=router;