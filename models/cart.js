const mongoose = require("mongoose");
var cartSchema = new mongoose.Schema({
	product: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product"
	}]
});

module.exports = mongoose.model("Cart", cartSchema);