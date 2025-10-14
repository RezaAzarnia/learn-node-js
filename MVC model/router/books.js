const express = require("express");
const products = require("../controller/products");
const router = express.Router();

router.post("/createBook", products.addProduct);

router.get("/createBook", products.booksController);

router.post("/delete/:id", products.deleteProduct);

router.post("/edit/:id", products.editBook);

module.exports = router;
