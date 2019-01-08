const mongoose = require('mongoose');

// save a reference to the schema constructor
const Schema = mongoose.Schema;

// using the schema constructor create a new schema that will hold all the scraped articles
const ArticleSchema = new Schema({
    // title is required and of type string
    headline: {
        type: String,
        required: true
    },
    // link is required and of type string
    link: {
        type: String,
        required: true
    },
    // summary is required and of type string
    summary: {
        type: String,
        required: true

    },
    // saved is type boolean and has a default value of false
    saved: {
        type: Boolean,
        default: false
    },
    // comment is an object that stores a comment id
    // the ref property links the ObjectId to the Comment model
    // this allows us to populate the Article with an associated Comment
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// this creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// export the Article model
module.exports = Article;
