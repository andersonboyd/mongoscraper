var db= require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app){
    //scrape fivethirtyeight for content & add to db
    app.get("/scrape", function(req, res){
        axios.get("https://fivethirtyeight.com/features").then(function(response){
            var $ = cheerio.load(response.data);
            $("div.fte_features").each(function(i,element){
                var result = {};
                result.title = $(this)
                .children("div.post-info")
                .children("div.tease-meta")
                .children("div.tease-meta-content")
                .children("h2.article-title")
                .children("a").text().trim();
                result.link = $(this)
                .attr("data-href");
                if(result.title && result.link){
                    db.Article.find(result)
                    .then(function(dbArticle){
                        if(!dbArticle){
                            db.Article.create(result)
                            .then(function(dbNew){
                                console.log(dbNew);
                                res.json(dbNew);
                            })
                            .catch(function(err){
                                console.log(err);
                                res.status(500).send();
                            });
                        }else{
                            res.json(dbArticle);
                        }
                    }).catch(function(err){
                        console.log(err);
                    })
                }
            });
        });
    });
    
    app.get("/articles", function(req, res){
        db.Article.find()
        .populate("comment")
        .then(function(found){
            res.json(found);
        }).catch(function(err){
            console.log(err);
        })
    })
    //gets saved articles from db
    app.get("/saved", function(req, res){
        db.Articles.find({isSaved: true})
        .populate("comment")
        .then(function(saved){
            res.json(saved);
        }).catch(function(err){
            console.log(err);
            res.status(500).send();
        });
    });

    //saves article (updates article.isSaved)
    app.put("/saved/:id", function(req, res){
        db.Articles.findOneAndUpdate(
            {_id: req.params.id},
            {$set: {isSaved: true}},
            {new: true})
        .then(function(dbArticle){
            res.json(dbArticle);
        })
        .catch(function(err){
            console.log(err);
            res.status(500).send();
        });
    });
    
    //submit comments to db
    app.post("/submit/:id", function(req, res){
        db.Comment.create(req.body)
        .then(function(dbComment){
            return db.Article.findOneAndUpdate(
                {_id: req.params.id},
                {$push: {comment: dbComment._id}},
                {new: true});
        })
        .then(function(dbArticle){
            res.json(dbArticle);
        })
        .catch(function(err){
            console.log(err);
            res.status(500).send();
        });
    });
}