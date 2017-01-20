var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
// var User = require("./models/user");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, campgrounds) {
    if(err) {
      console.log(err);
    }else {
      res.render("campgrounds/index", {campgrounds:campgrounds});
    }
  });
});

app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.imageUrl;
  var description = req.body.description;

  var newCampground = {name:name, image: image, description: description};
  Campground.create(newCampground, function(err, newlyCreated) {
    if(err) {
      console.log(err);
    }else {
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function(req, res){
  res.render("campgrounds/new");
});

// SHOW
app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if(err) {
      console.log(err);
    }else {
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// comments
app.get("/campgrounds/:id/comments/new", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err) {
      console.log(err);
    }else {
      res.render("comments/new", {campground: campground});
    }
  })
});

//  POST Comment
app.post("/campgrounds/:id/comments", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    }else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        }else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});



app.listen(3000, function(){
  console.log("YelpCamp ALIVE!");
});
