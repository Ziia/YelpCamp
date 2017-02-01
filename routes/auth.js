var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// Root
router.get("/", function(req, res) {
  res.render("landing");
});

//Show Register
router.get("/register", function(req, res){
  res.render("register");
});

//Handle sign up
router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username.toLowerCase()});

  User.register(newUser, req.body.password, function(err, user){
    if(err){
      req.flash("error", err.message);
      return res.redirect("register");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to YelpCamp, " + user.username);
      res.redirect("/campgrounds");
    });
  });
});

// LOGIN
router.get("/login", function(req, res){
  res.render("login");
});

// Handle Login
router.post("/login", usernameToLowerCase, passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
  }), function(req, res){
});

// LOGOUT
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/campgrounds");
});

function usernameToLowerCase(req, res, next){
  req.body.username = req.body.username.toLowerCase();
  next();
}

module.exports = router;
