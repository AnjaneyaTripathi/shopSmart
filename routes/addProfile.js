const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get("/", function(req, res) {
	res.render("profileImage.ejs");
});

router.get("/:i", function(req, res) {
	res.render("profileDetails.ejs", {i: req.params.i});
});

module.exports=router;

