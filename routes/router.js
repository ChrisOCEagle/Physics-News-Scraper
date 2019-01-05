const cheerio = require('cheerio'),
      axios = require('axios'),
      db = require('../models');

module.exports = function(app) {
    // the route for the homepage
    app.get("/", (req, res) => {
        if (db.Article.count({ saved: false }) != 0) {
            db.Article
            .find({ saved: false })
            .then(dbArticle => {
                res.render("index", {
                    articles: dbArticle,
                    savedRoute: false
                });
            }).catch(err => res.json(err));
        } else {
            res.render("index", {
                articles: {},
                savedRoute: false
            });
        }
    });
    // the route for clearing the database of the articles
    app.get("/clear", (req, res) => {
        db.Article
        .remove({})
        .then(() => res.redirect("/"))
        .catch(err => console.log(err));
    });
    // the route for the saved articles
    app.get("/saved", (req, res) => {
        if (db.Article.count({ saved: true }) != 0) {
            db.Article
            .find({ saved: true })
            .then(dbSavedArticle => res.render("index", {
                articles: dbSavedArticle,
                savedRoute: true
            }))
            .catch(err => console.log(err));
        } else {
            res.render("index", {
                articles: {},
                savedRoute: true
            });
        }
    });
    // the route for scraping https://physicsworld.com/
    app.get("/scrape", (req, res) => {
        // first we grab the body of the html with axios
        axios.get("https://physicsworld.com/").then(response => {
            // then we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);
            // grab every h3 within an article tag and do the following:
            $("article.listing-block").each((i, element) => {
                // save an empty result object
                var result = {};
                // add the headline to the result object
                result.headline = $(element).find("b").text();
                // add the link to the original article to the result object
                result.link = $(element).find("a").attr("href");
                // add the summary to the result object
                result.summary = $(element).find("p").text();
                // create a new Article using the result object built from scraping
                db.Article
                .create(result)
                .then(dbArticle => console.log(dbArticle))
                .catch(err => console.log(err));
            });
            res.redirect("/");
        });
    });
    // the route for saving/deleting an article
    app.put("/api/article/:id", (req, res) => {
        db.Article.findOne({ _id: req.params.id })
        .then(function(dbArticle) {
            if (dbArticle.saved === true) {
                db.Article
                .updateOne({ _id: req.params.id }, {$set: { saved: false } })
                .then(() => res.redirect("/saved"))
                .catch(err => console.log(err))
            } else if (dbArticle.saved === false) {
                db.Article
                .updateOne({ _id: req.params.id }, {$set: { saved: true } })
                .then(() => res.redirect("/saved"))
                .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err));    
    });
};