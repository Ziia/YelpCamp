var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();


// ===============================================
//                  MONGODB
// ===============================================
mongoose.connect("mongodb://localhost/yelp_camp");
// Schema
var campgroundsSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});
//Compile schema into a modell
var Campground = mongoose.model("Campground", campgroundsSchema);

app.use(express.static("public"));
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
      res.render("index", {campgrounds:campgrounds});
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
  res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res){
  var id = req.params.id;
  Campground.findById(id, function(err, foundCampground) {
    if(err) {
      console.log(err);
    }else {
      res.render("show", {campground: foundCampground});
    }
  });
});



app.listen(3000, function(){
  console.log("YelpCamp ALIVE!");
});
