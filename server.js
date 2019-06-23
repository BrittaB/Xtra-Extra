var cheerio = require("cheerio");
var axios = require("axios");

console.log
("\n****************\n"+
 "grabbing every article and linking\n"+ "from nytimes main page:" + "\n********\n");
axios.get("https://www.nytimes.com").then(function(response) {

  var $ = cheerio.load(response.data);
  var results = [];
  $("article").each(function(i, element) {

    var title = $(element).children().text();
    var link = $(element).find("a").attr("href");

    results.push({
      title: title,
      link: link
    });
  });

  console.log(results);
});
