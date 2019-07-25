var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var db = require("./models");
var PORT = 3000;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function(){
    console.log("App running on http://localhost:"+PORT);
})