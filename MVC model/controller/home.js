const Product = require("../model/product");

module.exports = homeController = async (req, res) => {
  Product.fetchBooks((products) => {
    console.log(products);
    res.render("home", { pageTitle: "home page", products, path: "/" });
  });
};
