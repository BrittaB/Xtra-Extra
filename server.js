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

//Grab every h2 within an article tag, and do the following:
$("article h2").each(function(response){
  //Save an empty result object
  var result = {};

  //Add the text and href of every link, and save them as properties of the result object
  result.title = $(this)
  .children("a")
  .text();
  result.link = $(this)
  .children("a")
  .attr("href");

  // Create a new Article using the 'result' object built from scraping
  db.Article.create(result)
  .then(function(dbArticle) {
    //View the added result in the console
    console.log(dbArticle);
  })
  .catch(function(err) {
    //If an error occurred, log it
    console.log(err);
  });
});
//Send a message to the client
res.send("Scrape Complete");
});
});

//Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  //Grab every document in the Articles collection
db.Article.find({})
.then(function(dbArticle) {
  // If we were able to successfully find Articles, sent them back to the client
  res.json(dbArticle);
})
.catch(function(err) {
  //If an error occurred,send it to the client
  res.json(err);
});
});

//Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req,res){
  //
})