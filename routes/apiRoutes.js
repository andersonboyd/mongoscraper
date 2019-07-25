var db= require("../models")

module.exports = function(app){
    //scrape fivethirtyeight for content & add to db
    app.get("/scrape", function(req, res){
        axios.get("https://fivethirtyeight.com/features").then(function(response){
            var $ = cheerio.load(response.data);
            $("div.fte_features").each(function(i,element){
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
                        res.json(dbArticle);
                    })
                    .catch(function(err){
                        console.log(err);
                        res.status(500).send();
                    });
                }
            });
        });
    });
    
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