const mongoose = require("mongoose");

var slotSchema = mongoose.Schema({
	people: [String],
	slot: Number
});

module.exports = mongoose.model("Slot", slotSchema);