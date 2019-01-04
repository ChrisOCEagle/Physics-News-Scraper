const express = require('express'),
      PORT = process.env.PORT || 3000,
      exphbs = require('express-handlebars'),
      mongoose = require('mongoose'),
      app = express();

// Set up the application middleware
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Set up handlebars as the viewing engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// connect to the mongo db
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes
require("./routes/router.js")(app);

app.listen(PORT, () => console.log("Server listening on http://localhost:" + PORT));