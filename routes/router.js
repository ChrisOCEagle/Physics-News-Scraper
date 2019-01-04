const cheerio = require('cheerio'),
      axios = require('axios');

module.exports = function(app) {
    // the route for the homepage
    app.get("/", (req, res) => res.render("index"));
    // the route for the saved articles
    app.get("/saved", (req, res) => res.render("saved"));
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
                console.log(result);
            });
            res.redirect("/");
        });
    });
};