const Profile = require("../models/profile")
const Slot = require("../models/slot")
const express = require('express');
const router = express.Router();
const {isLoggedIn, isLoggedInA} = require("../middleware/middleware");
const Product = require("../models/product")

router.get("/", isLoggedInA, function(req, res) {
	Product.find({}, function(err, allProducts) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("store.ejs", {products: allProducts});
		}
	});
});

router.post("/setSlot", isLoggedInA, function(req, res) {
	var start = parseInt(req.body.startTime);
	var end = parseInt(req.body.endTime);
	console.log(start)
	console.log(end+start)
	while(start<end) {
		console.log(start)
		var newSlot = {
			people: [],
			slot: start
		}
		Slot.create(newSlot, async function(err, newlyCreated) {
			if(err) {
				console.log(err);
			}
			else {
				console.log(newlyCreated)
			}
		});
		start++;
	}
	res.redirect("/warehouse")
})

router.get("/add", isLoggedInA, function(req, res) {
	res.render("warehouse.ejs");
});

router.post("/", isLoggedInA, function(req, res) {
	var name = req.body.productName;
	var price = req.body.price;
	var category = req.body.category;
	var description = req.body.description;
	var status = req.body.status;
	var stock = req.body.stock;
	var image = req.body.image;
	var unit = req.body.unit;
	var newProduct = {
		name: name,
		price: price,
		category: category,
		description: description,
		status: status,
		stock: stock,
		image: image,
		unit: unit
	};
	Product.create(newProduct, function(err, newlyCreated) {
		if(err) {
			console.log(err);
		}
		else {
			res.redirect("/warehouse");
		}
	});
});

router.put("/:id", isLoggedInA, function(req, res) {
	var name = req.body.productName;
	var price = req.body.price;
	var category = req.body.category;
	var description = req.body.description;
	var status = req.body.status;
	var stock = req.body.stock;
	var image = req.body.image;
	var unit = req.body.unit;
	var updatedProduct = {
		name: name,
		price: price,
		category: category,
		description: description,
		status: status,
		stock: stock,
		image: image,
		unit: unit
	};
	Product.findByIdAndUpdate(req.params.id, updatedProduct, function(err, product) {
		res.redirect("/warehouse");
	});
});

module.exports=router;