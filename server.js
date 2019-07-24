var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

var db = require("./models");
var PORT = 3000;

var User = require("./models/userModel");
var Article = require("./models/articleModel");

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

app.get("/", function(req, res){
    
});

app.get("/user", function(req, res){

});

app.get("/saved", function(req, res){

});

app.post("/saved", function(req, res){

});

app.post("/signup", function(req, res){

});

app.post("/scrape", function(req, res){

});

app.post("/comment", function(req, res){

});

app.listen(PORT, function(){
    console.log("App running on http://localhost:"+PORT);
})