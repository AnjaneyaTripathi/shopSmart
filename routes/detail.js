const Profile = require("../models/profile")
const View = require("../models/view")
const Product = require("../models/product")
const express = require('express');
const router = express.Router();
const {isLoggedIn, isLoggedInA} = require("../middleware/middleware");

router.get("/:productId", isLoggedIn, function(req, res) {
	var id = req.params.productId;
	var user = req.user;
	View.findById(user.view, function(err, view) {
		if(err) {
			console.log(err);
		}
		else {
			view.product.push(id);
			view.save();
		}
	});
	Product.findById(id, function(err, product) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("detail.ejs", {product: product, user: req.user});
		}
	});
});

module.exports=router;