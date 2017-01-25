var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var passportLocalMongoose = require("passport-local-mongoose");

// Require modules
var User = require("./models/user");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var Campground = require("./models/campground");

// Require routes
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var authRoutes = require("./routes/auth");

mongoose.connect("mongodb://localhost/yelp_camp");
// seedDB();

var app = express();
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(require("express-session")({
  secret: "July 2017",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Pass user through all routes.
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(authRoutes);

app.listen(3000, function(){
  console.log("YelpCamp ALIVE!");
});
