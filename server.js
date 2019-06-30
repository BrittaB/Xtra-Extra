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