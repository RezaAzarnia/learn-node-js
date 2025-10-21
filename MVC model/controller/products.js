const Product = require("../model/product");
const { validateFields, validateID } = require("../utils/helper");

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

exports.deleteProduct = async (req, res) => {
  const { id } = req.body;
  const validation = validateID(id);
  if (!validation.valid) {
    return res.status(validation.status).json({ message: validation.message });
  }
  try {
    const response = await Product.delete(id);
    console.log(response);
    return res.status(200).json({ success: true, message: response.message });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ success: false, message: error.message });
  }
};

exports.editBook = async (req, res) => {
  const { id, price, bookCount } = req.body;
  const validation = validateID(id);
  const errors = validateFields(req.body);

  if (!validation.valid) {
    return res
      .status(validation.status)
      .json({ success: validation.valid, message: validation.message });
  }
  if (errors) {
    return res.status(400).json(errors);
  }
  const newData = {
    ...req.body,
    price: Number(price),
    bookCount: Number(bookCount),
  };
  console.log(newData);
  try {
    const response = await Product.editBook(id, newData);
    return res.status(201).send({ success: true, message: response.message });
  } catch (error) {
    return res.status(404).send({ success: false, message: error.message });
  }
};
