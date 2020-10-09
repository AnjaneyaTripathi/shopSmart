const mongoose = require("mongoose");


var viewSchema = new mongoose.Schema({
	product: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product"
	}]
});

module.exports = mongoose.model("View", viewSchema);