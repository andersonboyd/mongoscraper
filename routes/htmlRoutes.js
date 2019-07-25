var db = require("../models");

module.exports = function(app){
    app.get("/", function(req, res){
        db.Article.find()
        .populate("comment")
        .then(function(dbArticle){
            res.render("index", {
                articles: dbArticle
            });
        })
    });
    app.get("/save", function(req, res){
        db.Article.find({isSaved:true})
        .populate("comment")
        .then(function(dbArticle){
            res.render("saved", {
                articles: dbArticle
            });
        })
    });
}