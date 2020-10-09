const mongoose = require("mongoose");
var profileSchema = new mongoose.Schema({
	username: String,
	address: String,
	email: String,
	contact: String
});

module.exports = mongoose.model("Profile", profileSchema);