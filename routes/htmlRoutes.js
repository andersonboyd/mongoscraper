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
    app.get("/saved", function(req, res){
        res.render("saved");
    });
}