const mongoose = require('mongoose');

// save a reference to the schema constructor
const Schema = mongoose.Schema;

// using the schema constructor create a new schema that will hold all the scraped articles
const CommentSchema = new Schema({
    // title is of type string
    title: String,
    // body is of type string
    body: String
});

// this creates our model from the above schema, using mongoose's model method
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;