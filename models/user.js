const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	type: String,
	cart: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Cart"
	},
	view: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "View"
	}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);