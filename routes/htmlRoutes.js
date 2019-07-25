var db = require("../models");

module.exports = function(app){
    app.get("/", function(req, res){
        res.render("index", {
            articles: db.Article,
            comments: db.Comment});
    });
    app.get("/saved", function(req, res){
        res.render("saved", {
            articles: db.Article,
            comments: db.Comment});
    });
}