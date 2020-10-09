const Product = require("../models/product")
const express = require('express');
const router = express.Router();
const {isLoggedIn, isLoggedInA} = require("../middleware/middleware");

router.get("/:id", isLoggedInA, function(req, res) {
	Product.findById(req.params.id, function(err, product) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("edit.ejs", {product: product});
		}
	});
});

module.exports=router;