const Product = require("../models/product")
const express = require('express');
const router = express.Router();
const {isLoggedIn, isLoggedInA} = require("../middleware/middleware");

router.get("/", isLoggedIn, function(req, res) {
	Product.find({}, function(err, allProducts) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("home.ejs", {products: allProducts, status: "Offer", user: req.user});
		}
	});
});

router.get("/:category", isLoggedIn, function(req, res) {
	var category = req.params.category;
	Product.find({}, function(err, allProducts) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("category.ejs", {products: allProducts, category: category, user: req.user});
		}
	});
});

module.exports = router;