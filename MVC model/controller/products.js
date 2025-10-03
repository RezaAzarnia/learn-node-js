const Product = require("../model/product");

exports.booksController =  (req, res) => {
  res.render("createBooks", { pageTitle: "create book page", path: "/createBook" });
};

exports.addProduct = (req, res) => {
  const { bookName, price, bookCount } = req.body;

  const newProduct = new Product(bookName, +price, +bookCount);
  newProduct.save();

  res.redirect("/");
};

exports.deleteProduct = (req, res) => {
  // console.log(req);
};
