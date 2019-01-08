const mongoose = require('mongoose');

// save a reference to the schema constructor
const Schema = mongoose.Schema;

// using the schema constructor create a new schema that will hold all the scraped articles
const NoteSchema = new Schema({
    // body is of type string
    body: String
});

// this creates our model from the above schema, using mongoose's model method
const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;