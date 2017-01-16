var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var camps = [
  {name: "Salmon Creek", image: "https://farm2.staticflickr.com/1075/1132747626_f7adec63dd.jpg"},
  {name: "Granite Hill", image: "https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg"},
  {name: "Mountain Goat's Rest", image: "https://farm5.staticflickr.com/4016/4270995674_9fd4546267.jpg"},
  {name: "Salmon Creek", image: "https://farm2.staticflickr.com/1075/1132747626_f7adec63dd.jpg"},
  {name: "Granite Hill", image: "https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg"},
  {name: "Mountain Goat's Rest", image: "https://farm5.staticflickr.com/4016/4270995674_9fd4546267.jpg"}
];


app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {camps:camps});
});

app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.imageUrl;

  var newCampground = {name:name, image, image};
  camps.push(newCampground);

  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
  res.render("new.ejs");
});




app.listen(3000, function(){
  console.log("YelpCamp ALIVE!");
});
