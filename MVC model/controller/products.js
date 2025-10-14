const Product = require("../model/product");
const { validateFields } = require("../utils/helper");

exports.booksController = (req, res) => {
  res.render("createBooks", {
    pageTitle: "create book page",
    path: "/createBook",
  });
};

exports.addProduct = (req, res) => {
  const { bookName, price, bookCount } = req.body;
  const errors = validateFields(req.body);
  if (errors) {
    return res.status(400).json(errors);
  }
  const newProduct = new Product(bookName.trim(), +price, +bookCount);
  newProduct.save();

  res.redirect("/");
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  Product.delete(id, () => {
    res.redirect("/");
  });
};

exports.editBook = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { price, bookCount } = body;

  const errors = validateFields(req.body);
  if (errors) {
    return res.status(400).json(errors);
  }
  const newData = {
    ...body,
    price: Number(price),
    bookCount: Number(bookCount),
  };

  Product.editBook(id, newData, () => {
    res.status(201).redirect("/");
    // return res.status(201).send({ message: "product edited successfully" });
  });
};
