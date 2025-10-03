const Product = require("../model/product");

module.exports = homeController = async (req, res) => {
  let products = [];
  try {
    const { data } = await Product.fetchBooks();
    products = data;
  } catch (error) {
    console.log(error);
  }

  res.render("home", { pageTitle: "home page", products, path: "/" });
};
