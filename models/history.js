const mongoose = require("mongoose");
var historySchema = mongoose.Schema({
	product: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product"
	}],
	date: String,
	completed: String,
	username: String
});

module.exports = mongoose.model("History", historySchema);