// require the node packages for the app
const express = require("express"),
      mongoose = require("mongoose"),
      axios = require("axios"),
      cheerio = require("cheerio"),
      db = require(""),
      PORT = 3000,
      app = express();

// configure the application middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);