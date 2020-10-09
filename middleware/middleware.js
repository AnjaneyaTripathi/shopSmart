const isLoggedIn = (req, res, next) =>{
	if(req.isAuthenticated() && req.user.type === "customer") {
		return next();
	}
	res.redirect("/");
};

const isLoggedInA = (req, res, next) => {
	if(req.isAuthenticated() && req.user.type === "admin") {
		return next();
	}
	res.redirect("/admin/login");
};

module.exports.isLoggedIn =  isLoggedIn;
module.exports.isLoggedInA = isLoggedInA ;