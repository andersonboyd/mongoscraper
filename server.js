var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

var db = require("./models");
var PORT = 3000;

var User = require("./models/userModel.js");
var Article = require("./models/articleModel.js");

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

db.User.findOne({name: "testuser"})
    .then(function(dbUser){
        if(!dbUser){
            db.User.create({name: "testUser"})
            .then(function(dbUser){
                console.log(dbUser);
            }).catch(function(err){
                console.log(err);
            });
        }else{
            console.log(dbUser);
        }
    }).catch(function(err){
        console.log(err);
    });



app.get("/scrape", function(req, res){
    axios.get("https://fivethirtyeight.com/features").then(function(response){
        var $ = cheerio.load(response.data);
        $("div.fte_features").each(function(i,element){
            // console.log(element);
            var result = {};
            result.title = $(element)
            .children("div.post-info")
            .children("div.tease-meta")
            .children("div.tease-meta-content")
            .children("h2.article-title")
            .children("a").text().trim();
            result.link = $(element)
            .attr("data-href");
            if(result.title && result.link){
                db.Article.create(result)
                .then(function(dbArticle){
                    console.log(dbArticle);
                })
                .catch(function(err){
                    console.log(err);
                })
            }
        });
    });
});

app.get("/saved", function(req, res){

});

app.put("/saved", function(req, res){

});

app.post("/submit", function(req, res){

});

app.listen(PORT, function(){
    console.log("App running on http://localhost:"+PORT);
})