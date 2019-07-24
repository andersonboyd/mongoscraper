var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: "You must enter a username!"
    },
    password: {
        type: String,
        unique: true,
        required: "You must enter a valid password",
        validate: [function(input){
          return input.length >= 6;
        } ,"Password must be at least six characters"]
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    userCreated: {
        type: Date,
        default: Date.now
    },
    savedArticles: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

var User = mongoose.model("User", UserSchema);

module.exports = User;