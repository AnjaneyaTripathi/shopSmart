const Profile = require("../models/profile")
const Cart = require("../models/cart")
const Product = require("../models/product")
const User = require("../models/user")
const Slot = require("../models/slot")
const express = require('express');
const router = express.Router();
const {isLoggedIn, isLoggedInA} = require("../middleware/middleware");

router.get("/", isLoggedIn, function(req, res) {
	var user = req.user;
	var total = 0;
	slots = []
	slot = Slot.find({}, function(err, allSlots) {
		if(err) {
			console.log(err)
		}
		else {
			allSlots.sort()
			console.log(allSlots)
			allSlots.forEach(function(s) {
				slots.push(s)
			});
		}
	})
	Cart.findById(user.cart).populate('product').exec(function(err, product) {
		if(err) {
			console.log(err);
		} 
		else {
			product.product.forEach(function(p) {
				total += (p.quantity * p.price);
			});
			res.render("cart.ejs", {cart: product, total: total, user: req.user, slot: slots});
		}
	});
});

router.post("/:category/:productId", isLoggedIn, function(req, res) {
	var productId = req.params.productId;
	var category = req.params.category;
	var user = req.user;
	var quantity = req.body.quantity;
	Product.findById(productId, function(err, product) {
		if(err) {
			console.log(err);
		}
		else {
			product.quantity = quantity;
			product.stock -= quantity;
			product.save();
		}
	});
	Cart.findById(user.cart, function(err, cart) {
		if(err) {
			console.log(err);
		}
		else {
			cart.product.push(productId);
			cart.save();
			res.redirect("/home/"+category+"");
		}
	});
});

router.delete("/:id", isLoggedIn,function(req, res) {
	var user = req.user;
	Cart.findById(user.cart, function(err, cart) {
		if(err) {
			console.log(err);
		}
		else {
			console.log("Cart" + cart);
			for(var i = 0; i < cart.product.length; i++) {
				if(cart.product[i] == req.params.id) {
					cart.product.splice(i, 1);
					cart.save();
				}
			}
			Product.findById(req.params.id, function(err, product) {
				if(err) {
					console.log(err);
				}
				else {
                    product.stock -= (product.quantity)*(-1);
					product.save();
				}
			});
			res.redirect("/cart");
		}
	});
});

module.exports = router;