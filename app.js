const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json");
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

// 首頁目錄
app.get("/", (req, res) => {  
  res.render("index", { restaurants: restaurantList.results });
});

// show 頁面
app.get("/restaurant/:restaurant_id", (req, res) => {
  const restaurant = restaurantList.results.find(
    (restaurant) => restaurant.id === Number(req.params.restaurant_id)
  );
  res.render("show", { restaurant: restaurant });
});

// search 結果
app.get("/search", (req, res) => {
  if (!req.query.keyword) {
    return res.redirect("/");
  }
  const restaurants = restaurantList.results.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()) ||
      restaurant.category
        .toLowerCase()
        .includes(req.query.keyword.toLowerCase())
    );
  });
  res.render("index", { restaurants: restaurants, keyword: req.query.keyword });
});

// start and listen on The Express server
app.listen(port, () => {
  console.log(`The express is running on localhost:${port}`);
});
