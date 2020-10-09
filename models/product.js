const mongoose = require("mongoose");
var productSchema = new mongoose.Schema({
	name: String,
	price: String,
	category: String,
	description: String,
	status: String,
	stock: String, 
	image: String,
	popularity: String,
	quantity: String,
	unit: String
});

module.exports = mongoose.model("Product", productSchema);