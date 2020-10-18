var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var request = require("request");
var dotenv = require("dotenv");
const connectdb=require('./config/setup');

dotenv.config({
	path:'./config/.env'
});

connectdb();

var loginRouter = require('./routes/login');
var signupRouter = require('./routes/register');
var adminRouter = require('./routes/admin');
var addProfileRouter = require('./routes/addProfile');
const User = require("./models/user")

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//mongoose.connect("mongodb://localhost/form_builder");

app.use(require("express-session")({
	secret: "Anjaneya Tripathi",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var logout = require("./routes/logout");
app.use('/logout',logout);

var profileroute = require("./routes/profile");
app.use('/profile',profileroute);

var homee= require("./routes/home");
app.use('/home',homee);

var cartroute = require("./routes/cart");
app.use('/cart',cartroute)

var detailsroute = require("./routes/detail");
app.use('/details',detailsroute)

var addprtofileroute = require("./routes/addprofile2");
app.use('/addProfile',addprtofileroute)

var billsroute = require("./routes/bill");
app.use('/bill',billsroute)

var historyroute = require("./routes/history");
app.use('/history',historyroute)

var orderroute = require("./routes/orders");
app.use('/orders',orderroute)

var warehouseroute = require("./routes/warehouse");
app.use('/warehouse',warehouseroute)

var pendingorderroute = require("./routes/pendingorders");
app.use('/pendingOrders', pendingorderroute)

var updateroute = require("./routes/update");
app.use('/update', updateroute)

app.use('/login', loginRouter);
app.use('/register', signupRouter);
app.use('/admin', adminRouter);
app.use('/addProfile', addProfileRouter);

app.get('/', function(req, res) {
	res.redirect('/login');
   });

const port = 80;

app.listen(port, function() {
	console.log("Listening on port 80");
});











