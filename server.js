//Var Requires
var express = require ("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require ("axios");

//Var Cheerio
var cheerio = ("cheerio");
var db = ("./models");

//Port 3000
var PORT = 3000;

//Initialize express
var app = express ();

app.use(logger("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

//Connect to Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

//Routes

//A GET route for scraping the New York Times website
app.get("/scrape", function(req, res) {
//Grab the body of the html with axios
axios.get("https://www.nytimes.com/").then(function(response) {
//Load into Cheerio and save it to $ for a selector
var $ = cheerio.load(response.data);

});
});