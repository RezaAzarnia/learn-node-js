const Product = require("../model/product");

module.exports = homeController = async (req, res) => {
  let products = [];

  await Product.fetchBooks()
    .then((response) => (products = response.data))
    .catch((err) => console.log(err));
  
    // console.log(products);

  res.render("home", { pageTitle: "home page", products, path: "/" });
};
